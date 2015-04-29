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
        this._class = "google_Bar";

        this._chartType = "BarChart";
    };
    Bar.prototype = Object.create(CommonND.prototype);

    Bar.prototype.publish("isStacked", false, "boolean", "Stacks the elements in a series");
    Bar.prototype.publish("groupWidth", "", "string", "The width of a group of bars, Percent or Pixels");
    Bar.prototype.publish("dataOpacity", 1.0, "number", "Transparency of Data Points");

    Bar.prototype.publish("hAxisBaseline", null, "number", "The baseline for the horizontal axis");
    Bar.prototype.publish("hAxisBaselineColor", "#000000", "html-color", "Specifies the color of the baseline for the horizontal axis");
    Bar.prototype.publish("hAxisDirection", 1, "number", "The direction in which the values along the horizontal axis grow. Specify -1 to reverse the order of the values.");
    Bar.prototype.publish("hAxisFormat", "", "string", "A format string for numeric axis labels", ["","decimal","scientific","currency","percent","short","long"]);
    Bar.prototype.publish("hAxisGridlinesCount", 5, "number", "The number of horizontal gridlines between two regular gridlines");
    Bar.prototype.publish("hAxisGridlinesColor", "#CCC", "html-color", "The color of the horizontal gridlines inside the chart area");
    // TODO units
    Bar.prototype.publish("hAxisMinorGridlinesCount", 0, "number", "The number of horizontal minor gridlines between two regular gridlines");
    Bar.prototype.publish("hAxisMinorGridlinesColor", "#FFFFFF", "html-color", "The color of the horizontal minor gridlines inside the chart area");
    Bar.prototype.publish("hAxisLogScale", false, "boolean", "Makes horizontal axis a log scale");
    
    Bar.prototype.publish("hAxisTextPosition", "out", "set", "Position of the horizontal axis text, relative to the chart area", ["out","in","none"]);
    Bar.prototype.publish("hAxisTextStyleColor", null, "html-color", "Horizontal axis text style (Color)");
    Bar.prototype.publish("hAxisTextStyleFontName", null, "string", "Horizontal axis text style (Font Name)");
    Bar.prototype.publish("hAxisTextStyleFontSize", null, "number", "Horizontal axis text style (Font Size)");
    
    Bar.prototype.publish("hAxisTicks", [], "array", "Replaces the automatically generated X-axis ticks with the specified array");

    Bar.prototype.publish("hAxisTitle", "", "string", "Specifies a title for the horizontal axis");
    Bar.prototype.publish("hAxisTitleTextStyleColor", null, "html-color", "Horizontal axis title text style (Color)");
    Bar.prototype.publish("hAxisTitleTextStyleFontName", null, "string", "Horizontal axis title text style (Font Name)");
    Bar.prototype.publish("hAxisTitleTextStyleFontSize", null, "number", "Horizontal axis titletext style (Font Size)");
    
    Bar.prototype.publish("hAxisMaxValue", null, "number", "Moves the max value of the horizontal axis to the specified value");
    Bar.prototype.publish("hAxisMinValue", null, "number", "Moves the min value of the horizontal axis to the specified value");
    
    Bar.prototype.publish("hAxisViewWindowMode", "pretty", "set", "Specifies how to scale the horizontal axis to render the values within the chart area", ["pretty","maximized","explicit"]);
    Bar.prototype.publish("hAxisViewWindowMax", null, "number", "The maximum horizontal data value to render");
    Bar.prototype.publish("hAxisViewWindowMin", null, "number", "The minimum horizontal data value to render");
    
    Bar.prototype.publish("vAxisBaseline", null, "number", "The baseline for the horizontal axis");
    Bar.prototype.publish("vAxisBaselineColor", "#000000", "html-color", "Specifies the color of the baseline for the vertical axis");
    Bar.prototype.publish("vAxisDirection", 1, "number", "The direction in which the values along the vertical axis grow. Specify -1 to reverse the order of the values.");
    Bar.prototype.publish("vAxisFormat", "", "string", "A format string for numeric axis labels", ["","decimal","scientific","currency","percent","short","long"]);
    
    Bar.prototype.publish("vAxisGridlinesCount", 5, "number", "The number of vertical gridlines between two regular gridlines");
    Bar.prototype.publish("vAxisGridlinesColor", "#CCC", "html-color", "The color of the vertical gridlines inside the chart area");
    Bar.prototype.publish("vAxisMinorGridlinesCount", 0, "number", "The number of vertical minor gridlines between two regular gridlines");
    Bar.prototype.publish("vAxisMinorGridlinesColor", "#FFFFFF", "html-color", "The color of the vertical minor gridlines inside the chart area");
    Bar.prototype.publish("vAxisLogScale", false, "boolean", "Makes vertical axis a log scale");
    
    Bar.prototype.publish("vAxisTextPosition", "out", "set", "Position of the vertical axis text, relative to the chart area", ["out","in","none"]);
    Bar.prototype.publish("vAxisTextStyleColor", null, "html-color", "Vertical axis text style (Color)");
    Bar.prototype.publish("vAxisTextStyleFontName", null, "string", "Vertical axis text style (Font Name)");
    Bar.prototype.publish("vAxisTextStyleFontSize", null, "number", "Vertical axis text style (Font Size)");
    
    Bar.prototype.publish("vAxisTicks", [], "array", "Replaces the automatically generated Y-axis ticks with the specified array");
    
    Bar.prototype.publish("vAxisTitle", "", "string", "Specifies a title for the vertical axis");
    Bar.prototype.publish("vAxisTitleTextStyleColor", null, "html-color", "Vertical axis title text style (Color)");
    Bar.prototype.publish("vAxisTitleTextStyleFontName", null, "string", "Vertical axis title text style (Font Name)");
    Bar.prototype.publish("vAxisTitleTextStyleFontSize", null, "number", "Vertical axis titletext style (Font Size)");
    
    Bar.prototype.publish("vAxisMaxValue", null, "number", "Moves the max value of the vertical axis to the specified value");
    Bar.prototype.publish("vAxisMinValue", null, "number", "Moves the min value of the vertical axis to the specified value");

    Bar.prototype.publish("vAxisViewWindowMode", "pretty", "set", "Specifies how to scale the vertical axis to render the values within the chart area", ["pretty","maximized","explicit"]);
    Bar.prototype.publish("vAxisViewWindowMax", null, "number", "The maximum vertical data value to render");
    Bar.prototype.publish("vAxisViewWindowMin", null, "number", "The minimum vertical data value to render");

    
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
        retVal.hAxis.baseline = this.hAxisBaseline();
        retVal.hAxis.baselineColor = this.hAxisBaselineColor();
        retVal.hAxis.direction = this.hAxisDirection();
        retVal.hAxis.gridlines = {
            count: this.hAxisGridlinesCount(),
            color: this.hAxisGridlinesColor()
        }
        retVal.hAxis.minorGridlines = {
            count: this.hAxisMinorGridlinesCount(),
            color: this.hAxisMinorGridlinesColor()
        }        
        retVal.hAxis.logScale = this.hAxisLogScale();
        retVal.hAxis.textPosition = this.hAxisTextPosition();
        retVal.hAxis.title = this.hAxisTitle();
        retVal.hAxis.minValue = this.hAxisMinValue();
        retVal.hAxis.maxValue = this.hAxisMaxValue();
        
        retVal.hAxis.format = this.hAxisFormat();
        retVal.hAxis.textStyle = {
            color: this.hAxisTextStyleColor(),
            fontName: this.hAxisTextStyleFontName(),
            fontSize: this.hAxisTextStyleFontSize()
        }
        if (this.hAxisTicks().length > 0) {
            retVal.hAxis.ticks = this.hAxisTicks();
        }
        retVal.hAxis.titleTextStyle = {
            color: this.hAxisTitleTextStyleColor(),
            fontName: this.hAxisTitleTextStyleFontName(),
            fontSize: this.hAxisTitleTextStyleFontSize()
        }
        retVal.hAxis.viewWindowMode = this.hAxisViewWindowMode();
        retVal.hAxis.viewWindow = {
            min: this.hAxisViewWindowMin(),
            max: this.hAxisViewWindowMax()
        }
        
        // vAxis
        retVal.vAxis.baseline = this.vAxisBaseline();
        retVal.vAxis.baselineColor = this.vAxisBaselineColor();
        retVal.vAxis.direction = this.vAxisDirection();
        retVal.vAxis.gridlines = {
            count: this.vAxisGridlinesCount(),
            color: this.vAxisGridlinesColor()
        }
        retVal.vAxis.minorGridlines = {
            count: this.vAxisMinorGridlinesCount(),
            color: this.vAxisMinorGridlinesColor()
        }        
        retVal.vAxis.logScale = this.vAxisLogScale();
        retVal.vAxis.textPosition = this.vAxisTextPosition();
        retVal.vAxis.title = this.vAxisTitle();
        retVal.vAxis.minValue = this.vAxisMinValue();
        retVal.vAxis.maxValue = this.vAxisMaxValue();
        
        retVal.vAxis.format = this.vAxisFormat();
        retVal.vAxis.textStyle = {
            color: this.vAxisTextStyleColor(),
            fontName: this.vAxisTextStyleFontName(),
            fontSize: this.vAxisTextStyleFontSize()
        }
        if (this.vAxisTicks().length > 0) {
            retVal.vAxis.ticks = this.vAxisTicks();
        }
        retVal.vAxis.titleTextStyle = {
            color: this.vAxisTitleTextStyleColor(),
            fontName: this.vAxisTitleTextStyleFontName(),
            fontSize: this.vAxisTitleTextStyleFontSize()
        }
        retVal.vAxis.viewWindowMode = this.vAxisViewWindowMode();
        retVal.vAxis.viewWindow = {
            min: this.vAxisViewWindowMin(),
            max: this.vAxisViewWindowMax()
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
