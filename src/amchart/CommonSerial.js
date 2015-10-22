"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "amcharts.serial", "require", "./Axis"], factory);
    } else {
        root.amchart_CommonSerial = factory(root.d3, root.common_HTMLWidget, root.AmCharts, root.require, root.amchart_Axis);
    }

}(this, function(d3, HTMLWidget, AmCharts, require, Axis) {
    function CommonSerial() {
        HTMLWidget.call(this);
        this._tag = "div";

        this._chart = {};

        this._selected = null;
        this._selection = [];

        this._dateParserData = d3.time.format("%Y-%m-%d").parse;
        this._dateParserValue = d3.time.format("%Y-%m-%d").parse;

        // this._xAxis = [new Axis(), new Axis()];
        // this._yAxis = [new Axis(), new Axis()];

    }
    CommonSerial.prototype = Object.create(HTMLWidget.prototype);

    CommonSerial.prototype.constructor = CommonSerial;
    CommonSerial.prototype._class += " amchart_CommonSerial";

    // CommonSerial.prototype.xAxis = function () {
    //     return this._xAxis;
    // };
    // CommonSerial.prototype.yAxis = function () {
    //     return this._yAxis;
    // };

    CommonSerial.prototype.publish("xAxis", [], "widgetArray", "widgets", null, { tags: ["Basic"] });
    CommonSerial.prototype.publish("yAxis", [], "widgetArray", "widgets", null, { tags: ["Basic"] });
    //CommonSerial.prototype.publish("graph", [], "widgetArray", "widgets", null, { tags: ["Basic"] });

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



    //CommonSerial.prototype.publish("balloonType", "amchart", "set", "Balloon Type", ["hpcc", "amchart"]); TODO

    CommonSerial.prototype.publish("selectionColor", "#f00", "html-color", "Font Color",null,{tags:["Basic"]});
    CommonSerial.prototype.publish("selectionMode", "simple", "set", "Selection Mode", ["simple", "multi"], { tags: ["Intermediate"] });

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


    var _origXAxis = CommonSerial.prototype.xAxis;
    CommonSerial.prototype.xAxis = function (_) {
        if (!arguments.length) {
           return _origXAxis.call(this);
        }
        if (_origXAxis.call(this)[_]) {
             return _origXAxis.call(this)[_]
        } else {
            var axis = new Axis();
            axis._context = this;
            var currentAxes = _origXAxis.call(this);
            currentAxes.push(axis)
            _origXAxis.call(this,[axis])
        } 
        return axis;
    };
    // var _origXAxis = CommonSerial.prototype.xAxis;
    // CommonSerial.prototype.xAxis = function (_) {
    //     // if (!arguments.length) {
    //     //    return "error";
    //     // }
    //     // if (_origXAxis.call(this)[_]) {
    //     //      return _origXAxis.call(this)[_]
    //     // } else {
    //     //     var axis = new Axis();
    //     //     axis._context = this;
    //     //     var currentAxes = _origXAxis.call(this);
    //     //     currentAxes.push()
    //     //     _origXAxis.call(this,[axis])
    //     // } 
    //     if (arguments.length) {
    //         var axis = new Axis();
    //         axis._context = this;
    //         var currentAxes = _origXAxis.call(this);
    //         currentAxes.push(axis);
    //         _origXAxis.call(this,currentAxes);
    //     }

    //     return axis;
    // };

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
        this._chart.categoryAxis.autoGridCount = this.xAxis()[0].xAxisAutoGridCount();
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
        };

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
                /* falls through */
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

        this._chart.dataProvider = this.amFormatData(this.data());
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
                /* falls through */
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
            chartScrollbar: {}
        };
        if (typeof define === "function" && define.amd) {
            initObj.pathToImages = require.toUrl("amchartsImg");
        }
        this._chart = AmCharts.makeChart(domNode, initObj);
        this._chart.addListener("clickGraphItem", function(e) {
            var graph = e.graph;
            var data  = e.item.dataContext;
            var field;

            if (context._gType === "column") {
                field = graph.fillColorsField;
            } else if (context._gType === "line") {
                field = graph.colorField;
            } else if (context._gType === "area") {
                field = graph.colorField;
            }
            if (field) {
                if (data[field] !== null && data[field] !== undefined) {
                    delete data[field];
                    if (context.selectionMode() === "simple") {
                        if (context._selected !== null) {
                            delete context._selected.data[context._selected.field];
                        }
                        context._selected = null;
                    }
                } else {
                    data[field] = context.selectionColor();
                    if (context.selectionMode() === "simple") {
                        if (context._selected !== null) {
                            delete context._selected.data[context._selected.field];
                        }
                        context._selected = {
                            field: field,
                            data: data
                        };
                    }
                }
                e.chart.validateData();
            }

            context.click(context.rowToObj(context.data()[e.index]), context.columns()[e.target.columnIndex+1]);
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
