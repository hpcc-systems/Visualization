"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./CommonND"], factory);
    } else {
        root.google_Bar = factory(root.d3, root.google_CommonND);
    }
}(this, function (d3, CommonND) {

    function Bar() {
        CommonND.call(this);

        this._chartType = "BarChart";
    };
    Bar.prototype = Object.create(CommonND.prototype);
    Bar.prototype._class += " google_Bar";

    /**
     * Publish Params Common To Other Libraries
     */  
    Bar.prototype.publish("isStacked", false, "boolean", "Stacks the elements in a series");
    Bar.prototype.publish("axisFontFamily", null, "string", "Horizontal axis text style (Font Name)");
    Bar.prototype.publish("axisFontSize", null, "number", "Horizontal axis text style (Font Size)");

    /**
     * Publish Params Unique To This Widget
     */
    Bar.prototype.publish("groupWidth", "", "string", "The width of a group of bars, Percent or Pixels");
    Bar.prototype.publish("dataOpacity", 1.0, "number", "Transparency of Data Points");

    Bar.prototype.publish("xAxisBaseline", null, "number", "The baseline for the horizontal axis");
    Bar.prototype.publish("xAxisBaselineColor", "#000000", "html-color", "Specifies the color of the baseline for the horizontal axis");
    Bar.prototype.publish("xAxisInversed", false, "boolean", "The direction in which the values along the horizontal axis grow.");
    Bar.prototype.publish("xAxisFormat", "", "string", "A format string for numeric axis labels", ["","decimal","scientific","currency","percent","short","long"]);
    Bar.prototype.publish("xAxisGridlinesCount", 5, "number", "The number of horizontal gridlines between two regular gridlines");
    Bar.prototype.publish("xAxisGridlinesColor", "#CCC", "html-color", "The color of the horizontal gridlines inside the chart area");
    // TODO units
    Bar.prototype.publish("xAxisMinorGridlinesCount", 0, "number", "The number of horizontal minor gridlines between two regular gridlines");
    Bar.prototype.publish("xAxisMinorGridlinesColor", "#FFFFFF", "html-color", "The color of the horizontal minor gridlines inside the chart area");
    Bar.prototype.publish("xAxisLogScale", false, "boolean", "Makes horizontal axis a log scale");
    
    Bar.prototype.publish("xAxisTextPosition", "out", "set", "Position of the horizontal axis text, relative to the chart area", ["out","in","none"]);
    Bar.prototype.publish("xAxisFontColor", null, "html-color", "Horizontal axis text style (Color)");
    
    Bar.prototype.publish("xAxisTicks", [], "array", "Replaces the automatically generated X-axis ticks with the specified array");

    Bar.prototype.publish("xAxisTitle", "", "string", "Specifies a title for the horizontal axis");
    Bar.prototype.publish("xAxisTitleFontColor", null, "html-color", "Horizontal axis title text style (Color)");
    Bar.prototype.publish("xAxisTitleFontFamily", null, "string", "Horizontal axis title text style (Font Name)");
    Bar.prototype.publish("xAxisTitleFontSize", null, "number", "Horizontal axis titletext style (Font Size)");
    
    Bar.prototype.publish("xAxisMaxValue", null, "number", "Moves the max value of the horizontal axis to the specified value");
    Bar.prototype.publish("xAxisMinValue", null, "number", "Moves the min value of the horizontal axis to the specified value");
    
    Bar.prototype.publish("xAxisViewWindowMode", "pretty", "set", "Specifies how to scale the horizontal axis to render the values within the chart area", ["pretty","maximized","explicit"]);
    Bar.prototype.publish("xAxisViewWindowMax", null, "number", "The maximum horizontal data value to render");
    Bar.prototype.publish("xAxisViewWindowMin", null, "number", "The minimum horizontal data value to render");
    
    Bar.prototype.publish("yAxisBaseline", null, "number", "The baseline for the horizontal axis");
    Bar.prototype.publish("yAxisBaselineColor", "#000000", "html-color", "Specifies the color of the baseline for the vertical axis");
    Bar.prototype.publish("yAxisInversed", false, "boolean", "The direction in which the values along the vertical axis grow.");
    Bar.prototype.publish("yAxisFormat", "", "string", "A format string for numeric axis labels", ["","decimal","scientific","currency","percent","short","long"]);
    
    Bar.prototype.publish("yAxisGridlinesCount", 5, "number", "The number of vertical gridlines between two regular gridlines");
    Bar.prototype.publish("yAxisGridlinesColor", "#CCC", "html-color", "The color of the vertical gridlines inside the chart area");
    Bar.prototype.publish("yAxisMinorGridlinesCount", 0, "number", "The number of vertical minor gridlines between two regular gridlines");
    Bar.prototype.publish("yAxisMinorGridlinesColor", "#FFFFFF", "html-color", "The color of the vertical minor gridlines inside the chart area");
    Bar.prototype.publish("yAxisLogScale", false, "boolean", "Makes vertical axis a log scale");
    
    Bar.prototype.publish("yAxisTextPosition", "out", "set", "Position of the vertical axis text, relative to the chart area", ["out","in","none"]);
    Bar.prototype.publish("yAxisFontColor", null, "html-color", "Vertical axis text style (Color)");

    Bar.prototype.publish("yAxisTicks", [], "array", "Replaces the automatically generated Y-axis ticks with the specified array");
    
    Bar.prototype.publish("yAxisTitle", "", "string", "Specifies a title for the vertical axis");
    Bar.prototype.publish("yAxisTitleFontColor", null, "html-color", "Vertical axis title text style (Color)");
    Bar.prototype.publish("yAxisTitleFontFamily", null, "string", "Vertical axis title text style (Font Name)");
    Bar.prototype.publish("yAxisTitleFontSize", null, "number", "Vertical axis titletext style (Font Size)");
    
    Bar.prototype.publish("yAxisMaxValue", null, "number", "Moves the max value of the vertical axis to the specified value");
    Bar.prototype.publish("yAxisMinValue", null, "number", "Moves the min value of the vertical axis to the specified value");

    Bar.prototype.publish("yAxisViewWindowMode", "pretty", "set", "Specifies how to scale the vertical axis to render the values within the chart area", ["pretty","maximized","explicit"]);
    Bar.prototype.publish("yAxisViewWindowMax", null, "number", "The maximum vertical data value to render");
    Bar.prototype.publish("yAxisViewWindowMin", null, "number", "The minimum vertical data value to render");

    
    Bar.prototype.getChartOptions = function () {
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
            fontName: this.axisFontFamily() ? this.axisFontFamily() : this.fontFamily(),
            fontSize: this.axisFontSize() ? this.axisFontSize() : this.fontSize()
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
            fontName: this.axisFontFamily() ? this.axisFontFamily() : this.fontFamily(),
            fontSize: this.axisFontSize() ? this.axisFontSize() : this.fontSize()
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

    Bar.prototype.enter = function (domNode, element) {
        CommonND.prototype.enter.apply(this, arguments);
    };

    Bar.prototype.update = function (domNode, element) {
        CommonND.prototype.update.apply(this, arguments);
    };

    return Bar;
}));
