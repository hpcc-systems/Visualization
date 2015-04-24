"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./SVGWidget", "css!./Shape"], factory);
    } else {
        root.common_Shape = factory(root.common_SVGWidget);
    }
}(this, function (SVGWidget) {
    function Shape() {
        SVGWidget.call(this);
        this._class = "common_Shape";
    };
    Shape.prototype = Object.create(SVGWidget.prototype);

    Shape.prototype.publish("shape", "circle", "set", "Shape Type", ["circle", "square", "rect", "ellipse"]);
    Shape.prototype.publish("width", 24, "number", "Width");
    Shape.prototype.publish("height", 24, "number", "Height");
    Shape.prototype.publish("color_stroke", null, "html-color", "Stroke Color", null);
    Shape.prototype.publish("color_fill", null, "html-color", "Fill Color", null);

    Shape.prototype.radius = function (_) {
        if (!arguments.length) return Math.max(this._width, this._height) / 2;
        this._width = _;
        this._height = _;
        return this;
    };

    Shape.prototype.testData = function () {
        return this;
    }

    Shape.prototype.intersection = function (pointA, pointB) {
        switch (this._shape) {
            case "circle":
                return this.intersectCircle(pointA, pointB);
        }
        return SVGWidget.prototype.intersection.apply(this, arguments);
    };

    Shape.prototype.update = function (domNode, element) {
        var shape = element.selectAll("rect,circle,ellipse").data([this._shape], function (d) { return d; });

        shape.enter().append(this._shape === "square" ? "rect" : this._shape)
            .attr("class", "common_Shape")
        ;
        var context = this;
        shape.each(function (d) {
            var element = d3.select(this);
            element.style({
                fill: context._color_fill !== context.__meta_color_fill.defaultValue ? context._color_fill : null,
                stroke: context._color_stroke !== context.__meta_color_stroke.defaultValue ? context._color_stroke : null
            });
            switch (context._shape) {
                case "circle":
                    var radius = context.radius();
                    element
                        .attr("r", radius)
                    ;
                    break;
                case "square":
                    var width = Math.max(context._width, context._height);
                    element
                        .attr("x", -width / 2)
                        .attr("y", -width / 2)
                        .attr("width", width)
                        .attr("height", width)
                    ;
                    break;
                case "rect":
                    element
                        .attr("x", -context._width / 2)
                        .attr("y", -context._height / 2)
                        .attr("width", context._width)
                        .attr("height", context._height)
                    ;
                    break;
                case "ellipse":
                    element
                        .attr("rx", context._width / 2)
                        .attr("ry", context._height / 2)
                    ;
                    break;
            }
        });
        shape.exit().remove();
    };

    return Shape;
}));
