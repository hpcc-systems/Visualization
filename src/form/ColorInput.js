"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "../api/IInput", "css!./Input.css"], factory);
    } else {
        root.form_ColorInput = factory(root.d3, root.common_HTMLWidget, root.api_IInput);
    }
}(this, function (d3, HTMLWidget, IInput) {
    function ColorInput() {
        HTMLWidget.call(this);
        IInput.call(this);

        this._tag = "div";
        this._inputElement = [];
    }
    ColorInput.prototype = Object.create(HTMLWidget.prototype);
    ColorInput.prototype.constructor = ColorInput;
    ColorInput.prototype._class += " form_ColorInput";
    ColorInput.prototype.implements(IInput.prototype);

    ColorInput.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);

        var context = this;

        this._inputElement[0] = element.append("input").attr("type", "text");
        this._inputElement[0].classed("color-text", true);
        this._inputElement[1] = element.append("input").attr("type", "color");

        this._inputElement.forEach(function(e, idx) {
            e.on("click", function (w) {
                w.click(w);
            });
            e.on("blur", function (w) {
                w.blur(w);
            });
            e.on("change", function (w) {
                if (idx === 0) {
                    context._inputElement[1].property("value",d3.rgb(context._inputElement[0].property("value")).toString());
                    context.value(context._inputElement[0].property("value"));
                } else {       
                    context._inputElement[0].property("value",context._inputElement[1].property("value"));
                    context.value(d3.rgb(context._inputElement[1].property("value")).toString());
                } 
                w.change(w);
            });
        });
    };

    ColorInput.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);

        var context = this;
        this._inputElement.forEach(function(e) {
            e.attr("name", context.name());
        });

        this._inputElement[0].attr("type", "text");
        this._inputElement[1].attr("type", "color");
        this._inputElement[0].property("value", this.value());
        this._inputElement[1].property("value", d3.rgb(this.value()).toString());
    };

    return ColorInput;
}));