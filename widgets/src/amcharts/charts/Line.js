"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "./CommonSerial", "amcharts.serial", "../../chart/INDChart"], factory);
    } else {
        root.Line = factory(root.d3, root.CommonSerial, root.amcharts, root.INDChart);
    }
}(this, function(d3, CommonSerial, AmCharts, INDChart) {
    function Line() {
        CommonSerial.call(this);
        this._class = "amcharts_charts_Line";
        this._tag = "div";
        
        this._gType = "smoothedLine";
    };
    
    Line.prototype = Object.create(CommonSerial.prototype);
    Line.prototype.implements(INDChart.prototype);
    
    Line.prototype.publish("gType", "smoothedLine", "set", "Bullet Type", ["line", "column", "step", "smoothedLine"]);

    Line.prototype.testData = function() {
        this.columns(["Subject", "Year 1", "Year 2", "Year 3"]);
        this.data([
            ["Geography", 75, 3, 11],
            ["English", 23, 75, 4],
            ["Math", 98, 92, 9],
            ["Science", 66, 6, 66]
        ]);
        return this;
    };

    Line.prototype.enter = function(domNode, element) {
        var initObj = {
            "theme": "none",
            "type": "serial",
        }
        
        this._chart = AmCharts.makeChart(domNode, initObj);
        
        CommonSerial.prototype.enter.apply(this, arguments);
    };
    
    Line.prototype.updateChartOptions = function() {        
        CommonSerial.prototype.updateChartOptions.apply(this, arguments);
        var context = this;
    }
    
    Line.prototype.update = function(domNode, element) {
        var context = this;   
        CommonSerial.prototype.update.apply(this, arguments);
        this.updateChartOptions();
        
        this._chart.validateNow();
        this._chart.validateData();
        
    };
    
    return Line;
}));
