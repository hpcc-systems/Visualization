"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./CommonSerial", "amcharts/serial", "../chart/INDChart", "css!./Bar"], factory);
    } else {
        root.amcharts_Bar = factory(root.d3, root.amcharts_CommonSerial, root.amcharts, root.chart_INDChart);
    }
}(this, function(d3, CommonSerial, AmCharts, INDChart) {
    function Bar() {
        CommonSerial.call(this);
        this._class = "amcharts_Bar";
        this._tag = "div";
        
        this._gType = "column";
    };
    Bar.prototype = Object.create(CommonSerial.prototype);

    Bar.prototype.implements(INDChart.prototype);

    Bar.prototype.publish("paletteGrouping", "Columns", "set", "Palette Grouping",["Main","Columns"]);

    Bar.prototype.publish("cylinderBars", false, "boolean", "Cylinder Bars");
    Bar.prototype.publish("circleRadius", 1, "number", "Circle Radius");
    
    Bar.prototype.publish("columnWidth", 0.62, "number", "Bar Width");
    
    Bar.prototype.publish("3dDepth", 20, "number", "3D Depth (px)");
    Bar.prototype.publish("3dAngle", 45, "number", "3D Angle (Deg)");

    Bar.prototype.publish("isStacked", false, "boolean", "Stacked");
    Bar.prototype.publish("stackType", "regular", "set", "Stack Type",["none","regular","100%"]);

    Bar.prototype.publish("globalTooltipText","[[category]]([[title]]): [[value]]", "string", "Tooltip Text");
    Bar.prototype.publish("graphTooltipText",["[[category]]([[title]]): [[value]]"], "array", "Tooltip Text");
    
    Bar.prototype.enter = function(domNode, element) {
        CommonSerial.prototype.enter.apply(this, arguments);
    };
    
    Bar.prototype.updateChartOptions = function() {
        CommonSerial.prototype.updateChartOptions.apply(this, arguments);
        
        this._chart.depth3D = this._3dDepth;
        this._chart.angle = this._3dAngle;
        this._chart.categoryAxis.startOnAxis = false; //override due to render issue
    }
    
    Bar.prototype.update = function(domNode, element) {
        this.updateChartOptions();
        CommonSerial.prototype.update.apply(this, arguments);
        
        this._chart.validateNow();
        this._chart.validateData();
    };
    
    return Bar;
}));
