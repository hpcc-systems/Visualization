import { Graph2 } from "@hpcc-js/graph";
import { Vertex4, CentroidVertex4 } from "@hpcc-js/react";

const VERTEX_ARR = [{
    id: 0,
    centroid: true,
    text: "Vertex One",
    iconText: "",
    iconBackgroundColor: "#ED1C24",
    iconFontColor: "#ffffff",
    iconFontSize: 70,
    iconPadding: 26,
    iconFontFamily: "'Font Awesome 5 Free'",
    shapeOffsetY: -55,
    iconOffsetY: 1,
    annotations: [{
        fill: "#555555",
        stroke: "#555555",
        textFill: "#ffffff",
        imageChar: "12",
        height: 16,
        imageFontFamily: "Arial",
        padding: 6,
        xOffset: -1,
        yOffset: 1
    }],
},
{
    id: 1,
    centroid: false,
    text: "Vertex Two",
    iconText: "",
    iconBackgroundColor: "#00802b",
    iconFontColor: "#ffffff",
    iconFontSize: 50,
    iconFontFamily: "'Font Awesome 5 Free'",
    iconPadding: 18,
    shapeOffsetY: -45,
    iconOffsetY: 0,
    annotations: [{
        fill: "#555555",
        stroke: "#555555",
        textFill: "#ffffff",
        imageChar: "12",
        height: 16,
        imageFontFamily: "Arial",
        padding: 6,
        xOffset: -1,
        yOffset: 1
    }],
    iconAnnotations: [{
        fill: "#f8f8f8",
        stroke: "#dddddd",
        strokeWidth: 1,
        textFill: "#2b2f32",
        imageChar: "+",
        height: 20,
        imageFontFamily: "Arial",
        padding: 2,
        shapeOffsetX: 24,
        shapeOffsetY: -24,
        yOffset: 1,
        shape: "circle"
    }],
},
{
    id: 2,
    centroid: false,
    text: "Vertex Three",
    iconText: "",
    iconBackgroundColor: "#ffcc33",
    iconFontColor: "#ffffff",
    iconFontSize: 60,
    iconFontFamily: "'Font Awesome 5 Free'",
    iconPadding: 24,
    shapeOffsetY: -45,
    iconOffsetY: 2,
    annotations: [{
        fill: "#555555",
        stroke: "#555555",
        textFill: "#ffffff",
        imageChar: "12",
        height: 16,
        imageFontFamily: "Arial",
        padding: 6,
        xOffset: -1,
        yOffset: 1
    }],
    iconAnnotations: [{
        fill: "#f8f8f8",
        stroke: "#dddddd",
        strokeWidth: 1,
        textFill: "#2b2f32",
        imageChar: "+",
        height: 20,
        imageFontFamily: "Arial",
        padding: 2,
        shapeOffsetX: 24,
        shapeOffsetY: -24,
        yOffset: 1,
        shape: "circle"
    }],
},
];

const EDGE_ARR = [{
        id: 0,
        source: VERTEX_ARR[0],
        target: VERTEX_ARR[1]
    },
    {
        id: 1,
        source: VERTEX_ARR[0],
        target: VERTEX_ARR[2]
    }
];

new Graph2()
    .wasmFolder("/")
    .minScale(0.1)
    .layout("ForceDirected")
    .centroidRenderer(CentroidVertex4)
    .vertexRenderer(Vertex4)
    .target("target")
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
    .edgeArcDepth(0)
    .edgeStrokeWidth(2)
    .edgeColor("#227AC2")
    .on("vertex_click", (row, col, sel, meta) => {
        console.log("row, col, sel, meta === ", row, col, sel, meta);
        console.log("meta === ", meta);
        if (meta.imageChar === "+") {
            // expand data
        }
    })
    .on("vertex_dblclick", (row, col, sel, meta) => {
        console.log("dblclick", row, col, sel, meta);
    })
    .render();
