"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./Scatter"], factory);
    } else {
        root.chart_Area = factory(root.d3, root.chart_Scatter);
    }
}(this, function (d3, Scatter) {
    /**
     * @class chart_Area
     * @extends chart_Scatter
     */
    function Area(target) {
        Scatter.call(this);

        this.interpolate("linear");
        this.interpolateFill(true);
    }
    Area.prototype = Object.create(Scatter.prototype);
    Area.prototype.constructor = Area;
    /**
     * Specifies the class name of the container.
     * @member {string} _class
     * @memberof chart_Area
     * @private
     */
    Area.prototype._class += " chart_Area";

    return Area;
}));
