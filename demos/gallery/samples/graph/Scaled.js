import { Palette } from "@hpcc-js/common";
import { Graph, Vertex, Edge } from "@hpcc-js/graph";

new Graph()
    .target("target")
    .data(createData())
    .layout("Hierarchy")
    .applyScaleOnLayout(true)
    .zoomToFitLimit(1)
    .render()
    ;

function createData() {
    var palette = Palette.ordinal("dark2");
    const rawData = {
        nodes: [
            { "name": "John Doe II", "icon": "" },
            { "name": "Jane Doe", "icon": "" },
            { "name": "123 Main Street", "icon": "", "centroid": true }
        ],
        links: [
            { "source": 2, "target": 0 },
            { "source": 2, "target": 1 }
        ]
    };
    var data = {};
    data.vertices = rawData.nodes.map(function(node,i){
        return new Vertex()
            .centroid(node.centroid)
            .icon_diameter(40)
            .iconAnchor("left")
            .faChar(node.icon)
            .text(node.name)
            .scale(i+1)
    });
    data.edges = rawData.links.map(function(link){
        return new Edge()
            .sourceVertex(data.vertices[link.source])
            .targetVertex(data.vertices[link.target])
            .weight(link.value)
    })
    return data;
}
