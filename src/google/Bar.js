"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./Column"], factory);
    } else {
        root.google_Bar = factory(root.d3, root.google_Column);
    }
}(this, function (d3, Column) {

    function Bar() {
        Column.call(this);

        this._chartType = "BarChart";
    }
    Bar.prototype = Object.create(Column.prototype);
    Bar.prototype.constructor = Bar;
    Bar.prototype._class += " google_Bar";



    return Bar;
}));
