"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["../common/Palette"], factory);
    } else {
        root.api_I2DChart = factory(root.common_Palette);
    }
}(this, function (Palette) {
    function I2DChart() {
    }
    I2DChart.prototype._palette = Palette.ordinal("default");

    //  Events  ---
    I2DChart.prototype.click = function (row, column, selected) {
        console.log("Click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
    };

    I2DChart.prototype.dblclick = function (row, column, selected) {
        console.log("Double click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
    };

    return I2DChart;
}));