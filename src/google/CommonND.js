"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../google/Common", "../chart/INDChart", "goog!visualization,1,packages:[corechart]"], factory);
    } else {
        root.google_CommonND = factory(root.d3, root.google_Common, root.chart_INDChart);
    }
}(this, function (d3, Common, INDChart) {

    function CommonND() {
        Common.call(this);
        INDChart.call(this);
        this._class = "google_CommonND";
    };
    CommonND.prototype = Object.create(Common.prototype);
    CommonND.prototype.implements(INDChart.prototype);

    CommonND.prototype.publish("paletteID", "default", "set", "Palette ID", CommonND.prototype._palette.switch());
    
    CommonND.prototype.getChartOptions = function () {
        var chartOptions = Common.prototype.getChartOptions.call(this);
        chartOptions.series = initSeries(this.getNumSeries());
        chartOptions.axes = {};

        return chartOptions;
    };
    
    CommonND.prototype.update = function(domNode, element) {
    	this._palette = this._palette.switch(this._paletteID); 
        Common.prototype.update.apply(this, arguments);
        this._chart.draw(this._data_google, this.getChartOptions());
    }

    function initSeries(num) {
        var series = [];
        for (var i = 0; i < num; i++) {
            series.push({});
        }
        return series;
    }   

    return CommonND;
}));
