"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./SVGWidget", "./Shape", "./Text", "css!./TextBox"], factory);
    } else {
        root.common_TextBox = factory(root.common_SVGWidget, root.common_Shape, root.common_Text);
    }
}(this, function (SVGWidget, Shape, Text) {
    function TextBox() {
        SVGWidget.call(this);

        this._shape = new Shape()
            .shape("rect")
        ;
        this._text = new Text();
    };
    TextBox.prototype = Object.create(SVGWidget.prototype);
    TextBox.prototype._class += " common_TextBox";

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
        this.padding_left(_);
        this.padding_right(_);
        this.padding_top(_);
        this.padding_bottom(_);
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
            width: this.fixedSize() ? this.fixedSize().width : textBBox.width + this.padding_left() + this.padding_right(),
            height: this.fixedSize() ? this.fixedSize().height : textBBox.height + this.padding_top() + this.padding_bottom()
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
                        .x(-this.fixedSize().width / 2 + textBBox.width / 2 + (this.padding_left() + this.padding_right()) / 2)
                        .render()
                    ;
                    break;
                case "end":
                    this._text
                        .x(this.fixedSize().width / 2 - textBBox.width / 2 - (this.padding_left() + this.padding_right()) / 2)
                        .render()
                    ;
                    break;
            }
        }
    };

    return TextBox;
}));
