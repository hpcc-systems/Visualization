"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "./CommonND"], factory);
    } else {
        root.Line = factory(root.d3, root.CommonND);
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

    Line.prototype.publish("globalPointShape", null, "set", "The shape of individual data elements", ["circle","triagle","square","diamond","star","polygon"]);
    Line.prototype.publish("pointShape", [], "array", "The shape of individual data elements"); //ex: [circle,triangle] .... would be nice to work with this like set but no method yet ... can also be an obj but we will look at that later  ... https://developers.google.com/chart/interactive/docs/points#jsonly
    
    // Line & Area
    Line.prototype.publish("hAxisAllowContainerBoundaryTextCufoff", false, "boolean", "Hide outermost labels rather than allow them to be cropped by the chart container.");
    Line.prototype.publish("hAxisSlantedText", null, "boolean", "Draw the horizontal axis text at an angle");
    Line.prototype.publish("hAxisSlantedTextAngle", 30, "number", "The angle of the horizontal axis text");
    Line.prototype.publish("hAxisMaxAlternation", 2, "number", "Maximum number of levels of horizontal axis text");
    Line.prototype.publish("hAxisMaxTextLines", null, "number", "Maximum number of lines allowed for the text labels");
    Line.prototype.publish("hAxisMinTextSpacing", null, "number", "Minimum horizontal spacing, in pixels, allowed between two adjacent text labels");
    
    
    
    Line.prototype.getChartOptions = function () {
        var retVal = CommonND.prototype.getChartOptions.apply(this, arguments);
        //  TODO:  Add Line Properties Here
        retVal.lineWidth = this._lineWidth;
        retVal.lineDashStyle = this._gloabLineDashStyle;
        retVal.orientation = this._orientation;
        retVal.pointShape = this._globalPointShape;
        retVal.pointSize = this._globalPointSize;
        
        retVal.hAxis.hAxisAllowContainerBoundaryTextCufoff = this._hAxisAllowContainerBoundaryTextCufoff;
        retVal.hAxis.slantedText = this._hAxisSlantedText;
        retVal.hAxis.slantedTextAngle = this._hAxisSlantedTextAngle;
        retVal.hAxis.maxAlternation = this._hAxisMaxAlternation;
        retVal.hAxis.maxTextLines = this._hAxisMaxTextLines;
        retVal.hAxis.minTextSpacing = this._hAxisMinTextSpacing;
        
        
        
        // should we loop the series and apply each or loop each param like below?
        
        this._lineDashStyle.forEach(function(d,i) {
            if (typeof(retVal.series[i])==='undefined') {
               retVal.series[i] = {}; 
            }
            retVal.series[i].lineDashStyle = d;
        });
        
        this._pointShape.forEach(function(d,i) {
            if (typeof(retVal.series[i])==='undefined') {
               retVal.series[i] = {}; 
            }
            retVal.series[i].pointShape = d;
        });     
        
        this._pointSize.forEach(function(d,i) {
            if (typeof(retVal.series[i])==='undefined') {
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
