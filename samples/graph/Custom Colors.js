import { Edge, Graph, Subgraph, Vertex } from "@hpcc-js/graph";

new Graph()
    .target("target")
    .data(createData())
    .layout("Hierarchy")
    .applyScaleOnLayout(true)
    .allowDragging(false)
    .render()
    ;

function createData() {
    var subgraphs = [];
    var vertices = [];
    var edges = [];
    const rawData = {
        "subgraphs": [
            { "name": "Does", "strokeColor": "red", "fillColor": "whitesmoke" },
            { "name": "Addresses", "strokeColor": "darkred", "fillColor": "maroon" }
        ],
        "nodes": [
            { "name": "John Doe", "icon": "", "strokeColor": "red", "fillColor": "cyan" },
            { "name": "Jane Doe", "icon": "", "strokeColor": "navy", "fillColor": "whitesmoke" },
            { "name": "123 Main Street", "icon": "", "strokeColor": "darkgreen", "fillColor": "green" }
        ],
        "links": [
            { "source": 2, "target": 0, "name": "Owns", "color": "red" },
            { "source": 2, "target": 1, "name": "Rents", "color": "darkgreen" }
        ]
    };

    rawData.subgraphs.forEach(function (node, idx) {
        subgraphs.push(new Subgraph()
            .border_colorStroke(node.strokeColor)
            .border_colorFill(node.fillColor)
            .title(node.name)
        );
    });

    rawData.nodes.forEach(function (node, idx) {
        vertices.push(new Vertex()
            .icon_shape_colorFill(node.fillColor)
            .icon_shape_colorStroke(node.strokeColor)
            .textbox_shape_colorFill(node.fillColor)
            .textbox_shape_colorStroke(node.strokeColor)
            .faChar(node.icon)
            .text(node.name)
        );
    });

    rawData.links.forEach(function (link, idx) {
        edges.push(new Edge()
            .sourceVertex(vertices[link.source])
            .targetVertex(vertices[link.target])
            .strokeColor(link.color)
            .text_text_colorFill(link.color)
            .text(link.name)
        );
    });

    var hierarchy = [];
    hierarchy.push({ parent: subgraphs[0], child: vertices[0] });
    hierarchy.push({ parent: subgraphs[0], child: vertices[1] });
    hierarchy.push({ parent: subgraphs[1], child: vertices[2] });

    return { subgraphs: subgraphs, vertices: vertices, edges: edges, hierarchy: hierarchy };
}
