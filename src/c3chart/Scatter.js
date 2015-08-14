/**
 * @file c3 Chart Scatter
 * @author HPCC Systems
 */

"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./CommonND"], factory);
    } else {
        root.c3chart_Scatter = factory(root.c3chart_CommonND);
    }
}(this, function (CommonND) {
    /**
     * @class c3chart_Scatter
     * @extends c3chart_CommonND
     */
    function Scatter(target) {
        CommonND.call(this);
        /**
         * Specifies the widget type of the c3 Widget/HPCC Widget.
         * @member {string} _type
         * @memberof c3chart_Scatter
         * @private
         */
        this._type = "scatter";
    }
    Scatter.prototype = Object.create(CommonND.prototype);
    Scatter.prototype.constructor = Scatter;
    /**
     * Specifies the class name of the container.
     * @member {string} _class
     * @memberof c3chart_Scatter
     * @private
     */
    Scatter.prototype._class += " c3chart_Scatter";

    return Scatter;
}));
