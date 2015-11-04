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

        this._shapeWidget = new Shape();
        this._faChar = new FAChar();
    }
    Icon.prototype = Object.create(SVGWidget.prototype);
    Icon.prototype.constructor = Icon;
    Icon.prototype._class += " common_Icon";

    Icon.prototype.publish("shape", "circle", "set", "Shape Type", ["circle", "square"],{tags:["Private"]});
    Icon.prototype.publishProxy("faChar", "_faChar", "char");
    Icon.prototype.publishProxy("image_colorFill", "_faChar", "text_colorFill");
    Icon.prototype.publish("tooltip", "", "string", "Tooltip",null,{tags:["Private"]});
    Icon.prototype.publish("diameter", 24, "number", "Diameter",null,{tags:["Private"]});
    Icon.prototype.publish("paddingPercent", 45, "number", "Padding Percent",null,{tags:["Private"]});
    Icon.prototype.publishProxy("shape_colorFill", "_shapeWidget", "colorFill");
    Icon.prototype.publishProxy("shape_colorStroke", "_shapeWidget", "colorStroke");

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
        var context = this;
        element.on("click", function(el) { context.click(el); });
    };

    Icon.prototype.click = function (domNode) {
        console.log("Clicked the icon");
    };

    Icon.prototype.update = function (domNode, element) {
        SVGWidget.prototype.update.apply(this, arguments);
        this._faChar
            .fontSize(this.diameter() * (100 - this.paddingPercent()) / 100)
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

    Icon.prototype.exit = function (domNode, element) {
        SVGWidget.prototype.exit.apply(this, arguments);
        this._shapeWidget
            .target(null)
        ;
        this._faChar
            .target(null)
        ;
    };

    return Icon;
}));
