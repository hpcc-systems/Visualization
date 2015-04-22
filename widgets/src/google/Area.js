"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "./CommonND"], factory);
    } else {
        root.google_Area = factory(root.d3, root.google_CommonND);
    }
}(this, function (d3, CommonND) {

    function Area() {
        CommonND.call(this);
        this._class = "google_Area";

        this._chartType = "AreaChart";
    };
    Area.prototype = Object.create(CommonND.prototype);
    
    Area.prototype.publish("areaOpacity", null, "number", "Opacity of Area under line");
    Area.prototype.publish("isStacked", false, "boolean", "Stacks the elements in a series");

    Area.prototype.publish("hAxisBaseline", null, "number", "The baseline for the horizontal axis");
    Area.prototype.publish("hAxisBaselineColor", "#000000", "html-color", "Specifies the color of the baseline for the horizontal axis");
    Area.prototype.publish("hAxisDirection", 1, "number", "The direction in which the values along the horizontal axis grow. Specify -1 to reverse the order of the values.");
    Area.prototype.publish("hAxisFormat", "", "string", "A format string for numeric axis labels", ["","decimal","scientific","currency","percent","short","long"]);
    Area.prototype.publish("hAxisGridlinesCount", 5, "number", "The number of horizontal gridlines between two regular gridlines");
    Area.prototype.publish("hAxisGridlinesColor", "#CCC", "html-color", "The color of the horizontal gridlines inside the chart area");

    Area.prototype.publish("hAxisMinorGridlinesCount", 0, "number", "The number of horizontal minor gridlines between two regular gridlines");
    Area.prototype.publish("hAxisMinorGridlinesColor", "#FFFFFF", "html-color", "The color of the horizontal minor gridlines inside the chart area");
    Area.prototype.publish("hAxisLogScale", false, "boolean", "Makes horizontal axis a log scale");
    
    Area.prototype.publish("hAxisTextPosition", "out", "set", "Position of the horizontal axis text, relative to the chart area", ["out","in","none"]);
    Area.prototype.publish("hAxisTextStyleColor", null, "html-color", "Horizontal axis text style (Color)");
    Area.prototype.publish("hAxisTextStyleFontName", null, "string", "Horizontal axis text style (Font Name)");
    Area.prototype.publish("hAxisTextStyleFontSize", null, "number", "Horizontal axis text style (Font Size)");
    
    Area.prototype.publish("hAxisTicks", [], "array", "Replaces the automatically generated X-axis ticks with the specified array");

    Area.prototype.publish("hAxisTitle", "", "string", "Specifies a title for the horizontal axis");
    Area.prototype.publish("hAxisTitleTextStyleColor", null, "html-color", "Horizontal axis title text style (Color)");
    Area.prototype.publish("hAxisTitleTextStyleFontName", null, "string", "Horizontal axis title text style (Font Name)");
    Area.prototype.publish("hAxisTitleTextStyleFontSize", null, "number", "Horizontal axis titletext style (Font Size)");
    
    Area.prototype.publish("hAxisMaxValue", null, "number", "Moves the max value of the horizontal axis to the specified value");
    Area.prototype.publish("hAxisMinValue", null, "number", "Moves the min value of the horizontal axis to the specified value");
    
    Area.prototype.publish("hAxisViewWindowMode", "pretty", "set", "Specifies how to scale the horizontal axis to render the values within the chart area", ["pretty","maximized","explicit"]);
    Area.prototype.publish("hAxisViewWindowMax", null, "number", "The maximum horizontal data value to render");
    Area.prototype.publish("hAxisViewWindowMin", null, "number", "The minimum horizontal data value to render");
    
    Area.prototype.publish("vAxisBaseline", null, "number", "The baseline for the horizontal axis");
    Area.prototype.publish("vAxisBaselineColor", "#000000", "html-color", "Specifies the color of the baseline for the vertical axis");
    Area.prototype.publish("vAxisDirection", 1, "number", "The direction in which the values along the vertical axis grow. Specify -1 to reverse the order of the values.");
    Area.prototype.publish("vAxisFormat", "", "string", "A format string for numeric axis labels", ["","decimal","scientific","currency","percent","short","long"]);
    
    Area.prototype.publish("vAxisGridlinesCount", 5, "number", "The number of vertical gridlines between two regular gridlines");
    Area.prototype.publish("vAxisGridlinesColor", "#CCC", "html-color", "The color of the vertical gridlines inside the chart area");
    Area.prototype.publish("vAxisMinorGridlinesCount", 0, "number", "The number of vertical minor gridlines between two regular gridlines");
    Area.prototype.publish("vAxisMinorGridlinesColor", "#FFFFFF", "html-color", "The color of the vertical minor gridlines inside the chart area");
    Area.prototype.publish("vAxisLogScale", false, "boolean", "Makes vertical axis a log scale");
    
    Area.prototype.publish("vAxisTextPosition", "out", "set", "Position of the vertical axis text, relative to the chart area", ["out","in","none"]);
    Area.prototype.publish("vAxisTextStyleColor", null, "html-color", "Vertical axis text style (Color)");
    Area.prototype.publish("vAxisTextStyleFontName", null, "string", "Vertical axis text style (Font Name)");
    Area.prototype.publish("vAxisTextStyleFontSize", null, "number", "Vertical axis text style (Font Size)");
    
    Area.prototype.publish("vAxisTicks", [], "array", "Replaces the automatically generated Y-axis ticks with the specified array");
    
    Area.prototype.publish("vAxisTitle", "", "string", "Specifies a title for the vertical axis");
    Area.prototype.publish("vAxisTitleTextStyleColor", null, "html-color", "Vertical axis title text style (Color)");
    Area.prototype.publish("vAxisTitleTextStyleFontName", null, "string", "Vertical axis title text style (Font Name)");
    Area.prototype.publish("vAxisTitleTextStyleFontSize", null, "number", "Vertical axis titletext style (Font Size)");
    
    Area.prototype.publish("vAxisMaxValue", null, "number", "Moves the max value of the vertical axis to the specified value");
    Area.prototype.publish("vAxisMinValue", null, "number", "Moves the min value of the vertical axis to the specified value");

    Area.prototype.publish("vAxisViewWindowMode", "pretty", "set", "Specifies how to scale the vertical axis to render the values within the chart area", ["pretty","maximized","explicit"]);
    Area.prototype.publish("vAxisViewWindowMax", null, "number", "The maximum vertical data value to render");
    Area.prototype.publish("vAxisViewWindowMin", null, "number", "The minimum vertical data value to render");

    Area.prototype.publish("hAxisAllowContainerBoundaryTextCufoff", false, "boolean", "Hide outermost labels rather than allow them to be cropped by the chart container.");
    Area.prototype.publish("hAxisSlantedText", null, "boolean", "Draw the horizontal axis text at an angle");
    Area.prototype.publish("hAxisSlantedTextAngle", 30, "number", "The angle of the horizontal axis text");
    Area.prototype.publish("hAxisMaxAlternation", 2, "number", "Maximum number of levels of horizontal axis text");
    Area.prototype.publish("hAxisMaxTextLines", null, "number", "Maximum number of lines allowed for the text labels");
    Area.prototype.publish("hAxisMinTextSpacing", null, "number", "Minimum horizontal spacing, in pixels, allowed between two adjacent text labels");
    
    Area.prototype.publish("dataOpacity", 1.0, "number", "Transparency of Data Points");
    Area.prototype.publish("selectionMode", "single", "set", "Select Multiple Data Points", ["single","multiple"]);
    
    Area.prototype.getChartOptions = function () {
        var retVal = CommonND.prototype.getChartOptions.apply(this, arguments);
        
        retVal.selectionMode = this._selectionMode;
        retVal.dataOpacity = this._dataOpacity;
        
        retVal.isStacked = this._isStacked;
        retVal.areaOpacity = this._areaOpacity;
        
        retVal.hAxis = {};
        retVal.vAxis = {};
        
        retVal.hAxis.baseline = this._hAxisBaseline;
        retVal.hAxis.baselineColor = this._hAxisBaselineColor;
        retVal.hAxis.direction = this._hAxisDirection;
        retVal.hAxis.gridlines = {
            count: this._hAxisGridlinesCount,
            color: this._hAxisGridlinesColor
        }
        retVal.hAxis.minorGridlines = {
            count: this._hAxisMinorGridlinesCount,
            color: this._hAxisMinorGridlinesColor
        }        
        retVal.hAxis.logScale = this._hAxisLogScale;
        retVal.hAxis.textPosition = this._hAxisTextPosition;
        retVal.hAxis.title = this._hAxisTitle;
        retVal.hAxis.minValue = this._hAxisMinValue;
        retVal.hAxis.maxValue = this._hAxisMaxValue;
        
        retVal.hAxis.hAxisAllowContainerBoundaryTextCufoff = this._hAxisAllowContainerBoundaryTextCufoff;
        retVal.hAxis.slantedText = this._hAxisSlantedText;
        retVal.hAxis.slantedTextAngle = this._hAxisSlantedTextAngle;
        retVal.hAxis.maxAlternation = this._hAxisMaxAlternation;
        retVal.hAxis.maxTextLines = this._hAxisMaxTextLines;
        retVal.hAxis.minTextSpacing = this._hAxisMinTextSpacing;
        
        retVal.hAxis.format = this._hAxisFormat;
        retVal.hAxis.textStyle = {
            color: this._hAxisTextStyleColor,
            fontName: this._hAxisTextStyleFontName,
            fontSize: this._hAxisTextStyleFontSize
        }
        if (this._hAxisTicks.length > 0) {
            retVal.hAxis.ticks = this._hAxisTicks;
        }
        retVal.hAxis.titleTextStyle = {
            color: this._hAxisTitleTextStyleColor,
            fontName: this._hAxisTitleTextStyleFontName,
            fontSize: this._hAxisTitleTextStyleFontSize
        }
        retVal.hAxis.viewWindowMode = this._hAxisViewWindowMode;
        retVal.hAxis.viewWindow = {
            min: this._hAxisViewWindowMin,
            max: this._hAxisViewWindowMax
        }
        
        retVal.vAxis.baseline = this._vAxisBaseline;
        retVal.vAxis.baselineColor = this._vAxisBaselineColor;
        retVal.vAxis.direction = this._vAxisDirection;
        retVal.vAxis.gridlines = {
            count: this._vAxisGridlinesCount,
            color: this._vAxisGridlinesColor
        }
        retVal.vAxis.minorGridlines = {
            count: this._vAxisMinorGridlinesCount,
            color: this._vAxisMinorGridlinesColor
        }        
        retVal.vAxis.logScale = this._vAxisLogScale;
        retVal.vAxis.textPosition = this._vAxisTextPosition;
        retVal.vAxis.title = this._vAxisTitle;
        retVal.vAxis.minValue = this._vAxisMinValue;
        retVal.vAxis.maxValue = this._vAxisMaxValue;
        
        retVal.vAxis.format = this._vAxisFormat;
        retVal.vAxis.textStyle = {
            color: this._vAxisTextStyleColor,
            fontName: this._vAxisTextStyleFontName,
            fontSize: this._vAxisTextStyleFontSize
        }
        if (this._vAxisTicks.length > 0) {
            retVal.vAxis.ticks = this._vAxisTicks;
        }
        retVal.vAxis.titleTextStyle = {
            color: this._vAxisTitleTextStyleColor,
            fontName: this._vAxisTitleTextStyleFontName,
            fontSize: this._vAxisTitleTextStyleFontSize
        }
        retVal.vAxis.viewWindowMode = this._vAxisViewWindowMode;
        retVal.vAxis.viewWindow = {
            min: this._vAxisViewWindowMin,
            max: this._vAxisViewWindowMax
        }        
        return retVal;
    };

    Area.prototype.enter = function (domNode, element) {
        CommonND.prototype.enter.apply(this, arguments);
    };

    Area.prototype.update = function (domNode, element) {
        CommonND.prototype.update.apply(this, arguments);
    };
    
    return Area;
}));
