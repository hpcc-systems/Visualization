/**
 * @file c3 Chart Step
 * @author HPCC Systems
 */

"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./CommonND"], factory);
    } else {
        root.c3chart_Step = factory(root.c3chart_CommonND);
    }
}(this, function (CommonND) {
    /**
     * @class c3chart_Step
     * @extends c3chart_CommonND
     */
    function Step(target) {
        CommonND.call(this);
        /**
         * Specifies the widget type of the c3 Widget/HPCC Widget.
         * @member {string} _type
         * @memberof c3chart_Step
         * @private
         */
        this._type = "step";
    }
    Step.prototype = Object.create(CommonND.prototype);
    Step.prototype.constructor = Step;
    /**
     * Specifies the class name of the container.
     * @member {string} _class
     * @memberof c3chart_Step
     * @private
     */
    Step.prototype._class += " c3chart_Step";

    return Step;
}));
