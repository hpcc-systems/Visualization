﻿"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3-array", "d3-random", "@hpcc-js/common"], factory);
    }
}(this, function (d3Array, d3Random, hpccCommon) {
    var d3 = {
        random: {
            normal: d3Random.randomNormal
        },
        range: d3Array.range
    };
    var chartFactory = {
        HalfPie: {
            simple: function (callback) {
                legacyRequire(["src/chart/HalfPie"], function (HalfPie) {
                    callback(new HalfPie()
                        .columns(["Category", "Value 1", "Value 2"])
                        .data(Array(20).fill("").map(function (n, i) {
                            return [String.fromCharCode(65 + i), Math.random(), Math.random()];
                        }))
                    );
                });
            },
        },
        QuarterPie: {
            simple: function (callback) {
                legacyRequire(["src/chart/QuarterPie"], function (QuarterPie) {
                    callback(new QuarterPie()
                        .columns(["Category", "Value 1", "Value 2"])
                        .data(Array(20).fill("").map(function (n, i) {
                            return [String.fromCharCode(65 + i)+" extra label length", Math.random(), Math.random()];
                        }))
                    );
                });
            },
        },
        BubbleXY: {
            simple: function (callback) {
                legacyRequire(["src/chart/BubbleXY"], function (BubbleXY) {
                    callback(new BubbleXY()
                        .columns(["Category", "Value 1", "Value 2"])
                        .data(Array(20).fill("").map(function (n, i) {
                            return [String.fromCharCode(65 + i), Math.random(), Math.random()];
                        }))
                        .pointShape("circle")
                        .minPointSize(10)
                        .maxPointSize(30)
                    );
                });
            },
            col_1: function (callback) {
                legacyRequire(["src/chart/BubbleXY"], function (BubbleXY) {
                    callback(new BubbleXY()
                        .columns(["Category", "Value 1", "Value 2"])
                        .data(Array(20).fill("").map(function (n, i) {
                            return [String.fromCharCode(65 + i), Math.random(), Math.random()];
                        }))
                        .pointSizeColumn("Value 1")
                        .pointShape("rectangle")
                        .minPointSize(10)
                        .maxPointSize(30)
                    );
                });
            }
        },
        Radar: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/chart/Radar"], function (DataFactory, Radar) {
                    callback(new Radar()
                        .columns(DataFactory.Radar.columns)
                        .data(DataFactory.Radar.data)
                        .paletteID("Dark2")
                        .pointShape("circle")
                        .tooltipValueFormat(",.0f")
                    );
                });
            }
        },
        RadialBar: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/chart/RadialBar"], function (DataFactory, RadialBar) {
                    var radarBar = new RadialBar()
                        .columns(DataFactory.TwoD.subjects.columns)
                        .data(DataFactory.TwoD.subjects.data)
                        .valueDomainHigh(100)
                        ;
                    callback(radarBar);
                    setInterval(function () {
                        DataFactory.TwoD.subjects.data.forEach(function (row) {
                            row[1] = Math.random() * 100;
                        });
                        radarBar.render();
                    }, 3000);
                });
            },
            many_rows: function (callback) {
                legacyRequire(["test/DataFactory", "src/chart/RadialBar"], function (DataFactory, RadialBar) {
                    callback(new RadialBar()
                        .columns(DataFactory.Radar.columns)
                        .data(DataFactory.Radar.data)
                    );
                });
            }
        },
        Column: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/chart/Column"], function (DataFactory, Column) {
                    callback(new Column()
                        .columns(DataFactory.ND.subjects.columns)
                        .data(DataFactory.ND.subjects.data)
                    );
                });
            },
            customColor: function (callback) {
                legacyRequire(["test/DataFactory", "src/chart/Column"], function (DataFactory, Column) {
                    callback(new Column()
                        .columns(DataFactory.ND.subjects.columns)
                        .data(DataFactory.ND.subjects.data)
                        .overrideMethod("fillColor", function (row, column, value, orig) {
                            if (value < 0) return "red";
                            if (value < 80) return "grey";
                            return orig.apply(this, arguments);
                        })
                    );
                });
            },
            lineOverlay: function (callback) {
                legacyRequire(["test/DataFactory", "src/chart/XYAxis", "src/chart/Column", "src/chart/Area", "src/chart/Step"], function (DataFactory, XYAxis, Column, Area, Step) {
                    const columns = DataFactory.ND.subjects.columns;
                    const column = new XYAxis()
                        .columns(columns)
                        .data(DataFactory.ND.subjects.data)
                        ;
                    column._layers.push(new Column().columns([columns[1]]));
                    column._layers.push(new Area().columns([columns[2]]));
                    column._layers.push(new Step().columns([columns[3]]));
                    callback(column);
                });
            },
            longLabels: function (callback) {
                legacyRequire(["test/DataFactory", "src/chart/Column"], function (DataFactory, Column) {
                    callback(new Column()
                        .columns(DataFactory.ND.subjects.columns)
                        .data([
                            ["Geography Geography Geography\nGeography Geography", 75, 68, 65],
                            ["English English English\nEnglish English English", 45, 55, 52],
                            ["Math Math Math Math Math\nMath Math Math Math Math", 98, 92, 90],
                            ["Science Science Science\nScience Science Science", 66, 60, 72]
                        ])
                        .xAxisOverlapMode("wrap")
                        //.xAxisLabelRotation(45)
                    );
                });
            },
            bar: function (callback) {
                chartFactory.Column.simple(function (widget) {
                    widget.orientation("vertical");
                    callback(widget);
                });
            },
            ordinalRange: function (callback) {
                legacyRequire(["test/DataFactory", "src/chart/Column"], function (DataFactory, Column) {
                    callback(new Column()
                        .columns(DataFactory.ordinalRange.default.columns)
                        .data(DataFactory.ordinalRange.default.data)

                        .yAxisType("linear")
                        .xAxisType("ordinal")
                    );
                });
            },
            linear: function (callback) {
                legacyRequire(["test/DataFactory", "src/chart/Column"], function (DataFactory, Column) {
                    callback(new Column()
                        .columns(DataFactory.linear.default.columns)
                        .data(DataFactory.linear.default.data)

                        .xAxisType("linear")
                        .yAxisType("linear")
                    );
                });
            },
            timeX: function (callback) {
                legacyRequire(["test/DataFactory", "src/chart/Column"], function (DataFactory, Column) {
                    callback(new Column()
                        .columns(DataFactory.timeX.default.columns)
                        .data(DataFactory.timeX.default.data)

                        .xAxisType("time")
                        .xAxisTypeTimePattern("%Y-%m-%dT%H:%M:%S")
                        .yAxisType("linear")
                    );
                });
            },
            timeY: function (callback) {
                legacyRequire(["test/DataFactory", "src/chart/Column"], function (DataFactory, Column) {
                    callback(new Column()
                        .columns(DataFactory.timeY.default.columns)
                        .data(DataFactory.timeY.default.data)

                        .xAxisType("ordinal")
                        .yAxisType("time")
                        .yAxisTypeTimePattern("%Y-%m-%d")
                    );
                });
            },
        },
        Bar: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/chart/Bar"], function (DataFactory, Bar) {
                    callback(new Bar()
                        .columns(DataFactory.ND.subjects.columns)
                        .data(DataFactory.ND.subjects.data)
                    );
                });
            },
        },
        Gantt: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/chart/Gantt"], function (DataFactory, Gantt) {
                    callback(new Gantt()
                        .yAxisTypeTimePattern("%Y-%m-%d")
                        .columns(["Project", "Date Range"])
                        .data([
                            ["Docs", ["2012-09-09", "2012-10-09"]],
                            ["Coding", ["2011-08-09", "2012-09-09"]],
                            ["Specs", ["2010-07-09", "2011-08-09"]]
                        ])
                    );
                });
            }
        },
        Bubble: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/chart/Bubble"], function (DataFactory, Bubble) {
                    callback(new Bubble()
                        .columns(DataFactory.TwoD.subjects.columns)
                        .data(DataFactory.TwoD.subjects.data)
                    );
                });
            },
            customColor: function (callback) {
                legacyRequire(["test/DataFactory", "src/chart/Bubble"], function (DataFactory, Bubble) {
                    callback(new Bubble()
                        .columns(DataFactory.TwoD.subjects.columns)
                        .data(DataFactory.TwoD.subjects.data)
                        .overrideMethod("fillColor", function (row, column, value, orig) {
                            if (row[1] < 50) return "black";
                            if (row[1] > 80) return "lightgrey";
                            return orig.apply(this, arguments);
                        })
                    );
                });
            }
        },
        Scatter: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/chart/Scatter"], function (DataFactory, Scatter) {
                    callback(new Scatter()
                        .columns(DataFactory.ND.subjects.columns)
                        .data(DataFactory.ND.subjects.data)
                    );
                });
            }
        },
        Contour: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/chart/Contour"], function (DataFactory, Contour) {
                    var randomX = d3.random.normal(200, 80),
                        randomY = d3.random.normal(200, 80),
                        points = d3.range(2000).map(function () { return [randomX(), randomY()]; });

                    callback(new Contour()
                        .xAxisType("linear")
                        .yAxisType("linear")
                        .contourBandwidth(8)
                        .columns(DataFactory.ND.subjects.columns)
                        .data(points)
                    );
                });
            },
            legend: function (callback) {
                legacyRequire(["test/DataFactory", "src/composite/MultiChartPanel", "src/chart/Contour"], function (DataFactory, MultiChartPanel, Contour) {
                    var randomX = d3.random.normal(200, 80),
                        randomY = d3.random.normal(200, 80),
                        points = d3.range(2000).map(function () { return [randomX(), randomY()]; });
                    callback(new MultiChartPanel()
                        .title("src/chart/Contour.legend")
                        .columns(DataFactory.ND.subjects.columns)
                        .data(points)
                        .widget(
                            new Contour()
                                .xAxisType("linear")
                                .yAxisType("linear")
                        )
                    );
                });
            },
            layered: function (callback) {
                legacyRequire(["test/DataFactory", "src/chart/XYAxis", "src/chart/Contour", "src/chart/Scatter"], function (DataFactory, XYAxis, Contour, Scatter) {
                    var randomX = d3.random.normal(200, 80),
                        randomY = d3.random.normal(200, 80),
                        points = d3.range(2000).map(function () { return [randomX(), randomY()]; });
                    const xy = new XYAxis()
                        .xAxisType("linear")
                        .yAxisType("linear")
                        .columns(DataFactory.ND.subjects.columns)
                        .data(points)
                        ;
                    xy._layers.push(new Contour()
                        .contourStrokeColor("#777")
                        .contourBandwidth(15)
                    );
                    xy._layers.push(new Scatter()
                        .paletteID('Dark2')
                        .pointSize(3)
                        .pointShape("rectangle")
                    );
                    callback(xy);
                });
            }
        },
        HexBin: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/chart/HexBin"], function (DataFactory, HexBin) {
                    var randomX = d3.random.normal(200, 80),
                        randomY = d3.random.normal(200, 80),
                        points = d3.range(2000).map(function () { return [randomX(), randomY()]; });

                    callback(new HexBin()
                        .xAxisType("linear")
                        .yAxisType("linear")
                        .columns(DataFactory.ND.subjects.columns)
                        .data(points)
                    );
                });
            },
            legend: function (callback) {
                legacyRequire(["test/DataFactory", "src/composite/MultiChartPanel", "src/chart/HexBin"], function (DataFactory, MultiChartPanel, HexBin) {
                    var randomX = d3.random.normal(200, 80),
                        randomY = d3.random.normal(200, 80),
                        points = d3.range(2000).map(function () { return [randomX(), randomY()]; });
                    callback(new MultiChartPanel()
                        .title("src/chart/HexBin.legend")
                        .columns(DataFactory.ND.subjects.columns)
                        .data(points)
                        .widget(
                            new HexBin()
                                .xAxisType("linear")
                                .yAxisType("linear")
                        )
                    );
                });
            }
        },
        Line: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/chart/Line"], function (DataFactory, Line) {
                    callback(new Line()
                        .columns(DataFactory.ND.subjects.columns)
                        .data(DataFactory.ND.subjects.data)
                    );
                });
            },
            timeX: function (callback) {
                legacyRequire(["test/DataFactory", "src/chart/Line"], function (DataFactory, Line) {
                    callback(new Line()
                        .columns(DataFactory.timeX.default.columns)
                        .data(DataFactory.timeX.default.data)

                        .xAxisType("time")
                        .xAxisTypeTimePattern("%Y-%m-%dT%H:%M:%S")
                        .yAxisType("linear")
                    );
                });
            },
            cardinal_interpolation: function (callback) {
                legacyRequire(["test/DataFactory", "src/chart/Line"], function (DataFactory, Line) {
                    callback(new Line()
                        .columns(DataFactory.ND.subjects.columns)
                        .data(DataFactory.ND.subjects.data)
                        .interpolate("cardinal")
                    );
                });
            }
        },
        Area: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/chart/Area"], function (DataFactory, Area) {
                    callback(new Area()
                        .columns(DataFactory.ND.subjects.columns)
                        .data(DataFactory.ND.subjects.data)
                    );
                });
            }
        },
        Pie: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/chart/Pie"], function (DataFactory, Pie) {
                    callback(new Pie()
                        .columns(DataFactory.TwoD.subjects.columns)
                        .data(DataFactory.TwoD.subjects.data)
                    );
                });
            },
            heavy: function (callback) {
                legacyRequire(["test/DataFactory", "src/chart/Pie"], function (DataFactory, Pie) {
                    let data = Array(26).fill(1).map((n,i)=>{
                            return [
                                Array(15).fill(String.fromCharCode(i+65)).join(''),
                                i * 100
                            ]
                        });
                    data.sort(n=>Math.random()-0.5);
                    callback(new Pie()
                        .columns(DataFactory.TwoD.subjects.columns)
                        .data(data)
                    );
                });
            }
        },
        Step: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/chart/Step"], function (DataFactory, Step) {
                    callback(new Step()
                        .columns(DataFactory.ND.subjects.columns)
                        .data(DataFactory.ND.subjects.data)
                    );
                });
            }
        },
        Gauge: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/chart/Gauge"], function (DataFactory, Gauge) {
                    var gauge = new Gauge()
                        .title("My Gauge")
                        .titleDescription("@hpcc-js/chart")
                        .value(.66)
                        .valueDescription("Main")
                        .showTick(true)
                        .tickValue(.33)
                        .tickValueDescription("Average")
                        ;
                    callback(gauge);
                    setInterval(function () {
                        gauge
                            .value(Math.random())
                            .tickValue(Math.random())
                            .lazyRender()
                            ;
                    }, 3000);
                });
            }
        },
        Summary: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/chart/Summary"], function (DataFactory, Summary) {
                    callback(new Summary()
                        .columns(["Summary", "Score", "Details", "Status", "Icon"])
                        .data([
                            ["Elephants", 22, "<a href='http://www.google.com#q=Elephants'>Big an grey</a>", "grey", "fa-info-circle"],
                            ["Mice", 87, "<a href='http://www.google.com#q=Elephants'>Squeaky</a>", "red", "fa-briefcase"],
                            ["Sheep", 50, "<a href='http://www.google.com#q=Elephants'>Tasty</a>", "green", "fa-info-circle"],
                            ["People", 42, "<a href='http://www.google.com#q=Elephants'>Two Legs</a>", "orange", "fa-briefcase"]
                        ])
                        .iconColumn("Icon")
                        .labelColumn("Summary")
                        .valueColumn("Score")
                        .moreTextColumn("Details")
                        .moreTextHTML(true)
                        .colorFillColumn("Status")
                        .playInterval(1000)
                    );
                });
            }
        },
        SummaryC: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/chart/SummaryC"], function (DataFactory, SummaryC) {
                    callback(new SummaryC()
                        .columns(["Summary", "Score", "Details", "Status", "Icon"])
                        .data([
                            ["Elephants", 22, "<a href='http://www.google.com#q=Elephants'>Big an grey</a>", "grey", "fa-info-circle"],
                            ["Mice", 87, "<a href='http://www.google.com#q=Elephants'>Squeaky</a>", "red", "fa-briefcase"],
                            ["Sheep", 50, "<a href='http://www.google.com#q=Elephants'>Tasty</a>", "green", "fa-info-circle"],
                            ["People", 42, "<a href='http://www.google.com#q=Elephants'>Two Legs</a>", "orange", "fa-briefcase"]
                        ])
                        .iconColumn("Icon")
                        .labelColumn("Summary")
                        .valueColumn("Score")
                        .moreTextColumn("Details")
                        .moreTextHTML(true)
                        .colorFillColumn("Status")
                        .playInterval(1000)
                    );
                });
            }
        },
        MultiChart: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/chart/MultiChart"], function (DataFactory, MultiChart) {
                    callback(new MultiChart()
                        .columns(DataFactory.ND.subjects.columns)
                        .data(DataFactory.ND.subjects.data)
                    );
                });
            },
            dataBreach: function (callback) {
                legacyRequire(["test/DataFactory", "src/chart/MultiChart"], function (DataFactory, MultiChart) {
                    callback(new MultiChart()
                        .chartType("TABLE")
                        .chartTypeDefaults({
                            pagination: true
                        })
                        .columns(DataFactory.Sample.DataBreach.columns)
                        .data(DataFactory.Sample.DataBreach.data)
                    );
                });
            },
            flightPath: function (callback) {
                legacyRequire(["test/DataFactory", "src/chart/MultiChart"], function (DataFactory, MultiChart) {
                    callback(new MultiChart()
                        .chartType("TABLE")
                        .chartTypeDefaults({
                            pagination: true
                        })
                        .columns(DataFactory.Sample.FlightPath.columns)
                        .data(DataFactory.Sample.FlightPath.data)
                    );
                });
            },
            stockMarket: function (callback) {
                legacyRequire(["test/DataFactory", "src/chart/MultiChart"], function (DataFactory, MultiChart) {
                    callback(new MultiChart()
                        .chartType("TABLE")
                        .chartTypeDefaults({
                            pagination: true
                        })
                        .columns(DataFactory.Sample.StockMarket.columns)
                        .data(DataFactory.Sample.StockMarket.data)
                    );
                });
            }
        },
        MultiChartSurface: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/chart/MultiChartSurface"], function (DataFactory, MultiChartSurface) {
                    callback(new MultiChartSurface()
                        .columns(DataFactory.ND.subjects.columns)
                        .data(DataFactory.ND.subjects.data)
                    );
                });
            }
        },
        Axis: {
            ordinal: function (callback) {
                legacyRequire(["src/chart/Axis"], function (Axis) {
                    callback(new Axis()
                        .type("ordinal")
                        .ordinals(["Year 1", "Year 2", "Year 3", "Year 4"])
                    );
                });
            },
            longLabels: function (callback) {
                legacyRequire(["src/chart/Axis"], function (Axis) {
                    callback(new Axis()
                        .type("ordinal")
                        .ordinals(["Geography-Geography-Geography-Geography-Geography", "English-English-English-English-English-English", "Math-Math-Math-Math-Math-Math-Math-Math-Math-Math", "Science-Science-Science-Science-Science-Science"])
                    );
                });
            },
            linear: function (callback) {
                legacyRequire(["src/chart/Axis"], function (Axis) {
                    callback(new Axis()
                        .type("linear")
                        .low(0)
                        .high(100)
                    );
                });
            },
            time: function (callback) {
                legacyRequire(["src/chart/Axis"], function (Axis) {
                    callback(new Axis()
                        .type("time")
                        .low("2010-03-15")
                        .high("2012-01-14")
                    );
                });
            }
        },
        Bullet: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/chart/Bullet"], function (DataFactory, Bullet) {
                    callback(new Bullet()
                        .columns(["title", "subtitle", "ranges", "measures", "markers"])
                        .data([
                            ["Revenue", "US$, in thousands", [150, 225, 300], [220, 270], [250, 25]],
                            ["Profit  ", "%", [20, 25, 30], [21, 23], [26]],
                            ["Order Size", "US$, average", [350, 500, 600], [100, 320], [550]],
                            ["New Customers", "count", [1400, 2000, 2500], [1000, 1650], 2100],
                            ["Satisfaction", "out of 5", [3.5, 4.25, 5], [3.2, 4.7], [4.4]]
                        ])
                        .titleColumn("title")
                        .subtitleColumn("subtitle")
                        .rangesColumn("ranges")
                        .measuresColumn("measures")
                        .markersColumn("markers")
                    );
                });
            }
        },
        WordCloud: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/other/WordCloud"], function (DataFactory, WordCloud) {
                    var words = DataFactory.WordCloud.simple.words.map(function (d) {
                        return [d, 1 + Math.random() * 100];
                    });
                    callback(new WordCloud()
                        .columns(DataFactory.WordCloud.simple.columns)
                        .data(words)
                    );
                });
            }
        }
    };

    return chartFactory;
}));
