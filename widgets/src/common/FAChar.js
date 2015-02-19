"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./SVGWidget", "./Text", "css!lib/Font-Awesome/css/font-awesome", "css!./FAChar"], factory);
    } else {
        root.Entity = factory(root.SVGWidget, root.Text);
    }
}(this, function (SVGWidget, Text) {
    function FAChar() {
        SVGWidget.call(this);
        this._class = "common_FAChar";

        this._text = new Text()
            .font_family("FontAwesome")
            .font_size(14)
        ;
    };
    FAChar.prototype = Object.create(SVGWidget.prototype);
    FAChar.prototype.publish("char", "", "string", "Font Awesome Item");
    FAChar.prototype.publish("font_size", 14, "number", "Font Size");
    FAChar.prototype.publishProxy("color_fill", "_text");

    FAChar.prototype.testData = function () {
        this.char("\uf118");
        return this;
    }

    FAChar.prototype.enter = function (domNode, element) {
        SVGWidget.prototype.enter.apply(this, arguments);
        this._text
            .target(domNode)
        ;
    };

    FAChar.prototype.update = function (domNode, element) {
        SVGWidget.prototype.update.apply(this, arguments);
        this._text
            .text(this._char)
            .scale(this._font_size / 14) //  Scale rather than font_size to prevent Chrome glitch  ---
            .render()
        ;
    };

    return FAChar;
}));
