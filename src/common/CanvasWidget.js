"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./HTMLWidget"], factory);
    } else {
        root.common_CanvasWidget = factory(root.d3, root.common_HTMLWidget);
    }
}(this, function (d3, HTMLWidget) {
    function CanvasWidget() {
        HTMLWidget.call(this);
        this._tag = "canvas";
    }
    CanvasWidget.prototype = Object.create(HTMLWidget.prototype);
    CanvasWidget.prototype.constructor = CanvasWidget;
    CanvasWidget.prototype._class += " common_CanvasWidget";

    CanvasWidget.prototype.resize = function (size) {
        var retVal = HTMLWidget.prototype.resize.apply(this, arguments);
        this._element.attr("width", this._size.width);
        this._element.attr("height", this._size.height);
        return retVal;
    };


    CanvasWidget.prototype.click = function (d, c) {
        console.log(d);
    };

    return CanvasWidget;
}));
