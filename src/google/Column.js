"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./CommonND"], factory);
    } else {
        root.google_Column = factory(root.d3, root.google_CommonND);
    }
}(this, function (d3, CommonND) {

    function Column() {
        CommonND.call(this);
        this._class = "google_Column";

        this._chartType = "ColumnChart";
    };
    Column.prototype = Object.create(CommonND.prototype);
    
    Column.prototype.publish("isStacked", false, "boolean", "Stacks the elements in a series");
    Column.prototype.publish("groupWidth", "", "string", "The width of a group of bars, Percent or Pixels");
    Column.prototype.publish("dataOpacity", 1.0, "number", "Transparency of Data Points");

    Column.prototype.publish("xAxisBaseline", null, "number", "The baseline for the horizontal axis");
    Column.prototype.publish("xAxisBaselineColor", "#000000", "html-color", "Specifies the color of the baseline for the horizontal axis");
    Column.prototype.publish("xAxisInversed", false, "boolean", "The direction in which the values along the horizontal axis grow. Specify -1 to reverse the order of the values.");
    Column.prototype.publish("xAxisFormat", "", "string", "A format string for numeric axis labels", ["","decimal","scientific","currency","percent","short","long"]);
    Column.prototype.publish("xAxisGridlinesCount", 5, "number", "The number of horizontal gridlines between two regular gridlines");
    Column.prototype.publish("xAxisGridlinesColor", "#CCC", "html-color", "The color of the horizontal gridlines inside the chart area");

    Column.prototype.publish("xAxisMinorGridlinesCount", 0, "number", "The number of horizontal minor gridlines between two regular gridlines");
    Column.prototype.publish("xAxisMinorGridlinesColor", "#FFFFFF", "html-color", "The color of the horizontal minor gridlines inside the chart area");
    Column.prototype.publish("xAxisLogScale", false, "boolean", "Makes horizontal axis a log scale");
    
    Column.prototype.publish("xAxisTextPosition", "out", "set", "Position of the horizontal axis text, relative to the chart area", ["out","in","none"]);
    Column.prototype.publish("xAxisFontColor", null, "html-color", "Horizontal axis text style (Color)");
    Column.prototype.publish("xAxisFontFamily", null, "string", "Horizontal axis text style (Font Name)");
    Column.prototype.publish("xAxisFontSize", null, "number", "Horizontal axis text style (Font Size)");
    
    Column.prototype.publish("xAxisTicks", [], "array", "Replaces the automatically generated X-axis ticks with the specified array");

    Column.prototype.publish("xAxisTitle", "", "string", "Specifies a title for the horizontal axis");
    Column.prototype.publish("xAxisTitleFontColor", null, "html-color", "Horizontal axis title text style (Color)");
    Column.prototype.publish("xAxisTitleFontFamily", null, "string", "Horizontal axis title text style (Font Name)");
    Column.prototype.publish("xAxisTitleFontSize", null, "number", "Horizontal axis titletext style (Font Size)");
    
    Column.prototype.publish("xAxisMaxValue", null, "number", "Moves the max value of the horizontal axis to the specified value");
    Column.prototype.publish("xAxisMinValue", null, "number", "Moves the min value of the horizontal axis to the specified value");
    
    Column.prototype.publish("xAxisViewWindowMode", "pretty", "set", "Specifies how to scale the horizontal axis to render the values within the chart area", ["pretty","maximized","explicit"]);
    Column.prototype.publish("xAxisViewWindowMax", null, "number", "The maximum horizontal data value to render");
    Column.prototype.publish("xAxisViewWindowMin", null, "number", "The minimum horizontal data value to render");
    
    Column.prototype.publish("yAxisBaseline", null, "number", "The baseline for the horizontal axis");
    Column.prototype.publish("yAxisBaselineColor", "#000000", "html-color", "Specifies the color of the baseline for the vertical axis");
    Column.prototype.publish("yAxisInversed", false, "boolean", "The direction in which the values along the vertical axis grow. Specify -1 to reverse the order of the values.");
    Column.prototype.publish("yAxisFormat", "", "string", "A format string for numeric axis labels", ["","decimal","scientific","currency","percent","short","long"]);
    
    Column.prototype.publish("yAxisGridlinesCount", 5, "number", "The number of vertical gridlines between two regular gridlines");
    Column.prototype.publish("yAxisGridlinesColor", "#CCC", "html-color", "The color of the vertical gridlines inside the chart area");
    Column.prototype.publish("yAxisMinorGridlinesCount", 0, "number", "The number of vertical minor gridlines between two regular gridlines");
    Column.prototype.publish("yAxisMinorGridlinesColor", "#FFFFFF", "html-color", "The color of the vertical minor gridlines inside the chart area");
    Column.prototype.publish("yAxisLogScale", false, "boolean", "Makes vertical axis a log scale");
    
    Column.prototype.publish("yAxisTextPosition", "out", "set", "Position of the vertical axis text, relative to the chart area", ["out","in","none"]);
    Column.prototype.publish("yAxisFontColor", null, "html-color", "Vertical axis text style (Color)");
    Column.prototype.publish("yAxisFontFamily", null, "string", "Vertical axis text style (Font Name)");
    Column.prototype.publish("yAxisFontSize", null, "number", "Vertical axis text style (Font Size)");
    
    Column.prototype.publish("yAxisTicks", [], "array", "Replaces the automatically generated Y-axis ticks with the specified array");
    
    Column.prototype.publish("yAxisTitle", "", "string", "Specifies a title for the vertical axis");
    Column.prototype.publish("yAxisTitleFontColor", null, "html-color", "Vertical axis title text style (Color)");
    Column.prototype.publish("yAxisTitleFontFamily", null, "string", "Vertical axis title text style (Font Name)");
    Column.prototype.publish("yAxisTitleFontSize", null, "number", "Vertical axis titletext style (Font Size)");
    
    Column.prototype.publish("yAxisMaxValue", null, "number", "Moves the max value of the vertical axis to the specified value");
    Column.prototype.publish("yAxisMinValue", null, "number", "Moves the min value of the vertical axis to the specified value");

    Column.prototype.publish("yAxisViewWindowMode", "pretty", "set", "Specifies how to scale the vertical axis to render the values within the chart area", ["pretty","maximized","explicit"]);
    Column.prototype.publish("yAxisViewWindowMax", null, "number", "The maximum vertical data value to render");
    Column.prototype.publish("yAxisViewWindowMin", null, "number", "The minimum vertical data value to render");
    
    Column.prototype.getChartOptions = function () {
        var retVal = CommonND.prototype.getChartOptions.apply(this, arguments);
        
        retVal.dataOpacity = this.dataOpacity();
        retVal.isStacked = this.isStacked();
        retVal.bar = {
            groupWidth: this.groupWidth()
        }

        retVal.hAxis = {};
        retVal.vAxis = {};
        
        // hAxis
        retVal.hAxis.baseline = this.xAxisBaseline();
        retVal.hAxis.baselineColor = this.xAxisBaselineColor();
        retVal.hAxis.direction = this.xAxisInversed() ? -1 : 1;
        retVal.hAxis.gridlines = {
            count: this.xAxisGridlinesCount(),
            color: this.xAxisGridlinesColor()
        }
        retVal.hAxis.minorGridlines = {
            count: this.xAxisMinorGridlinesCount(),
            color: this.xAxisMinorGridlinesColor()
        }        
        retVal.hAxis.logScale = this.xAxisLogScale();
        retVal.hAxis.textPosition = this.xAxisTextPosition();
        retVal.hAxis.title = this.xAxisTitle();
        retVal.hAxis.minValue = this.xAxisMinValue();
        retVal.hAxis.maxValue = this.xAxisMaxValue();
        
        retVal.hAxis.format = this.xAxisFormat();
        retVal.hAxis.textStyle = {
            color: this.xAxisFontColor(),
            fontName: this.xAxisFontFamily(),
            fontSize: this.xAxisFontSize()
        }
        if (this.xAxisTicks().length > 0) {
            retVal.hAxis.ticks = this.xAxisTicks();
        }
        retVal.hAxis.titleTextStyle = {
            color: this.xAxisTitleFontColor(),
            fontName: this.xAxisTitleFontFamily(),
            fontSize: this.xAxisTitleFontSize()
        }
        retVal.hAxis.viewWindowMode = this.xAxisViewWindowMode();
        retVal.hAxis.viewWindow = {
            min: this.xAxisViewWindowMin(),
            max: this.xAxisViewWindowMax()
        }
        // vAxis
        retVal.vAxis.baseline = this.yAxisBaseline();
        retVal.vAxis.baselineColor = this.yAxisBaselineColor();
        retVal.vAxis.direction = this.yAxisInversed() ? -1 : 1;
        retVal.vAxis.gridlines = {
            count: this.yAxisGridlinesCount(),
            color: this.yAxisGridlinesColor()
        }
        retVal.vAxis.minorGridlines = {
            count: this.yAxisMinorGridlinesCount(),
            color: this.yAxisMinorGridlinesColor()
        }        
        retVal.vAxis.logScale = this.yAxisLogScale();
        retVal.vAxis.textPosition = this.yAxisTextPosition();
        retVal.vAxis.title = this.yAxisTitle();
        retVal.vAxis.minValue = this.yAxisMinValue();
        retVal.vAxis.maxValue = this.yAxisMaxValue();
        
        retVal.vAxis.format = this.yAxisFormat();
        retVal.vAxis.textStyle = {
            color: this.yAxisFontColor(),
            fontName: this.yAxisFontFamily(),
            fontSize: this.yAxisFontSize()
        }
        if (this.yAxisTicks().length > 0) {
            retVal.vAxis.ticks = this.yAxisTicks();
        }
        retVal.vAxis.titleTextStyle = {
            color: this.yAxisTitleFontColor(),
            fontName: this.yAxisTitleFontFamily(),
            fontSize: this.yAxisTitleFontSize()
        }
        retVal.vAxis.viewWindowMode = this.yAxisViewWindowMode();
        retVal.vAxis.viewWindow = {
            min: this.yAxisViewWindowMin(),
            max: this.yAxisViewWindowMax()
        }        
        return retVal;
    };

    Column.prototype.enter = function (domNode, element) {
        CommonND.prototype.enter.apply(this, arguments);
    };

    Column.prototype.update = function (domNode, element) {
        CommonND.prototype.update.apply(this, arguments);
    };

    return Column;
}));
