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
        this._class = "c3chart_Step";

        this._type = "step";
    };
    Step.prototype = Object.create(CommonND.prototype);

    return Step;
}));
