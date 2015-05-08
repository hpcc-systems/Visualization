"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../google/Common", "../api/I2DChart", "goog!visualization,1,packages:[corechart]"], factory);
    } else {
        root.google_Common2D = factory(root.d3, root.google_Common, root.api_I2DChart);
    }
}(this, function (d3, Common, I2DChart) {

    function Common2D() {
        Common.call(this);
        I2DChart.call(this);
    };
    Common2D.prototype = Object.create(Common.prototype);
    Common2D.prototype._class += " google_Common2D";
    Common2D.prototype.implements(I2DChart.prototype);

    Common2D.prototype.publish("paletteID", "default", "set", "Palette ID", Common2D.prototype._palette.switch());

    Common2D.prototype.getChartOptions = function () {
        var chartOptions = Common.prototype.getChartOptions.call(this);
        chartOptions.series = initSeries(this.getNumSeries());
        chartOptions.axes = {};

        return chartOptions;
    };

    Common2D.prototype.update = function(domNode, element) {
        this._palette = this._palette.switch(this.paletteID());
        Common.prototype.update.apply(this, arguments);
    }
    
    function initSeries(num) {
        var series = [];
        for (var i = 0; i < num; i++) {
            series.push({});
        }
        return series;
    }   

    return Common2D;
}));
