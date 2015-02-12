"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./SVGWidget", "./Shape", "./FAChar", "css!./Icon"], factory);
    } else {
        root.Entity = factory(root.SVGWidget, root.Shape, root.FAChar);
    }
}(this, function (SVGWidget, Shape, FAChar) {
    function Icon() {
        SVGWidget.call(this);
        this._class = "common_Icon";

        this._shape = new Shape();
        this._faChar = new FAChar()
            .color_fill("#ffffff")
        ;
    };
    Icon.prototype = Object.create(SVGWidget.prototype);    

    Icon.prototype.publishProxy("shape", "_shape");
    Icon.prototype.publishProxy("faChar", "_faChar", "char");
    Icon.prototype.publish("padding", 4, "number", "Padding");
    Icon.prototype.publish("scale", 1, "number", "Scale");
    Icon.prototype.publishProxy("shape_color_fill", "_shape", "color_fill");
    Icon.prototype.publishProxy("shape_color_stroke", "_shape", "color_stroke");
    Icon.prototype.publishProxy("image_color_fill", "_faChar", "color_fill");

    Icon.prototype.testData = function () {
        this._faChar.testData();
        return this;
    };

    Icon.prototype.intersection = function (pointA, pointB) {
        return this._shape.intersection(pointA, pointB);
    };

    Icon.prototype.enter = function (domNode, element) {
        SVGWidget.prototype.enter.apply(this, arguments);
        this._shape
            .target(domNode)
            .render()
        ;
        this._faChar
            .target(domNode)
            .render()
        ;
    };

    Icon.prototype.update = function (domNode, element) {
        SVGWidget.prototype.update.apply(this, arguments);
        this._faChar
            .scale(this._scale)
            .render()
        ;

        var bbox = this._faChar.getBBox(true);
        this._shape
            .width(bbox.width + this._padding * this._scale)
            .height(bbox.height + this._padding * this._scale)
            .render()
        ;
    };

    return Icon;
}));
