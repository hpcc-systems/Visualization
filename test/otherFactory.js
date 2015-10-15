"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        root.test_otherFactory = factory();
    }
}(this, function (DataFactory, HeatMap, WordCloud, Table) {
    return {
        HeatMap: {
            simple: function (callback) {
                require(["test/DataFactory", "src/other/HeatMap"], function (DataFactory, HeatMap) {
                    callback(new HeatMap()
                        .columns(DataFactory.HeatMap.simple.columns)
                        .data(DataFactory.HeatMap.simple.data)
                    );
                });
            }
        },
        Image: {
            layered:function (callback) {
                require(["test/DataFactory", "src/layout/Layered", "src/layout/AbsoluteSurface", "src/other/Image", "src/other/HeatMap"], function (DataFactory, Layered, AbsoluteSurface, Image, HeatMap) {
                    var retVal = new Layered()
                        .addLayer(new AbsoluteSurface().widgetX(0).widgetY(0).widgetWidth(100).widgetHeight(100).widget(
                                new Image().source(DataFactory.Image.floorplan)
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
            simple: function (callback) {
                require(["test/DataFactory", "src/other/Image"], function (DataFactory, Image) {
                    callback(new Image().source(DataFactory.Image.floorplan));
                });
            },
        },
        WordCloud: {
            simple: function (callback) {
                require(["test/DataFactory", "src/other/WordCloud"], function (DataFactory, WordCloud) {
                    var words = DataFactory.WordCloud.simple.words.map(function (d) {
                        return [d, 10 + Math.random() * 14];
                    });
                    callback(new WordCloud()
                        .columns(DataFactory.WordCloud.simple.columns)
                        .data(words)
                    );
                });
            }
        },
        Table: {
            simple: function (callback) {
                require(["test/DataFactory", "src/other/Table"], function (DataFactory, Table) {
                    callback(new Table()
                        .columns(DataFactory.Table.simple.columns)
                        .data(DataFactory.Table.simple.data)
                    );
                });
            },
            totalled: function (callback) {
                require(["test/DataFactory", "src/other/Table"], function (DataFactory, Table) {
                    callback(new Table()
                        .columns(DataFactory.Table.large.columns)
                        .data(DataFactory.Table.large.data)
                        .totalledColumns([1,2,5,6,7])
                        .totalledLabel("Total")
                    );
                });
            },
            formatted: function (callback) {
                require(["test/DataFactory", "src/other/Table"], function (DataFactory, Table) {
                    callback(new Table()
                        .columns(DataFactory.Table.formatted.columns)
                        .data(DataFactory.Table.formatted.data)
                        .columnPatterns([".4%", "", ".6r", "", "%d-%m-%y"])
                    );
                });
            },
            large: function (callback) {
                require(["test/DataFactory", "src/other/Table"], function (DataFactory, Table) {
                    callback(new Table()
                    .columns(DataFactory.Table.large.columns)
                    .data(DataFactory.Table.large.data)
                    .fixedHeader(true)
                    );
                });
            }
        },
        Legend: {
            simple: function (callback) {
                require(["test/DataFactory", "src/layout/Border", "src/chart/Line", "src/other/Legend"], function (DataFactory, Border, Line, Legend) {
                    var line = new Line()
                        .columns(DataFactory.ND.ampolar.columns)
                        .data(DataFactory.ND.ampolar.data)
                    var legend = new Legend().targetWidget(line);
                    callback(new Border()
                        .setContent("center", line)
                        .setContent("right", legend)
                    );
                });
            }
        }
    };
}));
