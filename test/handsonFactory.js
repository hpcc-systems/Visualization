"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        root.test_handsonFactory = factory();
    }
}(this, function() {
    var handsonFactory = {
        HandsOnTable: {
            simple: function(callback) {
                require(["src/handson/Table"], function(Table) {
                    var table = new Table()
                        .columns(["Lat", "Long", "Pin"])
                        .data([
                            [37.665074, -122.384375, "green-dot.png"],
                            [32.69068, -117.17854, "1"],
                            [39.709455, -104.969859, "2"],
                            [41.244123, -95.96161, "3"],
                            [32.68898, -117.19204, "10"],
                            [45.78649, -108.5266, "11"],
                            [45.79618, -108.535652, "12"],
                            [45.77432, -108.49437, "90"],
                            [45.777062, -108.549835, "red-dot.png"],
                            ["", "", ""]
                        ]);
                    callback(table);
                });
            },
            widget: function(callback) {
                require(["test/DataFactory", "src/handson/Table"], function(DataFactory, Table) {
                    callback(new Table()
                        .columns(DataFactory.Table.widget.columns)
                        .data(DataFactory.Table.widget.data)
                    );
                });
            },
            large: function(callback) {
                require(["test/DataFactory", "src/handson/Table"], function(DataFactory, Table) {
                    callback(new Table()
                        .columns(DataFactory.Table.large.columns)
                        .data(DataFactory.Table.large.data)
                    );
                });
            },
            formatted: function(callback) {
                require(["test/DataFactory", "src/handson/Table"], function(DataFactory, Table) {
                    var table = new Table()
                        .columns(DataFactory.Table.formatted.columns)
                        .data(DataFactory.Table.formatted.data);
                    table.fields()[0].format(".2f");
                    table.fields()[2].format(".6r");
                    table.fields()[4].type("time").mask("%Y-%_m-%_d").format("%d %b '%y");
                    callback(table);
                });
            }
        },
    }
    return handsonFactory;
}));