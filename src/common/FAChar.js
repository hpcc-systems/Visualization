/**
 * @file HPCC VIZ Font Awesome Widget
 * @author HPCC Systems
 */

"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./SVGWidget", "./Text", "css!font-awesome", "css!./FAChar"], factory);
    } else {
        root.common_FAChar = factory(root.common_SVGWidget, root.common_Text);
    }
}(this, function (SVGWidget, Text) {
    /**
     * @class common_FAChar
     * @extends common_SVGWidget
     */
    function FAChar() {
        SVGWidget.call(this);

        /**
         * Text widget object.
         * @member {Object} _text
         * @memberof common_FAChar
         * @protected
         */
        this._text = new Text()
            .fontFamily("FontAwesome")
        ;
    }
    FAChar.prototype = Object.create(SVGWidget.prototype);
    FAChar.prototype.constructor = FAChar;
    /**
     * Specifies the class name of the container.
     * @member {string} _class
     * @memberof common_FAChar
     * @private
     */
    FAChar.prototype._class += " common_FAChar";

    FAChar.prototype.publish("char", "", "string", "Font Awesome Item",null,{tags:["Private"]});
    FAChar.prototype.publish("fontSize", null, "number", "Font Size",null,{tags:["Private"]});
    FAChar.prototype.publishProxy("text_colorFill", "_text", "colorFill");

    /**
     * Override normal testData function.
     * @method testData
     * @public
     * @memberof common_FAChar
     * @instance
     */
    FAChar.prototype.testData = function () {
        this.char("\uf007");
        return this;
    };

    /**
     * The function that is called when this widget "enters" the web page.
     * @method enter
     * @memberof common_FAChar
     * @instance
     * @protected
     * @param {HTMLElement|SVGElement} domeNode HTML/SVG DOMNode of widget container.
     * @param {D3Selection} element d3 selection object of widget.
     */
    FAChar.prototype.enter = function (domNode, element) {
        SVGWidget.prototype.enter.apply(this, arguments);
        this._text
            .target(domNode)
        ;
    };

    /**
     * The function that is called when this widget "enters" the web page. after enter() and everytime the widget is updated with subsequent render calls.
     * @method update
     * @memberof common_FAChar
     * @instance
     * @protected
     * @param {HTMLElement} domeNode HTML/SVG DOMNode of widget container.
     * @param {D3Selection} element d3 selection object of widget.
     */
    FAChar.prototype.update = function (domNode, element) {
        SVGWidget.prototype.update.apply(this, arguments);
        this._text
            .text(this.char())
            .scale((this.fontSize() || 14) / 14) //  Scale rather than fontSize to prevent Chrome glitch  ---
            .render()
        ;
    };

    return FAChar;
}));
