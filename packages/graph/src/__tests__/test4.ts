import { Vertex4, CentroidVertex4 } from "@hpcc-js/react";
import { Test2 } from "./test2";

export class Test4 extends Test2 {
    constructor() {
        super();
        this
            .vertexRenderer(Vertex4)
            .centroidRenderer(CentroidVertex4)
            ;
    }
}

// 8
let seed = 8;
function random() {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}
function rand() {
    return Math.round(random() * 32767);
}

function make_pair<T>(a: T, b: T): [T, T] {
    return [a, b];
}

// @ts-ignore
function genData(MAX_VERTICES = 200, MAX_EDGES = 200) {
    const edges: [number, number][] = [];
    function edges_has(p: [number, number]): boolean {
        return edges.some(row => row[0] === p[0] && row[1] === p[1]);
    }

    const NUM = 1 + rand() % MAX_VERTICES;
    let NUMEDGE = 1 + rand() % MAX_EDGES;

    while (NUMEDGE > NUM * (NUM - 1) / 2) {
        NUMEDGE = 1 + rand() % MAX_EDGES;
    }

    for (let j = 1; j <= NUMEDGE; j++) {
        let a = 1 + rand() % NUM;
        let b = 1 + rand() % NUM;
        let p = make_pair(a, b);

        while (edges_has(p) || a == b) {
            a = 1 + rand() % NUM;
            b = 1 + rand() % NUM;
            p = make_pair(a, b);
        }
        edges.push(p);
    }

    const vertices: { [id: number]: boolean } = {};
    for (const it of edges) {
        vertices[it[0]] = true;
        vertices[it[1]] = true;
    }

    const icons = ["fa-at", "fa-user-o", "fa-address-card-o", "fa-globe", "fa-phone"];
    return {
        vertices: Object.keys(vertices).map(v => [v, `Node-${v}`, icons[Math.floor(Math.random() * icons.length)]]),
        edges: edges.map(e => [e[0], e[1], "", 1])
    };
}
