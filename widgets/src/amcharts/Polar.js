"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "./CommonRadar", "amcharts.radar", "../chart/INDChart"], factory);
    } else {
        root.amcharts_Polar = factory(root.d3, root.amcharts_CommonRadar, root.amcharts, root.chart_INDChart);
    }
}(this, function(d3, CommonRadar, AmCharts, INDChart) {
    function Polar() {
        CommonRadar.call(this);
        this._class = "amcharts_Polar";
        this._tag = "div";
        this._gType = "column";
    };
    
    Polar.prototype = Object.create(CommonRadar.prototype);
    Polar.prototype.implements(INDChart.prototype);
    
    Polar.prototype.publish("globalTooltipText","[[category]]([[title]]): [[value]]", "string", "Tooltip Text");
    Polar.prototype.publish("graphTooltipText",["[[category]]([[title]]): [[value]]"], "array", "Tooltip Text");
    
    Polar.prototype.testData = function() {
        this.columns(["Subject", "Year 1", "Year 2", "Year 3", "Year 4"]);
        this.data([
            ["English", 5, 43, 41, 92],
            ["English II", 7, 43, 83, 93],
            ["English III", 6, 43, 64, 93],
            ["Geography", 7, 45, 52, 83],
            ["Geography II", 6, 73, 52, 83],
            ["Geography III", 6, 83, 11, 72],
            ["Science", 66, 60, 85, 6],
            ["Science II", 46, 20, 53, 7],
            ["Science III", 46, 20, 38, 7],
            ["Math", 98, 30, 23, 13],
            ["Math II", 76, 30, 34, 6],
            ["Math III", 80, 30, 27, 8],
        ]);
        
        this.valueAxesAxisTitleOffset([20])
        this.valueAxesMinimum([0]);
        this.valueAxesAxisAlpha([0.15]);
        this.valueAxesDashLength([3]);
        
        return this;
    };
    
    Polar.prototype.enter = function(domNode, element) {
        CommonRadar.prototype.enter.apply(this, arguments);
    };
    
    Polar.prototype.updateChartOptions = function() {
        CommonRadar.prototype.updateChartOptions.apply(this, arguments);
        var context = this;
    }
    
    Polar.prototype.update = function(domNode, element) {
        var context = this;   
        CommonRadar.prototype.update.apply(this, arguments);
        this.updateChartOptions();
        
        this._chart.validateNow();
        this._chart.validateData();
    };

    return Polar;
}));
