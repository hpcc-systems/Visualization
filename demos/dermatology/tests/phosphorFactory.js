"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        root.test_layoutFactory = factory();
    }
}(this, function () {
    return {
        DockPanel: {
            single: function (callback) {
                legacyRequire(["test/DataFactory", "src/phosphor/DockPanel", "src/chart/Pie"], function (DataFactory, DockPanel, Pie) {
                    callback(new DockPanel()
                        .addWidget(new Pie().columns(DataFactory.TwoD.subjects.columns).data(DataFactory.TwoD.subjects.data), "Pie 1")
                    );
                });
            },
            grid: function (callback) {
                legacyRequire(["test/DataFactory", "src/phosphor/DockPanel", "src/chart/Pie", "src/composite/MultiChartPanel", "src/chart/Line", "src/chart/Column", "src/chart/Step"], function (DataFactory, DockPanel, Pie, MultiChartPanel, Line, Column, Step) {
                    const pie1 = new Pie()
                        .columns(DataFactory.TwoD.subjects.columns)
                        .data(DataFactory.TwoD.subjects.data);
                    const pie2 = new Pie()
                        .columns(DataFactory.TwoD.subjects.columns)
                        .data(DataFactory.TwoD.subjects.data)
                        .paletteID("Dark2");
                    const pie3 = new Pie()
                        .columns(DataFactory.TwoD.subjects.columns)
                        .data(DataFactory.TwoD.subjects.data)
                        .paletteID("Paired");
                    const pie4 = new Pie()
                        .columns(DataFactory.TwoD.subjects.columns)
                        .data(DataFactory.TwoD.subjects.data)
                        .paletteID("Pastel2");
                    const line1 = new Line()
                        .columns(DataFactory.ND.subjects.columns)
                        .data(DataFactory.ND.subjects.data);
                    const multi1 = new MultiChartPanel()
                        .columns(DataFactory.ND.subjects.columns)
                        .data(DataFactory.ND.subjects.data);

                    callback(new DockPanel()
                        .addWidget(pie1, "Pie 1")
                        .addWidget(pie2, "Pie 2", "split-right", pie1)
                        .addWidget(pie3, "Pie 3", "split-bottom", pie1)
                        .addWidget(pie4, "Pie 4", "split-bottom", pie2)
                        .addWidget(line1, "Line", "split-right")
                        .addWidget(multi1, "MultiChartPanel", "split-bottom")
                    );
                });
            }
        }
    };
}));
