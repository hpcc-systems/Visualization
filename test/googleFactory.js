"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        root.test_googleFactory = factory();
    }
}(this, function () {
    return {
        Column: {
            simple: function (callback) {
                require(["test/DataFactory", "src/google/Column"], function (DataFactory, Column) {
                    callback(new Column()
                        .columns(DataFactory.ND.subjects.columns)
                        .data(DataFactory.ND.subjects.data)
                    );
                });
            }
        },
        Bar: {
            simple: function (callback) {
                require(["test/DataFactory", "src/google/Bar"], function (DataFactory, Bar) {
                    callback(new Bar()
                        .columns(DataFactory.ND.subjects.columns)
                        .data(DataFactory.ND.subjects.data)
                    );
                });
            },
            material: function (callback) {
                require(["test/DataFactory", "src/google/MaterialBar"], function (DataFactory, Bar) {
                    callback(new Bar()
                        .columns(DataFactory.ND.subjects.columns)
                        .data(DataFactory.ND.subjects.data)
                    );
                });
            }
        },
        Line: {
            simple: function (callback) {
                require(["test/DataFactory", "src/google/Line"], function (DataFactory, Line) {
                    callback(new Line()
                        .columns(DataFactory.ND.subjects.columns)
                        .data(DataFactory.ND.subjects.data)
                    );
                });
            }
        },
        Combo: {
            simple: function (callback) {
                require(["test/DataFactory", "src/google/Combo"], function (DataFactory, Combo) {
                    callback(new Combo()
                        .columns(DataFactory.ND.fivecolumn.columns)
                        .data(DataFactory.ND.fivecolumn.data)
                        .customSeries({2: {type: 'line'}})
                    );
                });
            }
        },
        Scatter: {
            simple: function (callback) {
                require(["test/DataFactory", "src/google/Scatter"], function (DataFactory, Scatter) {
                    callback(new Scatter()
                        .columns(DataFactory.ND.subjects.columns)
                        .data(DataFactory.ND.subjects.data)
                    );
                });
            }
        },
        Area: {
            simple: function (callback) {
                require(["test/DataFactory", "src/google/Area"], function (DataFactory, Area) {
                    callback(new Area()
                        .columns(DataFactory.ND.subjects.columns)
                        .data(DataFactory.ND.subjects.data)
                    );
                });
            }
        },
        Pie: {
            simple: function (callback) {
                require(["test/DataFactory", "src/google/Pie"], function (DataFactory, Pie) {
                    callback(new Pie()
                        .columns(DataFactory.TwoD.subjects.columns)
                        .data(DataFactory.TwoD.subjects.data)
                    );
                });
            }
        },
        Timeline: {
            simple: function (callback) {
                require(["test/DataFactory", "src/google/Timeline"], function (DataFactory, Timeline) {
                    callback(new Timeline()
                        .columns(DataFactory.Timeline.default.columns)
                        .data(DataFactory.Timeline.default.data)
                    );
                });
            }
        },
        TreeMap: {
            simple: function (callback) {
                require(["test/DataFactory", "src/google/TreeMap"], function (DataFactory, TreeMap) {
                    callback(new TreeMap()
                        .columns(DataFactory.TreeMap.default.columns)
                        .data(DataFactory.TreeMap.default.data)
                    );
                });
            }
        }
    };
}));
