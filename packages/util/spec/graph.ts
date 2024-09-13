import { expect } from "chai";

import { Graph } from "@hpcc-js/util";

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
});
