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
            .fontFamily("FontAwesome")
        ;
    };
    FAChar.prototype = Object.create(SVGWidget.prototype);
    FAChar.prototype.publish("char", "", "string", "Font Awesome Item");

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
            .render()
        ;
    };

    return FAChar;
}));
