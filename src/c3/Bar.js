"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./Column"], factory);
    } else {
        root.c3_Bar = factory(root.c3_Column);
    }
}(this, function (Column) {
    function Bar(target) {
        Column.call(this);
        this._class = "c3_Bar";

        this._config.axis.rotated = true;
    };
    Bar.prototype = Object.create(Column.prototype);

    return Bar;
}));
