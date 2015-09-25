"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/SVGWidget", "../common/Utility", "css!./XYAxis"], factory);
    } else {
        root.chart_XYAxis = factory(root.d3, root.common_SVGWidget, root.common_Utility);
    }
}(this, function (d3, SVGWidget, Utility) {
    function XYAxis(target) {
        SVGWidget.call(this);
        this._drawStartPos = "origin";

        this._dateParserData = d3.time.format("%Y-%m-%d").parse;
        this._dateParserValue = d3.time.format("%Y-%m-%d").parse;
    }
    XYAxis.prototype = Object.create(SVGWidget.prototype);
    XYAxis.prototype.constructor = XYAxis;
    XYAxis.prototype._class += " chart_XYAxis";

    XYAxis.prototype.publish("orientation", "horizontal", "set", "Selects orientation for the axis", ["horizontal", "vertical"]);
    XYAxis.prototype.publish("selectionMode", false, "boolean", "Range Selector");

    XYAxis.prototype.publish("xAxisTickCount", null, "number", "X-Axis Tick Count", null, { optional: true });
    XYAxis.prototype.publish("xAxisTickFormat", null, "string", "X-Axis Tick Format", null, { optional: true });
    XYAxis.prototype.publish("xAxisType", "ordinal", "set", "X-Axis Type", ["ordinal", "linear", "time"]);
    XYAxis.prototype.publish("xAxisTypeTimePattern", "%Y-%m-%d", "string", "Time Series Pattern");
    XYAxis.prototype.publish("xAxisDomainLow", "", "string", "X-Axis Low");
    XYAxis.prototype.publish("xAxisDomainHigh", "", "string", "X-Axis High");
    XYAxis.prototype.publish("xAxisOverlapMode", "rotate", "set", "X-Axis Label Overlap Mode", ["none", "stagger", "hide", "rotate"]);
    XYAxis.prototype.publish("xAxisLabelRotation", null, "number", "X-Axis Label Rotation");

    XYAxis.prototype.publish("yAxisTitle", "", "string", "Y-Axis Title");
    XYAxis.prototype.publish("yAxisTickCount", null, "number", "Y-Axis Tick Count", null, { optional: true });
    XYAxis.prototype.publish("yAxisTickFormat", null, "string", "Y-Axis Tick Format", null, { optional: true });
    XYAxis.prototype.publish("yAxisType", "linear", "set", "Y-Axis Type", ["none", "linear", "pow", "log", "time"]);
    XYAxis.prototype.publish("yAxisTypeTimePattern", "%Y-%m-%d", "string", "Time Series Pattern");
    XYAxis.prototype.publish("yAxisTypePowExponent", 2, "number", "Exponent for Pow on Value Axis");
    XYAxis.prototype.publish("yAxisTypeLogBase", 10, "number", "Base for log on Value Axis");
    XYAxis.prototype.publish("yAxisDomainLow", "", "string", "Y-Axis Low");
    XYAxis.prototype.publish("yAxisDomainHigh", "", "string", "Y-Axis High");
    XYAxis.prototype.publish("yAxisDomainPadding", 5, "number", "Y-Axis Low/High Padding (if no low/high specified");

    XYAxis.prototype.publish("regions", [], "array", "Regions");

    XYAxis.prototype.publish("sampleData", "", "set", "Display Sample Data", ["", "ordinal", "ordinalRange", "linear", "time-x", "time-y"]);

    XYAxis.prototype._sampleData = XYAxis.prototype.sampleData;
    XYAxis.prototype.sampleData = function (_) {
        var retVal = XYAxis.prototype._sampleData.apply(this, arguments);
        if (arguments.length) {
            switch (_) {
                case "ordinal":
                    this.testDataOrdinal();
                    break;
                case "ordinalRange":
                    this.testDataOrdinalRange();
                    break;
                case "linear":
                    this.testDataLinear();
                    break;
                case "time-x":
                    this.testDataTimeX();
                    break;
                case "time-y":
                    this.testDataTimeY();
                    break;
            }
        }
        return retVal;
    };

    XYAxis.prototype.resetSelection = function () {
        this._prevBrush = null;
        return this;
    };

    XYAxis.prototype.testDataOrdinal = function () {
        this
            .xAxisType("ordinal")
            .yAxisType("linear")
            .columns(["Subject", "Year 1", "Year 2", "Year 3"])
            .data([
                ["Geography", 75, 68, 65],
                ["English", 45, "55", 52],
                ["Math", 98, 92, 90],
                ["Science", 66, null, 56]
            ])
        ;
        return this;
    };

    XYAxis.prototype.testDataOrdinalRange = function () {
        this
            .xAxisType("ordinal")
            .yAxisType("linear")
            .columns(["Region", "May", "June", "July"])
            .data([
                ["Munster", [1, 11], [2, 14], [8, 18]],
                ["Leinster", [3, 10], [1, 15], ["7", 16]],
                ["Ulster", [2, 14], [5, 12], [8, 17]],
                ["Connacht", [0, 10], [1, 12], [7, 16]]
            ])
        ;
        return this;
    };

    XYAxis.prototype.testDataLinear = function () {
        this
            .xAxisType("linear")
            .yAxisType("linear")
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

    XYAxis.prototype.testDataTimeX = function () {
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
            .xAxisType("time")
            .xAxisTypeTimePattern("%Y-%m-%dT%H:%M:%S")
            .yAxisType("linear")
            .columns(["Date", "Price1", "Price2", "Price3"])
            .data(rawData.map(function (row, idx) {
                switch (idx % 3) {
                    case 0:
                        return [row.DateTime, row.Price, null, null];
                    case 1:
                        return [row.DateTime, null, row.Price, null];
                    case 2:
                        return [row.DateTime, null, null, row.Price];
                }
            }))
        ;
    };

    XYAxis.prototype.testDataTimeY = function () {
        return this
            .xAxisType("ordinal")
            .yAxisType("time")
            .yAxisTypeTimePattern("%Y-%m-%d")
            .columns(["Subject", "Year 1"])
            .data([
                ["Geography", "2010-07-09"],
                ["English", "2010-07-12"],
                ["Math", null],
                ["Science", "2010-07-21"]
            ])
        ;
    };

    var xAxisTypeTimePattern = XYAxis.prototype.xAxisTypeTimePattern;
    XYAxis.prototype.xAxisTypeTimePattern = function (_) {
        var retVal = xAxisTypeTimePattern.apply(this, arguments);
        if (arguments.length) {
            this._dateParserData = d3.time.format(_).parse;
        }
        return retVal;
    };

    var yAxisTypeTimePattern = XYAxis.prototype.yAxisTypeTimePattern;
    XYAxis.prototype.yAxisTypeTimePattern = function (_) {
        var retVal = yAxisTypeTimePattern.apply(this, arguments);
        if (arguments.length) {
            this._dateParserValue = d3.time.format(_).parse;
        }
        return retVal;
    };

    XYAxis.prototype.columns = function (_) {
        return SVGWidget.prototype.columns.apply(this, arguments);
    };

    XYAxis.prototype.formatData = function (d) {
        switch (this.xAxisType()) {
            case "time":
                return this._dateParserData(d);
            default:
                return d;
        }
    };

    XYAxis.prototype.formatValue = function (d) {
        if (!d) {
            return d;
        }
        if (d instanceof Array) {
            return d.map(function (item) {
                return this.formatValue(item);
            }, this);
        }
        switch (this.yAxisType()) {
            case "time":
                return this._dateParserValue(d);
            default:
                if (typeof d === "string") {
                    return +d;
                }
                return d;
        }
    };

    XYAxis.prototype.formattedData = function () {
        return this.data().map(function (row) {
            return row.map(function (cell, idx) {
                if (idx === 0) {
                    return this.formatData(cell);
                } if (idx >= this.columns().length) {
                    return cell;
                }
                return this.formatValue(cell);
            }, this);
        }, this);
    };

    XYAxis.prototype.enter = function (domNode, element) {
        SVGWidget.prototype.enter.apply(this, arguments);
        this.dataAxis = d3.svg.axis()
            .orient("bottom")
        ;

        this.valueAxis = d3.svg.axis()
            .orient("left")
        ;

        this.svg = element.append("g");
        this.svgRegions = element.append("g");
        this.svgData = this.svg.append("g");
        this.svgXAxis = this.svg.append("g");
        this.svgXAxisText = this.svgXAxis.append("text")
            .attr("y", -2)
            .style("text-anchor", "end")
        ;
        this.svgYAxis = this.svg.append("g");
        this.svgYAxisText = this.svgYAxis.append("text")
              .attr("transform", "rotate(-90)")
              .attr("x", -2)
              .attr("y", 2)
              .attr("dy", ".71em")
              .style("text-anchor", "end")
        ;

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
        this._selection = new Utility.SimpleSelection(this.svgData);
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
        var selected = this.formattedData().filter(function (d) {
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

    XYAxis.prototype.dataPos = function (label) {
        var retVal = this.dataScale(this.formatData(label));
        if (this.xAxisType() === "ordinal") {
            retVal += this.dataScale.rangeBand() / 2;
        }
        return retVal;
    };

    XYAxis.prototype.valuePos = function (value) {
        return this.valueScale(this.formatValue(value));
    };

    XYAxis.prototype.setScaleRange = function (width, height) {
        if (this.currScale.rangeRoundBands) {
            this.currScale.rangeRoundBands([0, width], 0.1);
        } else if (this.currScale.rangeRound) {
            this.currScale.range([0, width]);
        }
        if (this.otherScale.rangeRoundBands) {
            this.otherScale.rangeRoundBands([height, 0], 0.1);
        } else if (this.otherScale.rangeRound) {
            this.otherScale.range([height, 0]);
        }
    };

    XYAxis.prototype.adjustXAxisText = function (xAxis, margin) {
        switch (this.xAxisOverlapMode()) {
            case "stagger":
                xAxis.selectAll(".tick > text")
                    .attr("dy", function (d, i) { return 0.71 + (i % margin.overlapModulus) + "em"; })
                    .attr("visibility", null)
                ;
                break;
            case "hide":
                xAxis.selectAll(".tick > text")
                    .attr("dy", "0.71em")
                    .attr("visibility", function (d, i) { return i % margin.overlapModulus ? "hidden" : null; })
                ;
                break;
            case "rotate" :
                var xRotation = this.xAxisLabelRotation();
                xAxis.selectAll(".tick > text")
                    .each(function() {
                        var elm = d3.select(this);
                        var e_bbox = elm.node().getBoundingClientRect();
                        if (xRotation > 0 && xRotation <= 90) {
                            elm.style("text-anchor", "start");
                            elm.attr("transform", "rotate(" + (xRotation ? xRotation : 0) + ")");
                            elm.attr("dy", "-.5em");
                            elm.attr("dx", "8px");
                        } 
                        else if (xRotation > 90 && xRotation < 180) {
                            elm.style("text-anchor", "start");
                            elm.attr("transform", "rotate(" + (xRotation ? xRotation : 0) + ")scale(-1,-1)translate(" + (-e_bbox.width) + "," + (-e_bbox.height) + ")");
                            elm.attr("dy", ".5em");
                            elm.attr("dx", "-8px");
                        }
                    })
                ;
                break;
            default:
                xAxis.selectAll(".tick > text")
                    .attr("dy", "0.71em")
                    .attr("visibility", null)
                ;
        }
    };

    XYAxis.prototype.calcMargin = function (domNode, element, isHorizontal) {
        var margin = { top: this.selectionMode() ? 10 : 2, right: this.selectionMode() ? 10 : 2, bottom: this.selectionMode() ? 10 : 2, left: this.selectionMode() ? 10 : 2, overlapModulus: 1 };
        var height = this.height() - margin.top - margin.bottom;

        var test = element.append("g");

        this.setScaleRange(this.width(), this.height());
        if (this.yAxisType() !== "none") {
            var svgYAxis = test.append("g")
                .attr("class", isHorizontal ? "y axis" : "x axis")
                .call(this.otherAxis)
            ;

            var y_bbox = svgYAxis.node().getBBox();
            margin.left = y_bbox.width;
            margin.top -= y_bbox.y;
        }
        var width = this.width() - margin.left - margin.right;
        this.setScaleRange(width, this.height());

        var svgXAxis = test.append("g")
            .attr("class", isHorizontal ? "x axis" : "y axis")
            .attr("transform", "translate(" + margin.left + "," + height / 2 + ")")
            .call(this.currAxis)
        ;

        switch (this.xAxisOverlapMode()) {
            case "stagger":
            case "hide":
                var bboxArr = [];
                svgXAxis.selectAll(".tick > text").each(function (d) {
                    var bbox = this.getBoundingClientRect();
                    for (var i = bboxArr.length - 1; i >= 0; --i) {
                        if (bboxArr[i].right < bbox.left) {
                            break;
                        }
                        if (bboxArr.length + 1 - i > margin.overlapModulus) {
                            margin.overlapModulus = bboxArr.length + 1 - i;
                        }
                    }
                    bboxArr.push(bbox);
                });
                break;
        }
        this.adjustXAxisText(svgXAxis, margin);
        var x_bbox = svgXAxis.node().getBBox();
        margin.right -= width - (x_bbox.x + x_bbox.width);
        margin.bottom = x_bbox.height;
        this.setScaleRange(this.width() - margin.left - margin.right, this.height() - margin.top - margin.bottom);

        test.remove();
        return margin;
    };

    XYAxis.prototype.updateRegions = function (domNode, element, isHorizontal) {
        var context = this;

        var regions = this.svgRegions.selectAll(".region").data(this.regions());
        regions.enter().append("rect")
            .attr("class", "region")
        ;
        if (isHorizontal) {
            regions
                .attr("x", function (d) { return context.dataPos(d.x0); })
                .attr("y", 0)
                .attr("width", function (d) { return context.dataPos(d.x1) - context.dataPos(d.x0); })
                .attr("height", this.height())
                .style("stroke", function (d) { return context._palette(d.colorID); })
                .style("fill", function (d) { return d3.hsl(context._palette(d.colorID)).brighter(); })
            ;
        } else {
            regions
                .attr("x", 0)
                .attr("y", function (d) { return context.dataPos(d.x0); })
                .attr("width", this.width())
                .attr("height", function (d) { return context.dataPos(d.x0) - context.dataPos(d.x1); })
                .style("stroke", function (d) { return context._palette(d.colorID); })
                .style("fill", function (d) { return d3.hsl(context._palette(d.colorID)).brighter(); })
            ;
        }
        regions.exit().remove();
    };

    XYAxis.prototype.update = function (domNode, element) {
        var context = this;

        var isHorizontal = this.orientation() === "horizontal";
        this.updateRegions(domNode, element, isHorizontal);

        switch (this.xAxisType()) {
            case "linear":
                this.dataScale = d3.scale.linear();
                this.dataFormatter = d3.format(this.xAxisTickFormat());
                break;
            case "time":
                this.dataScale = d3.time.scale();
                this.dataFormatter = this.xAxisTickFormat() ? d3.time.format(this.xAxisTickFormat()) : null;
                break;
            case "ordinal":
                /* falls through */
            default:
                this.dataScale = d3.scale.ordinal();
                this.dataFormatter = null;
                break;
        }
        this.dataAxis
            .scale(this.dataScale)
            .ticks(this.xAxisTickCount())
            .tickFormat(this.dataFormatter)
        ;

        switch (this.yAxisType()) {
            case "pow":
                this.valueScale = d3.scale.pow()
                    .exponent(this.yAxisTypePowExponent())
                ;
                this.valueFormatter = d3.format(this.yAxisTickFormat());
                break;
            case "log":
                this.valueScale = d3.scale.log()
                    .base(this.yAxisTypeLogBase())
                ;
                this.valueFormatter = d3.format(this.yAxisTickFormat());
                break;
            case "time":
                this.valueScale = d3.time.scale();
                this.valueFormatter = this.yAxisTickFormat() ? d3.time.format(this.yAxisTickFormat()) : null;
                break;
            case "linear":
                /* falls through */
            default:
                this.valueScale = d3.scale.linear();
                this.valueFormatter = d3.format(this.yAxisTickFormat());
                break;
        }
        this.valueAxis
            .scale(this.valueScale)
            .ticks(this.yAxisTickCount())
            .tickFormat(this.valueFormatter)
        ;

        this.dataAxis.orient(isHorizontal ? "bottom" : "left");
        this.valueAxis.orient(isHorizontal ? "left" : "bottom");
        this.currAxis = isHorizontal ? this.dataAxis : this.valueAxis;
        this.otherAxis = isHorizontal ? this.valueAxis : this.dataAxis;
        this.currScale = isHorizontal ? this.dataScale : this.valueScale;
        this.otherScale = isHorizontal ? this.valueScale : this.dataScale;
        var currBrush = isHorizontal ? this.xBrush : this.yBrush;
        var otherBrush = isHorizontal ? this.yBrush : this.xBrush;
        var otherBrushExtent = otherBrush.extent();

        //  Update Domain  ---
        switch (this.xAxisType()) {
            case "ordinal":
                this.dataScale.domain(this.data().map(function (d) { return d[0]; }));
                break;
            default:
                var domainMin = this.xAxisDomainLow() ? this.formatData(this.xAxisDomainLow()) : d3.min(this.formattedData(), function (data) {
                    return data[0];
                });
                var domainMax = this.xAxisDomainHigh() ? this.formatData(this.xAxisDomainHigh()) : d3.max(this.formattedData(), function (data) {
                    return data[0];
                });
                this.dataScale.domain([domainMin, domainMax]);
                break;
        }

        var min = this.yAxisDomainLow() ? this.formatValue(this.yAxisDomainLow()) : d3.min(this.formattedData(), function (data) {
            return d3.min(data.filter(function (cell, i) { return i > 0 && context.columns()[i] && context.columns()[i].indexOf("__") !== 0 && cell !== null; }), function (d) { return d instanceof Array ? d[0] : d; });
        });
        var max = this.yAxisDomainHigh() ? this.formatValue(this.yAxisDomainHigh()) : d3.max(this.formattedData(), function (data) {
            return d3.max(data.filter(function (cell, i) { return i > 0 && context.columns()[i] && context.columns()[i].indexOf("__") !== 0 && cell !== null; }), function (d) { return d instanceof Array ? d[1] : d; });
        });
        switch (this.yAxisType()) {
            case "time":
                break;
            default:
                if (this.yAxisDomainLow() === "" && this.yAxisDomainHigh() === "") {
                    var valuePadding = (max - min) * this.yAxisDomainPadding() / 100;
                    var newMin = min - valuePadding;
                    if (min >= 0 && newMin < 0 || min === max)
                        newMin = 0;
                    min = newMin;
                    max = max + valuePadding;
                }
                break;
        }
        this.valueScale.domain([min, max]);

        //  Calculate Margins  ---
        this.margin = this.calcMargin(domNode, element, isHorizontal);

        //  Update Range  ---
        var width = this.width() - this.margin.left - this.margin.right,
            height = this.height() - this.margin.top - this.margin.bottom,
            maxCurrExtent = isHorizontal ? width : height,
            maxOtherExtent = isHorizontal ? height : width;

        //  Render  ---
        this.svg.transition()
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
        ;

        this.svgXAxis.transition()
            .attr("class", isHorizontal ? "x axis" : "y axis")
            .attr("transform", "translate(0," + height + ")")
            .call(this.currAxis)
        ;

        this.svgXAxisText
            .attr("x", width - 2)
            .text(isHorizontal ? this.columns()[0] : this.yAxisTitle())
        ;

        this.svgYAxis.transition()
            .style("visibility", this.yAxisType() === "none" ? "hidden" : null)
            .attr("class", isHorizontal ? "y axis" : "x axis")
            .call(this.otherAxis)
            .each(function () {
                context.adjustXAxisText(context.svgXAxis, context.margin);
            })
        ;
        this.svgYAxisText.text(!isHorizontal ? this.columns()[0] : this.yAxisTitle());

        this.xBrush
            .x(this.dataScale)
        ;
        this.yBrush
            .y(this.dataScale)
        ;
        if (this.selectionMode()) {
            if (this._prevXAxisType !== this.xAxisType()) {
                this._prevXAxisType = this.xAxisType();
                this._prevBrush = null;
            }
            if (!this._prevBrush) {
                switch (this.xAxisType()) {
                    case "ordinal":
                        currBrush.extent([0, maxCurrExtent]);
                        break;
                    default:
                        currBrush.extent(this.dataScale.domain());
                        break;
                }
            } else if (this._prevBrush && this._prevBrush.orientation !== this.orientation()) {
                switch (this.xAxisType()) {
                    case "ordinal":
                        currBrush.extent([maxCurrExtent - otherBrushExtent[0] * maxCurrExtent / this._prevBrush.maxCurrExtent, maxCurrExtent - otherBrushExtent[1] * maxCurrExtent / this._prevBrush.maxCurrExtent]);
                        break;
                    default:
                        currBrush.extent(otherBrushExtent);
                        break;
                }
            }
            this._prevBrush = {
                orientation: this.orientation(),
                maxCurrExtent: maxCurrExtent
            };
        }

        this.svgBrush
            .attr("transform", "translate(" + this.margin.left + ", " + this.margin.top + ")")
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

        this.updateChart(domNode, element, this.margin, width, height, isHorizontal);
    };

    XYAxis.prototype.updateChart = function (domNode, element, margin, width, height, isHorizontal) {
    };

    XYAxis.prototype.exit = function (domNode, element) {
        SVGWidget.prototype.exit.apply(this, arguments);
        delete this._selection;
    };

    XYAxis.prototype.selection = function (selected) {
        console.log(selected);
    };

    return XYAxis;
}));
