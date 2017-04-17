"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./Scatter"], factory);
    } else {
        root.chart_Step = factory(root.d3, root.chart_Scatter);
    }
}(this, function (d3, Scatter) {
    /**
     * @class chart_Step
     * @extends chart_Scatter
     */
    function Step(target) {
        Scatter.call(this);

        this.interpolate("step");
    }
    Step.prototype = Object.create(Scatter.prototype);
    Step.prototype.constructor = Step;
    /**
     * Specifies the class name of the container.
     * @member {string} _class
     * @memberof chart_Step
     * @private
     */
    Step.prototype._class += " chart_Step";

    return Step;
}));
