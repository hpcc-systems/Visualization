import { describe, it, expect } from "vitest";

import { HierarchicalGraph, Graph3 } from "../src/index.ts";

describe("HierarchicalGraph", () => {

    it("addVertex / addEdge / source / target", () => {
        const g = new HierarchicalGraph<object, object>();
        const v1 = {};
        const v2 = {};
        const e = {};

        g.addVertex(v1);
        g.addVertex(v2);
        g.addEdge(v1, v2, e);

        expect(g.vertexCount()).to.equal(2);
        expect(g.edgeCount()).to.equal(1);
        expect(g.source(e)).to.equal(v1);
        expect(g.target(e)).to.equal(v2);
        expect(g.outEdges(v1)).to.deep.equal([e]);
        expect(g.inEdges(v2)).to.deep.equal([e]);
        expect(g.outEdges(v2)).to.deep.equal([]);
        expect(g.inEdges(v1)).to.deep.equal([]);
        expect(g.neighbors(v1, "out")).to.deep.equal([v2]);
        expect(g.neighbors(v2, "in")).to.deep.equal([v1]);
    });

    it("undirected graphs treat edges as incident both ways", () => {
        const g = new HierarchicalGraph<object, object>({ directed: false });
        const a = {};
        const b = {};
        const e = {};

        // addEdge should add missing vertices by default
        g.addEdge(a, b, e);

        expect(g.isDirected()).to.equal(false);
        expect(g.vertexCount()).to.equal(2);
        expect(g.edgeCount()).to.equal(1);
        expect(g.outEdges(a)).to.deep.equal([e]);
        expect(g.outEdges(b)).to.deep.equal([e]);
        expect(g.inEdges(a)).to.deep.equal([e]);
        expect(g.inEdges(b)).to.deep.equal([e]);
        expect(g.neighbors(a, "out")).to.deep.equal([b]);
        expect(g.neighbors(b, "out")).to.deep.equal([a]);
    });

    it("removeEdge updates adjacency", () => {
        const g = new HierarchicalGraph<object, object>();
        const v1 = {};
        const v2 = {};
        const e = {};

        g.addEdge(v1, v2, e);
        expect(g.edgeCount()).to.equal(1);

        g.removeEdge(e);
        expect(g.edgeCount()).to.equal(0);
        expect(g.outEdges(v1)).to.deep.equal([]);
        expect(g.inEdges(v2)).to.deep.equal([]);
    });

    it("removeVertex removes incident edges", () => {
        const g = new HierarchicalGraph<object, object>();
        const v1 = {};
        const v2 = {};
        const v3 = {};
        const e12 = {};
        const e23 = {};
        const e31 = {};

        g.addVertices([v1, v2, v3]);
        g.addEdge(v1, v2, e12);
        g.addEdge(v2, v3, e23);
        g.addEdge(v3, v1, e31);

        expect(g.vertexCount()).to.equal(3);
        expect(g.edgeCount()).to.equal(3);

        g.removeVertex(v2);
        expect(g.vertexCount()).to.equal(2);
        expect(g.edgeCount()).to.equal(1);
        expect(g.hasEdge(e12)).to.equal(false);
        expect(g.hasEdge(e23)).to.equal(false);
        expect(g.hasEdge(e31)).to.equal(true);
    });

    it("walk supports abort and stepover", () => {
        const g = new HierarchicalGraph<{ id: string }, object>();
        const a = { id: "a" };
        const b = { id: "b" };
        const c = { id: "c" };
        const d = { id: "d" };

        g.addVertices([a, b, c, d]);
        g.addEdge(a, b, {});
        g.addEdge(b, c, {});

        const visitedAll: string[] = [];
        g.walk(v => {
            visitedAll.push(v.id);
        });
        expect(visitedAll).to.deep.equal(["a", "b", "c", "d"]);

        const aborted: string[] = [];
        g.walk(v => {
            aborted.push(v.id);
            if (v.id === "b") return "abort";
        });
        expect(aborted).to.deep.equal(["a", "b"]);

        const stepOver: string[] = [];
        g.walk(v => {
            stepOver.push(v.id);
            if (v.id === "b") return "stepover";
        });
        // b does not traverse to c, but c is still visited as a disconnected start
        expect(stepOver).to.deep.equal(["a", "b", "c", "d"]);

        const fromA: string[] = [];
        g.walk(a, v => {
            fromA.push(v.id);
        });
        expect(fromA).to.deep.equal(["a", "b", "c"]);
    });

    it("subgraphs can contain subgraphs and vertices", () => {
        const g = new HierarchicalGraph<object, object, object>();
        const root = g.rootSubgraph();
        const sgA = {};
        const sgB = {};
        const v = {};

        g.addSubgraph(sgA);
        g.addSubgraph(sgB, sgA);
        g.addVertex(v, sgB);

        expect(g.subgraphChildren(root)).to.deep.equal([sgA]);
        expect(g.subgraphSubgraphs(sgA)).to.deep.equal([sgB]);
        expect(g.subgraphVertices(sgB)).to.deep.equal([v]);
        expect(g.parentSubgraph(v)).to.equal(sgB);
    });

    it("removeSubgraph(removeChildren=false) keeps children", () => {
        const g = new HierarchicalGraph<object, object, object>();
        const root = g.rootSubgraph();
        const sgA = {};
        const sgB = {};
        const v = {};

        g.addSubgraph(sgA);
        g.addSubgraph(sgB, sgA);
        g.addVertex(v, sgB);

        g.removeSubgraph(sgB, false);
        expect(g.hasSubgraph(sgB)).to.equal(false);
        // v is now a direct child of sgA
        expect(g.subgraphVertices(sgA)).to.deep.equal([v]);
        expect(g.parentSubgraph(v)).to.equal(sgA);
        // sgA is still under root
        expect(g.subgraphChildren(root)).to.deep.equal([sgA]);
    });

    it("subgraphCount / vertices / subgraphs / edges accessors", () => {
        const g = new HierarchicalGraph<object, object, object>();
        const v1 = {};
        const v2 = {};
        const sg = {};
        const e = {};

        g.addSubgraph(sg);
        g.addVertex(v1, sg);
        g.addVertex(v2);
        g.addEdge(v1, v2, e);

        expect(g.subgraphCount()).to.equal(2); // root + sg
        expect(g.vertices()).to.deep.equal([v1, v2]);
        expect(g.subgraphs()).to.deep.equal([g.rootSubgraph(), sg]);
        expect(g.edges()).to.deep.equal([e]);
        expect(g.hasVertex(v1)).to.equal(true);
        expect(g.hasVertex({} as any)).to.equal(false);
    });

    it("setParent moves vertex to another subgraph", () => {
        const g = new HierarchicalGraph<object, object, object>();
        const sgA = {};
        const sgB = {};
        const v = {};

        g.addSubgraph(sgA);
        g.addSubgraph(sgB);
        g.addVertex(v, sgA);

        expect(g.parentSubgraph(v)).to.equal(sgA);

        g.setParent(v, sgB);
        expect(g.parentSubgraph(v)).to.equal(sgB);
        expect(g.subgraphVertices(sgA)).to.deep.equal([]);
        expect(g.subgraphVertices(sgB)).to.deep.equal([v]);
    });

    it("setParent moves subgraph to another parent", () => {
        const g = new HierarchicalGraph<object, object, object>();
        const sgA = {};
        const sgB = {};

        g.addSubgraph(sgA);
        g.addSubgraph(sgB);

        g.setParent(sgA, sgB);
        expect(g.subgraphSubgraphs(sgB)).to.deep.equal([sgA]);
    });

    it("incidentEdges returns all edges for a vertex", () => {
        const g = new HierarchicalGraph<object, object>();
        const v1 = {};
        const v2 = {};
        const v3 = {};
        const e12 = {};
        const e31 = {};

        g.addVertices([v1, v2, v3]);
        g.addEdge(v1, v2, e12);
        g.addEdge(v3, v1, e31);

        const incident = g.incidentEdges(v1);
        expect(incident).to.have.length(2);
        expect(incident).to.include(e12);
        expect(incident).to.include(e31);
    });

    it("clear resets graph to empty", () => {
        const g = new HierarchicalGraph<object, object, object>();
        const sg = {};
        const v1 = {};
        const v2 = {};
        const e = {};

        g.addSubgraph(sg);
        g.addVertex(v1, sg);
        g.addVertex(v2);
        g.addEdge(v1, v2, e);

        expect(g.vertexCount()).to.equal(2);
        expect(g.edgeCount()).to.equal(1);
        expect(g.subgraphCount()).to.equal(2);

        g.clear();
        expect(g.vertexCount()).to.equal(0);
        expect(g.edgeCount()).to.equal(0);
        expect(g.subgraphCount()).to.equal(1); // root remains
    });

    it("throws on duplicate vertex", () => {
        const g = new HierarchicalGraph<object, object>();
        const v = {};
        g.addVertex(v);
        expect(() => g.addVertex(v)).to.throw("Vertex already exists");
    });

    it("throws on duplicate edge", () => {
        const g = new HierarchicalGraph<object, object>();
        const v1 = {};
        const v2 = {};
        const e = {};
        g.addEdge(v1, v2, e);
        expect(() => g.addEdge(v1, v2, e)).to.throw("Edge already exists");
    });

    it("throws on duplicate subgraph", () => {
        const g = new HierarchicalGraph<object, object, object>();
        const sg = {};
        g.addSubgraph(sg);
        expect(() => g.addSubgraph(sg)).to.throw("Subgraph already exists");
    });

    it("throws when adding vertex that is already a subgraph", () => {
        const g = new HierarchicalGraph<object, object, object>();
        const obj = {};
        g.addSubgraph(obj);
        expect(() => g.addVertex(obj as any)).to.throw("Object is already a subgraph");
    });

    it("throws when adding subgraph that is already a vertex", () => {
        const g = new HierarchicalGraph<object, object, object>();
        const obj = {};
        g.addVertex(obj);
        expect(() => g.addSubgraph(obj as any)).to.throw("Object is already a vertex");
    });

    it("addEdge with addMissingVertices=false throws on missing vertex", () => {
        const g = new HierarchicalGraph<object, object>();
        const v1 = {};
        const v2 = {};
        const e = {};
        expect(() => g.addEdge(v1, v2, e, { addMissingVertices: false })).to.throw("Source vertex does not exist");

        g.addVertex(v1);
        expect(() => g.addEdge(v1, v2, e, { addMissingVertices: false })).to.throw("Target vertex does not exist");
    });

    it("cannot remove root subgraph", () => {
        const g = new HierarchicalGraph<object, object, object>();
        expect(() => g.removeSubgraph(g.rootSubgraph())).to.throw("Cannot remove root subgraph");
    });

    it("removeSubgraph(removeChildren=true) removes contained vertices and edges", () => {
        const g = new HierarchicalGraph<object, object, object>();
        const sg = {};
        const v1 = {};
        const v2 = {};
        const e = {};

        g.addSubgraph(sg);
        g.addVertex(v1, sg);
        g.addVertex(v2);
        g.addEdge(v1, v2, e);

        g.removeSubgraph(sg, true);
        expect(g.hasSubgraph(sg)).to.equal(false);
        expect(g.hasVertex(v1)).to.equal(false);
        expect(g.hasEdge(e)).to.equal(false);
        expect(g.hasVertex(v2)).to.equal(true);
    });

    it("walk with direction=in follows incoming edges", () => {
        const g = new HierarchicalGraph<{ id: string }, object>();
        const a = { id: "a" };
        const b = { id: "b" };
        const c = { id: "c" };

        g.addVertices([a, b, c]);
        g.addEdge(a, b, {});
        g.addEdge(c, b, {});

        const visited: string[] = [];
        g.walk(b, v => { visited.push(v.id); }, { direction: "in" });
        expect(visited).to.deep.equal(["b", "a", "c"]);
    });

    it("walk with direction=both follows all edges", () => {
        const g = new HierarchicalGraph<{ id: string }, object>();
        const a = { id: "a" };
        const b = { id: "b" };
        const c = { id: "c" };

        g.addVertices([a, b, c]);
        g.addEdge(a, b, {});
        g.addEdge(b, c, {});

        const visited: string[] = [];
        g.walk(b, v => { visited.push(v.id); }, { direction: "both" });
        expect(visited).to.have.length(3);
        expect(visited).to.include("a");
        expect(visited).to.include("b");
        expect(visited).to.include("c");
    });

    it("neighbors with direction=both", () => {
        const g = new HierarchicalGraph<object, object>();
        const a = {};
        const b = {};
        const c = {};

        g.addVertices([a, b, c]);
        g.addEdge(a, b, {});
        g.addEdge(c, b, {});

        expect(g.neighbors(b, "both")).to.have.length(2);
    });

    it("Graph3 is a deprecated alias for HierarchicalGraph", () => {
        const g = new Graph3<object, object>();
        const v1 = {};
        const v2 = {};
        const e = {};

        g.addVertex(v1);
        g.addVertex(v2);
        g.addEdge(v1, v2, e);

        expect(g.vertexCount()).to.equal(2);
        expect(g.edgeCount()).to.equal(1);
        expect(g).to.be.instanceOf(HierarchicalGraph);
    });

    it("self-loop edge in undirected graph", () => {
        const g = new HierarchicalGraph<object, object>({ directed: false });
        const v = {};
        const e = {};

        g.addVertex(v);
        g.addEdge(v, v, e);

        expect(g.outEdges(v)).to.deep.equal([e]);
        expect(g.inEdges(v)).to.deep.equal([e]);

        g.removeEdge(e);
        expect(g.edgeCount()).to.equal(0);
    });
});
