/**
 * @file Icon Widget
 * @author HPCC Systems
 */

"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./SVGWidget", "./Shape", "./FAChar", "css!./Icon"], factory);
    } else {
        root.common_Icon = factory(root.common_SVGWidget, root.common_Shape, root.common_FAChar);
    }
}(this, function (SVGWidget, Shape, FAChar) {
    /**
     * @class common_Icon
     * @extends common_SVGWidget
     */
    function Icon() {
        SVGWidget.call(this);

        /**
         * Shape widget/object instance.
         * @member {Object} _shapeWidget
         * @memberof common_Icon
         * @private
         */
        this._shapeWidget = new Shape();
        /**
         * Font Awesome widget/object instance.
         * @member {Object} _shapeWidget
         * @memberof common_Icon
         * @private
         */
        this._faChar = new FAChar();
    }
    Icon.prototype = Object.create(SVGWidget.prototype);
    Icon.prototype.constructor = Icon;
    /**
     * Specifies the class name of the container.
     * @member {string} _class
     * @memberof common_Icon
     * @private
     */
    Icon.prototype._class += " common_Icon";

    Icon.prototype.publish("shape", "circle", "set", "Shape Type", ["circle", "square"],{tags:["Private"]});
    Icon.prototype.publishProxy("faChar", "_faChar", "char");
    Icon.prototype.publishProxy("image_colorFill", "_faChar", "text_colorFill");
    Icon.prototype.publish("tooltip", "", "string", "Tooltip",null,{tags:["Private"]});
    Icon.prototype.publish("diameter", 24, "number", "Diameter",null,{tags:["Private"]});
    Icon.prototype.publish("paddingPercent", 45, "number", "Padding Percent",null,{tags:["Private"]});
    Icon.prototype.publishProxy("shape_colorFill", "_shapeWidget", "colorFill");
    Icon.prototype.publishProxy("shape_colorStroke", "_shapeWidget", "colorStroke");

    /**
     * Populates Data and Columns with test data.
     * @method testData
     * @memberof common_Icon
     * @instance
     * @returns {Widget}
     */
    Icon.prototype.testData = function () {
        this._faChar.testData();
        return this;
    };

    /**
     * Returns the first insersection point of the widget and a line. Given two line end points and given the widget is a circle, returns an object with [x,y] cordinates as properties.
     * @method intersection
     * @memberof common_Icon
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
    Icon.prototype.intersection = function (pointA, pointB) {
        return this._shapeWidget.intersection(pointA, pointB);
    };

    /**
     * The function that is called when this widget "enters" the web page.
     * @method enter
     * @memberof common_Icon
     * @instance
     * @protected
     * @param {HTMLElement} domeNode HTML/SVG DOMNode of widget container.
     * @param {D3Selection} element d3 selection object of widget.
     */
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

    /**
     * (event) Overridable click callback function.
     * @method click
     * @memberof common_Icon
     * @param {HTMLElement} domeNode HTML DOMNode of widget container.
     */
    Icon.prototype.click = function (domNode) {
        console.log("Clicked the icon");
    };

    /**
     * The function that is called when this widget "enters" the web page. after enter() and everytime the widget is updated with subsequent render calls.
     * @method update
     * @memberof common_Icon
     * @instance
     * @protected
     * @param {HTMLElement} domeNode HTML/SVG DOMNode of widget container.
     * @param {D3Selection} element d3 selection object of widget.
     */
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

    return Icon;
}));
