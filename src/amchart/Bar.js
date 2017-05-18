"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./Column", "amcharts-serial", "../api/INDChart"], factory);
    } else {
        root.amchart_Bar = factory(root.d3, root.amchart_Column, root.amcharts, root.api_INDChart);
    }
}(this, function(d3, Column, AmCharts, INDChart) {
    function Bar() {
        Column.call(this);
        this._tag = "div";
        this._gType = "column";

        this.orientation("vertical");
    }
    Bar.prototype = Object.create(Column.prototype);
    Bar.prototype.constructor = Bar;
    Bar.prototype._class += " amchart_Bar";
    return Bar;
}));
