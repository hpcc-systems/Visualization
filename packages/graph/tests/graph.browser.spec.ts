import * as graph from "@hpcc-js/graph";
import { Class, HTMLWidget, Palette, SVGWidget } from "@hpcc-js/common";
import { AdjacencyGraph, AnnotationColumn, BasicSubgraph, BasicVertex, DataGraph, Edge, Graph, GraphT, GraphReactT, Graph2, Sankey, SankeyColumn, SankeyGraph, Subgraph, Vertex } from "@hpcc-js/graph";
import { Subgraph as ReactSubgraph, Vertex as ReactVertex, Edge as ReactEdge } from "@hpcc-js/react";
import { describe, it, expect } from "vitest";
import { classDef, dataBreach, render } from "../../common/tests/index.ts";

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

const DataGraphVerticesRaw = [
    [0, "Myriel", 1],
    [1, "Napoleon", 1],
    [2, "Mlle.Baptistine", 1],
    [3, "Mme.Magloire", 1],
    [4, "CountessdeLo", 1],
    [5, "Geborand", 1],
    [6, "Champtercier", 1],
    [7, "Cravatte", 1],
    [8, "Count", 1],
    [9, "OldMan", 1],
    [10, "Labarre", 2],
    [11, "Valjean", 2],
    [12, "Marguerite", 3],
    [13, "Mme.deR", 2],
    [14, "Isabeau", 2],
    [15, "Gervais", 2],
    [16, "Tholomyes", 3],
    [17, "Listolier", 3],
    [18, "Fameuil", 3],
    [19, "Blacheville", 3],
    [20, "Favourite", 3],
    [21, "Dahlia", 3],
    [22, "Zephine", 3],
    [23, "Fantine", 3],
    [24, "Mme.Thenardier", 4],
    [25, "Thenardier", 4],
    [26, "Cosette", 5],
    [27, "Javert", 4],
    [28, "Fauchelevent", 0],
    [29, "Bamatabois", 2],
    [30, "Perpetue", 3],
    [31, "Simplice", 2],
    [32, "Scaufflaire", 2],
    [33, "Woman1", 2],
    [34, "Judge", 2],
    [35, "Champmathieu", 2],
    [36, "Brevet", 2],
    [37, "Chenildieu", 2],
    [38, "Cochepaille", 2],
    [39, "Pontmercy", 4],
    [40, "Boulatruelle", 6],
    [41, "Eponine", 4],
    [42, "Anzelma", 4],
    [43, "Woman2", 5],
    [44, "MotherInnocent", 0],
    [45, "Gribier", 0],
    [46, "Jondrette", 7],
    [47, "Mme.Burgon", 7],
    [48, "Gavroche", 8],
    [49, "Gillenormand", 5],
    [50, "Magnon", 5],
    [51, "Mlle.Gillenormand", 5],
    [52, "Mme.Pontmercy", 5],
    [53, "Mlle.Vaubois", 5],
    [54, "Lt.Gillenormand", 5],
    [55, "Marius", 8],
    [56, "BaronessT", 5],
    [57, "Mabeuf", 8],
    [58, "Enjolras", 8],
    [59, "Combeferre", 8],
    [60, "Prouvaire", 8],
    [61, "Feuilly", 8],
    [62, "Courfeyrac", 8],
    [63, "Bahorel", 8],
    [64, "Bossuet", 8],
    [65, "Joly", 8],
    [66, "Grantaire", 8],
    [67, "MotherPlutarch", 9],
    [68, "Gueulemer", 4],
    [69, "Babet", 4],
    [70, "Claquesous", 4],
    [71, "Montparnasse", 4],
    [72, "Toussaint", 5],
    [73, "Child1", 10],
    [74, "Child2", 10],
    [75, "Brujon", 4],
    [76, "Mme.Hucheloup", 8]
];
const DataGraphVerticesColumns = ["id", "label", "group", "centroid", "ann1", "ann2", "ann3"];
const DataGraphVertices = DataGraphVerticesRaw.map(v => ([...v, v[1] === "Valjean", Math.random() > .8, Math.random() > .8, Math.random() > .8]));
const DataGraphEdges = [
    ["1->0", 1, 0, 1],
    ["2->0", 2, 0, 8],
    ["3->0", 3, 0, 10],
    ["3->2", 3, 2, 6],
    ["4->0", 4, 0, 1],
    ["5->0", 5, 0, 1],
    ["6->0", 6, 0, 1],
    ["7->0", 7, 0, 1],
    ["8->0", 8, 0, 2],
    ["9->0", 9, 0, 1],
    ["11->10", 11, 10, 1],
    ["11->3", 11, 3, 3],
    ["11->2", 11, 2, 3],
    ["11->0", 11, 0, 5],
    ["12->11", 12, 11, 1],
    ["13->11", 13, 11, 1],
    ["14->11", 14, 11, 1],
    ["15->11", 15, 11, 1],
    ["17->16", 17, 16, 4],
    ["18->16", 18, 16, 4],
    ["18->17", 18, 17, 4],
    ["19->16", 19, 16, 4],
    ["19->17", 19, 17, 4],
    ["19->18", 19, 18, 4],
    ["20->16", 20, 16, 3],
    ["20->17", 20, 17, 3],
    ["20->18", 20, 18, 3],
    ["20->19", 20, 19, 4],
    ["21->16", 21, 16, 3],
    ["21->17", 21, 17, 3],
    ["21->18", 21, 18, 3],
    ["21->19", 21, 19, 3],
    ["21->20", 21, 20, 5],
    ["22->16", 22, 16, 3],
    ["22->17", 22, 17, 3],
    ["22->18", 22, 18, 3],
    ["22->19", 22, 19, 3],
    ["22->20", 22, 20, 4],
    ["22->21", 22, 21, 4],
    ["23->16", 23, 16, 3],
    ["23->17", 23, 17, 3],
    ["23->18", 23, 18, 3],
    ["23->19", 23, 19, 3],
    ["23->20", 23, 20, 4],
    ["23->21", 23, 21, 4],
    ["23->22", 23, 22, 4],
    ["23->12", 23, 12, 2],
    ["23->11", 23, 11, 9],
    ["24->23", 24, 23, 2],
    ["24->11", 24, 11, 7],
    ["25->24", 25, 24, 13],
    ["25->23", 25, 23, 1],
    ["25->11", 25, 11, 12],
    ["26->24", 26, 24, 4],
    ["26->11", 26, 11, 31],
    ["26->16", 26, 16, 1],
    ["26->25", 26, 25, 1],
    ["27->11", 27, 11, 17],
    ["27->23", 27, 23, 5],
    ["27->25", 27, 25, 5],
    ["27->24", 27, 24, 1],
    ["27->26", 27, 26, 1],
    ["28->11", 28, 11, 8],
    ["28->27", 28, 27, 1],
    ["29->23", 29, 23, 1],
    ["29->27", 29, 27, 1],
    ["29->11", 29, 11, 2],
    ["30->23", 30, 23, 1],
    ["31->30", 31, 30, 2],
    ["31->11", 31, 11, 3],
    ["31->23", 31, 23, 2],
    ["31->27", 31, 27, 1],
    ["32->11", 32, 11, 1],
    ["33->11", 33, 11, 2],
    ["33->27", 33, 27, 1],
    ["34->11", 34, 11, 3],
    ["34->29", 34, 29, 2],
    ["35->11", 35, 11, 3],
    ["35->34", 35, 34, 3],
    ["35->29", 35, 29, 2],
    ["36->34", 36, 34, 2],
    ["36->35", 36, 35, 2],
    ["36->11", 36, 11, 2],
    ["36->29", 36, 29, 1],
    ["37->34", 37, 34, 2],
    ["37->35", 37, 35, 2],
    ["37->36", 37, 36, 2],
    ["37->11", 37, 11, 2],
    ["37->29", 37, 29, 1],
    ["38->34", 38, 34, 2],
    ["38->35", 38, 35, 2],
    ["38->36", 38, 36, 2],
    ["38->37", 38, 37, 2],
    ["38->11", 38, 11, 2],
    ["38->29", 38, 29, 1],
    ["39->25", 39, 25, 1],
    ["40->25", 40, 25, 1],
    ["41->24", 41, 24, 2],
    ["41->25", 41, 25, 3],
    ["42->41", 42, 41, 2],
    ["42->25", 42, 25, 2],
    ["42->24", 42, 24, 1],
    ["43->11", 43, 11, 3],
    ["43->26", 43, 26, 1],
    ["43->27", 43, 27, 1],
    ["44->28", 44, 28, 3],
    ["44->11", 44, 11, 1],
    ["45->28", 45, 28, 2],
    ["47->46", 47, 46, 1],
    ["48->47", 48, 47, 2],
    ["48->25", 48, 25, 1],
    ["48->27", 48, 27, 1],
    ["48->11", 48, 11, 1],
    ["49->26", 49, 26, 3],
    ["49->11", 49, 11, 2],
    ["50->49", 50, 49, 1],
    ["50->24", 50, 24, 1],
    ["51->49", 51, 49, 9],
    ["51->26", 51, 26, 2],
    ["51->11", 51, 11, 2],
    ["52->51", 52, 51, 1],
    ["52->39", 52, 39, 1],
    ["53->51", 53, 51, 1],
    ["54->51", 54, 51, 2],
    ["54->49", 54, 49, 1],
    ["54->26", 54, 26, 1],
    ["55->51", 55, 51, 6],
    ["55->49", 55, 49, 12],
    ["55->39", 55, 39, 1],
    ["55->54", 55, 54, 1],
    ["55->26", 55, 26, 21],
    ["55->11", 55, 11, 19],
    ["55->16", 55, 16, 1],
    ["55->25", 55, 25, 2],
    ["55->41", 55, 41, 5],
    ["55->48", 55, 48, 4],
    ["56->49", 56, 49, 1],
    ["56->55", 56, 55, 1],
    ["57->55", 57, 55, 1],
    ["57->41", 57, 41, 1],
    ["57->48", 57, 48, 1],
    ["58->55", 58, 55, 7],
    ["58->48", 58, 48, 7],
    ["58->27", 58, 27, 6],
    ["58->57", 58, 57, 1],
    ["58->11", 58, 11, 4],
    ["59->58", 59, 58, 15],
    ["59->55", 59, 55, 5],
    ["59->48", 59, 48, 6],
    ["59->57", 59, 57, 2],
    ["60->48", 60, 48, 1],
    ["60->58", 60, 58, 4],
    ["60->59", 60, 59, 2],
    ["61->48", 61, 48, 2],
    ["61->58", 61, 58, 6],
    ["61->60", 61, 60, 2],
    ["61->59", 61, 59, 5],
    ["61->57", 61, 57, 1],
    ["61->55", 61, 55, 1],
    ["62->55", 62, 55, 9],
    ["62->58", 62, 58, 17],
    ["62->59", 62, 59, 13],
    ["62->48", 62, 48, 7],
    ["62->57", 62, 57, 2],
    ["62->41", 62, 41, 1],
    ["62->61", 62, 61, 6],
    ["62->60", 62, 60, 3],
    ["63->59", 63, 59, 5],
    ["63->48", 63, 48, 5],
    ["63->62", 63, 62, 6],
    ["63->57", 63, 57, 2],
    ["63->58", 63, 58, 4],
    ["63->61", 63, 61, 3],
    ["63->60", 63, 60, 2],
    ["63->55", 63, 55, 1],
    ["64->55", 64, 55, 5],
    ["64->62", 64, 62, 12],
    ["64->48", 64, 48, 5],
    ["64->63", 64, 63, 4],
    ["64->58", 64, 58, 10],
    ["64->61", 64, 61, 6],
    ["64->60", 64, 60, 2],
    ["64->59", 64, 59, 9],
    ["64->57", 64, 57, 1],
    ["64->11", 64, 11, 1],
    ["65->63", 65, 63, 5],
    ["65->64", 65, 64, 7],
    ["65->48", 65, 48, 3],
    ["65->62", 65, 62, 5],
    ["65->58", 65, 58, 5],
    ["65->61", 65, 61, 5],
    ["65->60", 65, 60, 2],
    ["65->59", 65, 59, 5],
    ["65->57", 65, 57, 1],
    ["65->55", 65, 55, 2],
    ["66->64", 66, 64, 3],
    ["66->58", 66, 58, 3],
    ["66->59", 66, 59, 1],
    ["66->62", 66, 62, 2],
    ["66->65", 66, 65, 2],
    ["66->48", 66, 48, 1],
    ["66->63", 66, 63, 1],
    ["66->61", 66, 61, 1],
    ["66->60", 66, 60, 1],
    ["67->57", 67, 57, 3],
    ["68->25", 68, 25, 5],
    ["68->11", 68, 11, 1],
    ["68->24", 68, 24, 1],
    ["68->27", 68, 27, 1],
    ["68->48", 68, 48, 1],
    ["68->41", 68, 41, 1],
    ["69->25", 69, 25, 6],
    ["69->68", 69, 68, 6],
    ["69->11", 69, 11, 1],
    ["69->24", 69, 24, 1],
    ["69->27", 69, 27, 2],
    ["69->48", 69, 48, 1],
    ["69->41", 69, 41, 1],
    ["70->25", 70, 25, 4],
    ["70->69", 70, 69, 4],
    ["70->68", 70, 68, 4],
    ["70->11", 70, 11, 1],
    ["70->24", 70, 24, 1],
    ["70->27", 70, 27, 1],
    ["70->41", 70, 41, 1],
    ["70->58", 70, 58, 1],
    ["71->27", 71, 27, 1],
    ["71->69", 71, 69, 2],
    ["71->68", 71, 68, 2],
    ["71->70", 71, 70, 2],
    ["71->11", 71, 11, 1],
    ["71->48", 71, 48, 1],
    ["71->41", 71, 41, 1],
    ["71->25", 71, 25, 1],
    ["72->26", 72, 26, 2],
    ["72->27", 72, 27, 1],
    ["72->11", 72, 11, 1],
    ["73->48", 73, 48, 2],
    ["74->48", 74, 48, 2],
    ["74->73", 74, 73, 3],
    ["75->69", 75, 69, 3],
    ["75->68", 75, 68, 3],
    ["75->25", 75, 25, 3],
    ["75->48", 75, 48, 1],
    ["75->41", 75, 41, 1],
    ["75->70", 75, 70, 1],
    ["75->71", 75, 71, 1],
    ["76->64", 76, 64, 1],
    ["76->65", 76, 65, 1],
    ["76->66", 76, 66, 1],
    ["76->63", 76, 63, 1],
    ["76->62", 76, 62, 1],
    ["76->48", 76, 48, 1],
    ["76->58", 76, 58, 1]
];

