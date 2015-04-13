"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./CommonND"], factory);
    } else {
        root.c3_Column = factory(root.c3_CommonND);
    }
}(this, function (CommonND) {
    function Column(target) {
        CommonND.call(this);
        this._class = "c3_Column";

        this._type = "bar";
    };
    Column.prototype = Object.create(CommonND.prototype);

    return Column;
}));
