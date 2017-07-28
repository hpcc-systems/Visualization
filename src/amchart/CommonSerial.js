"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "amcharts-serial", "require", "../common/Utility", "./SerialAxis", "../api/ITooltip"], factory);
    } else {
        root.amchart_CommonSerial = factory(root.d3, root.common_HTMLWidget, root.AmCharts, root.require, root.common_Utility, root.amchart_SerialAxis, root.api_ITooltip);
    }
}(this, function (d3, HTMLWidget, AmCharts, require, Utility, Axis, ITooltip) {
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

        this._xAxis = new Axis();
        this._xAxis.owningWidget  = this;

        this._yAxis = new Axis();
        this._yAxis.owningWidget  = this;
    }

    CommonSerial.prototype = Object.create(HTMLWidget.prototype);
    CommonSerial.prototype.constructor = CommonSerial;
    CommonSerial.prototype._class += " amchart_CommonSerial";
    CommonSerial.prototype.implements(ITooltip.prototype);
    
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

    CommonSerial.prototype.publish("axisLineWidth", 1, "number", "Axis Line Width",null,{tags:["Intermediate","Shared"]});

    CommonSerial.prototype.publish("axisAlpha", 1, "number", "Axis Alpha",null,{tags:["Intermediate"]}); // share?

    CommonSerial.prototype.publish("startOnAxis", true, "boolean", "Draw Chart Starting On Axis.",null,{tags:["Intermediate"]});  

    CommonSerial.prototype.publish("xAxisShowAllLabels", false, "boolean", "show All Category Axis Labels",null,{tags:["Intermediate"]});    

    // proxy

    CommonSerial.prototype.publish("axisFontSize", null, "number", "X/Y Axis Text Font Size",null,{tags:["Basic","Shared"]});

    CommonSerial.prototype.publishProxy("xAxisBaselineColor", "_xAxis", "axisBaselineColor");
    CommonSerial.prototype.publishProxy("yAxisBaselineColor", "_yAxis", "axisBaselineColor");

    CommonSerial.prototype.publishProxy("xAxisFontColor", "_xAxis", "axisFontColor");
    CommonSerial.prototype.publishProxy("yAxisFontColor", "_yAxis", "axisFontColor");

    CommonSerial.prototype.publishProxy("xAxisTitle", "_xAxis", "axisTitle");
    CommonSerial.prototype.publishProxy("yAxisTitle", "_yAxis", "axisTitle");

    CommonSerial.prototype.publishProxy("xAxisTitleFontSize", "_xAxis", "axisTitleFontSize");
    CommonSerial.prototype.publishProxy("yAxisTitleFontSize", "_yAxis", "axisTitleFontSize");

    CommonSerial.prototype.publishProxy("xAxisTitleFontColor", "_xAxis", "axisTitleFontColor");
    CommonSerial.prototype.publishProxy("yAxisTitleFontColor", "_yAxis", "axisTitleFontColor");

    CommonSerial.prototype.publishProxy("xAxisLabelRotation", "_xAxis", "axisLabelRotation");
    CommonSerial.prototype.publishProxy("yAxisLabelRotation", "_yAxis", "axisLabelRotation");

    CommonSerial.prototype.publishProxy("xAxisAutoGridCount", "_xAxis", "axisAutoGridCount");
    CommonSerial.prototype.publishProxy("yAxisAutoGridCount", "_yAxis", "axisAutoGridCount"); // need to add?

    CommonSerial.prototype.publishProxy("xAxisGridPosition", "_xAxis", "axisGridPosition");

    CommonSerial.prototype.publishProxy("xAxisBoldPeriodBeginning", "_xAxis", "axisBoldPeriodBeginning");
    CommonSerial.prototype.publishProxy("yAxisBoldPeriodBeginning", "_yAxis", "axisBoldPeriodBeginning");

    CommonSerial.prototype.publishProxy("xAxisDashLength", "_xAxis", "axisDashLength");
    CommonSerial.prototype.publishProxy("yAxisDashLength", "_yAxis", "axisDashLength");

    CommonSerial.prototype.publishProxy("xAxisFillAlpha", "_xAxis", "axisFillAlpha");
    CommonSerial.prototype.publishProxy("yAxisFillAlpha", "_yAxis", "axisFillAlpha");

    CommonSerial.prototype.publishProxy("xAxisFillColor", "_xAxis", "axisFillColor");
    CommonSerial.prototype.publishProxy("yAxisFillColor", "_yAxis", "axisFillColor");

    CommonSerial.prototype.publishProxy("xAxisGridAlpha", "_xAxis", "axisGridAlpha");
    CommonSerial.prototype.publishProxy("yAxisGridAlpha", "_yAxis", "axisGridAlpha");

    CommonSerial.prototype.publishProxy("xAxisTypeTimePattern", "_xAxis", "axisTypeTimePattern");
    CommonSerial.prototype.publishProxy("yAxisTypeTimePattern", "_yAxis", "axisTypeTimePattern");

    CommonSerial.prototype.publishProxy("xAxisType", "_xAxis", "axisType");
    CommonSerial.prototype.publishProxy("yAxisType", "_yAxis", "axisType");

    CommonSerial.prototype.publishProxy("xAxisTickFormat", "_xAxis", "axisTickFormat");
    CommonSerial.prototype.publishProxy("yAxisTickFormat", "_yAxis", "axisTickFormat");

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

    CommonSerial.prototype.xAxis = function (idx) {
        if (!this.xAxes()[idx]) {
            var xAxis = new Axis();
            xAxis._owningWidget = this;
            this.xAxes()[idx] = xAxis;
        }
        return this.xAxes()[idx];
    };

    CommonSerial.prototype.yAxis = function (idx) {
        if (!this.yAxes()[idx]) {
            var yAxis = new Axis();
            yAxis._owningWidget = this;
            this.yAxes()[idx] = yAxis;
        }
        return this.yAxes()[idx];
    };

    CommonSerial.prototype.formatData = function (d) {
        switch (this.xAxes()[0].axisType()) {
            case "time":
                return this.xAxes()[0]._parser(typeof d === "number" ? d.toString() : d);
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

        switch (this.yAxes()[0].axisType()) {
            case "time":
                return this.yAxes()[0]._parser(typeof d === "number" ? d.toString() : d);
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
            dataObj.__origRow = dataRow;
            dataObjArr.push(dataObj);
        });

        if (this.xAxisType() === "time") {
            var sortField = context.columns()[0];
            dataObjArr.sort(function (a, b) {
                return a[sortField] - b[sortField];
            });
            this.data(dataObjArr.map(function (row) {
                var retVal = row.__origRow;
                delete row.__origRow;
                return retVal;
            }));
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

        var xAxis = this.xAxes()[0];

        //xAxis.type("x");

        this._chart.categoryAxis.position =  xAxis.position() ? xAxis.position() : "bottom";
        this._chart.categoryAxis.autoGridCount = xAxis.axisAutoGridCount();
        this._chart.categoryAxis.gridPosition = xAxis.axisGridPosition();
        this._chart.categoryAxis.axisAlpha = xAxis.axisAlpha();
        this._chart.categoryAxis.gridAlpha = xAxis.axisGridAlpha();
        this._chart.categoryAxis.startOnAxis = xAxis.startOnAxis();
        this._chart.categoryAxis.labelRotation = xAxis.axisLabelRotation();
        this._chart.categoryAxis.title = xAxis.axisTitle();

        this._chart.categoryAxis.axisColor = xAxis.axisBaselineColor();
        this._chart.categoryAxis.axisThickness = xAxis.axisLineWidth();
        this._chart.categoryAxis.boldPeriodBeginning = xAxis.axisBoldPeriodBeginning();
        this._chart.categoryAxis.dashLength = xAxis.axisDashLength();
        this._chart.categoryAxis.fillAlpha = xAxis.axisFillAlpha();
        this._chart.categoryAxis.fillColor = xAxis.axisFillColor();
        this._chart.categoryAxis.fontSize = xAxis.axisFontSize();
        this._chart.categoryAxis.color = xAxis.axisFontColor();
        this._chart.categoryAxis.titleColor = xAxis.axisTitleFontColor();
        this._chart.categoryAxis.titleFontSize = xAxis.axisTitleFontSize();

        this._chart.categoryAxis.showFirstLabel = this.showFirstLabel();
        this._chart.categoryAxis.showLastLabel = this.showLastLabel();

        this._chart.categoryAxis.equalSpacing = this.equalSpacing();

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

        for (var i = 0; i < this.yAxes().length; i++) {
            var valueFormatter,
                yAxis = this.yAxes()[i];
            //yAxis.type("y");

            if (!this._chart.valueAxes[i]) {
                this._chart.valueAxes.push(new AmCharts.ValueAxis());
            }

            this._chart.valueAxes[i].id = "v" + i;
            this._chart.valueAxes[i].position = yAxis.position() ? yAxis.position() : "left";
            this._chart.valueAxes[i].title = yAxis.axisTitle();
            this._chart.valueAxes[i].titleColor = yAxis.axisTitleFontColor();
            this._chart.valueAxes[i].titleFontSize = yAxis.axisTitleFontSize();
            this._chart.valueAxes[i].axisThickness = yAxis.axisLineWidth();
            this._chart.valueAxes[i].color = yAxis.axisFontColor();
            this._chart.valueAxes[i].fontSize = yAxis.axisFontSize();
            this._chart.valueAxes[i].axisColor = yAxis.axisBaselineColor();
            this._chart.valueAxes[i].axisAlpha = yAxis.axisAlpha();
            this._chart.valueAxes[i].fillColor = yAxis.axisFillColor();
            this._chart.valueAxes[i].fillAlpha = yAxis.axisFillAlpha();

            this._chart.valueAxes[i].gridAlpha = yAxis.axisGridAlpha();
            this._chart.valueAxes[i].dashLength = yAxis.axisDashLength();
            this._chart.valueAxes[i].boldPeriodBeginning = yAxis.axisBoldPeriodBeginning();

            this._chart.valueAxes[i].autoGridCount = yAxis.axisAutoGridCount();

            switch(yAxis.axisType()) {
                case "time":
                    this._chart.valueAxes[i].type = "date";
                    this._chart.valueAxes[i].parseDates = true;
                    this._chart.valueAxes[i].minPeriod = this.axisMinPeriod() ? this.axisMinPeriod() : undefined;
                    this._chart.valueAxes[i].logarithmic = false;

                    if (yAxis.axisTickFormat()) {
                        valueFormatter = d3.time.format(yAxis.axisTickFormat());
                    } else if (yAxis.axisTypeTimePattern()) {
                        valueFormatter = d3.time.format(yAxis.axisTypeTimePattern());
                    } else {
                        valueFormatter =  function(v) { return v; };
                    }
                    break;
                case "log":
                    this._chart.valueAxes[i].parseDates = false;
                    this._chart.valueAxes[i].logarithmic = true;
                    this._chart.valueAxes[i].type = "numeric";
                    valueFormatter = yAxis.axisTickFormat() ? d3.format(yAxis.axisTickFormat()) : function(v) { return v; };
                    break;
                case "linear":
                    /* falls through */
                default:
                    this._chart.valueAxes[i].parseDates = false;
                    this._chart.valueAxes[i].type = "numeric";
                    this._chart.valueAxes[i].logarithmic = false;
                    valueFormatter = yAxis.axisTickFormat() ? d3.format(yAxis.axisTickFormat()) : function(v) { return v; };
                    break;
            }

            this._chart.valueAxes[i].labelFunction = function(axis, formatter) {
                return function(v1, v2, v3) {
                    switch (axis.axisType()) {
                        case "time":
                            return formatter(axis.axisTickFormat() || axis.axisTypeTimePattern() ? new Date(v2) : v2);
                        default:
                            return formatter(v1);
                    }
                }
            }(yAxis, valueFormatter);
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

        this._currXAxisTypes = this.xAxes().map(function(axe) { return axe.axisType(); }).toString();
        this._currYAxisTypes = this.yAxes().map(function(axe) { return axe.axisType(); }).toString();
        this._currXAxisTypeTimePatterns = this.xAxes().map(function(axe) { return axe.axisTypeTimePattern(); }).toString();
        this._currYAxisTypeTimePatterns = this.yAxes().map(function(axe) { return axe.axisTypeTimePattern(); }).toString();

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
        if (xAxis.axisAutoGridCount() === false && this.xAxisShowAllLabels()) {
            this._chart.categoryAxis.gridCount = this._chart.dataProvider.length;
        }

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
                return d.category + ", " + context.columns()[d.graph.index + 1]  + ": " + d3.format(context.tooltipValueFormat())(context.data()[d.index][d.graph.columnIndex + 1]);
            }else if(context && context.tooltipValueFormat){
                return d.category + ", " + context.columns()[d.graph.columnIndex + 1]  + ": " + d3.format(context.tooltipValueFormat())(context.data()[d.index][d.graph.columnIndex + 1]);
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

        if (this.xAxes().length === 0) {
            this.xAxes().push(this._xAxis);
        }
        if (this.yAxes().length === 0) {
            this.yAxes().push(this._yAxis);
        }
        if (this.y2().length && this.yAxes().length === 1) {
            var y2Axis = new Axis();
            y2Axis.owningWidget  = this;
            this.yAxes().push(y2Axis);
        }

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
            initObj.pathToImages = require.toUrl("amcharts-images");
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
        
        var context = this;
        
        // assign correct axe to PPs and correct context to PropertyExt Obj
        this.yAxes().forEach(function(axe, idx) {
            if (idx === 0) {
                context._yAxis = axe;
            }
            axe._owningWidget = context;
        });

        this.xAxes().forEach(function(axe, idx) {
            if (idx === 0) {
                context._xAxis = axe;
            }
            axe._owningWidget = context;
        });

        if (this.backwardsCompatible()) {
            this.switchProperties(true);
        } else {
            this.switchProperties(false);
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
