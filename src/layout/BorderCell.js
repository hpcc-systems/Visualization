"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./Surface"], factory);
    } else {
        root.layout_BorderCell = factory(root.layout_Surface);
    }
}(this, function (Surface) {
    function BorderCell() {
        Surface.call(this);
    }
    BorderCell.prototype = Object.create(Surface.prototype);
    BorderCell.prototype._class += " layout_BorderCell";

    BorderCell.prototype.enter = function (domNode, element) {
        Surface.prototype.enter.apply(this, arguments);
        element.classed("layout_Surface", true);
    };

    BorderCell.prototype.update = function (domNode, element) {
        Surface.prototype.update.apply(this, arguments);
    };

    return BorderCell;
}));
