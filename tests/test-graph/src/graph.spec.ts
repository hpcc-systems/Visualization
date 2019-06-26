import { Class, HTMLWidget, Palette, SVGWidget } from "@hpcc-js/common";
import * as graph from "@hpcc-js/graph";
// tslint:disable-next-line:no-duplicate-imports
import { AdjacencyGraph, Edge, Graph, Sankey, SankeyColumn, Subgraph, Vertex } from "@hpcc-js/graph";
import { expect } from "chai";
import { classDef, dataBreach, render } from "../../test-data/src/index";

const urlSearch: string = window.location.href.split("?")[1];
const data = {
    simple: {
        nodes: [
            { name: "John Doe", icon: "" },
            { name: "Jane Doe", icon: "" },
            { name: "123 Main Street", icon: "" }
        ],
        links: [
            { source: 1, target: 0 },
            { source: 2, target: 0 }
        ]
    }
};

describe("@hpcc-js/graph", () => {
    for (const key in graph) {
        const item = (graph as any)[key];
        if (item && item.prototype && item.prototype.constructor) {
            if (!urlSearch || urlSearch === item.prototype.constructor.name) {
                describe(`${item.prototype.constructor.name}`, () => {
                    if (item.prototype instanceof Class) {
                        classDef("graph", item);
                    }
                    if (item.prototype instanceof HTMLWidget || item.prototype instanceof SVGWidget) {
                        switch (item.prototype.constructor) {
                            case Edge:
                                const graph = new Graph();
                                const vertices: any[] = [];
                                const edges: any[] = [];
                                const palette = Palette.ordinal("dark2");

                                const rawData = data.simple;
                                rawData.nodes.forEach(function (node) {
                                    vertices.push(
                                        new Vertex()
                                            .text(node.name)
                                            .textbox_shape_colorStroke(palette(node.icon))
                                            .textbox_shape_colorFill("whitesmoke")
                                            .icon_diameter(60)
                                            .icon_shape_colorStroke("transparent")
                                            .icon_shape_colorFill("transparent")
                                            .icon_image_colorFill("#333333")
                                            .textbox_shape_colorStroke("transparent")
                                            .textbox_shape_colorFill("transparent")
                                            .textbox_text_colorFill("#333333")
                                            .iconAnchor("middle")
                                            .faChar(node.icon)
                                    )
                                        ;
                                }, graph);

                                rawData.links.forEach(function (link, idx) {
                                    edges.push(
                                        new Edge()
                                            .sourceVertex(vertices[link.source])
                                            .targetVertex(vertices[link.target])
                                            .sourceMarker("circle")
                                            .targetMarker("arrow")
                                            .text("Hello!")
                                            .strokeDasharray(idx === 0 ? "15, 10, 5, 10, 15" : "")
                                            .strokeColor(idx === 0 ? "cyan" : "")
                                            .weight(50)
                                    )
                                        ;
                                }, graph);

                                graph.data({ vertices, edges });
                                render(graph);
                                break;
                            case AdjacencyGraph:
                                render(new AdjacencyGraph()
                                    .columns(["uid", "label", "links"])
                                    .data([
                                        [1, "AdjacencyGraph 1", [[2], [3], [4]]],
                                        [2, "AdjacencyGraph 2", []],
                                        [3, "AdjacencyGraph 3", []],
                                        [4, "AdjacencyGraph 4", []]
                                    ] as any)
                                );
                                break;
                            case Graph:
                                const graph2 = new Graph();
                                const vertices2: any[] = [];
                                const edges2: any[] = [];
                                const palette2 = Palette.ordinal("dark2");

                                const rawData2 = data.simple;
                                rawData2.nodes.forEach(function (node) {
                                    vertices2.push(
                                        new Vertex()
                                            .text(node.name)
                                            .textbox_shape_colorStroke(palette2(node.icon))
                                            .textbox_shape_colorFill("whitesmoke")
                                            .icon_diameter(30)
                                            .icon_shape_colorStroke(palette2(node.icon))
                                            .icon_shape_colorFill(palette2(node.icon))
                                            .faChar(node.icon)
                                    );
                                }, graph2);

                                rawData2.links.forEach(function (link, idx) {
                                    edges2.push(
                                        new Edge()
                                            .sourceVertex(vertices2[link.source])
                                            .targetVertex(vertices2[link.target])
                                            .sourceMarker("circle")
                                            .targetMarker("arrow")
                                            .text("")
                                            .weight(50)
                                    );
                                }, graph2);

                                graph2.data({ vertices: vertices2, edges: edges2 });
                                render(graph2);
                                break;
                            case Sankey:
                                render(new Sankey()
                                    .columns(dataBreach.columns)
                                    .data(dataBreach.data)
                                    .mappings([new SankeyColumn().column("Covered Entity Type"), new SankeyColumn().column("Type of Breach")])
                                );
                                break;
                            case Subgraph:
                                render(new Subgraph()
                                    .title("Hello and Welcome!")
                                );
                                break;
                            case Vertex:
                                render(new Vertex()
                                    .faChar("\uf007")
                                    .text("Hello and Welcome!")
                                    .annotationIcons([
                                        { faChar: "\uf188", tooltip: "Test A", shape_colorFill: "white", image_colorFill: "red" },
                                        { faChar: "\uf0ad", tooltip: "Test B", shape_colorFill: "green", shape_colorStroke: "green", image_colorFill: "white" },
                                        { faChar: "\uf193", tooltip: "Test C", shape_colorFill: "navy", shape_colorStroke: "navy", image_colorFill: "white" }
                                    ])
                                );
                                break;
                            default:
                                it("Has render test", () => {
                                    expect(false).to.be.true;
                                });
                        }
                    }
                });
            }
        }
    }
});
