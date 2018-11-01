import { Edge, Graph, Vertex } from "@hpcc-js/graph";
import { Layered } from "@hpcc-js/layout";
import { Slider } from "@hpcc-js/form";

var rawData = {
    nodes: [
        { "name": "John Doe", "icon": "" },
        { "name": "Jane Doe", "icon": "" },
        { "name": "123 Main Street", "icon": "" },
    ],
    "links": [
        { "source": 1, "target": 0 },
        { "source": 2, "target": 0 },
    ]
};
var graphData = { vertices: [], edges: [] };

rawData.nodes.forEach(function (node, idx) {
    let dateStr = `${Math.floor(Math.random() * 27) + 1991}-01-01`;
    graphData.vertices.push(new Vertex().text(node.name + ` (${dateStr})`).faChar(node.icon));
    graphData.vertices[idx].date = new Date(dateStr).getTime();
}, graph);
rawData.links.forEach(function (link) {
    graphData.edges.push(new Edge().sourceVertex(graphData.vertices[link.source]).targetVertex(graphData.vertices[link.target]).weight(link.value));
}, graph);

var graph = new Graph().data(graphData);
let slider = new Slider()
    .allowRange(true)
    .timePattern("%Y-%m-%d")
    .tickDateFormat("%b,%Y")
    .lowDatetime("1990-07-03")
    .highDatetime("2018-05-24")
    .step(1)
    .columns(["Date/Time"])
    .data([
        ["1990-07-03", "2018-05-24"]
    ]);
slider.change = function (s) {
    graph.data().vertices.forEach(function (vertex) {
        vertex.visible(s.data()[0][0] <= vertex.date && vertex.date <= s.data()[0][1]);
    })
}
new Layered()
    .target("target")
    .addLayer(graph)
    .addLayer(slider, "bottom", 1, 0.1)
    .render()
    ;