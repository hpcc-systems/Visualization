"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./CommonND"], factory);
    } else {
        root.c3_Line = factory(root.c3_CommonND);
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
