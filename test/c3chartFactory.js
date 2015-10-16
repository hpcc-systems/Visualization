"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        root.test_c3chartFactory = factory();
    }
}(this, function () {
    return {
        Bar: {
            simple: function (callback) {
                require(["test/DataFactory", "src/c3chart/Bar"], function (DataFactory, Bar) {
                    callback(new Bar()
                        .columns(DataFactory.ND.subjects.columns)
                        .data(DataFactory.ND.subjects.data)
                    );
                });
            },
        },
        Column: {
            simple: function (callback) {
                require(["test/DataFactory", "src/c3chart/Column"], function (DataFactory, Column) {
                    callback(new Column()
                        .columns(DataFactory.ND.subjects.columns)
                        .data(DataFactory.ND.subjects.data)
                    );
                });
            },
        },
        Donut: {
            simple: function (callback) {
                require(["test/DataFactory", "src/c3chart/Donut"], function (DataFactory, Donut) {
                    callback(new Donut()
                    .columns(DataFactory.TwoD.subjects.columns)
                    .data(DataFactory.TwoD.subjects.data)
                    );
                });
            }
        },
        Scatter: {
            simple: function (callback) {
                require(["test/DataFactory", "src/c3chart/Scatter"], function (DataFactory, Scatter) {
                    callback(new Scatter()
                    .columns(DataFactory.ND.subjects.columns)
                    .data(DataFactory.ND.subjects.data)
                    );
                });
            }
        },
        Line: {
            simple: function (callback) {
                require(["test/DataFactory", "src/c3chart/Line"], function (DataFactory, Line) {
                    callback(new Line()
                    .columns(DataFactory.ND.subjects.columns)
                    .data(DataFactory.ND.subjects.data)
                    );
                });
            }
        },
        Area: {
            simple: function (callback) {
                require(["test/DataFactory", "src/c3chart/Area"], function (DataFactory, Area) {
                    callback(new Area()
                    .columns(DataFactory.ND.subjects.columns)
                    .data(DataFactory.ND.subjects.data)
                    );
                });
            }
        },
        Pie: {
            simple: function (callback) {
                require(["test/DataFactory", "src/c3chart/Pie"], function (DataFactory, Pie) {
                    callback(new Pie()
                    .columns(DataFactory.TwoD.subjects.columns)
                    .data(DataFactory.TwoD.subjects.data)
                    );
                });
            }
        },
        Step: {
            simple: function (callback) {
                require(["test/DataFactory", "src/c3chart/Step"], function (DataFactory, Step) {
                    callback(new Step()
                    .columns(DataFactory.ND.subjects.columns)
                    .data(DataFactory.ND.subjects.data)
                    );
                });
            }
        },
        Gauge: {
            simple: function (callback) {
                require(["test/DataFactory", "src/c3chart/Gauge"], function (DataFactory, Gauge) {
                    callback(new Gauge()
                    .columns(DataFactory.OneD.subjects.columns)
                    .data(DataFactory.OneD.subjects.data)
                    );
                });
            }
        }
    };
}));
