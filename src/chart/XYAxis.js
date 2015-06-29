"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/SVGWidget", "css!./XYAxis"], factory);
    } else {
        root.chart_XYAxis = factory(root.d3, root.common_SVGWidget);
    }
}(this, function (d3, SVGWidget) {
    function XYAxis(target) {
        SVGWidget.call(this);
        this._drawStartPos = "origin";

        this._dateParser = d3.time.format("%Y-%m-%d").parse;
    }
    XYAxis.prototype = Object.create(SVGWidget.prototype);
    XYAxis.prototype._class += " chart_XYAxis";

    XYAxis.prototype.publish("sampleData", "", "set", "Display Sample Data", ["", "ordinal", "linear", "time"]);

    XYAxis.prototype.publish("orientation", "horizontal", "set", "Selects orientation for the axis", ["horizontal", "vertical"]);
    XYAxis.prototype.publish("valueAxisPadding", 5, "number", "Value Axis Padding Percent");

    XYAxis.prototype.publish("selectionMode", false, "boolean", "Range Selector");
    XYAxis.prototype.publish("xAxisType", "ordinal", "set", "X-Axis Type", ["ordinal", "linear", "time"]);
    XYAxis.prototype.publish("timeseriesPattern", "%Y-%m-%d", "string", "Time Series Pattern");

    XYAxis.prototype._sampleData = XYAxis.prototype.sampleData;
    XYAxis.prototype.sampleData = function (_) {
        var retVal = XYAxis.prototype._sampleData.apply(this, arguments);
        if (arguments.length) {
            switch (_) {
                case "ordinal":
                    this.testDataOrdinal();
                    break;
                case "linear":
                    this.testDataLinear();
                    break;
                case "time":
                    this.testDataTime();
                    break;
            }
        }
        return retVal;
    };

    //  Data ---
    XYAxis.prototype.testData = function () {
        this.sampleData("ordinal");
        return this;
    };

    XYAxis.prototype.testDataOrdinal = function () {
        this
            .xAxisType("ordinal")
            .columns(["Subject", "2nd Year"])
            .data([
                ["Geography", 75],
                ["English", 45],
                ["Math", 98],
                ["Science", 66]
            ])
        ;
        return this;
    };

    XYAxis.prototype.testDataLinear = function () {
        this
            .xAxisType("linear")
            .columns(["Subject", "2nd Year"])
            .data([
                [10, 75],
                [13, 45],
                [14, 45],
                [15, 85],
                [16, 98],
                [19, 66]
            ])
        ;
        return this;
    };

    XYAxis.prototype.testDataTime = function () {
        var rawData = [{ "DateTime": "2014-06-01T07:01:39", "Price": 821 }, { "DateTime": "2015-12-01T01:33:35", "Price": 841 }, { "DateTime": "2015-12-25T23:58:34", "Price": 1356 }, { "DateTime": "2015-05-16T17:02:17", "Price": 1136 }, { "DateTime": "2015-09-11T10:37:50", "Price": 1094 }, { "DateTime": "2014-11-03T21:34:47", "Price": 1266 }, { "DateTime": "2015-11-05T12:31:45", "Price": 1159 }, { "DateTime": "2014-11-27T16:25:57", "Price": 1572 }, { "DateTime": "2015-12-26T15:13:48", "Price": 1083 }, { "DateTime": "2014-06-18T16:21:06", "Price": 1324 }, { "DateTime": "2014-05-13T05:35:12", "Price": 1553 }, { "DateTime": "2014-06-01T20:40:50", "Price": 1216 }, { "DateTime": "2015-07-15T07:19:39", "Price": 1403 }, { "DateTime": "2016-03-17T09:32:59", "Price": 1382 }, { "DateTime": "2015-05-28T02:24:27", "Price": 1337 }, { "DateTime": "2015-08-08T18:46:00", "Price": 1084 }, { "DateTime": "2015-10-25T15:42:48", "Price": 1217 }, { "DateTime": "2016-01-07T00:48:47", "Price": 1464 }, { "DateTime": "2015-12-13T23:21:16", "Price": 894 }, { "DateTime": "2014-06-13T22:49:52", "Price": 967 }, { "DateTime": "2015-01-07T20:33:03", "Price": 1033 }, { "DateTime": "2015-02-28T10:08:16", "Price": 1119 }, { "DateTime": "2015-11-09T15:33:56", "Price": 1298 }, { "DateTime": "2015-04-18T00:05:19", "Price": 808 }, { "DateTime": "2016-04-19T04:09:19", "Price": 1331 }, { "DateTime": "2015-11-26T05:03:53", "Price": 1221 }, { "DateTime": "2014-09-17T08:59:31", "Price": 1450 }, { "DateTime": "2016-03-29T15:34:22", "Price": 1403 }, { "DateTime": "2015-09-13T13:46:01", "Price": 1088 }, { "DateTime": "2014-12-04T20:41:36", "Price": 1503 }, { "DateTime": "2015-06-19T12:43:51", "Price": 1350 }, { "DateTime": "2014-05-21T12:58:46", "Price": 874 }, { "DateTime": "2016-02-11T07:48:56", "Price": 1519 }, { "DateTime": "2015-02-23T22:35:44", "Price": 1383 }, { "DateTime": "2015-11-28T11:35:45", "Price": 928 }, { "DateTime": "2016-01-17T10:27:12", "Price": 941 }, { "DateTime": "2015-02-04T07:17:50", "Price": 1076 }, { "DateTime": "2016-04-11T08:28:10", "Price": 907 }, { "DateTime": "2015-02-27T15:02:35", "Price": 1263 }, { "DateTime": "2016-03-23T15:54:53", "Price": 911 }, { "DateTime": "2014-09-26T19:15:38", "Price": 1076 }, { "DateTime": "2015-10-15T15:13:47", "Price": 1052 }, { "DateTime": "2015-04-07T13:22:52", "Price": 1481 }, { "DateTime": "2016-01-31T11:15:52", "Price": 1248 }, { "DateTime": "2014-11-20T09:46:51", "Price": 1360 }, { "DateTime": "2015-10-19T15:05:26", "Price": 1094 }, { "DateTime": "2016-04-30T09:54:01", "Price": 1552 }, { "DateTime": "2015-06-07T23:49:49", "Price": 1329 }, { "DateTime": "2015-07-10T20:12:46", "Price": 801 }, { "DateTime": "2014-12-22T19:11:04", "Price": 1066 }, { "DateTime": "2015-12-07T17:03:07", "Price": 1032 }, { "DateTime": "2015-11-30T13:11:22", "Price": 1546 }, { "DateTime": "2014-06-29T07:24:44", "Price": 1042 }, { "DateTime": "2014-08-03T08:15:25", "Price": 1326 }, { "DateTime": "2015-09-01T20:32:23", "Price": 928 }, { "DateTime": "2016-05-02T12:56:47", "Price": 1550 }, { "DateTime": "2014-11-18T04:38:21", "Price": 972 }, { "DateTime": "2016-05-03T01:05:51", "Price": 1164 }, { "DateTime": "2015-02-03T17:16:07", "Price": 998 }, { "DateTime": "2015-09-04T21:29:16", "Price": 1199 }, { "DateTime": "2015-12-02T10:44:32", "Price": 1250 }, { "DateTime": "2016-01-26T16:11:51", "Price": 1241 }, { "DateTime": "2015-05-30T12:42:11", "Price": 1336 }, { "DateTime": "2014-09-11T10:19:44", "Price": 1231 }, { "DateTime": "2016-04-06T05:54:55", "Price": 1276 }, { "DateTime": "2016-02-18T00:29:49", "Price": 939 }, { "DateTime": "2014-11-16T15:35:04", "Price": 1557 }, { "DateTime": "2015-12-10T03:06:01", "Price": 1292 }, { "DateTime": "2015-05-31T04:19:33", "Price": 1347 }, { "DateTime": "2014-10-08T17:26:41", "Price": 1041 }, { "DateTime": "2015-01-13T10:43:21", "Price": 1089 }, { "DateTime": "2015-04-14T04:05:10", "Price": 999 }, { "DateTime": "2015-10-05T11:47:54", "Price": 1520 }, { "DateTime": "2015-06-26T00:22:00", "Price": 1342 }, { "DateTime": "2015-05-13T14:32:54", "Price": 976 }, { "DateTime": "2015-07-13T19:13:18", "Price": 1576 }, { "DateTime": "2014-05-17T21:59:02", "Price": 1220 }, { "DateTime": "2015-03-15T07:15:00", "Price": 1230 }, { "DateTime": "2015-02-22T22:04:01", "Price": 1510 }, { "DateTime": "2015-11-26T06:03:07", "Price": 816 }, { "DateTime": "2014-07-02T20:20:52", "Price": 1343 }, { "DateTime": "2015-07-14T13:10:03", "Price": 1285 }, { "DateTime": "2015-11-01T03:18:14", "Price": 1424 }, { "DateTime": "2015-03-17T12:04:38", "Price": 1109 }, { "DateTime": "2015-11-19T05:47:16", "Price": 1278 }, { "DateTime": "2015-11-12T09:03:53", "Price": 841 }, { "DateTime": "2014-10-17T18:37:00", "Price": 1425 }, { "DateTime": "2015-09-27T04:37:49", "Price": 1555 }, { "DateTime": "2015-07-30T04:01:21", "Price": 1222 }, { "DateTime": "2015-02-11T17:59:08", "Price": 1464 }, { "DateTime": "2014-09-13T19:57:59", "Price": 1271 }, { "DateTime": "2015-03-25T10:55:59", "Price": 1397 }, { "DateTime": "2014-07-13T09:36:47", "Price": 915 }, { "DateTime": "2015-02-15T10:49:48", "Price": 1015 }, { "DateTime": "2014-10-24T08:50:59", "Price": 835 }, { "DateTime": "2016-01-14T18:23:43", "Price": 1088 }, { "DateTime": "2016-03-05T04:11:37", "Price": 1573 }, { "DateTime": "2014-08-09T06:02:06", "Price": 1504 }, { "DateTime": "2015-05-25T07:47:41", "Price": 1326 }, { "DateTime": "2016-02-11T06:53:58", "Price": 1525 }];
        rawData.sort(function (l, r) {
            if (l.DateTime > r.DateTime) {
                return 1;
            }
            if (l.DateTime < r.DateTime) {
                return -1;
            }
            return 0;
        });
        return this
            .columns(["Date", "Price"])
            .xAxisType("time")
            .timeseriesPattern("%Y-%m-%dT%H:%M:%S")
            .data(rawData.map(function (row) { return [row.DateTime, row.Price]; }))
        ;
    };

    var timeseriesPattern = XYAxis.prototype.timeseriesPattern;
    XYAxis.prototype.timeseriesPattern = function (_) {
        var retVal = timeseriesPattern.apply(this, arguments);
        if (arguments.length) {
            this._dateParser = d3.time.format(_).parse;
        }
        return retVal;
    };

    XYAxis.prototype.columns = function (_) {
        return SVGWidget.prototype.columns.apply(this, arguments);
    };

    XYAxis.prototype.data = function (_) {
        var retVal = SVGWidget.prototype.data.apply(this, arguments);
        if (!arguments.length) {
            switch (this.xAxisType()) {
                case "time":
                    retVal = retVal.map(function (row) {
                        return row.map(function (cell, idx) { return idx === 0 ? this._dateParser(cell) : cell; }, this);
                    }, this);
                    break;
            }
        }
        return retVal;
    };

    XYAxis.prototype.enter = function (domNode, element) {
        this.dataAxis = d3.svg.axis()
            .orient("bottom")
        ;

        this.valueAxis = d3.svg.axis()
            .orient("left")
            .tickFormat(d3.format(".2s"))
            .ticks(10)
        ;

        this.svg = element.append("g");
        this.svgData = this.svg.append("g");
        this.svgXAxis = this.svg.append("g");
        this.svgYAxis = this.svg.append("g");

        //  Brush  ---
        this.svgBrush = element.append("g")
            .attr("class", "brush")
        ;
        var context = this;
        this.xBrush = d3.svg.brush()
            .on("brush", function () {
                return context.brushMoved.apply(context, arguments);
            })
        ;
        this.yBrush = d3.svg.brush()
            .on("brush", function () {
                return context.brushMoved.apply(context, arguments);
            })
        ;
    };

    XYAxis.prototype.resizeBrushHandle = function (d, width, height) {
        var e, x, y;
        if (d === "e" || d === "w") {
            e = +(d === "e");
            x = e ? 1 : -1;
            y = height / 3;
            return "M" + (0.5 * x) + "," + y +
                "A6,6 0 0 " + e + " " + (6.5 * x) + "," + (y + 6) +
                "V" + (2 * y - 6) +
                "A6,6 0 0 " + e + " " + (0.5 * x) + "," + (2 * y) +
                "Z" +
                "M" + (2.5 * x) + "," + (y + 8) +
                "V" + (2 * y - 8) +
                "M" + (4.5 * x) + "," + (y + 8) +
                "V" + (2 * y - 8);
        } else {
            e = +(d === "s");
            y = e ? 1 : -1;
            x = width / 3;
            return "M" + x + ", " + (0.5 * y) +
                "A6,6 0 0 " + (e + 1) % 2 + " " + (x + 6) + "," + (6.5 * y) +
                "H" + (2 * x - 6) +
                "A6,6 0 0 " + (e + 1) % 2 + " " + (2 * x) + "," + (0.5 * y) +
                "Z" +
                "M" + (x + 8) + "," + (2.5 * y) +
                "H" + (2 * x - 8) +
                "M" + (x + 8) + "," + (4.5 * y) +
                "H" + (2 * x - 8);
        }
    };

    XYAxis.prototype.brushMoved = SVGWidget.prototype.debounce(function brushed() {
        var selected = this.data().filter(function (d) {
            var pos;
            switch (this.xAxisType()) {
                case "ordinal":
                    pos = this.dataScale(d[0]) + (this.dataScale.rangeBand ? this.dataScale.rangeBand() / 2 : 0);
                    if (this.orientation() === "horizontal") {
                        return (pos >= this.xBrush.extent()[0] && pos <= this.xBrush.extent()[1]);
                    } else {
                        return (pos >= this.yBrush.extent()[0] && pos <= this.yBrush.extent()[1]);
                    }
                    break;
                default:
                    pos = d[0];
                    if (this.orientation() === "horizontal") {
                        return (pos >= this.xBrush.extent()[0] && pos <= this.xBrush.extent()[1]);
                    } else {
                        return (pos >= this.yBrush.extent()[0] && pos <= this.yBrush.extent()[1]);
                    }
                    break;
            }
        }, this);
        this.selection(selected);
    }, 250);

    XYAxis.prototype.calcMargin = function (domNode, element) {
        var margin = { top: this.selectionMode() ? 10 : 2, right: this.selectionMode() ? 10 : 2, bottom: 50, left: 50 };
        var height = this.height() - margin.top - margin.bottom;

        var test = element.append("g");

        var svgXAxis = test.append("g")
            .attr("class", this.orientation() === "horizontal" ? "x axis" : "y axis")
            .attr("transform", "translate(0," + height + ")")
            .call(this.currAxis)
        ;
        var svgYAxis = test.append("g")
            .attr("class", this.orientation() === "horizontal" ? "y axis" : "x axis")
            .call(this.otherAxis)
        ;

        var x_bbox = svgXAxis.node().getBBox();
        var y_bbox = svgYAxis.node().getBBox();
        margin.bottom = x_bbox.height;
        margin.left = y_bbox.width;
        test.remove();
        return margin;
    };

    XYAxis.prototype.update = function (domNode, element) {
        var context = this;

        if (this._prevXAxisType !== this.xAxisType()) {
            this._prevXAxisType = this.xAxisType();
            this._prevBrush = null;
            switch (this.xAxisType()) {
                case "linear":
                    this.dataScale = d3.scale.linear();
                    break;
                case "time":
                    this.dataScale = d3.time.scale();
                    break;
                case "ordinal":
                    /* falls through */
                default:
                    this.dataScale = d3.scale.ordinal();
                    break;
            }
            this.valueScale = d3.scale.linear();

            this.dataAxis
                .scale(this.dataScale)
            ;
            this.valueAxis
                .scale(this.valueScale)
            ;

            this.xBrush
                .x(this.dataScale)
            ;
            this.yBrush
                .y(this.dataScale)
            ;
        }

        var isHorizontal = this.orientation() === "horizontal";
        this.dataAxis.orient(isHorizontal ? "bottom" : "left");
        this.valueAxis.orient(isHorizontal ? "left" : "bottom");
        this.currAxis = isHorizontal ? this.dataAxis : this.valueAxis;
        this.otherAxis = isHorizontal ? this.valueAxis : this.dataAxis;
        var currBrush = isHorizontal ? this.xBrush : this.yBrush;
        var otherBrush = isHorizontal ? this.yBrush : this.xBrush;
        var otherBrushExtent = otherBrush.extent();

        //  Update Domain  ---
        switch (this.xAxisType()) {
            case "time":
                var dateMin = d3.min(this.data(), function (data) {
                    return data[0];
                });
                var dateMax = d3.max(this.data(), function (data) {
                    return data[0];
                });
                this.dataScale.domain([dateMin, dateMax]);
                break;
            case "linear":
                var numberMin = d3.min(this.data(), function (data) {
                    return data[0];
                });
                var numberMax = d3.max(this.data(), function (data) {
                    return data[0];
                });
                this.dataScale.domain([numberMin - 1, numberMax + 1]);
                break;
            default:
                this.dataScale.domain(this.data().map(function (d) { return d[0]; }));
                break;
        }
        var min = d3.min(this.data(), function (data) {
            return d3.min(data.filter(function (cell, i) { return i > 0 && context._columns[i] && context._columns[i].indexOf("__") !== 0; }), function (d) { return +d; });
        });
        var max = d3.max(this.data(), function (data) {
            return d3.max(data.filter(function (row, i) { return i > 0 && context._columns[i] && context._columns[i].indexOf("__") !== 0; }), function (d) { return +d; });
        });
        var newMin = min - (max - min) * this.valueAxisPadding() / 100;
        if (min >= 0 && newMin < 0 || min === max)
            newMin = 0;
        var newMax = max + (max - min) * this.valueAxisPadding() / 100;
        this.valueScale.domain([newMin, newMax]);

        //  Calculate Range  ---
        if (this.dataScale.rangeRoundBands) {
            this.dataScale.rangeRoundBands([isHorizontal ? 0 : this.height(), isHorizontal ? this.width() : 0], 0.1);
        } else if (this.dataScale.rangeRound) {
            this.dataScale.range([isHorizontal ? 0 : this.height(), isHorizontal ? this.width() : 0]);
        }
        this.valueScale.range([isHorizontal ? this.height() : 0, isHorizontal ? 0 : this.width()]);
        var margin = this.calcMargin(domNode, element);
        this.margin = margin;

        //  Update Range  ---
        var width = this.width() - margin.left - margin.right,
            height = this.height() - margin.top - margin.bottom,
            maxExtent = isHorizontal ? width : height,
            maxOtherExtent = isHorizontal ? height : width;

        if (this.dataScale.rangeRoundBands) {
            this.dataScale.rangeRoundBands([isHorizontal ? 0 : maxExtent, isHorizontal ? maxExtent : 0], 0.1);
        } else if (this.dataScale.rangeRound) {
            this.dataScale.range([isHorizontal ? 0 : maxExtent, isHorizontal ? maxExtent : 0]);
        }
        this.valueScale.range([isHorizontal ? maxOtherExtent : 0, isHorizontal ? 0 : maxOtherExtent]);

        //  Render  ---
        this.svg.transition()
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        ;

        this.svgXAxis.transition()
            .attr("class", isHorizontal ? "x axis" : "y axis")
            .attr("transform", "translate(0," + height + ")")
            .call(this.currAxis)
        ;

        this.svgYAxis.transition()
            .attr("class", isHorizontal ? "y axis" : "x axis")
            .call(this.otherAxis)
        ;

        if (this.selectionMode()) {
            if (!this._prevBrush) {
                switch (this.xAxisType()) {
                    case "ordinal":
                        currBrush.extent([0, maxExtent]);
                        break;
                    default:
                        currBrush.extent(this.dataScale.domain());
                        break;
                }
            } else if (this._prevBrush && this._prevBrush.orientation !== this.orientation()) {
                switch (this.xAxisType()) {
                    case "ordinal":
                        currBrush.extent([maxExtent - otherBrushExtent[0] * maxExtent / this._prevBrush.maxExtent, maxExtent - otherBrushExtent[1] * maxExtent / this._prevBrush.maxExtent]);
                        break;
                    default:
                        currBrush.extent(otherBrushExtent);
                        break;
                }
            }
            this._prevBrush = {
                orientation: this.orientation(),
                maxExtent: maxExtent
            };
        }

        this.svgBrush
            .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
            .style("display", this.selectionMode() ? null : "none")
            .call(currBrush)
            .selectAll(".background").transition()
                .attr("width", width)
                .attr("height", height)
        ;

        this.svgBrush.selectAll(".extent, .resize rect").transition()
            .attr(isHorizontal ? "y" : "x", 0)
            .attr(isHorizontal ? "height" : "width", maxOtherExtent)
        ;

        var handlePath = this.svgBrush.selectAll(".resize").selectAll("path").data(function (d) { return d; });
        handlePath.enter().append("path");
        handlePath.transition()
            .attr("d", function (d) { return context.resizeBrushHandle(d, width, height); })
        ;

        this.updateChart(domNode, element, margin, width, height);
    };

    XYAxis.prototype.updateChart = function (domNode, element, margin, width, height) {
    };

    XYAxis.prototype.selection = function (selected) {
        console.log(selected);
    };

    return XYAxis;
}));
