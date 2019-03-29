"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        root.test_compositeFactory = factory();
    }
}(this, function () {
    var compositeFactory = {
        ChartSeries: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory","src/composite/ChartSeries"], function (DataFactory, ChartSeries) {
                    var w = new ChartSeries()
                        .chartType("Area")
                        .prependMissingData(true)
                        .columns(DataFactory.ND.heavyTobaccoUse.columns)
                        .data(DataFactory.ND.heavyTobaccoUse.data)
                        ;
                    callback(w);
                });
            }
        },
        Horizon: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory","src/composite/Horizon"], function (DataFactory, Horizon) {
                    var w = new Horizon()
                        .columns(DataFactory.ND.heavyTobaccoUse.columns)
                        .data(DataFactory.ND.heavyTobaccoUse.data.slice(0,5).map(row=>{
                            return [row[0],...row.slice(1).map((n,i,arr)=>{
                                return i > 0 ? parseFloat((n - arr[i-1]).toFixed(2)) : 0;
                            })];
                        }))
                        ;
                    callback(w);
                });
            }
        },
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
                        .description("Sample description for the chart being displayed...")
                        .columns(DataFactory.ND.subjects.columns)
                        .data(DataFactory.ND.subjects.data)
                    );
                });
            },
            progress_bar: function (callback) {
                legacyRequire(["test/DataFactory", "src/composite/MultiChartPanel", "src/other/Html"], function (DataFactory, MultiChartPanel, Html) {
                    callback(new MultiChartPanel()
                        .title("My Multi Chart Panel")
                        .widget(new Html()
                            .html(
                                '<div id="that_example_div" style="display:inline-block;position:relative;height:100px;line-height:100px;width:320px;border:1px solid black;">That</div><br/>' +
                                '<button style="font-size: 14px;margin-top:8px;width:320px" onclick="app._main.startProgress();">ChartPanel.startProgress()</button><br/>' +
                                '<button style="font-size: 14px;margin-top:8px;width:320px" onclick="app._main.finishProgress();">ChartPanel.finishProgress()</button><br/>'
                            )
                        )
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
