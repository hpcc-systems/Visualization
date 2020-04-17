import { Graph2 } from "@hpcc-js/graph";

const data = {
    vertices: [
        {id: 0,text: "A",categoryID: 0},
        {id: 1,text: "B",categoryID: 0},
        {id: 2,text: "C",categoryID: 1},
    ]
};
data.edges = [
    {id: 0,source: data.vertices[2],target: data.vertices[0]},
    {id: 1,source: data.vertices[2],target: data.vertices[1]}
];
new Graph2()
    .categories([
        {id:0,imageChar:"fa-user"},
        {id:1,imageChar:"fa-asterisk"}
    ])
    .data(data)
    .target("target")
    .layout("ForceDirected")
    .applyScaleOnLayout(true)
    .render()
    ;
