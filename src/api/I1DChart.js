"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["../common/Palette"], factory);
    } else {
        root.api_I1DChart = factory(root.common_Palette);
    }
}(this, function (Palette) {
    function I1DChart() {
    }
    I1DChart.prototype._palette = Palette.rainbow("default");

    //  Data ---
    I1DChart.prototype.testData = function () {
        this.columns("Result");
        this.data(66);
        return this;
    };

    //  Events  ---
    I1DChart.prototype.click = function (row, column) {
        console.log("Click:  " + JSON.stringify(row) + ", " + column);
    };

    return I1DChart;
}));
