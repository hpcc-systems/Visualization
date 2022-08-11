import { Graph2 } from "@hpcc-js/graph";
import { Vertex4, CentroidVertex4 } from "@hpcc-js/react";

const VERTEX_ARR = [{
        id: 0,
        categoryID: "main_person",
        centroid: true,
        text: "Gonzales, Jose",
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
        categoryID: "vehicle",
        text: "FL-234-2303-3",
        iconText: "",
        textFill: "#2b2f32",
        iconFontColor: "#6b6b6b",
        iconBorderColor: "#dddddd",
        iconBackgroundColor: "#f8f8f8",
        iconFontSize: 40,
        iconFontFamily: "'Font Awesome 5 Free'",
        iconPadding: 24,
        shapeOffsetY: -35,
        iconOffsetY: 2,
        textPadding: 2,
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
            fill: "#333333",
            stroke: "#333333",
            strokeWidth: 1,
            textFill: "#ffffff",
            imageChar: "+",
            height: 20,
            imageFontFamily: "Arial",
            padding: 2,
            shapeOffsetX: 14,
            shapeOffsetY: -20,
            yOffset: 1,
            shape: "circle"
        }],
    },
    {
        id: 2,
        categoryID: "email",
        text: "J.Mckee2@mail.com",
        iconText: "",
        textFill: "#2b2f32",
        iconFontColor: "#6b6b6b",
        iconBorderColor: "#dddddd",
        iconBackgroundColor: "#f8f8f8",
        iconFontSize: 40,
        iconFontFamily: "'Font Awesome 5 Free'",
        iconPadding: 24,
        shapeOffsetY: -35,
        iconOffsetY: 2,
        textPadding: 2,
        annotations: [{
                fill: "#555555",
                stroke: "#555555",
                textFill: "#ffffff",
                imageChar: "12345",
                height: 16,
                imageFontFamily: "Arial",
                padding: 6,
                xOffset: -1,
                yOffset: 1
            },
            {
                fill: "#555555",
                stroke: "#555555",
                textFill: "#ffffff",
                imageChar: "43",
                height: 16,
                imageFontFamily: "Arial",
                padding: 6,
                xOffset: -1,
                yOffset: 1
            },
            {
                fill: "#555555",
                stroke: "#555555",
                textFill: "#ffffff",
                imageChar: "41",
                height: 16,
                imageFontFamily: "Arial",
                padding: 6,
                xOffset: -1,
                yOffset: 1
            }
        ],
        iconAnnotations: [{
            fill: "#f8f8f8",
            stroke: "#dddddd",
            strokeWidth: 1,
            textFill: "#2b2f32",
            imageChar: "+",
            height: 20,
            imageFontFamily: "Arial",
            padding: 2,
            shapeOffsetX: 14,
            shapeOffsetY: -20,
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
