"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./CommonND"], factory);
    } else {
        root.google_Line = factory(root.d3, root.google_CommonND);
    }
}(this, function (d3, CommonND) {

    function Line() {
        CommonND.call(this);
        this._class = "google_Line";

        this._chartType = "LineChart";
    };
    Line.prototype = Object.create(CommonND.prototype);
    
    Line.prototype.publish("lineWidth", 2, "number", "Line Width");
    Line.prototype.publish("gloabLineDashStyle", [], "array", "Line Dash Style");
    Line.prototype.publish("lineDashStyle", [], "array", "Line Dash Style");
    
    Line.prototype.publish("orientation", "horizontal", "set", "Line Dash Style", ["horizontal","vertical"]);

    Line.prototype.publish("globalPointSize", null, "number", "Diameter of displayed points in pixels");
    Line.prototype.publish("pointSize", [], "array", "Diameter of displayed points in pixels");

    Line.prototype.publish("smoothLines", true, "boolean", "Causes chart data lines to draw smoothly");
    
    Line.prototype.publish("globalPointShape", null, "set", "The shape of individual data elements", ["circle","triagle","square","diamond","star","polygon"]);
    Line.prototype.publish("pointShape", [], "array", "The shape of individual data elements"); // TODO convert to object
    
    Line.prototype.publish("hAxisBaseline", null, "number", "The baseline for the horizontal axis");
    Line.prototype.publish("hAxisBaselineColor", "#000000", "html-color", "Specifies the color of the baseline for the horizontal axis");
    Line.prototype.publish("hAxisDirection", 1, "number", "The direction in which the values along the horizontal axis grow. Specify -1 to reverse the order of the values.");
    Line.prototype.publish("hAxisFormat", "", "string", "A format string for numeric axis labels", ["","decimal","scientific","currency","percent","short","long"]);
    Line.prototype.publish("hAxisGridlinesCount", 5, "number", "The number of horizontal gridlines between two regular gridlines");
    Line.prototype.publish("hAxisGridlinesColor", "#CCC", "html-color", "The color of the horizontal gridlines inside the chart area");
    // TODO units
    Line.prototype.publish("hAxisMinorGridlinesCount", 0, "number", "The number of horizontal minor gridlines between two regular gridlines");
    Line.prototype.publish("hAxisMinorGridlinesColor", "#FFFFFF", "html-color", "The color of the horizontal minor gridlines inside the chart area");
    Line.prototype.publish("hAxisLogScale", false, "boolean", "Makes horizontal axis a log scale");
    
    Line.prototype.publish("hAxisTextPosition", "out", "set", "Position of the horizontal axis text, relative to the chart area", ["out","in","none"]);
    Line.prototype.publish("hAxisTextStyleColor", null, "html-color", "Horizontal axis text style (Color)");
    Line.prototype.publish("hAxisTextStyleFontName", null, "string", "Horizontal axis text style (Font Name)");
    Line.prototype.publish("hAxisTextStyleFontSize", null, "number", "Horizontal axis text style (Font Size)");
    
    Line.prototype.publish("hAxisTicks", [], "array", "Replaces the automatically generated X-axis ticks with the specified array");

    Line.prototype.publish("hAxisTitle", "", "string", "Specifies a title for the horizontal axis");
    Line.prototype.publish("hAxisTitleTextStyleColor", null, "html-color", "Horizontal axis title text style (Color)");
    Line.prototype.publish("hAxisTitleTextStyleFontName", null, "string", "Horizontal axis title text style (Font Name)");
    Line.prototype.publish("hAxisTitleTextStyleFontSize", null, "number", "Horizontal axis titletext style (Font Size)");
    
    Line.prototype.publish("hAxisMaxValue", null, "number", "Moves the max value of the horizontal axis to the specified value");
    Line.prototype.publish("hAxisMinValue", null, "number", "Moves the min value of the horizontal axis to the specified value");
    
    Line.prototype.publish("hAxisViewWindowMode", "pretty", "set", "Specifies how to scale the horizontal axis to render the values within the chart area", ["pretty","maximized","explicit"]);
    Line.prototype.publish("hAxisViewWindowMax", null, "number", "The maximum horizontal data value to render");
    Line.prototype.publish("hAxisViewWindowMin", null, "number", "The minimum horizontal data value to render");
    
    Line.prototype.publish("vAxisBaseline", null, "number", "The baseline for the horizontal axis");
    Line.prototype.publish("vAxisBaselineColor", "#000000", "html-color", "Specifies the color of the baseline for the vertical axis");
    Line.prototype.publish("vAxisDirection", 1, "number", "The direction in which the values along the vertical axis grow. Specify -1 to reverse the order of the values.");
    Line.prototype.publish("vAxisFormat", "", "string", "A format string for numeric axis labels", ["","decimal","scientific","currency","percent","short","long"]);
    
    Line.prototype.publish("vAxisGridlinesCount", 5, "number", "The number of vertical gridlines between two regular gridlines");
    Line.prototype.publish("vAxisGridlinesColor", "#CCC", "html-color", "The color of the vertical gridlines inside the chart area");
    Line.prototype.publish("vAxisMinorGridlinesCount", 0, "number", "The number of vertical minor gridlines between two regular gridlines");
    Line.prototype.publish("vAxisMinorGridlinesColor", "#FFFFFF", "html-color", "The color of the vertical minor gridlines inside the chart area");
    Line.prototype.publish("vAxisLogScale", false, "boolean", "Makes vertical axis a log scale");
    
    Line.prototype.publish("vAxisTextPosition", "out", "set", "Position of the vertical axis text, relative to the chart area", ["out","in","none"]);
    Line.prototype.publish("vAxisTextStyleColor", null, "html-color", "Vertical axis text style (Color)");
    Line.prototype.publish("vAxisTextStyleFontName", null, "string", "Vertical axis text style (Font Name)");
    Line.prototype.publish("vAxisTextStyleFontSize", null, "number", "Vertical axis text style (Font Size)");
    
    Line.prototype.publish("vAxisTicks", [], "array", "Replaces the automatically generated Y-axis ticks with the specified array");
    
    Line.prototype.publish("vAxisTitle", "", "string", "Specifies a title for the vertical axis");
    Line.prototype.publish("vAxisTitleTextStyleColor", null, "html-color", "Vertical axis title text style (Color)");
    Line.prototype.publish("vAxisTitleTextStyleFontName", null, "string", "Vertical axis title text style (Font Name)");
    Line.prototype.publish("vAxisTitleTextStyleFontSize", null, "number", "Vertical axis titletext style (Font Size)");
    
    Line.prototype.publish("vAxisMaxValue", null, "number", "Moves the max value of the vertical axis to the specified value");
    Line.prototype.publish("vAxisMinValue", null, "number", "Moves the min value of the vertical axis to the specified value");

    Line.prototype.publish("vAxisViewWindowMode", "pretty", "set", "Specifies how to scale the vertical axis to render the values within the chart area", ["pretty","maximized","explicit"]);
    Line.prototype.publish("vAxisViewWindowMax", null, "number", "The maximum vertical data value to render");
    Line.prototype.publish("vAxisViewWindowMin", null, "number", "The minimum vertical data value to render");

    // Area & Line Only
    Line.prototype.publish("hAxisAllowContainerBoundaryTextCufoff", false, "boolean", "Hide outermost labels rather than allow them to be cropped by the chart container.");
    Line.prototype.publish("hAxisSlantedText", null, "boolean", "Draw the horizontal axis text at an angle");
    Line.prototype.publish("hAxisSlantedTextAngle", 30, "number", "The angle of the horizontal axis text");
    Line.prototype.publish("hAxisMaxAlternation", 2, "number", "Maximum number of levels of horizontal axis text");
    Line.prototype.publish("hAxisMaxTextLines", null, "number", "Maximum number of lines allowed for the text labels");
    Line.prototype.publish("hAxisMinTextSpacing", null, "number", "Minimum horizontal spacing, in pixels, allowed between two adjacent text labels");
    
    Line.prototype.getChartOptions = function () {
        var retVal = CommonND.prototype.getChartOptions.apply(this, arguments);

        retVal.lineWidth = this._lineWidth;
        retVal.lineDashStyle = this._gloabLineDashStyle;
        retVal.orientation = this._orientation;
        retVal.pointShape = this._globalPointShape;
        retVal.pointSize = this._globalPointSize;
        
        retVal.hAxis = {};
        retVal.vAxis = {};
        
        // hAxis
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
        
        // vAxis
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
        
        this._lineDashStyle.forEach(function(d,i) {
            if (typeof(retVal.series[i])==="undefined") {
               retVal.series[i] = {}; 
            }
            retVal.series[i].lineDashStyle = d;
        });
        
        this._pointShape.forEach(function(d,i) {
            if (typeof(retVal.series[i])==="undefined") {
               retVal.series[i] = {}; 
            }
            retVal.series[i].pointShape = d;
        });     
        
        this._pointSize.forEach(function(d,i) {
            if (typeof(retVal.series[i])==="undefined") {
               retVal.series[i] = {}; 
            }
            retVal.series[i].pointSize = d;
        });     
  
        return retVal;
    };

    Line.prototype.enter = function (domNode, element) {
        CommonND.prototype.enter.apply(this, arguments);
    };

    Line.prototype.update = function (domNode, element) {
        CommonND.prototype.update.apply(this, arguments);
    };

    return Line;
}));
