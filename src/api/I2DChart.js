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

    //  Data ---
    I2DChart.prototype.testData = function () {
        this.columns(["Subject", "2nd Year"]);
        this.data([
            ["Geography", 75],
            ["English", 45],
            ["Math", 98],
            ["Science", 66]
        ]);
        return this;
    };

    //  Events  ---
    I2DChart.prototype.click = function (row, column, selected) {
        console.log("Click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
    };

    return I2DChart;
}));