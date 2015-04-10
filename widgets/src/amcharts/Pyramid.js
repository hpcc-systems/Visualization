"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "./CommonFunnel", "amcharts.funnel", "../chart/INDChart"], factory);
    } else {
        root.amcharts_Pyramid = factory(root.d3, root.amcharts_CommonFunnel, root.amcharts, root.chart_INDChart);
    }
}(this, function(d3, CommonFunnel, AmCharts, INDChart) {
    function Pyramid() {
        CommonFunnel.call(this);
        this._class = "amcharts_Pyramid";
        this._tag = "div";
    };
    
    Pyramid.prototype = Object.create(CommonFunnel.prototype);
    Pyramid.prototype.implements(INDChart.prototype);

    Pyramid.prototype.publish("globalTooltipText","[[category]]([[title]]): [[value]]", "string", "Tooltip Text");
    Pyramid.prototype.publish("graphTooltipText",["[[category]]([[title]]): [[value]]"], "array", "Tooltip Text");
    
    Pyramid.prototype.testData = function() {
        this.columns(["Subject", "Year 1"]);
        this.data([
            ["Geography", 75],
            ["English", 23],
            ["Math", 98],
            ["Science", 66]
        ]);
        return this;
    };
    
    Pyramid.prototype.enter = function(domNode, element) {       
        CommonFunnel.prototype.enter.apply(this, arguments);
    };
    
    Pyramid.prototype.updateChartOptions = function() {
        CommonFunnel.prototype.updateChartOptions.apply(this, arguments);
        var context = this;
    }

    Pyramid.prototype.update = function(domNode, element) {
        var context = this;   
        CommonFunnel.prototype.update.apply(this, arguments);
        this.updateChartOptions();
        
        this._chart.validateNow();
        this._chart.validateData();
    };
    
    Pyramid.prototype.testData = function () {
        this.columns(["Subject", "Year 1", "Year 2", "Year 3"]);
        this.data([
            ["Geography", 75, 68, 65],
            ["English", 45, 55, 52],
            ["Math", 98, 92, 90],
            ["Science", 66, 60, 66]
        ]);
        
        this.marginLeft(15);
        this.marginRight(150);
        
        return this;
    };

    return Pyramid;
}));
