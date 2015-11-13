"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./Column"], factory);
    } else {
        root.chart_Bar = factory(root.d3, root.chart_Column);
    }
}(this, function (d3, Column) {
    function Bar(target) {
        Column.call(this);

        this.orientation("vertical");
    }
    Bar.prototype = Object.create(Column.prototype);
    Bar.prototype.constructor = Bar;
    Bar.prototype._class += " chart_Bar";

    return Bar;
}));
