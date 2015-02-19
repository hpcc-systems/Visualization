"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./CommonND"], factory);
    } else {
        root.Line = factory(root.CommonND);
    }
}(this, function (CommonND) {
    function Line(target) {
        CommonND.call(this);
        this._class = "c3_Line";

        this._type = "line";
    };
    Line.prototype = Object.create(CommonND.prototype);

    return Line;
}));
