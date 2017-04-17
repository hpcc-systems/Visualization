/**
 * @file 2D Chart Interface
 * @author HPCC Systems
 */

"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["../common/Palette"], factory);
    } else {
        root.api_I2DChart = factory(root.common_Palette);
    }
}(this, function (Palette) {
    /**
     * @interface api_I2DChart
     * @class api_I2DChart
     */
    function I2DChart() {
    }
    /**
     * Instance of a HPCC VIZ Palette object.
     * @member {Object} _palette
     * @memberof api_I2DChart
     * @private
     */
    I2DChart.prototype._palette = Palette.ordinal("default");

    /**
     * Populates Data and Columns with test data.
     * @method testData
     * @memberof api_I2DChart
     * @instance
     * @returns {Widget}
     * @this Widget
     */
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

    /**
     * (event) Overridable click callback function.
     * @method click
     * @memberof api_I2DChart
     * @param {type} row
     * @param {type} column
     */
    I2DChart.prototype.click = function (row, column) {
        console.log("Click:  " + JSON.stringify(row) + ", " + column);
    };

    return I2DChart;
}));