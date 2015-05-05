"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./Surface", "css!./Cell"], factory);
    } else {
        root.layout_Cell = factory(root.layout_Surface);
    }
}(this, function (Surface) {
    function Cell() {
        Surface.call(this);
        this._class = "layout_Cell";
    };
    Cell.prototype = Object.create(Surface.prototype);

    Cell.prototype.publish("gridRow", 0, "number", "Grid Row Position");
    Cell.prototype.publish("gridCol", 0, "number", "Grid Column Position");
    Cell.prototype.publish("gridRowSpan", 1, "number", "Grid Row Span");
    Cell.prototype.publish("gridColSpan", 1, "number", "Grid Column Span");

    Cell.prototype.enter = function (domNode, element) {
        Surface.prototype.enter.apply(this, arguments);
        element.classed("layout_Surface", true);
    };

    return Cell;
}));
