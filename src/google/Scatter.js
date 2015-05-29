"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./CommonND", "../common/HTMLWidget"], factory);
    } else {
        root.Scatter = factory(root.d3, root.google_CommonND, root.common_HTMLWidget);
    }
}(this, function (d3, CommonND, HTMLWidget) {

    function Scatter() {
        CommonND.call(this);
        this._chartType = "ScatterChart";
    }
    Scatter.prototype = Object.create(CommonND.prototype);
    Scatter.prototype._class += " google_Scatter";

    /**
     * Publish Params Unique To This Widget
     */
    Scatter.prototype.publish("aggregationTarget", "auto", "string", "How multiple data selections are rolled up into tooltips: 'category'- Group selected data by x-value; 'series'- Group selected data by series; 'auto'- Group selected data by x-value if all selections have the same x-value, and by series otherwise; 'none'- Show only one tooltip per selection.  aggregationTarget will often be used in tandem with selectionMode and tooltip.trigger",null,{tags:['Basic']});
    
    Scatter.prototype.publish("curveType", "none", "set", "Controls the curve of the lines when the line width is not zero. Can be one of the following: 'none' - Straight lines without curve; 'function' - The angles of the line will be smoothed..",['none', 'function'],{tags:['Basic']});
    
    Scatter.prototype.publish("pointShape", "circle", "set", "The shape of individual data elements: 'circle', 'triangle', 'square', 'diamond', 'star', or 'polygon'.",['circle', 'triangle', 'square', 'diamond', 'star', 'polygon'],{tags:['Basic']});
    Scatter.prototype.publish("pointSize", 7, "number", "Diameter of data points, in pixels. Use zero to hide all points.",null,{tags:['Basic']});
    Scatter.prototype.publish("pointsVisible", true, "boolean", "Determines whether points will be displayed. Set to false to hide all points.",null,{tags:['Basic']});
    
    Scatter.prototype.publish("selectionMode", 'single', "set", "When selectionMode is 'multiple', users may select multiple data points.",['single','multiple'],{tags:['Basic']});

     /**
     * Publish Params Common To Other Libraries
     */
    Scatter.prototype.publish("backgroundColor", null, "html-color", "The background color for the main area of the chart. Can be either a simple HTML color string, for example: 'red' or '#00cc00', or an object with the following properties.",null,{tags:['Basic']});
    
    Scatter.prototype.publish("dataOpacity", 1.0, "number", "The transparency of data points, with 1.0 being completely opaque and 0.0 fully transparent. This refers to the visible data (i.e. dots).",null,{tags:['Basic']});
    
    Scatter.prototype.publish("tooltipIsHtml", true, "boolean", "Set to false to use SVG-rendered (rather than HTML-rendered) tooltips.",null,{tags:['Advanced']});
    Scatter.prototype.publish("tooltipTrigger", "focus", "set", "The user interaction that causes the tooltip to be displayed: 'focus' - The tooltip will be displayed when the user hovers over the element; 'none' - The tooltip will not be displayed.",['none', 'focus', 'selection'],{tags:['Basic']});

    Scatter.prototype.publish("crosshairTrigger", "both", "set", "The crosshair color, expressed as either a color name (e.g., 'blue'') or an RGB value (e.g., '#adf').",['both', 'focus', 'selection'],{tags:['Basic']});
    Scatter.prototype.publish("crosshairColor", null, "html-color", "The crosshair color, expressed as either a color name (e.g., 'blue'') or an RGB value (e.g., '#adf').",null,{tags:['Basic']});
    Scatter.prototype.publish("crosshairOpacity", 0.7, "number", "The crosshair opacity, with 0.0 being fully transparent and 1.0 fully opaque.",null,{tags:['Basic']});
    Scatter.prototype.publish("crosshairOrientation", null, "set", "The crosshair orientation, which can be 'vertical' for vertical hairs only, 'horizontal' for horizontal hairs only, or 'both' for traditional crosshairs.",['both', 'vertical', 'horizontal'],{tags:['Basic']});

    Scatter.prototype.publish("axisFontSize", null, "number", "X/Y Axis Label Font Size",null,{tags:['Basic','Shared']});
    Scatter.prototype.publish("axisFontFamily", null, "string", "X/Y Axis Label Font Name",null,{tags:['Basic','Shared']});

    Scatter.prototype.publish("xAxisFontColor", null, "html-color", "X Axis Text Font Color",null,{tags:['Basic','Shared']});
    Scatter.prototype.publish("yAxisFontColor", null, "html-color", "X Axis Text Font Color",null,{tags:['Basic','Shared']});

    Scatter.prototype.publish("xAxisBaselineColor", null, "html-color", "Specifies The Color of The Baseline For The Horizontal Axis",null,{tags:['Intermediate','Shared']});
    Scatter.prototype.publish("yAxisBaselineColor", null, "html-color", "Specifies The Color of The Baseline For The Vertical Axis",null,{tags:['Intermediate','Shared']});

    Scatter.prototype.publish("xAxisTitleFontColor", null, "html-color", "Horizontal Axis Title Text Style (Color)",null,{tags:['Intermediate','Shared']});
    Scatter.prototype.publish("yAxisTitleFontColor", null, "html-color", "Vertical Axis Title Text Style (Color)",null,{tags:['Intermediate','Shared']});

    Scatter.prototype.publish("xAxisTitleFontSize", null, "number", "Horizontal Axis Titletext Style (Font Size)",null,{tags:['Intermediate','Shared']});
    Scatter.prototype.publish("yAxisTitleFontSize", null, "number", "Vertical Axis Titletext Style (Font Size)",null,{tags:['Intermediate','Shared']});

    Scatter.prototype.publish("xAxisTitleFontFamily", null, "string", "Horizontal Axis Title Text Style (Font Name)",null,{tags:['Intermediate','Shared']});
    Scatter.prototype.publish("yAxisTitleFontFamily", null, "string", "Vertical Axis Title Text Style (Font Name)",null,{tags:['Intermediate','Shared']});

    Scatter.prototype.publish("xAxisLabelRotation", 0, "number", "X Axis Label Angle",null,{tags:['Intermediate','Shared']});

    Scatter.prototype.publish("xAxisTitle", "", "string", "X Axis Title",null,{tags:['Basic','Shared']});
    Scatter.prototype.publish("yAxisTitle", "", "string", "Y Axis Title",null,{tags:['Basic','Shared']});

    Scatter.prototype.publish("xAxisFormat", "", "string", "Format String For Numeric Axis Labels", ["","decimal","scientific","currency","percent","short","long"],{tags:['Intermediate']});
    Scatter.prototype.publish("yAxisFormat", "", "string", "Format String For Numeric Axis Labels", ["","decimal","scientific","currency","percent","short","long"],{tags:['Intermediate']});

    Scatter.prototype.publish("xAxisGridlinesCount", 5, "number", "The Number of Horizontal Gridlines Between Two Regular Gridlines",null,{tags:['Intermediate']});
    Scatter.prototype.publish("yAxisGridlinesCount", 5, "number", "The Number of Vertical Gridlines Between Two Regular Gridline",null,{tags:['Intermediate']});

    Scatter.prototype.publish("xAxisGridlinesColor", null, "html-color", "The Color of The Horizontal Gridlines Inside The Chart Area",null,{tags:['Basic']});
    Scatter.prototype.publish("yAxisGridlinesColor", null, "html-color", "The Color of The Vertical Gridlines Inside The Chart Area",null,{tags:['Basic']});

    Scatter.prototype.publish("xAxisMinorGridlinesCount", 0, "number", "The Number of Horizontal Minor Gridlines Between Two Regular Gridlines",null,{tags:['Intermediate']});
    Scatter.prototype.publish("yAxisMinorGridlinesCount", 0, "number", "The Number of Vertical Minor Gridlines Between Two Regular Gridlines",null,{tags:['Intermediate']});

    Scatter.prototype.publish("xAxisMinorGridlinesColor", null, "html-color", "The Color of The Horizontal Minor Gridlines Inside The Chart Area",null,{tags:['Intermediate']});
    Scatter.prototype.publish("yAxisMinorGridlinesColor", null, "html-color", "The Color of The Vertical Minor Gridlines Inside The Chart Area",null,{tags:['Intermediate']});

    Scatter.prototype.publish("xAxisLogScale", false, "boolean", "Makes Horizontal Axis A log Scale",null,{tags:['Advanced']});
    Scatter.prototype.publish("yAxisLogScale", false, "boolean", "Makes Vertical Axis A Log Scale",null,{tags:['Advanced']});

    Scatter.prototype.publish("xAxisTextPosition", "out", "set", "Position of The Horizontal Axis Text, Relative To The Chart Area", ["out","in","none"],{tags:['Advanced']});
    Scatter.prototype.publish("yAxisTextPosition", "out", "set", "Position of The Vertical Axis Text, Relative To The Chart Area", ["out","in","none"],{tags:['Advanced']});

    Scatter.prototype.publish("xAxisTicks", [], "array", "Replaces The Automatically Generated X-Axis Ticks With The Specified Array",null,{tags:['Private']});
    Scatter.prototype.publish("yAxisTicks", [], "array", "Replaces The Automatically Generated Y-Axis Ticks With The Specified Array",null,{tags:['Private']});

    Scatter.prototype.publish("xAxisMaxValue", null, "number", "Moves The Max Value of The Horizontal Axis To The Specified Value",null,{tags:['Advanced']});
    Scatter.prototype.publish("yAxisMaxValue", null, "number", "Moves The Max Value of The Vertical Axis To The Specified Value",null,{tags:['Advanced']});

    Scatter.prototype.publish("xAxisMinValue", null, "number", "Moves The Min Value of The Horizontal Axis To The Specified Value",null,{tags:['Advanced']});
    Scatter.prototype.publish("yAxisMinValue", null, "number", "Moves The Min Value of The Vertical Axis To The Specified Value",null,{tags:['Advanced']});

    Scatter.prototype.publish("xAxisViewWindowMode", "pretty", "set", "Specifies How To Scale The Horizontal Axis To Render The values Within The Chart Area", ["pretty","maximized","explicit"],{tags:['Advanced']});
    Scatter.prototype.publish("yAxisViewWindowMode", "pretty", "set", "Specifies How To Scale The Vertical Axis To Render The Values Within The Chart Area", ["pretty","maximized","explicit"],{tags:['Advanced']});

    Scatter.prototype.publish("xAxisViewWindowMax", null, "number", "The Maximum Horizontal Data Value To Render",null,{tags:['Advanced']});
    Scatter.prototype.publish("yAxisViewWindowMax", null, "number", "The Maximum Vertical Data Value To Render",null,{tags:['Advanced']});

    Scatter.prototype.publish("xAxisViewWindowMin", null, "number", "The Minimum Horizontal Data Value To Render",null,{tags:['Advanced']});
    Scatter.prototype.publish("yAxisViewWindowMin", null, "number", "The Minimum Vertical Data Value To Render",null,{tags:['Advanced']});

    Scatter.prototype.getChartOptions = function () {
        var retVal = CommonND.prototype.getChartOptions.apply(this, arguments);

        retVal.aggregationTarget = this.aggregationTarget();
        retVal.curveType = this.curveType();
        retVal.pointShape = this.pointShape();
        retVal.pointSize = this.pointSize();
        retVal.pointsVisible = this.pointsVisible();
        retVal.selectionMode = this.selectionMode();
        retVal.backgroundColor = this.backgroundColor();
        retVal.dataOpacity = this.dataOpacity();
        retVal.tooltipIsHtml = this.tooltipIsHtml();
        retVal.tooltipTrigger = this.tooltipTrigger();
        
        retVal.crosshair = {
            color: this.crosshairColor(),
            orientation: this.crosshairOrientation(),
            opacity: this.crosshairOpacity(),
            trigger: this.crosshairTrigger()
        };

        retVal.hAxis = {};
        retVal.vAxis = {};

        // hAxis
        retVal.hAxis.gridlines = {
            count: this.xAxisGridlinesCount(),
            color: this.xAxisGridlinesColor()
        };
        retVal.hAxis.minorGridlines = {
            count: this.xAxisMinorGridlinesCount(),
            color: this.xAxisMinorGridlinesColor()
        };
        retVal.hAxis.logScale = this.xAxisLogScale();
        retVal.hAxis.textPosition = this.xAxisTextPosition();
        retVal.hAxis.minValue = this.xAxisMinValue();
        retVal.hAxis.maxValue = this.xAxisMaxValue();
        retVal.hAxis.slantedText = this.xAxisLabelRotation() !== 0;
        retVal.hAxis.slantedTextAngle = this.xAxisLabelRotation();
        retVal.hAxis.format = this.xAxisFormat();
        retVal.hAxis.textStyle = {
            color: this.xAxisFontColor(),
            fontName: this.axisFontFamily() ? this.axisFontFamily() : this.fontFamily(),
            fontSize: this.axisFontSize() ? this.axisFontSize() : this.fontSize()

        };
        if (this.xAxisTicks().length > 0) {
            retVal.hAxis.ticks = this.xAxisTicks();
        }
        retVal.hAxis.titleTextStyle = {
            color: this.xAxisTitleFontColor(),
            fontName: this.xAxisTitleFontFamily(),
            fontSize: this.xAxisTitleFontSize()
        };
        retVal.hAxis.viewWindowMode = this.xAxisViewWindowMode();
        retVal.hAxis.viewWindow = {
            min: this.xAxisViewWindowMin(),
            max: this.xAxisViewWindowMax()
        };

        // vAxis
        retVal.vAxis.baselineColor = this.yAxisBaselineColor();
        retVal.vAxis.gridlines = {
            count: this.yAxisGridlinesCount(),
            color: this.yAxisGridlinesColor()
        };
        retVal.vAxis.minorGridlines = {
            count: this.yAxisMinorGridlinesCount(),
            color: this.yAxisMinorGridlinesColor()
        };
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
        };
        if (this.yAxisTicks().length > 0) {
            retVal.vAxis.ticks = this.yAxisTicks();
        }
        retVal.vAxis.titleTextStyle = {
            color: this.yAxisTitleFontColor(),
            fontName: this.yAxisTitleFontFamily(),
            fontSize: this.yAxisTitleFontSize()
        };
        retVal.vAxis.viewWindowMode = this.yAxisViewWindowMode();
        retVal.vAxis.viewWindow = {
            min: this.yAxisViewWindowMin(),
            max: this.yAxisViewWindowMax()
        };

        return retVal;
    };

    Scatter.prototype.enter = function (domNode, element) {
        CommonND.prototype.enter.apply(this, arguments);
    };

    Scatter.prototype.update = function (domNode, element) {
        CommonND.prototype.update.apply(this, arguments);
    };

    return Scatter;
}));
