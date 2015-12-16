"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        root.test_amchartFactory = factory();
    }
}(this, function (callback) {
    var amchartFactory = {
        Gantt: {
            simple: function (callback) {
                require(["test/DataFactory", "src/amchart/Gantt"], function (DataFactory, Gantt) {
                    callback(new Gantt()
                        .columns(DataFactory.ganttDateRanges.default.columns)
                        .data(DataFactory.ganttDateRanges.default.data)
                        .guides([{
                            "value": new Date("2014-06-13"),
                            "lineThickness": 4,
                            "lineColor": "#cc0000",
                            "label": "Guide #1",
                            "inside": true
                        },
                        {
                            "value": new Date("2014-07-13"),
                            "toValue": new Date("2014-08-13"),
                            "lineAlpha": 0.2,
                            "lineColor": "#00cc00",
                            "lineThickness": 3,
                            "fillAlpha": 0.1,
                            "fillColor": "#00cc00",
                            "label": "Guide #1",
                            "inside": false
                            }
                        ])
                    );
                });
            },
        },
        Bar: {
            simple: function (callback) {
                require(["test/DataFactory", "src/amchart/Bar"], function (DataFactory, Bar) {
                    callback(new Bar()
                        .columns(DataFactory.ND.subjects.columns)
                        .data(DataFactory.ND.subjects.data)

                        .yAxis(0).axisType("linear")
                        .xAxis(0).axisType("ordinal")
                    );
                });
            },
        },
        Column: {
            simple: function (callback) {
                require(["test/DataFactory", "src/amchart/Column"], function (DataFactory, Column) {
                    callback(new Column()
                        .columns(DataFactory.ND.subjects.columns)
                        .data(DataFactory.ND.subjects.data)

                        .yAxis(0)
                            .axisType("linear")
                        .xAxis(0)
                            .axisType("ordinal")
                    );
                });
            },
            multiY: function (callback) {
                require(["test/DataFactory", "src/amchart/Column"], function (DataFactory, Column) {
                    callback(new Column()
                        .columns(DataFactory.ND.subjects.columns)
                        .data(DataFactory.ND.subjects.data)

                        .yAxis(0)
                            .axisType("linear")
                        .yAxis(1)
                            .axisType("linear")
                        .yAxis(1)
                            .position("right") 
                        .y2([2,4])
                        .xAxis(0)
                            .axisType("ordinal")
                    );
                });
            },
            bar: function (callback) {
                amchartFactory.Column.simple(function (widget) {
                    callback(widget);
                });
            },
            ordinalRange: function (callback) {
                require(["test/DataFactory", "src/amchart/Column"], function (DataFactory, Column) {
                    callback(new Column()
                        .columns(DataFactory.ordinalRange.default.columns)
                        .data(DataFactory.ordinalRange.default.data)
                        .yAxis(0)
                            .axisType("linear")
                        .xAxis(0)
                            .axisType("ordinal")
                    );
                });
            },
            ordinalCandleOHLC: function (callback) {
                require(["test/DataFactory", "src/amchart/Column"], function (DataFactory, Column) {
                    callback(new Column()
                        .columns(DataFactory.ordinalCandleOHLC.default.columns)
                        .data(DataFactory.ordinalCandleOHLC.default.data)
                        .yAxis(0)
                            .axisType("linear")
                        .yAxis(0)
                            .axisType("ordinal")
                    );
                });
            },
            linear: function (callback) {
                require(["test/DataFactory", "src/amchart/Column"], function (DataFactory, Column) {
                    callback(new Column()
                        .columns(DataFactory.linear.default.columns)
                        .data(DataFactory.linear.default.data)
                        .xAxis(0).axisType("linear")
                        .yAxis(0).axisType("linear")
                    );
                });
            },
            timeX: function (callback) {
                require(["test/DataFactory", "src/amchart/Column"], function (DataFactory, Column) {
                    callback(new Column()
                        .columns(DataFactory.timeX.default.columns)
                        .data(DataFactory.timeX.default.data)

                        .axisMinPeriod("MM")
                        .xAxis(0).axisType("time")
                        .xAxis(0).axisTypeTimePattern("%Y-%m-%dT%H:%M:%S")
                        .yAxis(0).axisType("linear")
                    );
                });
            },
            timeY: function (callback) {
                require(["test/DataFactory", "src/amchart/Column"], function (DataFactory, Column) {
                    callback(new Column()
                        .columns(DataFactory.timeY.default.columns)
                        .data(DataFactory.timeY.default.data)

                        .axisMinPeriod("DD")
                        .xAxis(0).axisType("ordinal")
                        .yAxis(0).axisType("time")
                        .yAxis(0).axisTypeTimePattern("%Y-%m-%d")

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
                        .xAxis(0).axisType("linear")
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
            },
            timeX: function (callback) {
                require(["test/DataFactory", "src/amchart/Line"], function (DataFactory, Line) {
                    callback(new Line()
                        .columns(DataFactory.timeX.default.columns)
                        .data(DataFactory.timeX.default.data)
                        .xAxis(0).axisType("time")
                        .xAxis(0).axisTypeTimePattern("%Y-%m-%dT%H:%M:%S")
                        .yAxis(0).axisType("linear")
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
                        .tickAlpha(DataFactory.OneD.amgauge.tickAlpha)
                        .valueInterval(DataFactory.OneD.amgauge.valueInterval)
                        .axisAlpha(DataFactory.OneD.amgauge.axisAlpha)
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
