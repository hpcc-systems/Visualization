import { expect } from "chai";

import { Graph } from "@hpcc-js/util";

describe("Graph", function () {
    it("subgraph hierarchy", function () {
        const graph = new Graph("graph1");
        const sg1 = graph.createSubgraph(graph, "sg1");
        expect(graph.allSubgraphs().length).to.equal(1);
        expect(graph.allVertices().length).to.equal(0);
        expect(graph.allEdges().length).to.equal(0);
        let sg2 = graph.createSubgraph(sg1, "sg2");
        expect(sg1.className()).to.equal("Subgraph");
        expect(sg1.id()).to.equal("sg1");
        let sg3 = graph.createSubgraph(sg2, "sg3");
        expect(graph.allSubgraphs().length).to.equal(3);
        expect(graph.subgraphs().length).to.equal(1);
        expect(sg1.subgraphs().length).to.equal(1);
        expect(sg2.subgraphs().length).to.equal(1);
        expect(sg3.subgraphs().length).to.equal(0);
        sg2.remove();
        expect(graph.allSubgraphs().length).to.equal(1);
        sg2 = graph.createSubgraph(sg1, "sg2");
        sg3 = graph.createSubgraph(sg2, "sg3");
        expect(graph.allSubgraphs().length).to.equal(3);
        sg3.remove();
        expect(graph.allSubgraphs().length).to.equal(2);
        expect(sg2.subgraphs().length).to.equal(0);
        sg2.remove();
        expect(graph.allSubgraphs().length).to.equal(1);
        expect(sg1.subgraphs().length).to.equal(0);
        sg1.remove();
        expect(graph.allSubgraphs().length).to.equal(0);
        expect(graph.subgraphs().length).to.equal(0);
    });
});
