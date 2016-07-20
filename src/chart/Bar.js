"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./Column"], factory);
    } else {
        root.chart_Bar = factory(root.chart_Column);
    }
}(this, function (Column) {
    function Bar(target) {
        Column.call(this);

        this
            .orientation_default("vertical")
        ;
    }
    Bar.prototype = Object.create(Column.prototype);
    Bar.prototype.constructor = Bar;
    Bar.prototype._class += " chart_Bar";

    return Bar;
}));
