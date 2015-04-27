"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./CommonXY", "amcharts/xy", "../chart/INDChart", "css!./Bar"], factory);
    } else {
        root.amcharts_Scatter = factory(root.d3, root.amcharts_CommonXY, root.amcharts, root.chart_INDChart);
    }
}(this, function(d3, CommonXY, AmCharts, INDChart) {
    function Scatter() {
        CommonXY.call(this);
        this._class = "amcharts_Scatter";
        this._tag = "div";
        
        this._type = "Scatter";
        this._gType = "column";
    };
    Scatter.prototype = Object.create(CommonXY.prototype);
    Scatter.prototype.implements(INDChart.prototype);

    Scatter.prototype.enter = function(domNode, element) {
        CommonXY.prototype.enter.apply(this, arguments);
    };

    Scatter.prototype.updateChartOptions = function() {
        CommonXY.prototype.updateChartOptions.apply(this, arguments);
        var context = this;

        // TODO: Scatter Specific Options
    }

    Scatter.prototype.update = function(domNode, element) {
        CommonXY.prototype.update.apply(this, arguments);
        var context = this;   

        this.updateChartOptions();

        this._chart.validateNow();
        this._chart.validateData();

    };

    return Scatter;
}));