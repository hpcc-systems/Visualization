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
        ChartPanel: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/composite/ChartPanel", "src/chart/Column"], function (DataFactory, ChartPanel, Column) {
                    callback(new ChartPanel()
                        .widget(new Column())
                        .title("Hello and Welcome!")
                        .description("Sample description for the chart being displayed...")
                        .columns(DataFactory.ND.subjects.columns)
                        .data(DataFactory.ND.subjects.data)
                    );
                });
            },
            choro: function (callback) {
                legacyRequire(["test/DataFactory", "src/composite/ChartPanel"], function (DataFactory, ChartPanel) {
                    var mc = new ChartPanel()
                        .chartType("CHORO_USSTATES")
                        // .legendPosition("bottom")
                        .title("US States Choropleth")
                        .columns(DataFactory.States.simple.columns)
                        .data(DataFactory.States.simple.data)
                        ;
                    callback(mc);
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
                        .title("")
                        .widget(new Html()
                            .html(
                            '<div id="that_example_div" style="display:inline-block;position:relative;height:100px;line-height:100px;width:320px;border:1px solid black;">That</div><br/>' +
                            '<button style="font-size: 14px;margin-top:8px;width:320px" onclick="app._main.startMyProgress();">ChartPanel.startMyProgress()</button><br/>' +
                            '<button style="font-size: 14px;margin-top:8px;width:320px" onclick="app._main.finishMyProgress();">ChartPanel.finishMyProgress()</button><br/>' +
                            '<button style="font-size: 14px;margin-top:8px;width:320px" onclick="app._main.exitMyProgress();">ChartPanel.exitMyProgress()</button><br/>' +
                            '<button style="font-size: 14px;margin-top:8px;width:320px" onclick="app._main.startThatProgress(document.getElementById(&apos;that_example_div&apos;));">ChartPanel.startThatProgress(HTMLElement)</button><br/>' +
                            '<button style="font-size: 14px;margin-top:8px;width:320px" onclick="app._main.finishThatProgress(document.getElementById(&apos;that_example_div&apos;));">ChartPanel.finishThatProgress(HTMLElement)</button><br/>' +
                            '<button style="font-size: 14px;margin-top:8px;width:320px" onclick="app._main.exitProgress(document.getElementById(&apos;that_example_div&apos;));">ChartPanel.exitProgress(HTMLElement)</button><br/>'
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
