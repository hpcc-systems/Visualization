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
    Line.prototype.publish("globalLineDashStyle", [], "array", "Line Dash Style");
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
    Line.prototype.publish("hAxisAllowContainerBoundaryTextCutoff", false, "boolean", "Hide outermost labels rather than allow them to be cropped by the chart container.");
    Line.prototype.publish("hAxisSlantedText", null, "boolean", "Draw the horizontal axis text at an angle");
    Line.prototype.publish("hAxisSlantedTextAngle", 30, "number", "The angle of the horizontal axis text");
    Line.prototype.publish("hAxisMaxAlternation", 2, "number", "Maximum number of levels of horizontal axis text");
    Line.prototype.publish("hAxisMaxTextLines", null, "number", "Maximum number of lines allowed for the text labels");
    Line.prototype.publish("hAxisMinTextSpacing", null, "number", "Minimum horizontal spacing, in pixels, allowed between two adjacent text labels");
    
    Line.prototype.getChartOptions = function () {
        var retVal = CommonND.prototype.getChartOptions.apply(this, arguments);

        retVal.lineWidth = this.lineWidth();
        retVal.lineDashStyle = this.globalLineDashStyle();
        retVal.orientation = this.orientation();
        retVal.pointShape = this.globalPointShape();
        retVal.pointSize = this.globalPointSize();
        
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
        
        retVal.hAxis.hAxisAllowContainerBoundaryTextCutoff = this.hAxisAllowContainerBoundaryTextCutoff();
        retVal.hAxis.slantedText = this.hAxisSlantedText();
        retVal.hAxis.slantedTextAngle = this.hAxisSlantedTextAngle();
        retVal.hAxis.maxAlternation = this.hAxisMaxAlternation();
        retVal.hAxis.maxTextLines = this.hAxisMaxTextLines();
        retVal.hAxis.minTextSpacing = this.hAxisMinTextSpacing();
        
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
        
        this.lineDashStyle().forEach(function(d,i) {
            if (typeof(retVal.series[i])==="undefined") {
               retVal.series[i] = {}; 
            }
            retVal.series[i].lineDashStyle = d;
        });
        
        this.pointShape().forEach(function(d,i) {
            if (typeof(retVal.series[i])==="undefined") {
               retVal.series[i] = {}; 
            }
            retVal.series[i].pointShape = d;
        });     
        
        this.pointSize().forEach(function(d,i) {
            if (typeof(retVal.series[i])==="undefined") {
               retVal.series[i] = {}; 
            }
            retVal.series[i].pointSize = d;
        });

        if (this.smoothLines()) {
            retVal.curveType = "function";
        }

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
