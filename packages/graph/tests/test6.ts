import { GraphHtml, VertexProps } from "../src/index.ts";

const VERTEX_ARR: VertexProps[] = [{
    id: 0,
    centroid: true,
    text: "Vertex One",
    icon: {
        imageChar: "fa-home",
        height: 48,
        fill: "#ED1C24",
    },
    textBoxAnnotationsE: [{
        text: "fa-star",
        fill: "red",
        stroke: "darkred"
    }]
},
{
    id: 1,
    centroid: false,
    text: "Vertex\nTwo\nthree\nfourteen Yeah",
    icon: {
        imageChar: "fa-car",
        height: 48,
        fill: "#00802b",
    },
    textBoxAnnotationsS: [{
        text: "fa-star",
        fill: "red",
        stroke: "darkred"
    }, {
        text: "fa-user",
        fill: "blue",
        stroke: "darkblue"
    }, {
        text: "fa-car",
        fill: "green",
        stroke: "darkgreen"
    }]
},
{
    id: 2,
    centroid: false,
    text: "Vertex yyggyy Three",
    icon: {
        imageChar: "fa-user",
        height: 48,
        fill: "#ffcc33",
    },
    iconAnnotations: [{
        text: "fa-plus",
        fill: "whitesmoke",
        stroke: "darkgray"
    }]
}];

const EDGE_ARR = [{
    id: 0,
    source: VERTEX_ARR[0],
    target: VERTEX_ARR[1],
},
{
    id: 1,
    source: VERTEX_ARR[0],
    target: VERTEX_ARR[2]
}
];

export class Test6 extends GraphHtml {

    constructor() {
        super();
        this
            .data({
                vertices: VERTEX_ARR,
                edges: EDGE_ARR
            })
            .layout("ForceDirected")
            .applyScaleOnLayout(true)
            .allowDragging(true)
            .on("vertex_click", (row, col, sel, data) => {
                console.log("vertex_click", row, col, sel);
            })
            .on("vertex_contextmenu", (row, col, sel, data) => console.log("vertex_contextmenu", row, col, sel))
            ;
    }
}