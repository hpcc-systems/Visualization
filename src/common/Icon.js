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
    Icon.prototype.publish("imageUrl", null, "string", "Image URL", null, { optional: true });
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
        this._defs = element.append("defs");
        this._defs.append("clipPath")
            .attr("id", "clip_" + this.id() + "_circle")
            .append("circle")
                .attr("x", 0)
                .attr("y", 0)
        ;
        this._defs.append("clipPath")
            .attr("id", "clip_" + this.id() + "_square")
            .append("rect")
        ;
        this._root = element.append("g");
        this._shapeWidget
            .target(this._root.node())
            .render()
        ;
        this._faChar
            .target(element.node())
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

        var diameter = this.diameter();
        var radius = diameter / 2;
        this._defs.select("circle")
            .attr("r", radius)
        ;
        this._defs.select("rect")
            .attr("x", -radius)
            .attr("y", -radius)
            .attr("width", diameter)
            .attr("height", diameter)
        ;
        this._faChar
            .fontSize(diameter * (100 - this.paddingPercent()) / 100)
            .render()
        ;
        this._shapeWidget
            .shape(this.shape())
            .width(diameter)
            .height(diameter)
            .render()
        ;
        var image = this._root.selectAll("image").data(this.imageUrl() ? [this.imageUrl()] : [], function (d) { return d; });
        image.enter()
            .append("image")
            .attr("xlink:href", this.imageUrl())
        ;
        image
            .attr("clip-path", "url(#clip_" + this.id() + "_" + this.shape() + ")")
            .attr("x", -radius)
            .attr("y", -radius)
            .attr("width", diameter)
            .attr("height", diameter)
        ;
        image.exit()
            .remove()
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
