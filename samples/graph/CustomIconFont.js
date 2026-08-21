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
    var palette = Palette.ordinal("dark2");
    const rawData = {
        nodes: [
            { "name": "A", "icon": "3d_rotation", "iconFontFamily": "'Material Icons'" },
            { "name": "B", "icon": "", "iconFontFamily": "captainicon" },
            { "name": "C", "icon": "", "iconFontFamily": "'Font Awesome 5 Free'", "centroid": true }
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
            .icon_fontFamily(node.iconFontFamily)
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
