import * as Palette from "../src/common/Palette";
import { Edge } from "../src/graph/Edge";
import { Graph } from "../src/graph/Graph";
import { Vertex } from "../src/graph/Vertex";
import { Graph as GraphData } from "./data";

const graph = new Graph()
    .target("placeholder")
    .layout("hierarchy")
    ;
const vertices = [];
const edges = [];
const palette = Palette.ordinal("dark2");

const rawData = GraphData.simple;
rawData.nodes.forEach(function (node: any) {
    vertices.push(
        new Vertex()
            .text(node.name)
            .textbox_shape_colorStroke(palette(node.group))
            .textbox_shape_colorFill("whitesmoke")
            .icon_shape_diameter(30)
            .icon_shape_colorStroke(palette(node.group))
            .icon_shape_colorFill(palette(node.group))
            .faChar(node.icon)
    )
        ;
}, graph);

rawData.links.forEach(function (link: any, idx: number) {
    edges.push(
        new Edge()
            .sourceVertex(vertices[link.source])
            .targetVertex(vertices[link.target])
            .sourceMarker("circle")
            .targetMarker("arrow")
            .text("")
            .weight(link.value)
    )
        ;
}, graph);

graph
    .data({ vertices, edges })
    .render()
    ;
