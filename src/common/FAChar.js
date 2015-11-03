"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./SVGWidget", "./Text", "css!font-awesome", "css!./FAChar"], factory);
    } else {
        root.common_FAChar = factory(root.common_SVGWidget, root.common_Text);
    }
}(this, function (SVGWidget, Text) {
    function FAChar() {
        SVGWidget.call(this);

        this._text = new Text()
            .fontFamily("FontAwesome")
        ;
    }
    FAChar.prototype = Object.create(SVGWidget.prototype);
    FAChar.prototype.constructor = FAChar;
    FAChar.prototype._class += " common_FAChar";

    FAChar.prototype.publish("char", "", "string", "Font Awesome Item",null,{tags:["Private"]});
    FAChar.prototype.publish("fontSize", null, "number", "Font Size",null,{tags:["Private"]});
    FAChar.prototype.publishProxy("text_colorFill", "_text", "colorFill");

    FAChar.prototype.enter = function (domNode, element) {
        SVGWidget.prototype.enter.apply(this, arguments);
        this._text
            .target(domNode)
        ;
    };

    FAChar.prototype.update = function (domNode, element) {
        SVGWidget.prototype.update.apply(this, arguments);
        this._text
            .text(this.char())
            .scale((this.fontSize() || 14) / 14) //  Scale rather than fontSize to prevent Chrome glitch  ---
            .render()
        ;
    };

    FAChar.prototype.exit = function (domNode, element) {
        this._text
            .target(null)
        ;
        SVGWidget.prototype.exit.apply(this, arguments);
    };

    return FAChar;
}));
