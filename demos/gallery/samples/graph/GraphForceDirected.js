import { Palette } from "@hpcc-js/common";
import { ForceDirected as Graph, Vertex, Edge } from "@hpcc-js/graph";

new Graph()
    .target("target")
    .data(createData())
    .render()
    ;

function createData() {
    var vertices = [];
    var edges = [];
    const rawData = {
        nodes: [
            { "name": "John Doe", "icon": "" },
            { "name": "Jane Doe", "icon": "" },
            { "name": "123 Main Street", "icon": "", "centroid": true }
        ],
        "links": [
            { "source": 2, "target": 0 },
            { "source": 2, "target": 1 }
        ]
    };
    rawData.nodes.forEach(function (node, idx) {
        vertices.push(new Vertex()
            .centroid(node.centroid)
            .icon_diameter(60)
            .icon_shape_colorStroke("transparent")
            .icon_shape_colorFill("transparent")
            .icon_image_colorFill("#333333")
            .iconAnchor("middle")
            .faChar(node.icon)
            .textbox_shape_colorStroke("transparent")
            .textbox_shape_colorFill("white")
            .textbox_text_colorFill("#333333")
            .text(node.name)
        );
    });

    rawData.links.forEach(function (link, idx) {
        edges.push(new Edge()
            .sourceVertex(vertices[link.source])
            .targetVertex(vertices[link.target])
            .sourceMarker("circle")
            .targetMarker("arrow")
            .text("")
            .weight(link.value)
        );
    });

    return { vertices: vertices, edges: edges };
}
