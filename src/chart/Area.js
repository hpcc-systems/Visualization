"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./Scatter"], factory);
    } else {
        root.chart_Area = factory(root.d3, root.chart_Scatter);
    }
}(this, function (d3, Scatter) {
    function Area(target) {
        Scatter.call(this);

        this
            .interpolate_default("linear")
            .interpolateFill_default(true)
        ;
    }
    Area.prototype = Object.create(Scatter.prototype);
    Area.prototype.constructor = Area;
    Area.prototype._class += " chart_Area";

    return Area;
}));
