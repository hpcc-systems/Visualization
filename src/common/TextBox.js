/**
 * @file TextBox Widget
 * @author HPCC Systems
 */

"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./SVGWidget", "./Shape", "./Text", "css!./TextBox"], factory);
    } else {
        root.common_TextBox = factory(root.common_SVGWidget, root.common_Shape, root.common_Text);
    }
}(this, function (SVGWidget, Shape, Text) {
    /**
     * @class common_TextBox
     * @extends common_SVGWidget
     */
    function TextBox() {
        SVGWidget.call(this);
        /**
         * Shape widget/object instance.
         * @member {Object} _shapeWidget
         * @memberof common_Menu
         * @default "rect"
         * @private
         */
        this._shape = new Shape()
            .shape("rect")
        ;
        /**
         * Text widget/object instance.
         * @member {Object} _shapeWidget
         * @memberof common_Menu
         * @private
         */
        this._text = new Text();
    }
    TextBox.prototype = Object.create(SVGWidget.prototype);
    TextBox.prototype.constructor = TextBox;
    /**
     * Specifies the class name of the container.
     * @member {string} _class
     * @memberof common_TextBox
     * @private
     */
    TextBox.prototype._class += " common_TextBox";

    TextBox.prototype.publishProxy("text", "_text");
    TextBox.prototype.publishProxy("shape_colorStroke", "_shape", "colorStroke");
    TextBox.prototype.publishProxy("shape_colorFill", "_shape", "colorFill");
    TextBox.prototype.publishProxy("text_colorFill", "_text", "colorFill");
    TextBox.prototype.publish("paddingLeft", 4, "number", "Padding:  Left",null,{tags:["Private"]});
    TextBox.prototype.publish("paddingRight", 4, "number", "Padding:  Right",null,{tags:["Private"]});
    TextBox.prototype.publish("paddingTop", 4, "number", "Padding:  Top",null,{tags:["Private"]});
    TextBox.prototype.publish("paddingBottom", 4, "number", "Padding:  Bottom",null,{tags:["Private"]});
    TextBox.prototype.publishProxy("anchor", "_text");
    TextBox.prototype.publish("fixedSize", null);

    TextBox.prototype.padding = function (_) {
        this.paddingLeft(_);
        this.paddingRight(_);
        this.paddingTop(_);
        this.paddingBottom(_);
        return this;
    };

    /**
     * Populates Data and Columns with test data.
     * @method testData
     * @memberof common_TextBox
     * @instance
     * @returns {Widget}
     */
    TextBox.prototype.testData = function () {
        this._text.testData();
        return this;
    };

    /**
     * The function that is called when this widget "enters" the web page.
     * @method enter
     * @memberof common_Widget
     * @instance
     * @protected
     * @param {HTMLElement} domeNode HTML DOMNode of widget container.
     * @param {D3Selection} element d3 selection object of widget.
     */
    TextBox.prototype.enter = function (domNode, element) {
        SVGWidget.prototype.enter.apply(this, arguments);
        this._shape
            .target(domNode)
            .render()
        ;
        this._text
            .target(domNode)
            .render()
        ;
    };

    /**
     * The function that is called when this widget "enters" the web page. after enter() and everytime the widget is updated with subsequent render calls.
     * @method update
     * @memberof common_Widget
     * @instance
     * @protected
     * @param {HTMLElement} domeNode HTML/SVG DOMNode of widget container.
     * @param {D3Selection} element d3 selection object of widget.
     */
    TextBox.prototype.update = function (domNode, element) {
        SVGWidget.prototype.update.apply(this, arguments);

        this._text
            .render()
        ;
        var textBBox = this._text.getBBox(true);
        var size = {
            width: this.fixedSize() ? this.fixedSize().width : textBBox.width + this.paddingLeft() + this.paddingRight(),
            height: this.fixedSize() ? this.fixedSize().height : textBBox.height + this.paddingTop() + this.paddingBottom()
        };
        this._shape
            .width(size.width)
            .height(size.height)
            .render()
        ;
        if (this.fixedSize()) {
            switch (this.anchor()) {
                case "start":
                    this._text
                        .x(-this.fixedSize().width / 2 + textBBox.width / 2 + (this.paddingLeft() + this.paddingRight()) / 2)
                        .render()
                    ;
                    break;
                case "end":
                    this._text
                        .x(this.fixedSize().width / 2 - textBBox.width / 2 - (this.paddingLeft() + this.paddingRight()) / 2)
                        .render()
                    ;
                    break;
            }
        }
    };

    return TextBox;
}));
