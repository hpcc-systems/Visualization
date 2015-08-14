/**
 * @file 1D Chart Interface
 * @author HPCC Systems
 */

"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["../common/Palette"], factory);
    } else {
        root.api_I1DChart = factory(root.common_Palette);
    }
}(this, function (Palette) {
    /**
     * @interface api_I1DChart
     * @class api_I1DChart
     */
    function I1DChart() {
    }
    /**
     * Instance of a HPCC VIZ Palette object.
     * @member {Object} _palette
     * @memberof api_I1DChart
     * @private
     */
    I1DChart.prototype._palette = Palette.rainbow("default");

    /**
     * Populates Data and Columns with test data.
     * @method testData
     * @memberof api_I1DChart
     * @instance
     * @returns {Widget}
     * @this Widget
     */
    I1DChart.prototype.testData = function () {
        this.columns("Result");
        this.data(66);
        return this;
    };

    /**
     * (event) Overridable click callback function.
     * @method click
     * @memberof api_I1DChart
     * @param {type} row
     * @param {type} column
     */
    I1DChart.prototype.click = function (row, column) {
        console.log("Click:  " + JSON.stringify(row) + ", " + column);
    };

    return I1DChart;
}));
