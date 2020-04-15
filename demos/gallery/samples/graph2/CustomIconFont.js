import { Graph2 } from "@hpcc-js/graph";

const data = {};
data.vertices = [
    {id: 0,text: "A",categoryID: 0,textFontFamily: "monospace"},
    {id: 1,text: "B",categoryID: 1,textFontFamily: "monospace"},
    {id: 2,text: "C",categoryID: 2,textFontFamily: "monospace"},
];
data.edges = [
    {id: 0,source: data.vertices[2],target: data.vertices[0]},
    {id: 1,source: data.vertices[2],target: data.vertices[1]}
];
new Graph2()
    .categories([
        {
            id: 0,
            imageChar: "3d_rotation",
            imageCharFill: "#2ecc71",
            imageFontFamily: "'Material Icons'"
        },
        {
            id: 1,
            imageChar: "",
            imageCharFill: "#34495e",
            imageFontFamily: "captainicon"
        },
        {
            id: 2,
            imageChar: "",
            imageCharFill: "#e74c3c",
            imageFontFamily: "'Font Awesome 5 Free'"
        }
    ])
    .data(data)
    .target("target")
    .layout("Circle")
    .applyScaleOnLayout(true)
    .render()
    ;
