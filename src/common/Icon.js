"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./SVGWidget", "./Shape", "./FAChar", "css!./Icon"], factory);
    } else {
        root.common_Icon = factory(root.common_SVGWidget, root.common_Shape, root.common_FAChar);
    }
}(this, function (SVGWidget, Shape, FAChar) {
    function Icon() {
        SVGWidget.call(this);
        this._class = "common_Icon";

        this._shapeWidget = new Shape();
        this._faChar = new FAChar();
    };
    Icon.prototype = Object.create(SVGWidget.prototype);

    Icon.prototype.publish("shape", "circle", "set", "Shape Type", ["circle", "square"]);
    Icon.prototype.publishProxy("faChar", "_faChar", "char");
    Icon.prototype.publishProxy("image_color_fill", "_faChar", "color_fill");
    Icon.prototype.publish("tooltip", "", "string", "Tooltip");
    Icon.prototype.publish("diameter", 24, "number", "Diameter");
    Icon.prototype.publish("padding_percent", 45, "number", "Padding Percent");
    Icon.prototype.publishProxy("shape_color_fill", "_shapeWidget", "color_fill");
    Icon.prototype.publishProxy("shape_color_stroke", "_shapeWidget", "color_stroke");

    Icon.prototype.testData = function () {
        this._faChar.testData();
        return this;
    };

    Icon.prototype.intersection = function (pointA, pointB) {
        return this._shapeWidget.intersection(pointA, pointB);
    };

    Icon.prototype.enter = function (domNode, element) {
        SVGWidget.prototype.enter.apply(this, arguments);
        this._shapeWidget
            .target(domNode)
            .render()
        ;
        this._faChar
            .target(domNode)
            .render()
        ;
        this._tooltipElement = element.append("title");
    };

    Icon.prototype.update = function (domNode, element) {
        SVGWidget.prototype.update.apply(this, arguments);
        this._faChar
            .font_size(this.diameter() * (100 - this.padding_percent()) / 100)
            .render()
        ;
        this._shapeWidget
            .shape(this.shape())
            .width(this.diameter())
            .height(this.diameter())
            .render()
        ;
        this._tooltipElement.text(this.tooltip());
    };

    return Icon;
}));
