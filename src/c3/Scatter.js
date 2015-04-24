"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./CommonND"], factory);
    } else {
        root.c3_Scatter = factory(root.c3_CommonND);
    }
}(this, function (CommonND) {
    function Scatter(target) {
        CommonND.call(this);
        this._class = "c3_Scatter";

        this._type = "scatter";
    };
    Scatter.prototype = Object.create(CommonND.prototype);

    return Scatter;
}));
