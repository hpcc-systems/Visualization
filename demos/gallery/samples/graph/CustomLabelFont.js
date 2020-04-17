import { Palette } from "@hpcc-js/common";
import { Graph, Vertex, Edge } from "@hpcc-js/graph";

new Graph()
    .target("target")
    .data(createData())
    .layout("Circle")
    .applyScaleOnLayout(true)
    .zoomToFitLimit(1)
    .render()
    ;

function createData() {
    const rawData = {
        nodes: [
            { "name": "3D Rotation", "icon": "" },
            { "name": "Padlock Planet", "icon": "" },
            { "name": "Grill", "icon": "outdoor_grill", "centroid": true }
        ],
        links: [
            { "source": 2, "target": 0 },
            { "source": 2, "target": 1 }
        ]
    };
    var data = {};
    data.vertices = rawData.nodes.map(function(node,i) {
        return new Vertex()
            .centroid(node.centroid)
            .icon_diameter(40)
            .icon_fontFamily("'Material Icons'")
            .textbox_text_fontFamily("monospace")
            .iconAnchor("left")
            .faChar(node.icon)
            .text(node.name)
    });
    data.edges = rawData.links.map(function(link){
        return new Edge()
            .sourceVertex(data.vertices[link.source])
            .targetVertex(data.vertices[link.target])
            .weight(link.value)
    })
    return data;
}

