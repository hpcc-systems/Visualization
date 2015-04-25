"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./CommonND"], factory);
    } else {
        root.c3chart_Column = factory(root.c3chart_CommonND);
    }
}(this, function (CommonND) {
    function Column(target) {
        CommonND.call(this);
        this._class = "c3chart_Column";

        this._type = "bar";
    };
    Column.prototype = Object.create(CommonND.prototype);

    return Column;
}));
