"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        root.test_commonFactory = factory();
    }
}(this, function () {
    var commonFactory = {
        Entity: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/common/Entity"], function (DataFactory, Entity) {
                    callback(new Entity()
                        .icon("")
                        .iconColor("#2c3e50")
                        .iconDiameter(30)
                        .iconPaddingPercent(0)
                    );
                });
            },
            vertex: function (callback) {
                legacyRequire(["test/DataFactory", "src/common/EntityVertex"], function (DataFactory, EntityVertex) {
                    callback(new EntityVertex()
                        .icon("")
                        .title("SomeTitle")
                        .iconColor("#2c3e50")
                        .iconColorFill("#ecf0f1")
                        .iconColorStroke("#2c3e50")
                        .textboxColorFill("#ecf0f1")
                        .textboxColorStroke("#2c3e50")
                        .annotationIcons([
                            { faChar: "A", image_colorFill: "#2c3e50", shape_colorFill: "#f1c40f", shape_colorStroke: "#2c3e50" },
                            { faChar: "B", image_colorFill: "#2c3e50", shape_colorFill: "#e67e22", shape_colorStroke: "#2c3e50" },
                            { faChar: "C", image_colorFill: "#2c3e50", shape_colorFill: "#e74c3c", shape_colorStroke: "#2c3e50" },
                        ])
                    );
                });
            },
            pin: function (callback) {
                legacyRequire(["test/DataFactory", "src/common/EntityPin"], function (DataFactory, EntityPin) {
                    callback(new EntityPin()
                        .icon("")
                        .iconDiameter(18)
                        .iconPaddingPercent(1)
                        .title("SomeTitle")
                        .titleColor("#E3151A")
                        .titleFontSize(24)
                        .description("SomeDescription")
                        .descriptionColor("#000000")
                        .descriptionFontSize(15)
                        .iconColor("#E3151A")
                        .titleColor("#E3151A")
                        .descriptionColor("#E3151A")
                        .backgroundShape("pin")
                        .backgroundColorFill("#F8F8F8")
                        .backgroundColorStroke("#CCCCCC")
                        .cornerRadius(5)
                        .arrowHeight(10)
                        .arrowWidth(16)
                        .annotationIcons([
                            { faChar: "A", image_colorFill: "#E3151A", shape_colorFill: "none", shape_colorStroke: "#E3151A", shape: "circle" },
                            { faChar: "B", image_colorFill: "#E3151A", shape_colorFill: "none", shape_colorStroke: "#E3151A", shape: "circle" },
                            { faChar: "C", image_colorFill: "#E3151A", shape_colorFill: "none", shape_colorStroke: "#E3151A", shape: "circle" },
                        ])
                    );
                });
            },
            card: function (callback) {
                legacyRequire(["test/DataFactory", "src/common/EntityCard"], function (DataFactory, EntityCard) {
                    callback(new EntityCard()
                        .icon("")
                        .iconDiameter(28)
                        .iconPaddingPercent(0)
                        .title("SomeTitle")
                        .titleFontSize(28)
                        .titleColor("#ecf0f1")
                        .description("SomeDescription")
                        .descriptionColor("#ecf0f1")
                        .iconColor("#ecf0f1")
                        .backgroundShape("rect")
                        .backgroundColorFill("#2980b9")
                        .backgroundColorStroke("#2c3e50")
                        .annotationIcons([
                            { faChar: "A", image_colorFill: "#2c3e50", shape_colorFill: "#f1c40f", shape_colorStroke: "none" },
                            { faChar: "B", image_colorFill: "#2c3e50", shape_colorFill: "#e67e22", shape_colorStroke: "none" },
                            { faChar: "C", image_colorFill: "#2c3e50", shape_colorFill: "#e74c3c", shape_colorStroke: "none" },
                        ])
                    );
                });
            },
            rect: function (callback) {
                legacyRequire(["test/DataFactory", "src/common/EntityRect"], function (DataFactory, EntityRect) {
                    callback(new EntityRect()
                        .fixedWidth(140)
                        .icon("")
                        .iconDiameter(20)
                        .iconPaddingPercent(0)
                        .title("SomeTitle")
                        .titleFontSize(18)
                        .titleColor("#ecf0f1")
                        .description("SomeDescription")
                        .descriptionColor("#ecf0f1")
                        .iconColor("#ecf0f1")
                        .backgroundShape("rect")
                        .backgroundColorFill("#2980b9")
                        .backgroundColorStroke("#2c3e50")
                        .annotationIcons([
                            { faChar: "A", image_colorFill: "#2c3e50", shape_colorFill: "#f1c40f", shape_colorStroke: "none" },
                            { faChar: "B", image_colorFill: "#2c3e50", shape_colorFill: "#e67e22", shape_colorStroke: "none" },
                            { faChar: "C", image_colorFill: "#2c3e50", shape_colorFill: "#e74c3c", shape_colorStroke: "none" },
                        ])
                    );
                });
            },
            rectList: function (callback) {
                legacyRequire(["test/DataFactory", "src/common/EntityRectList"], function (DataFactory, EntityRectList) {
                    callback(new EntityRectList()
                        .columns(["Icon", "IconColor", "Title"])
                        .data([
                            ["", "red", "Event Type 1 - Event Type 1 - Event Type 1 - Event Type 1 - "],
                            ["", "yellow", "Event Type 1 - Event Type 1 - "],
                            ["", "green", "Event Type 3"],
                        ])
                        .iconColumn("Icon")
                        .iconColorColumn("IconColor")
                        .titleColumn("Title")
                    );
                });
            }
        },
        Text: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/common/Text"], function (DataFactory, Text) {
                    callback(new Text()
                        .text(DataFactory.Text.simple.text)
                    );
                });
            },
            rotation: function (callback) {
                legacyRequire(["test/DataFactory", "src/common/Text"], function (DataFactory, Text) {
                    const text = new Text()
                        .text(DataFactory.Text.simple.text)
                        ;
                    callback(text);
                    let r = 0;
                    setInterval(() => {
                        text
                            .rotation(r)
                            .render();
                        r += 10;
                    }, 50)
                });
            }
        },
        Shape: {
            simple: function (callback) {
                legacyRequire(["src/common/Shape"], function (Shape) {
                    callback(new Shape()
                    );
                });
            }
        },
        FAChar: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/common/FAChar"], function (DataFactory, FAChar) {
                    callback(new FAChar()
                        .char(DataFactory.FAChar.simple.char)
                    );
                });
            }
        },
        TextBox: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/common/TextBox"], function (DataFactory, TextBox) {
                    callback(new TextBox()
                        .text(DataFactory.Text.simple.text)
                    );
                });
            }
        },
        Image: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/common/Image"], function (DataFactory, Image) {
                    callback(new Image().source(DataFactory.Image.floorplan));
                });
            },
            layered: function (callback) {
                legacyRequire(["test/DataFactory", "src/layout/Layered", "src/layout/AbsoluteSurface", "src/common/Image", "src/other/HeatMap"], function (DataFactory, Layered, AbsoluteSurface, Image, HeatMap) {
                    var retVal = new Layered()
                        .addLayer(new AbsoluteSurface().widgetX(0).widgetY(0).widgetWidth(100).widgetHeight(100).widget(
                            new Image()
                                .source(DataFactory.Image.floorplan)
                                .alignment("origin")
                        )
                        )
                        .addLayer(new AbsoluteSurface().widgetX(0).widgetY(0).widgetWidth(100).widgetHeight(100).opacity(0.66).widget(
                            new HeatMap()
                                .columns(DataFactory.HeatMap.floorplan.columns)
                                .data(DataFactory.HeatMap.floorplan.data)
                        )
                        )
                        ;
                    callback(retVal);
                });
            },
            url: function (callback) {
                legacyRequire(["test/DataFactory", "src/common/Image"], function (DataFactory, Image) {
                    callback(new Image().source("http://scoop.previewsworld.com/Image/NewsImage/4/41615/88069/1"));
                });
            }

        },
        Icon: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/common/Icon"], function (DataFactory, Icon) {
                    callback(new Icon()
                        .faChar(DataFactory.FAChar.simple.char)
                    );
                });
            },
            image: function (callback) {
                legacyRequire(["test/DataFactory", "src/common/Icon"], function (DataFactory, Icon) {
                    callback(new Icon()
                        .faChar("")
                        .diameter(64)
                        .imageUrl("https://cdn.discordapp.com/avatars/78237891792216064/e164780723ccb2ea08f6647272d4b92d.jpg")
                    );
                });
            }
        },
        List: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/common/List"], function (DataFactory, List) {
                    callback(new List()
                        .data(DataFactory.List.simple.data)
                    );
                });
            }
        },
        Menu: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/common/Menu"], function (DataFactory, Menu) {
                    callback(new Menu()
                        .data(DataFactory.List.simple.data)
                    );
                });
            }
        },
        Surface: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/common/Surface", "src/common/Text"], function (DataFactory, Surface, Text) {
                    callback(new Surface()
                        .title("Surface")
                        .menu(DataFactory.Surface.simple.menu)
                        //.buttonAnnotations(DataFactory.Surface.simple.buttonAnnotations)
                        .content(new Text()
                            .text("Hello\nand\nWelcome!")
                        )
                    );
                });
            }
        },
        ResizeSurface: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/common/ResizeSurface", "src/common/Text"], function (DataFactory, ResizeSurface, Text) {
                    callback(new ResizeSurface()
                        .title("Resize")
                        .menu(DataFactory.Surface.simple.menu)
                        //.buttonAnnotations(DataFactory.Surface.simple.buttonAnnotations)
                        .content(new Text()
                            .text("Hello\nand\nWelcome!")
                        )
                    );
                });
            }
        },
        Composition: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory",
                    "src/common/Utility", "src/common/Surface", "src/common/ResizeSurface", "src/common/Text", "src/common/TextBox", "src/common/Shape", "src/common/FAChar", "src/common/Icon", "src/common/List", "src/common/Menu", "src/common/Palette",
                    "src/graph/Graph", "src/graph/Edge", "src/graph/Vertex",
                    "src/tree/SunburstPartition", "src/tree/CirclePacking",
                    "test/chartFactory", "test/otherFactory",
                    "src/other/MorphText", "src/form/Slider", "src/other/Table"], function (DataFactory,
                        Utility, Surface, ResizeSurface, Text, TextBox, Shape, FAChar, Icon, List, Menu, Palette,
                        Graph, Edge, Vertex,
                        SunburstPartition, CirclePacking,
                        chartFactory, otherFactory,
                        MorphText, Slider, Table) {
                        function createEdge(source, target, label) {
                            return new Edge()
                                .sourceVertex(source)
                                .targetVertex(target)
                                .sourceMarker("circle")
                                .targetMarker("arrow")
                                .text(label || "")
                                ;
                        }
                        chartFactory.Column.simple(function (column) {
                            otherFactory.Table.simple(function (table) {
                                var vertices = [
                                    new Shape().shape("circle").size({ width: 32, height: 32 }),
                                    new FAChar().char("\uf080"),
                                    new Icon().shape("circle").faChar("\uf080"),
                                    new Shape().class("Shape2").shape("rect").size({ width: 32, height: 32 }),
                                    new Text().text("Multi\nLine\nText"),
                                    new TextBox().text("Text\nBox"),
                                    new Vertex().text("Graph\nVertex").faChar("\uf080"),
                                    new Shape().shape("rect").size({ width: 48, height: 22 }),
                                    new List().data(DataFactory.List.simple.data),
                                    new Menu().faChar("\uf0c9").data(["Menu A", "And B", "a longer C"]),
                                    new ResizeSurface().size({ width: 200, height: 100 }).showTitle(true).title("Resize Me!!!").menu(["aaa", "bbb", "ccc"]).icon_faChar("\uf047").content(table),
                                    new ResizeSurface().size({ width: 200, height: 100 }).showTitle(true).title("Resize Me!!!").menu(["aaa", "bbb", "ccc"]).icon_faChar("\uf047").content(column)
                                ];
                                var edges = [
                                    createEdge(vertices[0], vertices[2]), createEdge(vertices[1], vertices[2]),
                                    createEdge(vertices[3], vertices[5]), createEdge(vertices[4], vertices[5]),
                                    createEdge(vertices[2], vertices[6]), createEdge(vertices[5], vertices[6], "test label"),
                                    createEdge(vertices[7], vertices[9]), createEdge(vertices[1], vertices[9]), createEdge(vertices[8], vertices[9]),
                                    createEdge(vertices[6], vertices[10]), createEdge(vertices[7], vertices[10]), createEdge(vertices[9], vertices[10])
                                ];
                                callback(new Graph()
                                    .target("composition")
                                    .data({ vertices: vertices, edges: edges })
                                    .layout("Hierarchy")
                                );
                            });
                        });
                    });
            }
        },
        Exporter: {
            Simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/layout/Surface", "src/chart/Line", "src/common/Utility"], function (DataFactory, Surface, Line, Utility) {
                    var retVal = new Surface()
                        .title(DataFactory.Surface.simple.title)
                        .buttonAnnotations([{ id: "export_CSV", label: "CSV", width: "50px", height: "18px", padding: "0px 5px", format: "CSV" },
                        { id: "export_TSV", label: "TSV", width: "50px", height: "18px", padding: "0px 5px", format: "TSV" },
                        { id: "export_CSV", label: "JSON", width: "50px", height: "18px", padding: "0px 5px", format: "JSON" }])
                        .widget(new Line()
                            .columns(DataFactory.ND.subjects.columns)
                            .data(DataFactory.ND.subjects.data)
                        )
                        .on("click", function (d) {
                            var formattedData = retVal.widget().export(d.format);
                            var classID = retVal.widget().classID();
                            if (confirm("The data in " + d.format + " format:\n\n" + formattedData + "\n\n Would you like to save it as a file?")) {
                                Utility.downloadData(d.format, formattedData, classID);
                            }
                        })
                        ;
                    callback(retVal);
                });
            }
        }
    };

    return commonFactory;
}));
