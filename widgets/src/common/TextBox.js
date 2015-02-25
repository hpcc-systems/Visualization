"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./SVGWidget", "./Shape", "./Text", "css!./TextBox"], factory);
    } else {
        root.Entity = factory(root.SVGWidget, root.Shape, root.Text);
    }
}(this, function (SVGWidget, Shape, Text) {
    function TextBox() {
        SVGWidget.call(this);
        this._class = "common_TextBox";

        this._shape = new Shape()
            .shape("rect")
        ;
        this._text = new Text();
    };
    TextBox.prototype = Object.create(SVGWidget.prototype);
    TextBox.prototype.publishProxy("text", "_text");
    TextBox.prototype.publishProxy("shape_color_stroke", "_shape", "color_stroke");
    TextBox.prototype.publishProxy("shape_color_fill", "_shape", "color_fill");
    TextBox.prototype.publishProxy("text_color_fill", "_text", "color_fill");
    TextBox.prototype.publish("padding_left", 4, "number", "Padding:  Left");
    TextBox.prototype.publish("padding_right", 4, "number", "Padding:  Right");
    TextBox.prototype.publish("padding_top", 4, "number", "Padding:  Top");
    TextBox.prototype.publish("padding_bottom", 4, "number", "Padding:  Bottom");
    TextBox.prototype.publishProxy("anchor", "_text");
    TextBox.prototype.publish("fixedSize", null);

    TextBox.prototype.padding = function (_) {
        this._padding_left = _;
        this._padding_right = _;
        this._padding_top = _;
        this._padding_bottom = _;
        return this;
    };

    TextBox.prototype.testData = function () {
        this._text.testData();
        return this;
    }

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

    TextBox.prototype.update = function (domNode, element) {
        SVGWidget.prototype.update.apply(this, arguments);

        this._text
            .render()
        ;
        var textBBox = this._text.getBBox(true);
        var size = {
            width: this._fixedSize ? this._fixedSize.width : textBBox.width + this._padding_left + this._padding_right,
            height: this._fixedSize ? this._fixedSize.height : textBBox.height + this._padding_top + this._padding_bottom
        };
        this._shape
            .width(size.width)
            .height(size.height)
            .render()
        ;
        if (this._fixedSize) {
            switch (this.anchor()) {
                case "start":
                    this._text
                        .x(-this._fixedSize.width / 2 + textBBox.width / 2 + (this._padding_left + this._padding_right) / 2)
                        .render()
                    ;
                    break;
                case "end":
                    this._text
                        .x(this._fixedSize.width / 2 - textBBox.width / 2 - (this._padding_left + this._padding_right) / 2)
                        .render()
                    ;
                    break;
            }
        }
    };

    return TextBox;
}));
