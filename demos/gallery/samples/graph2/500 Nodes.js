import { Graph2 } from "@hpcc-js/graph";

const nodeCount = 500;

const categories = [
    {id:0,imageChar:"fa-user"},
    {id:1,imageChar:"fa-home"}
];

new Graph2()
    .categories(categories)
    .data(createData())
    .target("target")
    .layout("ForceDirected")
    .applyScaleOnLayout(true)
    .allowDragging(false)
    .render()
    ;

function createData() {
    const rawData = {
        "nodes": Array.from({length:nodeCount},(_,i)=>{
            return { "name": i + 1, "type": "number" }
        }),
        "links": Array.from({length:nodeCount},(_,i)=>{
            return { "source": Math.floor(Math.sqrt(i)), "target": i };
        }).slice(1)
    };
    const vertices = rawData.nodes.map(function (node, idx) {
        return {
            categoryID: 0,
            id: idx,
            text: ""+node.name,
            textFontFamily: "monospace"
        };
    });
    return {
        vertices: vertices,
        edges: rawData.links.map(function (link, idx) {
            return {
                id: idx,
                source: vertices[link.source],
                target: vertices[link.target],
                label: link.name,
                fontFamily: "monospace"
            };
        }),
    };
}
