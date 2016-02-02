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
                        }])
                    );
                });
            },
        },
        Combo: {
            simple: function (callback) {
                require(["test/DataFactory", "src/amchart/Combo"], function (DataFactory, Combo) {
                    callback(new Combo()
                        .columns(DataFactory.ND.subjects.columns)
                        .data(DataFactory.ND.subjects.data)
                        .types(["column","column","line"])
                        // .yAxisType("linear")
                        // .xAxisType("ordinal")
                    );
                });
            }
        },
        Bar: {
            simple: function (callback) {
                require(["test/DataFactory", "src/amchart/Bar"], function (DataFactory, Bar) {
                    var bar = new Bar()
                        .columns(DataFactory.ND.subjects.columns)
                        .data(DataFactory.ND.subjects.data)
                    ;
                    bar.yAxis(0).axisType("linear");
                    bar.xAxis(0).axisType("ordinal");
                    callback(bar);
                });
            },
        },
        Column: {
            simple: function (callback) {
                require(["test/DataFactory", "src/amchart/Column"], function (DataFactory, Column) {
                    var col = new Column()
                        .columns(DataFactory.ND.subjects.columns)
                        .data(DataFactory.ND.subjects.data)
                    ;
                    col.backwardsCompatible(false);
                    col.yAxis(0)
                        .axisType("linear")
                        .axisType("ordinal");
                    col.xAxis(0)
                    callback(col);
                });
            },
            multiY: function (callback) {
                require(["test/DataFactory", "src/amchart/Column"], function (DataFactory, Column) {
                    var col = new Column()
                        .columns(DataFactory.ND.subjects.columns)
                        .data(DataFactory.ND.subjects.data)
                        .y2([2, 4])
                    ;
                    col.xAxis(0).axisType("ordinal");
                    col.yAxis(0).axisType("linear");
                    col.yAxis(1).axisType("linear");
                    col.yAxis(1).position("right")  ; 
                    callback(col);
                });
            },
            bar: function (callback) {
                amchartFactory.Column.simple(function (widget) {
                    callback(widget);
                });
            },
            ordinalRange: function (callback) {
                require(["test/DataFactory", "src/amchart/Column"], function (DataFactory, Column) {
                    var col = new Column()
                        .columns(DataFactory.ordinalRange.default.columns)
                        .data(DataFactory.ordinalRange.default.data)
                    ;
                    col.xAxis(0).axisType("ordinal");
                    col.yAxis(0).axisType("linear");
                    callback(col);
                });
            },
            ordinalCandleOHLC: function (callback) {
                require(["test/DataFactory", "src/amchart/Column"], function (DataFactory, Column) {
                    var col = new Column()
                        .columns(DataFactory.ordinalCandleOHLC.default.columns)
                        .data(DataFactory.ordinalCandleOHLC.default.data)
                    ;
                    col.yAxis(0)
                        .axisType("linear")
                        .axisType("ordinal")
                    ;
                    callback(col);
                });
            },
            linear: function (callback) {
                require(["test/DataFactory", "src/amchart/Column"], function (DataFactory, Column) {
                    var col = new Column()
                        .columns(DataFactory.linear.default.columns)
                        .data(DataFactory.linear.default.data)
                    ;
                    col.xAxis(0).axisType("linear");
                    col.yAxis(0).axisType("linear");
                    callback(col);
                });
            },
            timeX: function (callback) {
                require(["test/DataFactory", "src/amchart/Column"], function (DataFactory, Column) {
                    var col = new Column()
                        .columns(DataFactory.timeX.default.columns)
                        .data(DataFactory.timeX.default.data)
                        .axisMinPeriod("MM")
                    ;
                    col.xAxis(0)
                        .axisType("time")
                        .axisTypeTimePattern("%Y-%m-%dT%H:%M:%S")
                    ;
                    col.yAxis(0).axisType("linear");
                    callback(col);
                });
            },
            timeY: function (callback) {
                require(["test/DataFactory", "src/amchart/Column"], function (DataFactory, Column) {
                    var col = new Column()
                        .columns(DataFactory.timeY.default.columns)
                        .data(DataFactory.timeY.default.data)
                        .axisMinPeriod("DD")
                    ;
                    col.xAxis(0).axisType("ordinal");
                    col.yAxis(0)
                        .axisType("time")
                        .axisTypeTimePattern("%Y-%m-%d")
                    ;
                    callback(col);
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
                    var scatter = new Scatter()
                        .columns(DataFactory.scatterLinear.default.columns)
                        .data(DataFactory.scatterLinear.default.data)
                    ;
                    scatter.xAxis(0).axisType("linear");
                    callback(scatter);
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
                    var line = new Line()
                        .columns(DataFactory.timeX.default.columns)
                        .data(DataFactory.timeX.default.data)
                    ;
                    line.xAxis(0)
                        .axisType("time")
                        .axisTypeTimePattern("%Y-%m-%dT%H:%M:%S")
                    ;
                    line.yAxis(0).axisType("linear");
                    callback(line);
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
