"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./Material"], factory);
    } else {
        root.google_MaterialBar = factory(root.google_Material);
    }
}(this, function (Material) {

    function MaterialBar() {
        Material.call(this);

        this._chartType = "Bar";
        this._gType = "Bar";
        this._chartLibrary = "charts";
    }
    MaterialBar.prototype = Object.create(Material.prototype);
    MaterialBar.prototype.constructor = MaterialBar;
    MaterialBar.prototype._class += " google_MaterialBar";

    MaterialBar.prototype.getChartOptions = function () {
        var retVal = Material.prototype.getChartOptions.apply(this, arguments);
        retVal.bars = "horizontal";
        return retVal;
    };

    return MaterialBar;
}));
