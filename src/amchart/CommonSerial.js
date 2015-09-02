"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "amcharts.serial", "require"], factory);
    } else {
        root.amchart_CommonSerial = factory(root.d3, root.common_HTMLWidget, root.AmCharts, root.require);
    }

}(this, function(d3, HTMLWidget, AmCharts, require) {
    function CommonSerial() {
        HTMLWidget.call(this);
        this._tag = "div";

        this._chart = {};

        this._dateParserData = d3.time.format("%Y-%m-%d").parse;
        this._dateParserValue = d3.time.format("%Y-%m-%d").parse;
    }
    CommonSerial.prototype = Object.create(HTMLWidget.prototype);

    CommonSerial.prototype.constructor = CommonSerial;
    CommonSerial.prototype._class += " amchart_CommonSerial";

    CommonSerial.prototype.publish("fontSize", null, "number", "Font Size",null,{tags:["Basic","Shared"]});
    CommonSerial.prototype.publish("fontFamily", null, "string", "Font Name",null,{tags:["Basic","Shared","Shared"]});
    CommonSerial.prototype.publish("fontColor", null, "html-color", "Font Color",null,{tags:["Basic","Shared"]});

    CommonSerial.prototype.publish("lineWidth", 1, "number", "Line Thickness", null, {min:0,max:10,step:1,inputType:"range",tags:["Basic","Shared"]});
    CommonSerial.prototype.publish("lineColor", null, "html-color", "Color of the data/content lines",null,{tags:["Basic","Shared"]});
    CommonSerial.prototype.publish("lineOpacity", 1, "number", "Line Opacity", null, {min:0,max:1,step:0.001,inputType:"range",tags:["Basic","Shared"]});

    CommonSerial.prototype.publish("dashedLineStyle", 0, "number", "Length of Dashed Line. 0 = none",null,{tags:["Advanced","Shared"]});

    CommonSerial.prototype.publish("axisFontSize", null, "number", "X/Y Axis Text Font Size",null,{tags:["Basic","Shared"]});

    CommonSerial.prototype.publish("xAxisBaselineColor", null, "html-color", "X Axis Baseline Color",null,{tags:["Basic","Shared"]});
    CommonSerial.prototype.publish("yAxisBaselineColor", null, "html-color", "Y Axis baseline Color",null,{tags:["Basic","Shared"]});

    CommonSerial.prototype.publish("xAxisFontColor", null, "html-color", "Horizontal Axis Text Style (Color)",null,{tags:["Basic","Shared"]});
    CommonSerial.prototype.publish("yAxisFontColor", null, "html-color", "Vertical Axis Text Style (Color)",null,{tags:["Basic","Shared"]});

    CommonSerial.prototype.publish("xAxisTitle", "", "string", "X-Axis Title",null,{tags:["Basic","Shared"]});
    CommonSerial.prototype.publish("yAxisTitle", "", "string", "Y-Axis Title",null,{tags:["Basic","Shared"]});

    CommonSerial.prototype.publish("xAxisTitleFontSize", null, "number", "Vertical Axis Title Text Style (Font Size)",null,{tags:["Basic","Shared"]});
    CommonSerial.prototype.publish("yAxisTitleFontSize", null, "number", "Vertical Axis Title Text Style (Font Size)",null,{tags:["Intermediate","Shared"]});

    CommonSerial.prototype.publish("xAxisTitleFontColor", null, "html-color", "Horizontal Axis Title Text Style (Color)",null,{tags:["Basic","Shared"]});
    CommonSerial.prototype.publish("yAxisTitleFontColor", null, "html-color", "Vertical Axis Title Text Style (Color)",null,{tags:["Basic","Shared"]});

    CommonSerial.prototype.publish("xAxisLabelRotation", null, "number", "X-Axis Label Rotation", null, {min:0,max:90,step:0.1,inputType:"range",tags:["Intermediate","Shared"]});

    CommonSerial.prototype.publish("axisLineWidth", 1, "number", "Axis Line Width",null,{tags:["Intermediate","Shared"]});

    CommonSerial.prototype.publish("axisAlpha", 1, "number", "Axis Alpha",null,{tags:["Intermediate"]}); // share?

    CommonSerial.prototype.publish("marginLeft", null, "number", "Margin (Left)",null,{tags:["Intermediate"]});
    CommonSerial.prototype.publish("marginRight", null, "number", "Margin (Right)",null,{tags:["Intermediate"]});
    CommonSerial.prototype.publish("marginTop", null, "number", "Margin (Top)",null,{tags:["Intermediate"]});
    CommonSerial.prototype.publish("marginBottom", null, "number", "Margin (Bottom)",null,{tags:["Intermediate"]});

    CommonSerial.prototype.publish("showScrollbar", false, "boolean", "Show Chart Scrollbar",null,{tags:["Intermediate","Shared"]});

    CommonSerial.prototype.publish("orientation", "horizontal", "set", "Orientation",["horizontal","vertical"],{tags:["Intermediate"]});

    CommonSerial.prototype.publish("bulletSize", 0, "number", "Bullet Size",null,{tags:["Intermediate"]});
    CommonSerial.prototype.publish("bulletType", "none", "set", "Bullet Type", ["none", "round", "square", "triangleUp", "triangleDown", "triangleLeft", "triangleRight", "bubble", "diamond"],{tags:["Basic"]});

    CommonSerial.prototype.publish("xAxisAutoGridCount", true, "boolean", "Specifies Whether Number of GridCount Is Specified Automatically, According To The Axis Size",null,{tags:["Advanced"]});
    CommonSerial.prototype.publish("xAxisGridPosition", "middle", "set", "Specifies If A Grid Line Is Placed On The Center of A Cell or On The Beginning of A Cell", ["start","middle"],{tags:["Advanced"]});

    CommonSerial.prototype.publish("xAxisBoldPeriodBeginning", true, "boolean", "When parse dates is on for the category axis, the chart will try to highlight the beginning of the periods, like month, in bold.",null,{tags:["Intermediate"]});
    CommonSerial.prototype.publish("yAxisBoldPeriodBeginning", true, "boolean", "When parse dates is on for the category axis, the chart will try to highlight the beginning of the periods, like month, in bold.",null,{tags:["Intermediate"]});

    CommonSerial.prototype.publish("xAxisDashLength", 0, "number", "Length of a dash. 0 means line is not dashed.",null,{tags:["Advanced"]});
    CommonSerial.prototype.publish("yAxisDashLength", 0, "number", "Length of a dash. 0 means line is not dashed.",null,{tags:["Advanced"]});

    CommonSerial.prototype.publish("xAxisFillAlpha", 0, "number", "Fill opacity. Every second space between grid lines can be filled with color. Set fillAlpha to a value greater than 0 to see the fills.",null,{tags:["Intermediate"]});
    CommonSerial.prototype.publish("yAxisFillAlpha", 0, "number", "Fill opacity. Every second space between grid lines can be filled with color. Set fillAlpha to a value greater than 0 to see the fills.",null,{tags:["Intermediate"]});

    CommonSerial.prototype.publish("xAxisFillColor", null, "html-color", "Fill color. Every second space between grid lines can be filled with color. Set fillAlpha to a value greater than 0 to see the fills.",null,{tags:["Intermediate"]});
    CommonSerial.prototype.publish("yAxisFillColor", null, "html-color", "Fill color. Every second space between grid lines can be filled with color. Set fillAlpha to a value greater than 0 to see the fills.",null,{tags:["Intermediate"]});

    CommonSerial.prototype.publish("xAxisGridAlpha", 0.2, "number", "Grid alpha.",null,{tags:["Intermediate"]});
    CommonSerial.prototype.publish("yAxisGridAlpha", 0.2, "number", "Grid alpha.",null,{tags:["Intermediate"]});

    //CommonSerial.prototype.publish("yAxisMinimum", null, "number", "",null,{tags:["Intermediate"]});
    CommonSerial.prototype.publish("yAxisTitleOffset", null, "number", "",null,{tags:["Intermediate"]});

    CommonSerial.prototype.publish("startOnAxis", true, "boolean", "Draw Chart Starting On Axis.",null,{tags:["Intermediate"]});

    CommonSerial.prototype.publish("startDuration", 0.3, "number", "Start Duration (sec)",null,{tags:["Private"]});
    CommonSerial.prototype.publish("useImgPatterns", false, "boolean", "Enable Image Pattern backgrounds",null,{tags:["Private"]});
    CommonSerial.prototype.publish("imgPatternArr", '["../ampatterns/black/pattern2.png"]', "string", "Background Pattern Images (Not used if '[]')",null,{inputType:"textarea",tags:["Private"]});

    CommonSerial.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette",null,{tags:["Intermediate","Shared"]});

    CommonSerial.prototype.publish("xAxisTypeTimePattern", "%Y-%m-%d", "string", "Time Series Pattern");
    CommonSerial.prototype.publish("yAxisTypeTimePattern", "%Y-%m-%d", "string", "Time Series Pattern");

    CommonSerial.prototype.publish("yAxisType", "linear", "set", "Y-Axis Type", ["none", "linear", "pow", "log", "time"],{tags:["Intermediate","Shared"]});
    CommonSerial.prototype.publish("xAxisType", "ordinal", "set", "X-Axis Type", ["ordinal", "linear", "time"]);

    CommonSerial.prototype.publish("yAxisTickFormat", "s", "string", "Y-Axis Tick Format");

    //CommonSerial.prototype.publish("balloonType", "amchart", "set", "Balloon Type", ["hpcc", "amchart"]); TODO

    CommonSerial.prototype.publish("sampleData", "", "set", "Display Sample Data", ["", "ordinal", "ordinalRange", "linear", "time-x", "time-y"]);

    //  Data ---
    CommonSerial.prototype.testData = function () {
        this.sampleData("ordinal");
        return this;
    };

    CommonSerial.prototype._sampleData = CommonSerial.prototype.sampleData;
    CommonSerial.prototype.sampleData = function (_) {
        var retVal = CommonSerial.prototype._sampleData.apply(this, arguments);
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

    CommonSerial.prototype.testDataOrdinal = function () {
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

    CommonSerial.prototype.testDataOrdinalRange = function () {
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

    CommonSerial.prototype.testDataLinear = function () {
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

    var xAxisTypeTimePattern = CommonSerial.prototype.xAxisTypeTimePattern;
    CommonSerial.prototype.xAxisTypeTimePattern = function (_) {
        var retVal = xAxisTypeTimePattern.apply(this, arguments);
        if (arguments.length) {
            this._dateParserData = d3.time.format(_).parse;
        }
        return retVal;
    };

    var yAxisTypeTimePattern = CommonSerial.prototype.yAxisTypeTimePattern;
    CommonSerial.prototype.yAxisTypeTimePattern = function (_) {
        var retVal = yAxisTypeTimePattern.apply(this, arguments);
        if (arguments.length) {
            this._dateParserValue = d3.time.format(_).parse;
        }
        return retVal;
    };

    CommonSerial.prototype.testDataTimeX = function () {
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

    CommonSerial.prototype.testDataTimeY = function () {
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

    CommonSerial.prototype.formatData = function (d) {
        switch (this.xAxisType()) {
            case "time":
                return this._dateParserData(d);
            default:
                return d;
        }
    };

    CommonSerial.prototype.formatValue = function (d) {
        if (!d) {
            return d;
        }

        // NOT REALLY NEEDED
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

    CommonSerial.prototype.amFormatData = function(dataArr) {
        this._isRangeGraph = false;
        var dataObjArr = [];
        var context = this;
        dataArr.forEach(function(dataRow) {
            var dataObj = {};
            dataRow.forEach(function(cell, cIdx) {
                var colName = context.columns()[cIdx];
                if (cell instanceof Array) {
                    var idx = cIdx - 1;
                    dataObj["openField" + idx] = context.formatValue(cell[0]);
                    dataObj["valueField" + idx] = context.formatValue(cell[1]);
                    context._isRangeGraph = true;
                } else {
                    if (cIdx === 0) {
                        dataObj[colName] = context.formatData(cell);
                    } else if (cIdx >= context.columns().length) {
                        dataObj[colName] = cell;
                    } else {
                        dataObj[colName] = context.formatValue(cell);
                    }
                }
            });
            dataObjArr.push(dataObj);
        });
        return dataObjArr;
    };

    CommonSerial.prototype.updateChartOptions = function() {
        var context = this;

        this._chart.type = "serial";
        this._chart.startDuration = this.startDuration();
        this._chart.rotate = this.orientation() === "vertical"; // this messes up the hover over things

        this._chart.color = this.fontColor();
        this._chart.fontSize = this.fontSize();
        this._chart.fontFamily = this.fontFamily();

        this._chart.categoryAxis = {};
        this._chart.categoryAxis.autoGridCount = this.xAxisAutoGridCount();
        this._chart.categoryAxis.gridPosition = this.xAxisGridPosition();
        this._chart.categoryAxis.axisAlpha = this.axisAlpha();
        this._chart.categoryAxis.gridAlpha = this.xAxisGridAlpha();
        this._chart.categoryAxis.startOnAxis = this.startOnAxis();
        this._chart.categoryAxis.labelRotation = this.xAxisLabelRotation();
        this._chart.categoryAxis.title = this.xAxisTitle();

        this._chart.categoryAxis.axisColor = this.xAxisBaselineColor();
        this._chart.categoryAxis.axisThickness = this.axisLineWidth();
        this._chart.categoryAxis.boldPeriodBeginning = this.xAxisBoldPeriodBeginning();
        this._chart.categoryAxis.dashLength = this.xAxisDashLength();
        this._chart.categoryAxis.fillAlpha = this.xAxisFillAlpha();
        this._chart.categoryAxis.fillColor = this.xAxisFillColor();
        this._chart.categoryAxis.fontSize = this.axisFontSize();
        this._chart.categoryAxis.color = this.xAxisFontColor();
        this._chart.categoryAxis.titleColor = this.xAxisTitleFontColor();
        this._chart.categoryAxis.titleFontSize = this.xAxisTitleFontSize();
        //this._chart.titles = [];

        this._chart.categoryAxis.labelFunction = function(d) {
            return d;
        }

        switch(this.xAxisType()) {
            case "time":
                this._chart.categoryAxis.type = "date";
                this._chart.categoryAxis.parseDates = true;
                //this._chart.valueAxes[0].minPeriod = "hh";
                this._chart.categoryAxis.logarithmic = false;
                break;
            case "log":
                this._chart.categoryAxis.parseDates = false;
                this._chart.categoryAxis.logarithmic = true;
                this._chart.categoryAxis.type = "mumeric";
                break;
            case "linear":

            default:
                this._chart.categoryAxis.parseDates = false;
                this._chart.categoryAxis.type = "mumeric";
                this._chart.categoryAxis.logarithmic = false;
                break;
        }



        if (this.marginLeft()) { this._chart.marginLeft = this.marginLeft(); }
        if (this.marginRight()) { this._chart.marginRight = this.marginRight(); }
        if (this.marginTop()) { this._chart.marginTop = this.marginTop(); }
        if (this.marginBottom()) { this._chart.marginBottom = this.marginBottom(); }

        this._chart.dataProvider = this.amFormatData(this._data);
        this.amFormatColumns();

        this._chart.valueAxes[0].title = this.yAxisTitle();
        this._chart.valueAxes[0].titleColor = this.yAxisTitleFontColor();
        this._chart.valueAxes[0].titleFontSize = this.yAxisTitleFontSize();
        this._chart.valueAxes[0].axisThickness = this.axisLineWidth();
        this._chart.valueAxes[0].color = this.yAxisFontColor();
        this._chart.valueAxes[0].fontSize = this.axisFontSize();
        this._chart.valueAxes[0].axisColor = this.yAxisBaselineColor();
        this._chart.valueAxes[0].axisAlpha = this.axisAlpha();
        this._chart.valueAxes[0].fillColor = this.yAxisFillColor();
        this._chart.valueAxes[0].fillAlpha = this.yAxisFillAlpha();

        this._chart.valueAxes[0].gridAlpha = this.yAxisGridAlpha();
        this._chart.valueAxes[0].dashLength = this.yAxisDashLength();
        this._chart.valueAxes[0].boldPeriodBeginning = this.yAxisBoldPeriodBeginning();
        this._chart.valueAxes[0].axisTitleOffset = this.yAxisTitleOffset();

        this._chart.valueAxes[0].labelFunction = function(d) {
            return typeof d === "number" ? d3.format(context.yAxisTickFormat())(d) : d;
        };

        switch(this.yAxisType()) {
            case "time":
                this._chart.valueAxes[0].type = "date";
                this._chart.valueAxes[0].parseDates = true;
                //this._chart.valueAxes[0].minPeriod = "hh";
                this._chart.valueAxes[0].logarithmic = false;
                break;
            case "log":
                this._chart.valueAxes[0].parseDates = false;
                this._chart.valueAxes[0].logarithmic = true;
                this._chart.valueAxes[0].type = "mumeric";
                break;
            case "linear":

            default:
                this._chart.valueAxes[0].parseDates = false;
                this._chart.valueAxes[0].type = "mumeric";
                this._chart.valueAxes[0].logarithmic = false;
                break;
        }

        if (this.showScrollbar()) {
            this._chart.chartScrollbar.enabled = true;
        } else {
            this._chart.chartScrollbar.enabled = false;
        }

        return this._chart;
    };

    CommonSerial.prototype.buildGraphObj = function(gType,i) {
        var context = this;
        var gObj = {};

        gObj.balloonFunction = function(d) {
            var balloonText = d.category + ", " + context.columns()[d.graph.columnIndex+1]  + ": " + context.data()[d.index][d.graph.columnIndex+1];
            return balloonText;
        };
        gObj.lineAlpha = context.lineOpacity();
        gObj.lineColor = context.lineColor();
        gObj.lineThickness = context.lineWidth();
        gObj.bullet = context.bulletType();
        gObj.bulletSize = context.bulletSize();
        gObj.dashLength = context.dashedLineStyle(); // TODO: convert to css Array Prop

        gObj.type = gType;

        gObj.title = "";
        var fieldArr = ["value","open","close","high","low"];
        fieldArr.forEach(function(field){
            if(typeof(context["_"+field+"Field"]) !== "undefined" && typeof(context["_"+field+"Field"][i]) !== "undefined"){
                gObj[field+"Field"] = context["_"+field+"Field"][i];
            }
        });

        try {
            if(context.useImgPatterns()) {
                var patternArr = JSON.parse(context.imgPatternArr());
                if(typeof (patternArr[i]) !== "undefined"){
                    gObj.pattern = patternArr[i];
                }
            } else {
                gObj.pattern = "";
            }
        } catch(e) {
            console.log("e:");
            console.log(e);
        }

        return gObj;
    };

    CommonSerial.prototype.amFormatColumns = function(ColArr) {
        var context = this;
        this._categoryField = this._columns[0];
        this._chart.categoryField = this._columns[0];
        this._valueField = [];
        this._openField = [];
        this._closeField = [];
        this._columns.slice(1, this._columns.length).forEach(function(col, idx) {
            context._valueField.push(col);
        });
        return this;
    }

    CommonSerial.prototype.enter = function(domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        var context = this;
        var initObj = {
            type: "serial",
            chartScrollbar: {},
        };
        if (typeof define === "function" && define.amd) {
            initObj.pathToImages = require.toUrl("amchartsImg");
        }
        this._chart = AmCharts.makeChart(domNode, initObj);
        this._chart.addListener("clickGraphItem", function(e) {
            context.click(context.rowToObj(context._data[e.index]), context.columns()[e.target.columnIndex+1]);
        });
    };

    CommonSerial.prototype.update = function(domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        domNode.style.width = this.size().width + "px";
        domNode.style.height = this.size().height + "px";
        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }
    };

    return CommonSerial;
}));
