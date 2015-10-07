"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        root.test_amchartFactory = factory();
    }
}(this, function (callback) {
    var amchartFactory = {
        Bar: {
            simple: function (callback) {
                require(["test/DataFactory", "src/amchart/Bar"], function (DataFactory, Bar) {
                    callback(new Bar()
                        .columns(DataFactory.ND.subjects.columns)
                        .data(DataFactory.ND.subjects.data)

                        .yAxisType("linear")
                        .xAxisType("ordinal")
                    );
                });
            },
            bar: function (callback) {
                amchartFactory.Bar.simple(function (widget) {
                    widget.orientation("vertical");
                    callback(widget);
                });
            },
            ordinalRange: function (callback) {
                require(["test/DataFactory", "src/amchart/Bar"], function (DataFactory, Bar) {
                    callback(new Bar()
                        .columns(DataFactory.ordinalRange.default.columns)
                        .data(DataFactory.ordinalRange.default.data)
                        
                        .yAxisType("linear")
                        .xAxisType("ordinal")
                    );
                });
            },
            ordinalCandleOHLC: function (callback) {
                require(["test/DataFactory", "src/amchart/Bar"], function (DataFactory, Bar) {
                    callback(new Bar()
                        .columns(DataFactory.ordinalCandleOHLC.default.columns)
                        .data(DataFactory.ordinalCandleOHLC.default.data)
                        
                        .yAxisType("linear")
                        .xAxisType("ordinal")
                    );
                });
            },
            linear: function (callback) {
                require(["test/DataFactory", "src/amchart/Bar"], function (DataFactory, Bar) {
                    callback(new Bar()
                        .columns(DataFactory.linear.default.columns)
                        .data(DataFactory.linear.default.data)
                        
                        .xAxisType("linear")
                        .yAxisType("linear")
                    );
                });
            },
            timeX: function (callback) {
                require(["test/DataFactory", "src/amchart/Bar"], function (DataFactory, Bar) {
                    callback(new Bar()
                        .columns(DataFactory.timeX.default.columns)
                        .data(DataFactory.timeX.default.data)
                        
                        .xAxisType("time")
                        .xAxisTypeTimePattern("%Y-%m-%dT%H:%M:%S")
                        .yAxisType("linear")
                    );
                });
            },
            timeY: function (callback) {
                require(["test/DataFactory", "src/amchart/Bar"], function (DataFactory, Bar) {
                    callback(new Bar()
                        .columns(DataFactory.timeY.default.columns)
                        .data(DataFactory.timeY.default.data)
                        
                        .xAxisType("ordinal")
                        .yAxisType("time")
                        .yAxisTypeTimePattern("%Y-%m-%d")
                    );
                });
            },
        },
        Scatter: {
            simple: function (callback) {
                require(["test/DataFactory", "src/amchart/Scatter"], function (DataFactory, Scatter) {
                    callback(new Scatter()
                        .columns(DataFactory.ND.subjects.columns)
                        .data(DataFactory.ND.subjects.data)
                    );
                });
            },
            Bubble: function (callback) {
                require(["test/DataFactory", "src/amchart/Scatter"], function (DataFactory, Scatter) {
                    callback(new Scatter()
                        .columns(DataFactory.ND.subjects.columns)
                        .data(DataFactory.ND.subjects.data)

                        .scatterType("bubble")
                    );
                });
            },
            linear: function (callback) {
                require(["test/DataFactory", "src/amchart/Scatter"], function (DataFactory, Scatter) {
                    callback(new Scatter()
                        .columns(DataFactory.scatterLinear.default.columns)
                        .data(DataFactory.scatterLinear.default.data)
                        
                        .xAxisType("linear")
                    );
                });
            },
        },
        Line: {
            simple: function (callback) {
                require(["test/DataFactory", "src/amchart/Line"], function (DataFactory, Line) {
                    callback(new Line()
                        .columns(DataFactory.ND.subjects.columns)
                        .data(DataFactory.ND.subjects.data)
                    );
                });
            }
        },
        Area: {
            simple: function (callback) {
                require(["test/DataFactory", "src/amchart/Area"], function (DataFactory, Area) {
                    callback(new Area()
                        .columns(DataFactory.ND.subjects.columns)
                        .data(DataFactory.ND.subjects.data)
                    );
                });
            }
        },
        Pie: {
            simple: function (callback) {
                require(["test/DataFactory", "src/amchart/Pie"], function (DataFactory, Pie) {
                    callback(new Pie()
                        .columns(DataFactory.ND.subjects.columns)
                        .data(DataFactory.ND.subjects.data)
                    );
                });
            }
        },
        Gauge: {
            simple: function (callback) {
                require(["test/DataFactory", "src/amchart/Gauge"], function (DataFactory, Gauge) {
                    callback(new Gauge()
                        .numBands(DataFactory.OneD.amgauge.numBands)
                        .bandsColor(DataFactory.OneD.amgauge.bandsColor)
                        .bandsEndValue(DataFactory.OneD.amgauge.bandsEndValue)
                        .bandsStartValue(DataFactory.OneD.amgauge.bandsStartValue)
                        .bandsInnerRadius(DataFactory.OneD.amgauge.bandsInnerRadius)
                        .bottomText(DataFactory.OneD.amgauge.bottomText)
                        .high(DataFactory.OneD.amgauge.high)
                        .low(DataFactory.OneD.amgauge.low)
                        .data(DataFactory.OneD.amgauge.data)
                        .axisLineWidth(DataFactory.OneD.amgauge.axisLineWidth)
                        .axisAlpha(DataFactory.OneD.amgauge.axisAlpha)
                        .tickAlpha(DataFactory.OneD.amgauge.tickAlpha)
                        .valueInterval(DataFactory.OneD.amgauge.valueInterval)
                    );
                });
            }
        },
        Pyramid: {
            simple: function (callback) {
                require(["test/DataFactory", "src/amchart/Pyramid"], function (DataFactory, Pyramid) {
                    callback(new Pyramid()
                        .columns(DataFactory.ND.subjects.columns)
                        .data(DataFactory.ND.subjects.data)
                    );
                });
            }
        },
        Polar: {
            simple: function (callback) {
                require(["test/DataFactory", "src/amchart/Polar"], function (DataFactory, Polar) {
                    callback(new Polar()
                        .columns(DataFactory.ND.ampolar.columns)
                        .data(DataFactory.ND.ampolar.data)
                    );
                });
            }
        },
        Funnel: {
            simple: function (callback) {
                require(["test/DataFactory", "src/amchart/Funnel"], function (DataFactory, Funnel) {
                    callback(new Funnel()
                        .columns(DataFactory.ND.subjects.columns)
                        .data(DataFactory.ND.subjects.data)
                    );
                });
            }
        }
    };
    return amchartFactory;
}));
