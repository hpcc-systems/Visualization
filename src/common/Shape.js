/**
 * @file Shape Widget
 * @author HPCC Systems
 */

"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./SVGWidget", "css!./Shape"], factory);
    } else {
        root.common_Shape = factory(root.d3, root.common_SVGWidget);
    }
}(this, function (d3, SVGWidget) {
    /**
     * @class common_Shape
     * @extends common_SVGWidget
     */
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

    Shape.prototype.radius = function (_) {
        if (!arguments.length) return Math.max(this.width(), this.height()) / 2;
        this.width(_);
        this.height(_);
        return this;
    };

    Shape.prototype.testData = function () {
        return this;
    };

    /**
     * Returns the first insersection point of the widget and a line. Given two line end points and given the widget is a circle, returns an object with [x,y] cordinates as properties.
     * @method intersection
     * @memberof common_Shape
     * @instance
     * @param {Object} [pointA] An object with the properties "x" and "y".
     * @param {Mixed} [pointA.x] End point x coordinate of the line.
     * @param {Mixed} [pointA.y] End point y coordinate of the line.
     * @param {Object} [pointB] An object with the properties "x" and "y".
     * @param {Mixed} [pointB.x] End point x coordinate of the line.
     * @param {Mixed} [pointB.y] End point y coordinate of hte line.
     * @returns {Object|Null}
     * @example //TODO
     */
    Shape.prototype.intersection = function (pointA, pointB) {
        switch (this.shape()) {
            case "circle":
                return this.intersectCircle(pointA, pointB);
        }
        return SVGWidget.prototype.intersection.apply(this, arguments);
    };

    /**
     * The function that is called when this widget "enters" the web page. after enter() and everytime the widget is updated with subsequent render calls.
     * @method update
     * @memberof common_Shape
     * @instance
     * @protected
     * @param {HTMLElement} domeNode HTML/SVG DOMNode of widget container.
     * @param {D3Selection} element d3 selection object of widget.
     */
    Shape.prototype.update = function (domNode, element) {
        var shape = element.selectAll("rect,circle,ellipse").data([this.shape()], function (d) { return d; });

        shape.enter().append(this.shape() === "square" ? "rect" : this.shape())
            .attr("class", "common_Shape")
        ;
        var context = this;
        shape.each(function (d) {
            var element = d3.select(this);
            element.style({
                fill: context.colorFill(),
                stroke: context.colorStroke()
            });
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
        });
        shape.exit().remove();
    };

    return Shape;
}));
