import { Graph2 } from "@hpcc-js/graph";

const vertices = [
    {id:0, text:"A"},
    {id:1, text:"B"},
    {id:2, text:"C"},
];
const edges = [
    {id:0, source:vertices[0], target:vertices[1]},
    {id:1, source:vertices[1], target:vertices[2]},
];
new Graph2()
    .data({vertices, edges})
    .target("target")
    .layout("ForceDirected2")
    .applyScaleOnLayout(true)
    .allowDragging(false)
    .render()
    ;
