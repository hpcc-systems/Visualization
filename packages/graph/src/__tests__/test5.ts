import { Vertex4, CentroidVertex4 } from "@hpcc-js/react";
import { Graph2 } from "../graph2/graph";

const VERTEX_ARR = [{
    id: 0,
    centroid: true,
    text: "Vertex One",
    iconFontFamily: "'Font Awesome 5 Free'",
}, {
    id: 1,
    centroid: false,
    text: "Vertex Two",

}, {
    id: 2,
    centroid: false,
    text: "Vertex Three",
}];

const EDGE_ARR = [{
    id: 0,
    source: VERTEX_ARR[0],
    target: VERTEX_ARR[1]
}, {
    id: 1,
    source: VERTEX_ARR[0],
    target: VERTEX_ARR[2]
}];

const VERTEX_ARR_UPDATED = [{
    id: 0,
    text: "Vertex One",
    iconFontFamily: "'Font Awesome 5 Free'",
}, {
    centroid: true,
    id: 1,
    text: "Vertex Two",

}, {
    id: 2,
    centroid: false,
    text: "Vertex Three",
}];

const EDGE_ARR_UPDATE = [{
    id: 0,
    source: VERTEX_ARR_UPDATED[1],
    target: VERTEX_ARR_UPDATED[2]
}];

export class Test5 extends Graph2 {

    constructor() {
        super();
        this
            .minScale(0.1)
            .layout("ForceDirected")
            .centroidRenderer(CentroidVertex4)
            .vertexRenderer(Vertex4)
            .data({
                vertices: VERTEX_ARR,
                edges: EDGE_ARR
            })
            .transitionDuration(200)
            .forceDirectedIterations(800)
            .forceDirectedLinkDistance(100)
            .forceDirectedAlphaDecay(0.014)
            .applyScaleOnLayout(true)
            .centroidColor("#ffffff")
            .edgeStrokeWidth(2)
            .edgeColor("#227AC2")
            .minScale(0.1)
            .edgeArcDepth(0)
            .layout("ForceDirected")
            .on("vertex_click", (vertex, col, sel, anno) => {
                this
                    .data({ vertices: VERTEX_ARR_UPDATED, edges: EDGE_ARR_UPDATE })
                    .lazyRender();
            })
            ;
    }
}