"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./SVGWidget", "css!./Shape.css"], factory);
    } else {
        root.common_Shape = factory(root.d3, root.common_SVGWidget);
    }
}(this, function (d3, SVGWidget) {
    function Shape() {
        SVGWidget.call(this);
    }
    Shape.prototype = Object.create(SVGWidget.prototype);
    Shape.prototype.constructor = Shape;
    Shape.prototype._class += " common_Shape";

    Shape.prototype.publish("shape", "circle", "set", "Shape Type", ["circle", "square", "rect", "ellipse"],{tags:["Private"]});
    Shape.prototype.publish("width", 24, "number", "Width",null,{tags:["Private"]});
    Shape.prototype.publish("height", 24, "number", "Height",null,{tags:["Private"]});
    Shape.prototype.publish("colorStroke", null, "html-color", "Stroke Color", null, {tags:["Private"]});
    Shape.prototype.publish("colorFill", null, "html-color", "Fill Color", null, {tags:["Private"]});
    Shape.prototype.publish("radius", null, "number", "Radius", null, { tags: ["Private"] });
    Shape.prototype.publish("tooltip", "", "string", "Tooltip", null, { tags: ["Private"] });

    Shape.prototype._origRadius = Shape.prototype.radius;
    Shape.prototype.radius = function (_) {
        var retVal = Shape.prototype._origRadius.apply(this, arguments);
        if (arguments.length) {
            this.width(_);
            this.height(_);
            return retVal;
        }
        return Math.max(this.width(), this.height()) / 2;
    };

    Shape.prototype.intersection = function (pointA, pointB) {
        switch (this.shape()) {
            case "circle":
                return this.intersectCircle(pointA, pointB);
        }
        return SVGWidget.prototype.intersection.apply(this, arguments);
    };

    Shape.prototype.update = function (domNode, element) {
        var shape = element.selectAll("rect,circle,ellipse").data([this.shape()], function (d) { return d; });

        var context = this;
        shape.enter().append(this.shape() === "square" ? "rect" : this.shape())
            .attr("class", "common_Shape")
            .each(function (d) {
                var element = d3.select(this);
                context._tooltipElement = element.append("title");
            })
        ;
        shape
            .style("fill", this.colorFill())
            .style("stroke", this.colorStroke())
            .each(function (d) {
                var element = d3.select(this);
                context._tooltipElement.text(context.tooltip());
                switch (context.shape()) {
                    case "circle":
                        var radius = context.radius();
                        element
                            .attr("r", radius)
                        ;
                        break;
                    case "square":
                        var width = Math.max(context.width(), context.height());
                        element
                            .attr("x", -width / 2)
                            .attr("y", -width / 2)
                            .attr("width", width)
                            .attr("height", width)
                        ;
                        break;
                    case "rect":
                        element
                            .attr("x", -context.width() / 2)
                            .attr("y", -context.height() / 2)
                            .attr("width", context.width())
                            .attr("height", context.height())
                        ;
                        break;
                    case "ellipse":
                        element
                            .attr("rx", context.width() / 2)
                            .attr("ry", context.height() / 2)
                        ;
                        break;
                }
            })
        ;
        shape.exit().remove();
    };

    return Shape;
}));
