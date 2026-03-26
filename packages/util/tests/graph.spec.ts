import { describe, it, expect } from "vitest";

import { Graph, Subgraph, Vertex, Edge } from "../src/index.ts";

describe("Graph", function () {
    it("subgraph hierarchy", function () {
        const graph = new Graph();
        const sg1 = graph.createSubgraph();
        expect(graph.subgraphs.length).to.equal(1);
        expect(graph.root.subgraphs.length).to.equal(1);
        expect(graph.vertices.length).to.equal(0);
        expect(graph.edges.length).to.equal(0);
        let sg2 = graph.createSubgraph(sg1);
        expect(sg2.parent).to.equal(sg1);
        let sg3 = sg2.createSubgraph();
        expect(sg3.parent).to.equal(sg2);
        expect(graph.subgraphs.length).to.equal(3);
        expect(graph.root.subgraphs.length).to.equal(1);
        expect(sg1.subgraphs.length).to.equal(1);
        expect(sg2.subgraphs.length).to.equal(1);
        expect(sg3.subgraphs.length).to.equal(0);
        sg2.remove();
        expect(graph.subgraphs.length).to.equal(1);
        sg2 = graph.createSubgraph(sg1);
        sg3 = graph.createSubgraph(sg2);
        expect(graph.subgraphs.length).to.equal(3);
        sg3.remove();
        expect(graph.subgraphs.length).to.equal(2);
        expect(sg2.subgraphs.length).to.equal(0);
        sg2.remove();
        expect(graph.subgraphs.length).to.equal(1);
        expect(sg1.subgraphs.length).to.equal(0);
        sg1.remove();
        expect(graph.subgraphs.length).to.equal(0);
        expect(graph.subgraphs.length).to.equal(0);
    });

    it("create and remove vertices", function () {
        const graph = new Graph<string, string, string>();
        const v1 = graph.createVertex(graph.root, "v1");
        const v2 = graph.createVertex(graph.root, "v2");
        expect(graph.vertices.length).to.equal(2);
        expect(graph.root.vertices.length).to.equal(2);
        expect(v1._).to.equal("v1");
        expect(v1.parent).to.equal(graph.root);

        graph.removeVertex(v1);
        expect(graph.vertices.length).to.equal(1);
        expect(graph.root.vertices.length).to.equal(1);

        graph.removeVertex(v2);
        expect(graph.vertices.length).to.equal(0);
    });

    it("create and remove edges", function () {
        const graph = new Graph<string, string, string>();
        const v1 = graph.createVertex(graph.root, "v1");
        const v2 = graph.createVertex(graph.root, "v2");
        const e1 = graph.createEdge(graph.root, v1, v2, "e1");
        expect(graph.edges.length).to.equal(1);
        expect(graph.root.edges.length).to.equal(1);
        expect(e1.source).to.equal(v1);
        expect(e1.target).to.equal(v2);
        expect(e1._).to.equal("e1");
        expect(v1.outEdges.length).to.equal(1);
        expect(v2.inEdges.length).to.equal(1);

        graph.removeEdge(e1);
        expect(graph.edges.length).to.equal(0);
        expect(v1.outEdges.length).to.equal(0);
        expect(v2.inEdges.length).to.equal(0);
    });

    it("Edge.remove()", function () {
        const graph = new Graph<string, string, string>();
        const v1 = graph.createVertex(graph.root, "v1");
        const v2 = graph.createVertex(graph.root, "v2");
        const e1 = graph.createEdge(graph.root, v1, v2, "e1");
        expect(graph.edges.length).to.equal(1);
        e1.remove();
        expect(graph.edges.length).to.equal(0);
    });

    it("Vertex.edges getter", function () {
        const graph = new Graph<string, string, string>();
        const v1 = graph.createVertex(graph.root, "v1");
        const v2 = graph.createVertex(graph.root, "v2");
        const v3 = graph.createVertex(graph.root, "v3");
        graph.createEdge(graph.root, v1, v2, "e1");
        graph.createEdge(graph.root, v3, v2, "e2");
        expect(v2.edges.length).to.equal(2);
        expect(v1.edges.length).to.equal(1);
        expect(v3.edges.length).to.equal(1);
    });

    it("Vertex.remove()", function () {
        const graph = new Graph<string, string, string>();
        const v1 = graph.createVertex(graph.root, "v1");
        graph.createVertex(graph.root, "v2");
        expect(graph.vertices.length).to.equal(2);
        v1.remove();
        expect(graph.vertices.length).to.equal(1);
    });

    it("vertex removal full=true removes edges", function () {
        const graph = new Graph<string, string, string>();
        const v1 = graph.createVertex(graph.root, "v1");
        const v2 = graph.createVertex(graph.root, "v2");
        const v3 = graph.createVertex(graph.root, "v3");
        graph.createEdge(graph.root, v1, v2, "e12");
        graph.createEdge(graph.root, v2, v3, "e23");
        expect(graph.edges.length).to.equal(2);
        graph.removeVertex(v2, true);
        expect(graph.vertices.length).to.equal(2);
        expect(graph.edges.length).to.equal(0);
    });

    it("vertex removal full=false bridges edges", function () {
        const graph = new Graph<string, string, string>();
        const v1 = graph.createVertex(graph.root, "v1");
        const v2 = graph.createVertex(graph.root, "v2");
        const v3 = graph.createVertex(graph.root, "v3");
        graph.createEdge(graph.root, v1, v2, "e12");
        graph.createEdge(graph.root, v2, v3, "e23");
        expect(graph.edges.length).to.equal(2);

        graph.removeVertex(v2, false, (src, tgt) => `${src}->${tgt}`);
        expect(graph.vertices.length).to.equal(2);
        // Original edges removed, new bridging edge created
        expect(graph.edges.length).to.equal(1);
        const bridged = graph.edges[0];
        expect(bridged.source).to.equal(v1);
        expect(bridged.target).to.equal(v3);
        expect(bridged._).to.equal("v1->v3");
    });

    it("vertex removal full=false without callback", function () {
        const graph = new Graph<string, string, string>();
        const v1 = graph.createVertex(graph.root, "v1");
        const v2 = graph.createVertex(graph.root, "v2");
        const v3 = graph.createVertex(graph.root, "v3");
        graph.createEdge(graph.root, v1, v2, "e12");
        graph.createEdge(graph.root, v2, v3, "e23");

        graph.removeVertex(v2, false);
        expect(graph.edges.length).to.equal(1);
        expect(graph.edges[0]._).to.be.undefined;
    });

    it("subgraph removal full=false promotes children", function () {
        const graph = new Graph<string, string, string>();
        const sg1 = graph.createSubgraph(graph.root, "sg1");
        const childSg = graph.createSubgraph(sg1, "child");
        const v1 = graph.createVertex(sg1, "v1");
        const v2 = graph.createVertex(sg1, "v2");
        const e1 = graph.createEdge(sg1, v1, v2, "e1");

        expect(graph.subgraphs.length).to.equal(2);
        expect(sg1.vertices.length).to.equal(2);
        expect(sg1.edges.length).to.equal(1);
        expect(sg1.subgraphs.length).to.equal(1);

        graph.removeSubgraph(sg1, false);
        // sg1 removed from graph, but children promoted to parent (root)
        expect(graph.subgraphs.length).to.equal(1);
        expect(graph.subgraphs[0]).to.equal(childSg);
        expect(graph.root.vertices.length).to.equal(2);
        expect(graph.root.edges.length).to.equal(1);
        expect(graph.root.subgraphs.length).to.equal(1);
    });

    it("removeAllSubgraphs", function () {
        const graph = new Graph<string, string, string>();
        const sg1 = graph.createSubgraph(graph.root, "sg1");
        graph.createSubgraph(graph.root, "sg2");
        graph.createSubgraph(sg1, "sg3");
        expect(graph.subgraphs.length).to.equal(3);
        graph.root.removeAllSubgraphs();
        expect(graph.subgraphs.length).to.equal(0);
        expect(graph.root.subgraphs.length).to.equal(0);
    });

    it("removeAllVertices", function () {
        const graph = new Graph<string, string, string>();
        graph.createVertex(graph.root, "v1");
        graph.createVertex(graph.root, "v2");
        graph.createVertex(graph.root, "v3");
        expect(graph.vertices.length).to.equal(3);
        graph.root.removeAllVertices();
        expect(graph.vertices.length).to.equal(0);
        expect(graph.root.vertices.length).to.equal(0);
    });

    it("subgraph.createVertex and subgraph.createEdge", function () {
        const graph = new Graph<string, string, string>();
        const sg = graph.createSubgraph(graph.root, "sg");
        const v1 = sg.createVertex("v1");
        const v2 = sg.createVertex("v2");
        const e1 = sg.createEdge(v1, v2, "e1");
        expect(sg.vertices.length).to.equal(2);
        expect(sg.edges.length).to.equal(1);
        expect(graph.vertices.length).to.equal(2);
        expect(graph.edges.length).to.equal(1);
        expect(e1.source).to.equal(v1);
        expect(e1.target).to.equal(v2);
    });

    it("Graph.vertex(id) and Graph.edge(id) lookups", function () {
        const graph = new Graph<string, string, string>();
        const v1 = graph.createVertex(graph.root, "v1");
        const v2 = graph.createVertex(graph.root, "v2");
        const e1 = graph.createEdge(graph.root, v1, v2, "e1");

        expect(graph.vertex("v1")).to.equal(v1);
        expect(graph.vertex("v2")).to.equal(v2);
        expect(graph.edge("e1")).to.equal(e1);
        expect(graph.vertex("nonexistent")).to.be.undefined;
        expect(graph.edge("nonexistent")).to.be.undefined;
    });

    it("Graph.subgraph(id) lookup", function () {
        const graph = new Graph<string, string, string>();
        const sg = graph.createSubgraph(graph.root, "sg1");
        expect(graph.subgraph("sg1")).to.equal(sg);
        expect(graph.subgraph("nonexistent")).to.be.undefined;
    });

    it("walk visits all items", function () {
        const graph = new Graph<string, string, string>();
        const sg1 = graph.createSubgraph(graph.root, "sg1");
        const v1 = graph.createVertex(graph.root, "v1");
        const v2 = graph.createVertex(sg1, "v2");
        graph.createEdge(graph.root, v1, v2, "e1");

        const visited: string[] = [];
        graph.walk(item => {
            if (item instanceof Subgraph) visited.push("sg:" + item._);
            else if (item instanceof Vertex) visited.push("v:" + item._);
            else if (item instanceof Edge) visited.push("e:" + item._);
        });

        expect(visited).to.include("sg:sg1");
        expect(visited).to.include("v:v1");
        expect(visited).to.include("v:v2");
        expect(visited).to.include("e:e1");
    });

    it("walk abort stops traversal on vertices", function () {
        const graph = new Graph<string, string, string>();
        graph.createVertex(graph.root, "v1");
        graph.createVertex(graph.root, "v2");
        graph.createVertex(graph.root, "v3");

        const visited: string[] = [];
        graph.walk(item => {
            if (item instanceof Vertex) {
                visited.push(item._!);
                if (item._ === "v2") return "abort";
            }
        });
        expect(visited).to.include("v1");
        expect(visited).to.include("v2");
        expect(visited).to.not.include("v3");
    });

    it("walk stepover skips subgraph children", function () {
        const graph = new Graph<string, string, string>();
        const sg1 = graph.createSubgraph(graph.root, "sg1");
        graph.createVertex(sg1, "v_inner");
        graph.createVertex(graph.root, "v_outer");

        const visited: string[] = [];
        graph.walk(item => {
            if (item instanceof Subgraph) {
                visited.push("sg:" + item._);
                return "stepover";
            }
            if (item instanceof Vertex) visited.push("v:" + item._);
        });

        expect(visited).to.include("sg:sg1");
        expect(visited).to.not.include("v:v_inner");
        expect(visited).to.include("v:v_outer");
    });

    it("walk abort on edge stops traversal", function () {
        const graph = new Graph<string, string, string>();
        const v1 = graph.createVertex(graph.root, "v1");
        const v2 = graph.createVertex(graph.root, "v2");
        graph.createEdge(graph.root, v1, v2, "e1");
        graph.createEdge(graph.root, v2, v1, "e2");

        const visited: string[] = [];
        const result = graph.walk(item => {
            if (item instanceof Edge) {
                visited.push("e:" + item._);
                return "abort";
            }
        });
        expect(result).to.equal(true);
        expect(visited.length).to.equal(1);
    });

    it("walk abort on subgraph stops traversal", function () {
        const graph = new Graph<string, string, string>();
        const sg1 = graph.createSubgraph(graph.root, "sg1");
        graph.createSubgraph(graph.root, "sg2");
        graph.createVertex(sg1, "v1");

        const visited: string[] = [];
        const result = graph.walk(item => {
            if (item instanceof Subgraph) {
                visited.push("sg:" + item._);
                return "abort";
            }
            if (item instanceof Vertex) visited.push("v:" + item._);
        });
        // Should not visit vertices or sg2
        expect(visited).to.deep.equal(["sg:sg1"]);
    });

    it("clone", function () {
        const graph = new Graph<string, string, string>();
        const sg1 = graph.createSubgraph(graph.root, "sg1");
        const v1 = graph.createVertex(graph.root, "v1");
        const v2 = graph.createVertex(sg1, "v2");
        graph.createEdge(graph.root, v1, v2, "e1");

        const cloned = graph.clone();
        expect(cloned.subgraphs.length).to.equal(1);
        expect(cloned.vertices.length).to.equal(2);
        expect(cloned.edges.length).to.equal(1);
        expect(cloned.vertex("v1")).to.not.equal(v1);
        expect(cloned.vertex("v1")._).to.equal("v1");
        expect(cloned.vertex("v2")._).to.equal("v2");
        expect(cloned.edge("e1")._).to.equal("e1");
        expect(cloned.subgraph("sg1")._).to.equal("sg1");
    });

    it("Edge constructor throws on missing source", function () {
        const graph = new Graph<string, string, string>();
        const v1 = graph.createVertex(graph.root, "v1");
        expect(() => new Edge(graph as any, graph.root as any, undefined as any, v1 as any)).to.throw("Missing source vertex");
    });

    it("Edge constructor throws on missing target", function () {
        const graph = new Graph<string, string, string>();
        const v1 = graph.createVertex(graph.root, "v1");
        expect(() => new Edge(graph as any, graph.root as any, v1 as any, undefined as any)).to.throw("Missing target vertex");
    });

    it("Subgraph._add dispatches correctly", function () {
        const graph = new Graph<string, string, string>();
        const sg = graph.createSubgraph(graph.root, "sg");
        const v1 = graph.createVertex(graph.root, "v1");
        const v2 = graph.createVertex(graph.root, "v2");
        const e1 = graph.createEdge(graph.root, v1, v2, "e1");

        const sg2 = graph.createSubgraph(graph.root, "sg2");

        // _add with vertex
        sg._add(v1 as any);
        expect(sg.vertices.length).to.equal(1);

        // _add with edge
        sg._add(e1 as any);
        expect(sg.edges.length).to.equal(1);

        // _add with subgraph
        sg._add(sg2 as any);
        expect(sg.subgraphs.length).to.equal(1);
    });

    it("custom idOf function", function () {
        let counter = 0;
        const graph = new Graph<string, string, string>(() => "id_" + counter++);
        const v1 = graph.createVertex(graph.root, "v1");
        const v2 = graph.createVertex(graph.root, "v2");
        expect(graph.vertex("id_0")).to.equal(v1);
        expect(graph.vertex("id_1")).to.equal(v2);
    });

    it("removeVertex throws for nonexistent vertex", function () {
        const graph = new Graph<string, string, string>();
        const v1 = graph.createVertex(graph.root, "v1");
        graph.removeVertex(v1);
        expect(() => graph.removeVertex(v1)).to.throw("Vertex does not exist");
    });

    it("removeEdge throws for nonexistent edge", function () {
        const graph = new Graph<string, string, string>();
        const v1 = graph.createVertex(graph.root, "v1");
        const v2 = graph.createVertex(graph.root, "v2");
        const e1 = graph.createEdge(graph.root, v1, v2, "e1");
        graph.removeEdge(e1);
        expect(() => graph.removeEdge(e1)).to.throw("Edge does not exist");
    });

    it("removeSubgraph throws for nonexistent subgraph", function () {
        const graph = new Graph<string, string, string>();
        const sg = graph.createSubgraph(graph.root, "sg");
        graph.removeSubgraph(sg);
        expect(() => graph.removeSubgraph(sg)).to.throw("Subgraph does not exist");
    });

    it("constructor with root props", function () {
        const graph = new Graph<string, string, string>(undefined, "root-label");
        expect(graph.root._).to.equal("root-label");
    });

    it("removeSubgraph full=true removes nested content", function () {
        const graph = new Graph<string, string, string>();
        const sg1 = graph.createSubgraph(graph.root, "sg1");
        const v1 = sg1.createVertex("v1");
        sg1.createEdge(v1, v1, "e1");
        expect(graph.vertices.length).to.equal(1);
        expect(graph.edges.length).to.equal(1);

        sg1.remove(true);
        expect(graph.subgraphs.length).to.equal(0);
        expect(graph.vertices.length).to.equal(0);
        expect(graph.edges.length).to.equal(0);
    });
});
