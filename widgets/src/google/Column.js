"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "./CommonND"], factory);
    } else {
        root.google_Column = factory(root.d3, root.google_CommonND);
    }
}(this, function (d3, CommonND) {

    function Column() {
        CommonND.call(this);
        this._class = "google_Column";

        this._chartType = "ColumnChart";
    };
    Column.prototype = Object.create(CommonND.prototype);
    //  TODO:  Publish Column Properties Here

    Column.prototype.getChartOptions = function () {
        var retVal = CommonND.prototype.getChartOptions.apply(this, arguments);
        //  TODO:  Add Column Properties Here
        return retVal;
    };

    Column.prototype.enter = function (domNode, element) {
        CommonND.prototype.enter.apply(this, arguments);
    };

    Column.prototype.update = function (domNode, element) {
        CommonND.prototype.update.apply(this, arguments);
    };

    return Column;
}));
