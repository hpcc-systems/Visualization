"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./CommonND"], factory);
    } else {
        root.c3chart_Line = factory(root.c3chart_CommonND);
    }
}(this, function (CommonND) {
    function Line(target) {
        CommonND.call(this);
        this._class = "c3chart_Line";

        this._type = "line";
    };
    Line.prototype = Object.create(CommonND.prototype);

    return Line;
}));
