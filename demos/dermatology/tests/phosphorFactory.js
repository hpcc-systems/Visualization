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
                legacyRequire(["test/DataFactory", "src/phosphor/DockPanel", "src/chart/Pie", "src/chart/MultiChartSurface", "src/chart/Line", "src/chart/Column", "src/chart/Step"], function (DataFactory, DockPanel, Pie, MultiChartSurface, Line, Column, Step) {
                    callback(new DockPanel()
                        .addWidget("Pie 1", new Pie().columns(DataFactory.TwoD.subjects.columns).data(DataFactory.TwoD.subjects.data))
                    );
                });
            },
            grid: function (callback) {
                legacyRequire(["test/DataFactory", "src/phosphor/DockPanel", "src/chart/Pie", "src/chart/MultiChartSurface", "src/chart/Line", "src/chart/Column", "src/chart/Step"], function (DataFactory, DockPanel, Pie, MultiChartSurface, Line, Column, Step) {
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
                    const surface1 = new MultiChartSurface()
                        .columns(DataFactory.ND.subjects.columns)
                        .data(DataFactory.ND.subjects.data);

                    callback(new DockPanel()
                        .addWidget("Pie 1", pie1)
                        .addWidget("Pie 2", pie2, "split-right", pie1)
                        .addWidget("Pie 3", pie3, "split-bottom", pie1)
                        .addWidget("Pie 4", pie4, "split-bottom", pie2)
                        .addWidget("Line", line1, "split-right")
                        .addWidget("Surface", surface1, "split-bottom")
                    );
                });
            }

        }
    };
}));
