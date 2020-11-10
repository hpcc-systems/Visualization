import { expect } from "chai";

import { Graph2 } from "@hpcc-js/util";

interface MyVertex {
    id: string;
}

interface MyEdge {
    id: string;
    from: string;
    to: string;
}

interface MySubgraph {
    id: string;
}

describe("Graph2", function () {
    it("basic", function () {
        const graph = new Graph2<MyVertex, MyEdge, MySubgraph>();
        graph.idFunc(_ => _.id);
        graph.sourceFunc(_ => _.from);
        graph.targetFunc(_ => _.to);
        const data = genData();
        data.vertices.forEach(v => graph.addVertex(v));
        data.edges.forEach(e => graph.addEdge(e));
        expect(graph.vertices()).to.deep.equal(data.vertices);
        expect(graph.edges()).to.deep.equal(data.edges);

        const data2 = genData();
        data2.vertices.forEach(v => graph.addVertex(v));
        data2.edges.forEach(e => graph.addEdge(e));
        expect(graph.vertices()).to.deep.equal([...data.vertices, ...data2.vertices]);
        expect(graph.edges()).to.deep.equal([...data.edges, ...data2.edges]);

        graph.mergeVertices(data.vertices);
        expect(graph.vertices()).to.deep.equal(data.vertices);
        expect(graph.edges()).to.deep.equal(data.edges);
        graph.mergeEdges(data.edges);
        expect(graph.edges()).to.deep.equal(data.edges);

        graph.mergeVertices(data2.vertices);
        expect(graph.vertices()).to.deep.equal(data2.vertices);

        graph.mergeVertices([]);
        expect(graph.vertices().length).to.equal(0);
    });
});

let v_id = 0;
function createVetex(): MyVertex {
    return {
        id: "id_" + v_id++
    };
}

function genData(vTotal = 70, eTotal = vTotal * 2) {
    const vertices: MyVertex[] = [];
    for (let i = 0; i < vTotal; ++i) {
        vertices.push(createVetex());
    }
    const edges: MyEdge[] = [];
    const dedupEdges: { [id: string]: boolean } = {};
    for (let i = 0; i < eTotal; ++i) {
        const v1 = vertices[Math.round((random() * 10))];
        const v2 = vertices[Math.round((random() * 10))];
        if (v1 && v2 && v1 !== v2) {
            const eID = `${v1.id}->${v2.id}`;
            if (dedupEdges[eID] !== true) {
                dedupEdges[eID] = true;
                edges.push({
                    id: eID,
                    from: v1.id,
                    to: v2.id
                });
            }
        }
    }
    return {
        vertices,
        edges
    };
}

let m_w = 123456789;
let m_z = 987654321;
const mask = 0xffffffff;

function random() {
    m_z = (36969 * (m_z & 65535) + (m_z >> 16)) & mask;
    m_w = (18000 * (m_w & 65535) + (m_w >> 16)) & mask;
    let result = ((m_z << 16) + (m_w & 65535)) >>> 0;
    result /= 4294967296;
    return result;
}

