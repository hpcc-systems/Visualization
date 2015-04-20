"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "./CommonFunnel", "amcharts.funnel", "../../chart/INDChart"], factory);
    } else {
        root.Pyramid = factory(root.d3, root.CommonFunnel, root.amcharts, root.INDChart);
    }
}(this, function(d3, CommonFunnel, AmCharts, INDChart) {
    function Pyramid() {
        CommonFunnel.call(this);
        this._class = "amcharts_charts_Pyramid";
        this._tag = "div";
    };
    
    Pyramid.prototype = Object.create(CommonFunnel.prototype);
    Pyramid.prototype.implements(INDChart.prototype);

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

    return Pyramid;
}));
