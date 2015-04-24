"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "./CommonSerial", "amcharts/serial", "../chart/INDChart", "css!./Area"], factory);
    } else {
        root.amcharts_Area = factory(root.d3, root.amcharts_CommonSerial, root.amcharts, root.chart_INDChart);
    }
}(this, function(d3, CommonSerial, AmCharts, INDChart) {
    function Area() {
        CommonSerial.call(this);
        this._class = "amcharts_Area";
        this._tag = "div";
       
        this._gType = "line";
    };
    
    Area.prototype = Object.create(CommonSerial.prototype);
    Area.prototype.implements(INDChart.prototype);

    Area.prototype.publish("globalTooltipText","[[category]]: [[value]]", "string", "Tooltip Text");
    Area.prototype.publish("graphTooltipText",["[[category]]: [[value]]"], "array", "Tooltip Text Array");
    
    Area.prototype.publish("isStacked", false, "boolean", "Stacked");
    Area.prototype.publish("stackType", "regular", "set", "Stack Type",["none","regular","100%"]);
    
    Area.prototype.enter = function(domNode, element) {
        CommonSerial.prototype.enter.apply(this, arguments);
    };

    Area.prototype.updateChartOptions = function() {
        CommonSerial.prototype.updateChartOptions.apply(this, arguments);
    };
    
    Area.prototype.update = function(domNode, element) {
        CommonSerial.prototype.update.apply(this, arguments);
        
        this.updateChartOptions();
        
        this._chart.validateNow();
        this._chart.validateData();
    };

    Area.prototype.testData = function() {
        this.columns(["Subject", "Year 1", "Year 2", "Year 3"]);
        this.data([
            ["Geography", 75, 68, 65],
            ["English", 45, 55, 52],
            ["Math", 98, 92, 90],
            ["Science", 66, 60, 66]
        ]);
        return this;
    };
    
    return Area;
}));
