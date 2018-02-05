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
                legacyRequire(["test/DataFactory", "src/composite/MegaChart"], function (DataFactory, MegaChart) {
                    var mc = new MegaChart()
                        .chartType("LINE")
                        .domainAxisTitle("Simple Domain Title")
                        .valueAxisTitle("Simple Value Title")
                        .title("Simple MegaChart Title")
                        .columns(DataFactory.ND.subjects.columns)
                        .data(DataFactory.ND.subjects.data)
                        ;
                    callback(mc);
                });
            },
            pie: function (callback) {
                legacyRequire(["test/DataFactory", "src/composite/MegaChart"], function (DataFactory, MegaChart) {
                    var mc = new MegaChart()
                        .chartType("C3_PIE")
                        .legendPosition("bottom")
                        .title("Simple MegaChart Title")
                        .columns(DataFactory.ND.subjects.columns)
                        .data(DataFactory.ND.subjects.data)
                        ;
                    callback(mc);
                });
            },
            choro: function (callback) {
                legacyRequire(["test/DataFactory", "src/composite/MegaChart"], function (DataFactory, MegaChart) {
                    var mc = new MegaChart()
                        .chartType("CHORO_USSTATES")
                        .legendPosition("bottom")
                        .title("US States Choropleth")
                        .columns(DataFactory.States.simple.columns)
                        .data(DataFactory.States.simple.data)
                        ;
                    callback(mc);
                });
            },
            grid: function (callback) {
                legacyRequire(["test/DataFactory", "src/composite/MegaChart", "src/layout/Grid"], function (DataFactory, MegaChart, Grid) {
                    callback(new Grid()
                        .setContent(0, 0, new MegaChart()
                            .chartType("LINE")
                            .domainAxisTitle("Simple Domain Title")
                            .valueAxisTitle("Simple Value Title")
                            .title("Simple MegaChart Title")
                            .columns(DataFactory.ND.subjects.columns)
                            .data(DataFactory.ND.subjects.data), "", 2, 2
                        )
                        .setContent(0, 2, new MegaChart()
                            .chartType("LINE")
                            .domainAxisTitle("Simple Domain Title")
                            .valueAxisTitle("Simple Value Title")
                            .title("Simple MegaChart Title")
                            .columns(DataFactory.ND.subjects.columns)
                            .data(DataFactory.ND.subjects.data), "", 2, 2
                        )
                        .setContent(2, 0, new MegaChart()
                            .chartType("LINE")
                            .domainAxisTitle("Simple Domain Title")
                            .valueAxisTitle("Simple Value Title")
                            .title("Simple MegaChart Title")
                            .columns(DataFactory.ND.subjects.columns)
                            .data(DataFactory.ND.subjects.data), "", 2, 4
                        )
                    );
                });
            }
        },
        MultiChartPanel: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/composite/MultiChartPanel"], function (DataFactory, MultiChartPanel) {
                    callback(new MultiChartPanel()
                        .title("Hello and Welcome!")
                        // .description("Sample description for the chart being displayed...")
                        .columns(DataFactory.ND.subjects.columns)
                        .data(DataFactory.ND.subjects.data)
                    );
                });
            },
            choro: function (callback) {
                legacyRequire(["test/DataFactory", "src/composite/MultiChartPanel"], function (DataFactory, MultiChartPanel) {
                    var mc = new MultiChartPanel()
                        .chartType("CHORO_USSTATES")
                        // .legendPosition("bottom")
                        .title("US States Choropleth")
                        .columns(DataFactory.States.simple.columns)
                        .data(DataFactory.States.simple.data)
                        ;
                    callback(mc);
                });
            }
        }
    };

    return compositeFactory;
}));
