"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        root.test_compositeFactory = factory();
    }
}(this, function () {
    var compositeFactory = {
        MegaChart: {
            simple: function (callback) {
                require(["test/DataFactory", "src/composite/MegaChart"], function (DataFactory, MegaChart) {
                    var mc = new MegaChart()
                        .domainAxisTitle("Simple Domain Title")
                        .valueAxisTitle("Simple Value Title")
                        .showLegend(true)
                        .title("Simple MegaChart Title")
                        .columns(DataFactory.ND.subjects.columns)
                        .data(DataFactory.ND.subjects.data)
                    ;
                    callback(mc);
                });
            },
        },
        CommandWidget: {
            simple: function (callback) {
                require(["src/composite/CommandWidget", "src/chart/Pie", "src/layout/Grid", "src/map/GMap"], 
                function (CommandWidget,Pie,Grid,GMap) {
                    var pie = new Pie()
                        .columns(["Subject","Year 1"])
                        .data([["Geography",75],["English",45],["Math",98],["Science",66]])
                    ;
                    var gmap = new GMap()
                        .columns([])
                        .data([[26.1040835, -80.1534063, null, null, 0.234]])
                        .zoom(14)
                        .centerLat(26.1040835)
                        .centerLong(-80.1534063)
                    ;
                    var cmd1 = new CommandWidget().title("Pie").widget(pie);
                    var cmd2 = new CommandWidget().title("Map").widget(gmap);
                    callback(
                            new Grid()
                            .designMode(true)
                            .hideDragHandles(true)
                            .hideDesignGrid(true)
                            .disableCellSelection(true)
                            .restrictDraggingOut(true)
                            .cellDensity(20)
                            .setContent(0,0,cmd1)
                            .setContent(1,0,cmd2)
                        );
                });
            },
            graph: function (callback) {
                require(["test/DataFactory", "src/composite/CommandWidget", "src/chart/Pie", "src/layout/Grid", "src/map/GMap", "src/graph/Graph", "src/common/Palette", "src/graph/Vertex", "src/graph/Edge"], 
                function (DataFactory,CommandWidget,Pie,Grid,GMap,Graph,Palette,Vertex,Edge) {
                    var pie = new Pie()
                        .columns(["Subject","Year 1"])
                        .data([["Geography",75],["English",45],["Math",98],["Science",66]])
                    ;
                    var gmap = new GMap()
                        .columns([])
                        .data([[26.1040835, -80.1534063, null, null, 0.234]])
                        .zoom(14)
                        .centerLat(26.1040835)
                        .centerLong(-80.1534063)
                    ;
                    var pieCmd = new CommandWidget().title("Pie").widget(pie);
                    var mapCmd = new CommandWidget().title("Map").widget(gmap);
                    var graph = new Graph();

                    var vertices = [];
                    var edges = [];

                    var palette = Palette.ordinal("dark2");

                    var rawData = DataFactory.Graph.verySimple;
                    rawData.nodes.forEach(function (node) {
                        var annotation = [];
                        if (Math.random() < 0.10) {
                            annotation.push({
                                "faChar": "A",
                                "tooltip": "Test A",
                                "shape_colorFill": "white",
                                "image_colorFill": "red"
                            });
                        }
                        if (Math.random() < 0.10) {
                            annotation.push({
                                "faChar": "B",
                                "tooltip": "Test B",
                                "shape_colorFill": "green",
                                "shape_colorStroke": "green",
                                "image_colorFill": "white"
                            });
                        }
                        if (Math.random() < 0.10) {
                            annotation.push({
                                "faChar": "C",
                                "tooltip": "Test C",
                                "shape_colorFill": "navy",
                                "shape_colorStroke": "navy",
                                "image_colorFill": "white"
                            });
                        }
                        vertices.push(new Vertex()
                            .text(node.name)
                            .textbox_shape_colorStroke(palette(node.group))
                            .textbox_shape_colorFill("whitesmoke")
                            .icon_shape_colorStroke(palette(node.group))
                            .icon_shape_colorFill(palette(node.group))
                            .annotationIcons(annotation)
                            .faChar(node.name[0])
                        );
                    }, graph);

                    function createEdge(source, target, label) {
                        return new Edge()
                            .sourceVertex(source)
                            .targetVertex(target)
                            .sourceMarker("circleFoot")
                            .targetMarker("arrowHead")
                            .text(label || "")
                        ;
                    }
                    rawData.links.forEach(function (link, idx) {
                        edges.push(createEdge(vertices[link.source], vertices[link.target]).weight(link.value));
                    }, graph);

                    graph.data({ vertices: vertices, edges: edges });
                    
                    var linkCmd = new CommandWidget().title("LINK ANALYSIS").disableLeftButtons(true).widget(graph);
                    
                    callback(
                            new Grid()
                            .designMode(true)
                            .hideDragHandles(true)
                            .hideDesignGrid(true)
                            .disableCellSelection(true)
                            .restrictDraggingOut(true)
                            .cellDensity(20)
                            .setContent(1,0,pieCmd,"",1,2)
                            .setContent(0,1,linkCmd)
                            .setContent(0,0,mapCmd)
                        );
                });
            }
        },
    };

    return compositeFactory;
}));
