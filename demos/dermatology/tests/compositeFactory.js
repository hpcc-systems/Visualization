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
                        // .description("Sample description for the chart being displayed...")
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
                        // .description("Sample description for the chart being displayed...")
                        .columns(DataFactory.ND.subjects.columns)
                        .data(DataFactory.ND.subjects.data)
                    );
                });
            },
            with_form_button: function (callback) {
                legacyRequire(["test/DataFactory", "src/composite/MultiChartPanel", "src/form/Form", "src/form/Input"], function (DataFactory, MultiChartPanel, Form, Input) {
                    callback(new MultiChartPanel()
                        .title("Hello and Welcome!")
                        .columns(DataFactory.ND.subjects.columns)
                        .data(DataFactory.ND.subjects.data)
                        .buttons([
                            {
                                icon: "fa-filter",
                                type: "ToggleButton",
                                selected: false,
                                init(btn) {
                                    this._modal
                                        .title("Form Filtering")
                                        .show(true)
                                        .maxWidth("400px")
                                        .maxHeight("400px")
                                        .widget(new Form()
                                            .inputs([
                                                new Input()
                                                    .name("textbox-test")
                                                    .label("Alphanumeric")
                                                    .type("text"),
                                                new Input()
                                                    .name("textbox-test")
                                                    .label("Alphanumeric2")
                                                    .type("text")
                                            ])
                                        )
                                        .render(n => {
                                            n.resize().render();
                                        });
                                    this._modal._close = function () {
                                        btn.selected(false).render();
                                    };
                                },
                                on(btn) {
                                    this._modal.show(true).showPreview(false).render(n => {
                                        n.resize().render();
                                    });
                                },
                                off(btn) {
                                    this._modal.show(false).render();
                                },
                                mouseenter(btn) {
                                    this._modal.showPreview(true).render(n => {
                                        n.resize().render();
                                    });
                                },
                                mouseleave(btn) {
                                    if (this._modal.showPreview()) {
                                        this._modal.show(false).showPreview(false).render();
                                    }
                                },
                            }
                        ])
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
