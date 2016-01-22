"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "amcharts.serial", "require", "../common/Utility", "./SerialAxis"], factory);
    } else {
        root.amchart_CommonSerial = factory(root.d3, root.common_HTMLWidget, root.AmCharts, root.require, root.common_Utility, root.amchart_SerialAxis);
    }
}(this, function(d3, HTMLWidget, AmCharts, require, Utility, Axis) {
    function CommonSerial() {
        HTMLWidget.call(this);
        this._tag = "div";

        this._chart = {};

        this._selected = null;
        this._selections = [];

        this._dataUpdated = 0;
        this._prevDataUpdated = -1;
        this._columnsUpdated = 0;
        this._prevColumnsUpdated = -1;

        this._dateParserData = d3.time.format("%Y-%m-%d").parse;
        this._dateParserValue = d3.time.format("%Y-%m-%d").parse;

        this._colorObj = {};
        this._selectionObj = {};

        if (this.backwardsCompatible()) {
            this.switchProperties(true);
        } else {
            this.switchProperties(false);
        }
    }

    CommonSerial.prototype = Object.create(HTMLWidget.prototype);

    CommonSerial.prototype.constructor = CommonSerial;
    CommonSerial.prototype._class += " amchart_CommonSerial";

    CommonSerial.prototype.publish("backwardsCompatible", true, "boolean", "Allow use of old publish parameters");

    CommonSerial.prototype.publish("xAxes", [], "propertyArray", "xAxis", null, { max: 1, tags: ["Basic"] }); // max number of xAxes
    CommonSerial.prototype.publish("yAxes", [], "propertyArray", "yAxis", null, { tags: ["Basic"] });
    
    CommonSerial.prototype.publish("fontSize", 11, "number", "Font Size",null,{tags:["Basic","Shared"]});
    CommonSerial.prototype.publish("fontFamily", "Verdana", "string", "Font Name",null,{tags:["Basic","Shared","Shared"]});
    CommonSerial.prototype.publish("fontColor", "#000000", "html-color", "Font Color",null,{tags:["Basic","Shared"]});

    CommonSerial.prototype.publish("lineWidth", 1, "number", "Line Thickness", null, {min:0,max:10,step:1,inputType:"range",tags:["Basic","Shared"]});
    CommonSerial.prototype.publish("lineColor", null, "html-color", "Color of the data/content lines",null,{tags:["Basic","Shared"]});
    CommonSerial.prototype.publish("lineOpacity", 1, "number", "Line Opacity", null, {min:0,max:1,step:0.001,inputType:"range",tags:["Basic","Shared"]});

    CommonSerial.prototype.publish("dashedLineStyle", 0, "number", "Length of Dashed Line. 0 = none",null,{tags:["Advanced","Shared"]});

    CommonSerial.prototype.publish("marginLeft", null, "number", "Margin (Left)",null,{tags:["Intermediate"]});
    CommonSerial.prototype.publish("marginRight", null, "number", "Margin (Right)",null,{tags:["Intermediate"]});
    CommonSerial.prototype.publish("marginTop", null, "number", "Margin (Top)",null,{tags:["Intermediate"]});
    CommonSerial.prototype.publish("marginBottom", null, "number", "Margin (Bottom)",null,{tags:["Intermediate"]});

    CommonSerial.prototype.publish("showScrollbar", false, "boolean", "Show Chart Scrollbar",null,{tags:["Intermediate","Shared"]});

    CommonSerial.prototype.publish("orientation", "horizontal", "set", "Orientation",["horizontal","vertical"],{tags:["Intermediate"]});

    CommonSerial.prototype.publish("startDuration", 0.3, "number", "Start Duration (sec)",null,{tags:["Private"]});
    CommonSerial.prototype.publish("useImgPatterns", false, "boolean", "Enable Image Pattern backgrounds",null,{tags:["Private"]});
    CommonSerial.prototype.publish("imgPatternArr", '["../ampatterns/black/pattern2.png"]', "string", "Background Pattern Images (Not used if '[]')",null,{inputType:"textarea",tags:["Private"]});

    CommonSerial.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette",null,{tags:["Intermediate","Shared"]});

    CommonSerial.prototype.publish("sortDates", false, "boolean", "Sort date field for timeseries data");
    
    CommonSerial.prototype.publish("axisMinPeriod", "MM", "string", "Minimum period when parsing dates");

    //CommonSerial.prototype.publish("balloonType", "amchart", "set", "Balloon Type", ["hpcc", "amchart"]); TODO

    CommonSerial.prototype.publish("selectionColor", "#f00", "html-color", "Font Color",null,{tags:["Basic"]});
    CommonSerial.prototype.publish("selectionMode", "simple", "set", "Selection Mode", ["simple", "multi"], { tags: ["Intermediate"] });

    CommonSerial.prototype.publish("showCursor", false, "boolean", "Show Chart Scrollbar",null,{tags:["Intermediate","Shared"]});

    CommonSerial.prototype.publish("showFirstLabel", true, "boolean", "Show first label",null,{tags:["Intermediate","Shared"]});
    CommonSerial.prototype.publish("showLastLabel", true, "boolean", "Show last label",null,{tags:["Intermediate","Shared"]});

    CommonSerial.prototype.publish("equalSpacing", false, "boolean", "Show Chart Scrollbar",null,{tags:["Intermediate","Shared"]});

    CommonSerial.prototype.publish("paletteGrouping", "By Column", "set", "Palette Grouping",["By Category","By Column"],{tags:["Basic"]});

    CommonSerial.prototype.publish("y2", [], "array", "Columns to associate with second Y-Axis");

//

    CommonSerial.prototype.publish("axisFontSize", null, "number", "X/Y Axis Text Font Size",null,{tags:["Basic","Shared"]});

    CommonSerial.prototype.publish("xAxisBaselineColor", "#000000", "html-color", "X Axis Baseline Color",null,{tags:["Basic","Shared"]});
    CommonSerial.prototype.publish("yAxisBaselineColor", "#000000", "html-color", "Y Axis baseline Color",null,{tags:["Basic","Shared"]});

    CommonSerial.prototype.publish("xAxisFontColor", null, "html-color", "Horizontal Axis Text Style (Color)",null,{tags:["Basic","Shared"]});
    CommonSerial.prototype.publish("yAxisFontColor", null, "html-color", "Vertical Axis Text Style (Color)",null,{tags:["Basic","Shared"]});

    CommonSerial.prototype.publish("xAxisTitle", "", "string", "X-Axis Title",null,{tags:["Basic","Shared"]});
    CommonSerial.prototype.publish("yAxisTitle", "", "string", "Y-Axis Title",null,{tags:["Basic","Shared"]});

    CommonSerial.prototype.publish("xAxisTitleFontSize", null, "number", "Vertical Axis Title Text Style (Font Size)",null,{tags:["Basic","Shared"]});
    CommonSerial.prototype.publish("yAxisTitleFontSize", null, "number", "Vertical Axis Title Text Style (Font Size)",null,{tags:["Intermediate","Shared"]});

    CommonSerial.prototype.publish("xAxisTitleFontColor", null, "html-color", "Horizontal Axis Title Text Style (Color)",null,{tags:["Basic","Shared"]});
    CommonSerial.prototype.publish("yAxisTitleFontColor", null, "html-color", "Vertical Axis Title Text Style (Color)",null,{tags:["Basic","Shared"]});

    CommonSerial.prototype.publish("xAxisLabelRotation", null, "number", "X-Axis Label Rotation", null, {min:0,max:90,step:0.1,inputType:"range",tags:["Intermediate","Shared"]});
    CommonSerial.prototype.publish("yAxisLabelRotation", null, "number", "X-Axis Label Rotation", null, {min:0,max:90,step:0.1,inputType:"range",tags:["Intermediate","Shared"]});

    CommonSerial.prototype.publish("axisLineWidth", 1, "number", "Axis Line Width",null,{tags:["Intermediate","Shared"]});

    CommonSerial.prototype.publish("axisAlpha", 1, "number", "Axis Alpha",null,{tags:["Intermediate"]}); // share?
//
    CommonSerial.prototype.publish("xAxisAutoGridCount", true, "boolean", "Specifies Whether Number of GridCount Is Specified Automatically, According To The Axis Size",null,{tags:["Advanced"]});
    CommonSerial.prototype.publish("xAxisGridPosition", "start", "set", "Specifies If A Grid Line Is Placed On The Center of A Cell or On The Beginning of A Cell", ["start","middle"],{tags:["Advanced"]});

    CommonSerial.prototype.publish("xAxisBoldPeriodBeginning", true, "boolean", "When parse dates is on for the category axis, the chart will try to highlight the beginning of the periods, like month, in bold.",null,{tags:["Intermediate"]});
    CommonSerial.prototype.publish("yAxisBoldPeriodBeginning", true, "boolean", "When parse dates is on for the category axis, the chart will try to highlight the beginning of the periods, like month, in bold.",null,{tags:["Intermediate"]});

    CommonSerial.prototype.publish("xAxisDashLength", 0, "number", "Length of a dash. 0 means line is not dashed.",null,{tags:["Advanced"]});
    CommonSerial.prototype.publish("yAxisDashLength", 0, "number", "Length of a dash. 0 means line is not dashed.",null,{tags:["Advanced"]});

    CommonSerial.prototype.publish("xAxisFillAlpha", 0, "number", "Fill opacity. Every second space between grid lines can be filled with color. Set fillAlpha to a value greater than 0 to see the fills.",null,{tags:["Intermediate"]});
    CommonSerial.prototype.publish("yAxisFillAlpha", 0, "number", "Fill opacity. Every second space between grid lines can be filled with color. Set fillAlpha to a value greater than 0 to see the fills.",null,{tags:["Intermediate"]});

    CommonSerial.prototype.publish("xAxisFillColor", null, "html-color", "Fill color. Every second space between grid lines can be filled with color. Set fillAlpha to a value greater than 0 to see the fills.",null,{tags:["Intermediate"]});
    CommonSerial.prototype.publish("yAxisFillColor", null, "html-color", "Fill color. Every second space between grid lines can be filled with color. Set fillAlpha to a value greater than 0 to see the fills.",null,{tags:["Intermediate"]});

    CommonSerial.prototype.publish("xAxisGridAlpha", 0.0, "number", "Grid alpha.",null,{tags:["Intermediate"]});
    CommonSerial.prototype.publish("yAxisGridAlpha", 0.0, "number", "Grid alpha.",null,{tags:["Intermediate"]});

    CommonSerial.prototype.publish("yAxisTitleOffset", null, "number", "",null,{tags:["Intermediate"]});

    CommonSerial.prototype.publish("xAxisTypeTimePattern", "%Y-%m-%d", "string", "Time Series Pattern");
    CommonSerial.prototype.publish("yAxisTypeTimePattern", "%Y-%m-%d", "string", "Time Series Pattern");

    CommonSerial.prototype.publish("yAxisType", "linear", "set", "Y-Axis Type", ["none", "linear", "pow", "log", "time"],{tags:["Intermediate","Shared"]});
    CommonSerial.prototype.publish("xAxisType", "ordinal", "set", "X-Axis Type", ["ordinal", "linear", "time"]);

    CommonSerial.prototype.publish("yAxisTickFormat", "", "string", "Y-Axis Tick Format");
    CommonSerial.prototype.publish("xAxisTickFormat", "", "string", "Y-Axis Tick Format");

    CommonSerial.prototype.publish("startOnAxis", true, "boolean", "Draw Chart Starting On Axis.",null,{tags:["Intermediate"]});    

    CommonSerial.prototype._origBackwardsCompatible = CommonSerial.prototype.backwardsCompatible;
    CommonSerial.prototype.backwardsCompatible = function(_) {
      var retVal = CommonSerial.prototype._origBackwardsCompatible.apply(this, arguments);
        if (arguments.length) {
            this.switchProperties(_);
        }
        return retVal;
    };

    CommonSerial.prototype.switchProperties = function(val) {
        if (val === true) {
            CommonSerial.prototype.excludeObjs = ["amchart_SerialAxis"];
            // hide the regular ones with the exclude tags?
        } else {
            CommonSerial.prototype.excludeObjs = [];
        }
    };

    var xAxes = CommonSerial.prototype.xAxes;
    var yAxes = CommonSerial.prototype.yAxes;
    CommonSerial.prototype.Axes = function (type, idx) {
        var axe = type === "x" ? xAxes : yAxes;
        if (idx === undefined) {
            var context = this;
            var axes = axe.call(this);
            axes.forEach(function(axis) {
                axis._context = context;
            });
            return axes;
        }

        var axis;

        axis = axe.call(this)[idx];
        if (axis) {
             axis._context = this;
             return axis;
        }

        axis = new Axis();
        
        var currentAxes = axe.call(this);
        axis._context = this;
        currentAxes.push(axis);
        axe.call(this, currentAxes);
        return axis;
    };

    CommonSerial.prototype.xAxis = function (idx) {
        return this.Axes("x", idx);
    };

    CommonSerial.prototype.yAxis = function (idx) {
        return this.Axes("y", idx);
    };

    CommonSerial.prototype.formatData = function (d) {
        switch (this.xAxis()[0].axisType()) {
            case "time":
                return this.xAxis()[0]._parser(typeof d === "number" ? d.toString() : d);
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

        switch (this.yAxis()[0].axisType()) {
            case "time":
                return this.yAxis()[0]._parser(typeof d === "number" ? d.toString() : d);
            default:
                if (typeof d === "string") {
                    return +d;
                }
                return d;
        }
    };

    CommonSerial.prototype.amFormatData = function(dataArr) {
        this._rangeType = null;
        var dataObjArr = [];
        var context = this;

        dataArr.forEach(function(dataRow) {
            var dataObj = {};
            dataRow.forEach(function(cell, cIdx) {
                var colName = context.columns()[cIdx];
                if (cell instanceof Array) {
                    var idx = cIdx - 1;
                    if (cell.length === 2) {
                        dataObj["openField" + idx] = context.formatValue(cell[0]);
                        dataObj["valueField" + idx] = context.formatValue(cell[1]);
                        context._rangeType = "normal";
                    } else {
                        dataObj["lowField" + idx] = context.formatValue(cell[0]);
                        dataObj["openField" + idx] = context.formatValue(cell[1]);
                        dataObj["closeField" + idx] = context.formatValue(cell[2]);
                        dataObj["highField" + idx] = context.formatValue(cell[3]);
                        context._rangeType = "candle-ohlc";
                    }
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

        if (this.sortDates()) {
            var sortField = context.columns()[0];
            dataObjArr.sort(function (a, b) {
                return a[sortField] - b[sortField];
            });
        }

        return dataObjArr;
    };

    CommonSerial.prototype.updateChartOptions = function() {
        var context = this;
        this._chart.type = "serial";
        this._chart.startDuration = this.startDuration();
        this._chart.rotate = this.orientation() === "vertical";

        this._chart.color = this.fontColor();
        this._chart.fontSize = this.fontSize();
        this._chart.fontFamily = this.fontFamily();

        this._chart.categoryAxis = {};
        //this._chart.titles = [];

        var xAxis = this.xAxis()[0];
        xAxis.type("x");

        this._chart.categoryAxis.position = xAxis.position() ? xAxis.position() : "bottom";
        this._chart.categoryAxis.autoGridCount = (this.xAxisAutoGridCount() && this.backwardsCompatible()) ? this.xAxisAutoGridCount() : xAxis.axisAutoGridCount();
        this._chart.categoryAxis.gridPosition = (this.xAxisGridPosition() && this.backwardsCompatible())  ? this.xAxisGridPosition() : xAxis.axisGridPosition();
        this._chart.categoryAxis.axisAlpha = (this.axisAlpha() && this.backwardsCompatible()) ? this.axisAlpha() : xAxis.axisAlpha();
        this._chart.categoryAxis.gridAlpha = (this.xAxisGridAlpha() && this.backwardsCompatible()) ? this.xAxisGridAlpha() : xAxis.axisGridAlpha();
        this._chart.categoryAxis.startOnAxis = (this.startOnAxis() && this.backwardsCompatible()) ? this.startOnAxis() : xAxis.startOnAxis();
        this._chart.categoryAxis.labelRotation = (this.xAxisLabelRotation() && this.backwardsCompatible()) ? this.xAxisLabelRotation() : xAxis.axisLabelRotation();
        this._chart.categoryAxis.title = (this.xAxisTitle() && this.backwardsCompatible()) ? this.xAxisTitle() : xAxis.axisTitle();

        this._chart.categoryAxis.axisColor = (this.xAxisBaselineColor() && this.backwardsCompatible()) ? this.xAxisBaselineColor() : xAxis.axisBaselineColor();
        this._chart.categoryAxis.axisThickness = (this.axisLineWidth() && this.backwardsCompatible()) ? this.axisLineWidth() : xAxis.axisLineWidth();
        this._chart.categoryAxis.boldPeriodBeginning = (this.xAxisBoldPeriodBeginning() && this.backwardsCompatible()) ? this.xAxisBoldPeriodBeginning() : xAxis.axisBoldPeriodBeginning();
        this._chart.categoryAxis.dashLength = (this.xAxisDashLength() && this.backwardsCompatible()) ? this.xAxisDashLength() : xAxis.axisDashLength();
        this._chart.categoryAxis.fillAlpha = (this.xAxisFillAlpha() && this.backwardsCompatible()) ? this.xAxisFillAlpha() : xAxis.axisFillAlpha();
        this._chart.categoryAxis.fillColor = (this.xAxisFillColor() && this.backwardsCompatible()) ? this.xAxisFillColor() : xAxis.axisFillColor();
        this._chart.categoryAxis.fontSize = (this.axisFontSize() && this.backwardsCompatible()) ? this.axisFontSize() : xAxis.axisFontSize();
        this._chart.categoryAxis.color = (this.xAxisFontColor() && this.backwardsCompatible()) ? this.xAxisFontColor() : xAxis.axisFontColor();
        this._chart.categoryAxis.titleColor = (this.xAxisTitleFontColor() && this.backwardsCompatible()) ? this.xAxisTitleFontColor() : xAxis.axisTitleFontColor();
        this._chart.categoryAxis.titleFontSize = (this.xAxisTitleFontSize() && this.backwardsCompatible()) ? this.xAxisTitleFontSize() : xAxis.axisTitleFontSize();

        this._chart.categoryAxis.showFirstLabel = this.showFirstLabel();
        this._chart.categoryAxis.showLastLabel = this.showLastLabel();

        this._chart.categoryAxis.equalSpacing = this.equalSpacing();

        if (this.backwardsCompatible()) {
            switch(this.xAxisType()) {
                case "time":
                    this._chart.categoryAxis.parseDates = true;
                    this._chart.categoryAxis.minPeriod = this.axisMinPeriod() ? this.axisMinPeriod() : undefined;
                    this._chart.categoryAxis.logarithmic = false;

                    if (this.xAxisTickFormat()) {
                        this.dataFormatter = d3.time.format(this.xAxisTickFormat());
                    } else if (this.xAxisTypeTimePattern()) {
                        this.dataFormatter = d3.time.format(xAxis.axisTypeTimePattern());
                    } else {
                        this.dataFormatter =  function(v) { return v; };
                    }

                    break;
                case "log":
                    this._chart.categoryAxis.parseDates = false;
                    this._chart.categoryAxis.logarithmic = true;
                    this.dataFormatter = this.xAxisTickFormat() ? d3.format(this.xAxisTickFormat()) : function(v) { return v; };
                    break;
                case "linear":
                    /* falls through */
                default:
                    this._chart.categoryAxis.parseDates = false;
                    this._chart.categoryAxis.logarithmic = false;
                    this.dataFormatter = this.xAxisTickFormat() ? d3.format(this.xAxisTickFormat()) : function(v) { return v; };
                    break;
            }

            this._chart.categoryAxis.labelFunction = function(v1, v2, v3) {
                switch (context.xAxisType()) {
                    case "time":
                        return context.dataFormatter(this.xAxisTickFormat() || this.xAxisTypeTimePattern()  ? new Date(v2) : v2);
                    default:
                        return context.dataFormatter(v1);
                }
            };
        } else {
            switch(xAxis.axisType()) {
                case "time":
                    this._chart.categoryAxis.parseDates = true;
                    this._chart.categoryAxis.minPeriod = this.axisMinPeriod() ? this.axisMinPeriod() : undefined;
                    this._chart.categoryAxis.logarithmic = false;

                    if (xAxis.axisTickFormat()) {
                        this.dataFormatter = d3.time.format(xAxis.axisTickFormat());
                    } else if (xAxis.axisTypeTimePattern()) {
                        this.dataFormatter = d3.time.format(xAxis.axisTypeTimePattern());
                    } else {
                        this.dataFormatter =  function(v) { return v; };
                    }

                    break;
                case "log":
                    this._chart.categoryAxis.parseDates = false;
                    this._chart.categoryAxis.logarithmic = true;
                    this.dataFormatter = xAxis.axisTickFormat() ? d3.format(xAxis.axisTickFormat()) : function(v) { return v; };
                    break;
                case "linear":
                    /* falls through */
                default:
                    this._chart.categoryAxis.parseDates = false;
                    this._chart.categoryAxis.logarithmic = false;
                    this.dataFormatter = xAxis.axisTickFormat() ? d3.format(xAxis.axisTickFormat()) : function(v) { return v; };
                    break;
            }

            this._chart.categoryAxis.labelFunction = function(v1, v2, v3) {
                switch (xAxis.axisType()) {
                    case "time":
                        return context.dataFormatter(xAxis.axisTickFormat() || xAxis.axisTypeTimePattern()  ? new Date(v2) : v2);
                    default:
                        return context.dataFormatter(v1);
                }
            };
        }
        for (var i = 0; i < this.yAxes().length; i++) {
            var yAxis = this.yAxis()[i];
            yAxis.type("y");

            this._chart.valueAxes.push(new AmCharts.ValueAxis());

            this._chart.valueAxes[i].id = "v" + i;
            this._chart.valueAxes[i].position = yAxis.position() ? yAxis.position() : "left";
            this._chart.valueAxes[i].title = (this.yAxisTitle() && this.backwardsCompatible()) ? this.yAxisTitle() : yAxis.axisTitle();
            this._chart.valueAxes[i].titleColor = (this.yAxisTitleFontColor() && this.backwardsCompatible()) ? this.yAxisTitleFontColor() : yAxis.axisTitleFontColor();
            this._chart.valueAxes[i].titleFontSize = (this.yAxisTitleFontSize() && this.backwardsCompatible()) ? this.yAxisTitleFontSize() : yAxis.axisTitleFontSize();
            this._chart.valueAxes[i].axisThickness = (this.axisLineWidth() && this.backwardsCompatible()) ? this.axisLineWidth() : yAxis.axisLineWidth();
            this._chart.valueAxes[i].color = (this.yAxisFontColor() && this.backwardsCompatible()) ? this.yAxisFontColor() : yAxis.axisFontColor();
            this._chart.valueAxes[i].fontSize = (this.axisFontSize() && this.backwardsCompatible()) ? this.axisFontSize() : yAxis.axisFontSize();
            this._chart.valueAxes[i].axisColor = (this.yAxisBaselineColor() && this.backwardsCompatible()) ? this.yAxisBaselineColor() : yAxis.axisBaselineColor();
            this._chart.valueAxes[i].axisAlpha = (this.axisAlpha() && this.backwardsCompatible()) ? this.axisAlpha() : yAxis.axisAlpha();
            this._chart.valueAxes[i].fillColor = (this.yAxisFillColor() && this.backwardsCompatible()) ? this.yAxisFillColor() : yAxis.axisFillColor();
            this._chart.valueAxes[i].fillAlpha = (this.yAxisFillAlpha() && this.backwardsCompatible()) ? this.yAxisFillAlpha() : yAxis.axisFillAlpha();
            this._chart.valueAxes[i].labelRotation = (this.xAxisLabelRotation() && this.backwardsCompatible()) ? this.xAxisLabelRotation() : yAxis.axisLabelRotation(); // need to check serial axis object

            this._chart.valueAxes[i].gridAlpha = (this.yAxisGridAlpha() && this.backwardsCompatible()) ? this.yAxisGridAlpha() : yAxis.axisGridAlpha();
            this._chart.valueAxes[i].dashLength = (this.yAxisDashLength() && this.backwardsCompatible()) ? this.yAxisDashLength() : yAxis.axisDashLength();
            this._chart.valueAxes[i].boldPeriodBeginning = (this.yAxisBoldPeriodBeginning() && this.backwardsCompatible()) ? this.yAxisBoldPeriodBeginning() : yAxis.axisBoldPeriodBeginning();
            //this._chart.valueAxes[0].axisTitleOffset = this.yAxisTitleOffset(); ?? TODO

            if (this.backwardsCompatible()) {
                switch(this.yAxisType()) {
                    case "time":
                        this._chart.valueAxes[i].type = "date";
                        this._chart.valueAxes[i].parseDates = true;
                        this._chart.valueAxes[i].minPeriod = this.axisMinPeriod() ? this.axisMinPeriod() : undefined;
                        this._chart.valueAxes[i].logarithmic = false;

                        if (yAxis.axisTickFormat()) {
                            this.valueFormatter = d3.time.format(this.yAxisTickFormat());
                        } else if (this.yAxisTypeTimePattern()) {
                            this.valueFormatter = d3.time.format(this.yAxisTypeTimePattern());
                        } else {
                            this.valueFormatter =  function(v) { return v; };
                        }
                        break;
                    case "log":
                        this._chart.valueAxes[i].parseDates = false;
                        this._chart.valueAxes[i].logarithmic = true;
                        this._chart.valueAxes[i].type = "numeric";
                        this.valueFormatter = this.yAxisTickFormat() ? d3.format(this.yAxisTickFormat()) : function(v) { return v; };
                        break;
                    case "linear":
                        /* falls through */
                    default:
                        this._chart.valueAxes[i].parseDates = false;
                        this._chart.valueAxes[i].type = "numeric";
                        this._chart.valueAxes[i].logarithmic = false;
                        this.valueFormatter = this.yAxisTickFormat() ? d3.format(this.yAxisTickFormat()) : function(v) { return v; };
                        break;
                }

                this._chart.valueAxes[i].labelFunction = function(v1, v2, v3) {
                    switch (context.yAxisType()) {
                        case "time":
                            return context.valueFormatter(this.yAxisTickFormat() || this.yAxisTypeTimePattern() ? new Date(v2) : v2);
                        default:
                            return context.valueFormatter(v1);
                    }
                };
            } else {
                switch(yAxis.axisType()) {
                    case "time":
                        this._chart.valueAxes[i].type = "date";
                        this._chart.valueAxes[i].parseDates = true;
                        this._chart.valueAxes[i].minPeriod = this.axisMinPeriod() ? this.axisMinPeriod() : undefined;
                        this._chart.valueAxes[i].logarithmic = false;

                        if (yAxis.axisTickFormat()) {
                            this.valueFormatter = d3.time.format(yAxis.axisTickFormat());
                        } else if (yAxis.axisTypeTimePattern()) {
                            this.valueFormatter = d3.time.format(yAxis.axisTypeTimePattern());
                        } else {
                            this.valueFormatter =  function(v) { return v; };
                        }
                        break;
                    case "log":
                        this._chart.valueAxes[i].parseDates = false;
                        this._chart.valueAxes[i].logarithmic = true;
                        this._chart.valueAxes[i].type = "numeric";
                        this.valueFormatter = yAxis.axisTickFormat() ? d3.format(yAxis.axisTickFormat()) : function(v) { return v; };
                        break;
                    case "linear":
                        /* falls through */
                    default:
                        this._chart.valueAxes[i].parseDates = false;
                        this._chart.valueAxes[i].type = "numeric";
                        this._chart.valueAxes[i].logarithmic = false;
                        this.valueFormatter = yAxis.axisTickFormat() ? d3.format(yAxis.axisTickFormat()) : function(v) { return v; };
                        break;
                }

                this._chart.valueAxes[i].labelFunction = function(v1, v2, v3) {
                    switch (yAxis.axisType()) {
                        case "time":
                            return context.valueFormatter(yAxis.axisTickFormat() || yAxis.axisTypeTimePattern() ? new Date(v2) : v2);
                        default:
                            return context.valueFormatter(v1);
                    }
                };
            }
        }

        if (this.showScrollbar()) {
            this._chart.chartScrollbar.enabled = true;
        } else {
            this._chart.chartScrollbar.enabled = false;
        }
        
        if (this.showCursor()) {
            this._chart.chartCursor.enabled = true;
            this._chart.chartCursor.valueLineEnabled = true;
            this._chart.chartCursor.valueLineBalloonEnabled = true;
            this._chart.chartCursor.categoryBalloonEnabled = true;
        } else {
            this._chart.chartCursor.enabled = false;
            this._chart.chartCursor.valueLineEnabled = false;
            this._chart.chartCursor.valueLineBalloonEnabled = false;
            this._chart.chartCursor.categoryBalloonEnabled = false;
        }

        if (this.backwardsCompatible()) {
            this._currXAxisTypes = this.xAxisType();
            this._currYAxisTypes = this.yAxisType();
            this._currXAxisTypeTimePatterns = this.xAxisTypeTimePattern();
            this._currYAxisTypeTimePatterns = this.yAxisTypeTimePattern();

        } else {
            this._currXAxisTypes = this.xAxes().map(function(axe) { return axe.axisType(); }).toString();
            this._currYAxisTypes = this.yAxes().map(function(axe) { return axe.axisType(); }).toString();
            this._currXAxisTypeTimePatterns = this.xAxes().map(function(axe) { return axe.axisTypeTimePattern(); }).toString();
            this._currYAxisTypeTimePatterns = this.yAxes().map(function(axe) { return axe.axisTypeTimePattern(); }).toString();
        }

        if (this._dataUpdated > this._prevDataUpdated || this._prevYAxisType !== this._currYAxisTypes || 
            this._prevXAxisType !== this._currXAxisTypes || this._prevXAxisTypeTimePattern !== this._currXAxisTypeTimePatterns || 
            this._prevYAxisTypeTimePattern !== this._currYAxisTypeTimePatterns || (this.paletteGrouping && this._prevPaletteGrouping !== this.paletteGrouping()) ||
            this._columnsUpdated > this._prevColumnsUpdated
        ) {
            this._chart.dataProvider = this.amFormatData(this.data());
        }
        this._chart.dataProvider = this.amFormatData(this.data());
        this._prevDataUpdated = this._dataUpdated;
        this._prevColumnsUpdated = this._columnsUpdated;
        this._prevXAxisTypes = this._currXAxisTypes;
        this._prevYAxisTypes = this._currYAxisTypes;
        this._prevXAxisTypeTimePatterns = this._currXAxisTypeTimePatterns;
        this._prevYAxisTypeTimePatterns = this._currXAxisTypeTimePatterns;
    

        if (this.paletteGrouping) {
            this._prevPaletteGrouping =  this.paletteGrouping();
        }

        this.amFormatColumns();

        var color;
        var cType;
        this._chart.colors = [];
        if (context._class.indexOf("amchart_Area") !== -1) {
            cType = "Area";
        }
        this._chart.dataProvider.forEach(function(dataPoint,i){
            context.columns().filter(function (d, i) { return i > 0; }).forEach(function(col, idx) {
                if (context.paletteGrouping() === "By Category") {
                    color = context._palette(i);
                } else {
                    color = context._palette(col); 
                }

                context._chart.colors.push(color); // needed to work with area and line chart and all?

                context._chart.dataProvider[i]["color" + idx] = color;

                if (cType !== "Area") {
                    context._chart.dataProvider[i]["linecolor" + idx] = context.lineColor() ? context.lineColor() : color;
                }

                if (context._colorObj[i] === undefined) {
                    context._colorObj[i] = {};
                }

                context._colorObj[i][idx] = {
                    color: color,
                    lineColor: context.lineColor() ? context.lineColor() : color
                };
            }); 
        });

        return this._chart;
    };

    CommonSerial.prototype.buildGraphObj = function(gType,i) {
        var context = this;
        var gObj = {};

        gObj.id = "g" + i;

        if (this.y2().indexOf(i) !== -1) {
            gObj.valueAxis = "v1";
        } else {
            gObj.valueAxis = "v0";
        }

        gObj.balloonFunction = function(d) {
            //var balloonText = d.category + ", " + context.columns()[d.graph.columnIndex+1]  + ": " + context.data()[d.index][d.graph.columnIndex+1];
            if (d.graph.type === "line") {
                return d.category + ", " + context.columns()[d.graph.index + 1]  + ": " + context.data()[d.index][d.graph.index + 1];
            } else {
                return d.category + ", " + context.columns()[d.graph.columnIndex + 1]  + ": " + context.data()[d.index][d.graph.columnIndex + 1];   
            }
        };
        gObj.lineAlpha = context.lineOpacity();
        gObj.lineColor = context.lineColor();
        gObj.lineThickness = context.lineWidth();
        gObj.dashLength = context.dashedLineStyle(); // TODO: convert to css Array Prop

        gObj.type = gType;

        gObj.title = "";
        var fieldArr = ["value","open","close","high","low"];
        fieldArr.forEach(function(field){
            if(typeof(context["_" + field + "Field"]) !== "undefined" && typeof(context["_" + field + "Field"][i]) !== "undefined"){
                gObj[field+"Field"] = context["_" + field + "Field"][i];
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

        gObj.colorField = "color" + i;

        gObj.lineColorField = "linecolor" + i;
        gObj.fillColorsField = "fillcolor" + i;

        return gObj;
    };

    CommonSerial.prototype.amFormatColumns = function(ColArr) {
        this._categoryField = this.columns()[0];
        this._chart.categoryField = this.columns()[0];
        this._openField = [];
        this._closeField = [];
        this._valueField = this.columns().slice(1);
        return this;
    };

    CommonSerial.prototype.enter = function(domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);

        var context = this;
        var initObj = {
            type: "serial",
            addClassNames: true,
            chartScrollbar: {},
            chartCursor: {
                "enabled": false,
                "valueLineEnabled": false,
                "valueLineBalloonEnabled": false,
                "categoryBalloonEnabled": false,
                "cursorAlpha": 0,
                "valueLineAlpha": 0.2,
                "oneBalloonOnly": true,
                "balloonPointerOrientation": "vertical",
                "valueBalloonsEnabled": false // always set false
            }
        };
        if (typeof define === "function" && define.amd) {
            initObj.pathToImages = require.toUrl("amchartsImg");
        }
        this._chart = AmCharts.makeChart(domNode, initObj);
        this._chart.addListener("clickGraphItem", function(e) {
            var graph = e.graph;
            var data  = e.item.dataContext;
            var field;
            var field2;

            if (context._gType === "column") {
                field = graph.fillColorsField;
                field2 = graph.lineColorField;
            } else if (context._gType === "line") {
                field = graph.colorField;
            } else if (context._gType === "area") {
                field = graph.colorField;
            }
            if (field) {
                if (data[field] !== null && data[field] !== undefined) {
                    delete data[field];
                    data[field2] = context._colorObj[e.index][e.target.columnIndex].lineColor;
                    if (context.selectionMode() === "simple") {
                        if (context._selected !== null) {
                            delete context._selected.data[context._selected.field];
                            context._selected.data[context._selected.field2] = context._colorObj[context._selected.dIdx][context._selected.cIdx].lineColor;
                        }
                        context._selected = null;
                    }
                } else {
                    data[field] = context.selectionColor();
                    data[field2] = context.selectionColor();
                    if (context.selectionMode() === "simple") {
                        if (context._selected !== null) {
                            delete context._selected.data[context._selected.field];
                            context._selected.data[context._selected.field2] = context._colorObj[context._selected.dIdx][context._selected.cIdx].lineColor;
                        }
                        context._selected = {
                            field: field,
                            field2: field2,
                            data: data,
                            dIdx: e.index,
                            cIdx: e.target.columnIndex
                        };
                        context._selections.push(context._selected);
                    }
                }
                e.chart.validateData();
            }

            context.click(context.rowToObj(context.data()[e.index]), context.columns()[e.target.columnIndex + 1], context._selected !== null);
        });
    };

    CommonSerial.prototype.update = function(domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);

        if (!this.xAxis().length) {
            this.xAxis(0);
        }
        if (!this.yAxis().length) {
            this.yAxis(0);
        }

        if (this.y2().length) {
            this.yAxis(1);
        }

        domNode.style.width = this.size().width + "px";
        domNode.style.height = this.size().height + "px";
        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }
    };

    CommonSerial.prototype.render = function(callback) {
        return HTMLWidget.prototype.render.apply(this, arguments);
    };

    CommonSerial.prototype.data = function(_) {
        if (arguments.length) {
            this._dataUpdated++;
        }
        return HTMLWidget.prototype.data.apply(this, arguments);
    };

    CommonSerial.prototype.columns = function(_) {
        if (arguments.length) {
            this._columnsUpdated++;
        }
        return HTMLWidget.prototype.columns.apply(this, arguments);
    };

    return CommonSerial;
}));