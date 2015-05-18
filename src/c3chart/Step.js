"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./CommonND"], factory);
    } else {
        root.c3chart_Step = factory(root.c3chart_CommonND);
    }
}(this, function (CommonND) {
    function Step(target) {
        CommonND.call(this);

        this._type = "step";
    }

    /**
     * Publish Params Common To Other Libraries
     */

    /**
     * Publish Params Unique To This Widget
     */   
    
    Step.prototype = Object.create(CommonND.prototype);
    Step.prototype._class += " c3chart_Step";

    return Step;
}));