describe("@hpcc-js/graph", () => {
    for (const key in graph) {
        const item = (graph as any)[key];
        if (item) {
            if (!urlSearch || urlSearch === item.prototype.constructor.name) {
                describe(`${item.prototype?.constructor?.name}`, () => {
                    it("Simple", () => {
                        expect(true).to.be.true;
                    });
                    if (item.prototype instanceof Class) {
                        classDef("graph", item);
                    }
                    if (item.prototype instanceof HTMLWidget || item.prototype instanceof SVGWidget) {
                        switch (item.prototype.constructor) {
                            case Edge:
                                {
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
                                }
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
                                {
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
                                }
                                break;
                            case GraphT:
                                {
                                    const subgraphsB = [
                                        { id: "10", text: "Adults" }
                                    ];

                                    const verticesB = [
                                        { id: "0", text: "Daddy", annotations: [] },
                                        { id: "1", text: "Mummy", annotations: [] },
                                        { id: "2", text: "Baby", annotations: [] }
                                    ];

                                    const edgesB = [
                                        { id: "0", source: verticesB[0], target: verticesB[2] },
                                        { id: "1", source: verticesB[1], target: verticesB[2] }
                                    ];

                                    const hierarchyB = [
                                        { id: "0", parent: subgraphsB[0], child: verticesB[0] },
                                        { id: "1", parent: subgraphsB[0], child: verticesB[1] }
                                    ];

                                    const graphB = new GraphT(BasicSubgraph, BasicVertex, ReactEdge)
                                        .data({ subgraphs: subgraphsB, vertices: verticesB, edges: edgesB, hierarchy: hierarchyB })
                                        ;

                                    render(graphB);
                                }
                                break;
                            case GraphReactT:
                                {
                                    const subgraphsB = [
                                        { id: "10", text: "Adults" }
                                    ];

                                    const verticesB = [
                                        { id: "0", text: "Daddy", annotations: [] },
                                        { id: "1", text: "Mummy", annotations: [] },
                                        { id: "2", text: "Baby", annotations: [] }
                                    ];

                                    const edgesB = [
                                        { id: "0", source: verticesB[0], target: verticesB[2] },
                                        { id: "1", source: verticesB[1], target: verticesB[2] }
                                    ];

                                    const hierarchyB = [
                                        { id: "0", parent: subgraphsB[0], child: verticesB[0] },
                                        { id: "1", parent: subgraphsB[0], child: verticesB[1] }
                                    ];

                                    const graphB = new GraphReactT(ReactSubgraph, ReactVertex, ReactEdge)
                                        .data({ subgraphs: subgraphsB, vertices: verticesB, edges: edgesB, hierarchy: hierarchyB })
                                        ;

                                    render(graphB);
                                }
                                break;
                            case Graph2:
                                {
                                    const subgraphsB = [
                                        { id: "10", text: "Adults" }
                                    ];

                                    const verticesB = [
                                        { id: "0", text: "Daddy", annotations: [] },
                                        { id: "1", text: "Mummy", annotations: [] },
                                        { id: "2", text: "Baby", annotations: [] }
                                    ];

                                    const edgesB = [
                                        { id: "0", source: verticesB[0], target: verticesB[2] },
                                        { id: "1", source: verticesB[1], target: verticesB[2] }
                                    ];

                                    const hierarchyB = [
                                        { id: "0", parent: subgraphsB[0], child: verticesB[0] },
                                        { id: "1", parent: subgraphsB[0], child: verticesB[1] }
                                    ];

                                    const graphB = new Graph2()
                                        .data({ subgraphs: subgraphsB, vertices: verticesB, edges: edgesB, hierarchy: hierarchyB })
                                        ;

                                    render(graphB);
                                }
                                break;
                            case DataGraph:
                                {
                                    const graphD = new DataGraph()
                                        .categories((Array(11) as any).fill().map((_row: any, idx: number) => ({ id: "" + idx, faChar: "fa-user" })))
                                        .annotations((Array(11) as any).fill().map((_row: any, idx: number) => ({ id: "" + idx, faChar: "fa-plus" })))
                                        .vertexColumns(DataGraphVerticesColumns)
                                        .vertexCategoryColumn("group")
                                        .vertexIDColumn("id")
                                        .vertexLabelColumn("label")
                                        .vertexAnnotationColumns([
                                            new AnnotationColumn().columnID("ann1").annotationID("1"),
                                            new AnnotationColumn().columnID("ann2").annotationID("2"),
                                            new AnnotationColumn().columnID("ann3").annotationID("3")
                                        ])
                                        .vertices(DataGraphVertices)
                                        .edgeColumns(["id", "source", "target", "weight"])
                                        .edgeIDColumn("id")
                                        .edgeSourceColumn("source")
                                        .edgeTargetColumn("target")
                                        .edgeWeightColumn("weight")
                                        .edges(DataGraphEdges)
                                        ;
                                    render(graphD);
                                }
                                break;
                            case Sankey:
                                {
                                    render(new Sankey()
                                        .columns(dataBreach.columns)
                                        .data(dataBreach.data)
                                        .mappings([new SankeyColumn().column("Covered Entity Type"), new SankeyColumn().column("Type of Breach")])
                                    );
                                }
                                break;
                            case SankeyGraph:
                                render(new SankeyGraph()
                                    .vertexColumns(["category", "id", "label"])
                                    .vertices([
                                        [0, 0, "A"],
                                        [0, 1, "B"],
                                        [0, 2, "C"],
                                        [0, 3, "D"],
                                        [0, 4, "F"],
                                        [1, 5, "Math"],
                                        [2, 6, "English"],
                                        [3, 7, "Geometry"],
                                        [4, 8, "Science"],
                                    ])
                                    .edgeColumns(["source", "target", "weight"])
                                    .edges([
                                        [0, 5, 48],
                                        [0, 6, 28],
                                        [0, 7, 26],
                                        [0, 8, 38],
                                        [1, 5, 63],
                                        [1, 6, 39],
                                        [1, 7, 36],
                                        [1, 8, 58],
                                        [2, 5, 42],
                                        [2, 6, 36],
                                        [2, 7, 27],
                                        [2, 8, 68],
                                        [3, 5, 90],
                                        [3, 6, 59],
                                        [3, 7, 15],
                                        [3, 8, 35],
                                        [4, 5, 10],
                                        [4, 6, 3],
                                        [4, 7, 6],
                                        [4, 8, 4],
                                    ])
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

    render(new Vertex()
        .faChar("\uf007")
        .text("Hello and Welcome!")
        .annotationIcons([
            { faChar: "\uf188", tooltip: "Test A", shape_colorFill: "white", image_colorFill: "red" },
            { faChar: "\uf0ad", tooltip: "Test B", shape_colorFill: "green", shape_colorStroke: "green", image_colorFill: "white" },
            { faChar: "\uf193", tooltip: "Test C", shape_colorFill: "navy", shape_colorStroke: "navy", image_colorFill: "white" }
        ])
    );
});
