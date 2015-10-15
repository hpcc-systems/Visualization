"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./SVGWidget", "./FAChar", "./Text"], factory);
    } else {
        root.common_Busy = factory(root.common__SVGWidget, root.common_FAChar, root.common_Text);
    }
}(this, function (SVGWidget, FAChar, Text) {
    function Busy(widget) {
        SVGWidget.call(this);
        this._faChar = new FAChar();
        this._message = new Text();
        if (widget) {widget._busyIndicator = this;}
        this._widget = widget;
    }

    Busy.prototype = Object.create(SVGWidget.prototype);
    Busy.prototype.constructor = Busy;
    Busy.prototype._class += " common_Busy";

    Busy.prototype.publish("messageFontSize", 20, "number", "Font size of the loading message",null,{tags:["Private"]});
    Busy.prototype.publish("char", "\uf110", "set", "Spinner Icon",["\uf110", "\uf1ce","\uf021", "\uf013"],{tags:["Private"]});
    Busy.prototype.publish("message", "Loading...", "string", "Loading message",null,{tags:["Private"]});
    Busy.prototype.publishProxy("faChar", "_faChar", "char");
    Busy.prototype.publishProxy("fontSize", "_faChar","fontSize", 100);
    Busy.prototype.publish("busyCounter", 0, "number", "Initial count for the busyCounter",null,{tags:["Private"]});

    Busy.prototype.update = function (domNode, element) {
        SVGWidget.prototype.update.apply(this, arguments);

        if (this.busyCounter() > 0) {
            this.visible(true);

            this._faChar
                .target(domNode)
                .char(this.char())
                .scale((this.fontSize() || 14) / 14)
            ;
            this._faChar._text._class += " fa-spin";
            this._faChar.render();

            this._message
                .target(domNode)
                .text(this.message())
                .render()
            ;

            this._message._textElement
                .attr("transform", "translate(0," + (this.fontSize()/2 + this.messageFontSize()/2) + ")")
                .style("font-size", this.messageFontSize())
            ;
        } else {
            this.visible(false);
        }
    };

    Busy.prototype.showHide = function (count) {
        this.busyCounter(count);
        this.render();
    };

    return Busy;
}));
