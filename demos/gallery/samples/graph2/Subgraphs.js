import { Graph2 } from "@hpcc-js/graph";

const categories = [
    {id:0,imageChar:"fa-user"},
    {id:1,imageChar:"fa-home"}
];

new Graph2()
    .categories(categories)
    .data(createData())
    .target("target")
    .layout("Hierarchy")
    .applyScaleOnLayout(true)
    .allowDragging(false)
    .render()
    ;

function createData() {
    const rawData = {
        "subgraphs": [
            { "name": "Does" },
            { "name": "Addresses" }
        ],
        "nodes": [
            { "name": "John Doe", "type": "person" },
            { "name": "Jane Doe", "type": "person" },
            { "name": "123 Main Street", "type": "property" }
        ],
        "links": [
            { "source": 2, "target": 0, "name": "Owns" },
            { "source": 2, "target": 1, "name": "Rents" }
        ]
    };
    const typeCategories = {
        "person": categories[0],
        "property": categories[1]
    };
    const subgraphs = rawData.subgraphs.map(function (node, idx) {
        return {
            id: idx + 1000,
            text: node.name,
            fontFamily: "monospace"
        };
    });
    const vertices = rawData.nodes.map(function (node, idx) {
        return {
            id: idx,
            text: node.name,
            textFontFamily: "monospace",
            categoryID: typeCategories[node.type].id
        };
    });
    return {
        vertices: vertices,
        subgraphs: subgraphs,
        hierarchy: [
            {parent:subgraphs[0],child:vertices[0]},
            {parent:subgraphs[0],child:vertices[1]},
            {parent:subgraphs[1],child:vertices[2]},
        ],
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
