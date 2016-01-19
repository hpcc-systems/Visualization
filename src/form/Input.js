"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "../api/IInput", "css!./Input"], factory);
    } else {
        root.form_Input = factory(root.d3, root.common_HTMLWidget, root.api_IInput);
    }
}(this, function (d3, HTMLWidget, IInput) {
    function Input() {
        HTMLWidget.call(this);
        IInput.call(this);

        this._tag = "div";
        this._inputElement = [];
    }
    Input.prototype = Object.create(HTMLWidget.prototype);
    Input.prototype.constructor = Input;
    Input.prototype._class += " form_Input";
    Input.prototype.implements(IInput.prototype);

    Input.prototype.publish("type", "text", "set", "Input type", ["number", "button", "date", "text", "textarea", "search", "email", "time", "datetime", "hidden"]);

    Input.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);

        var context = this;
        switch (this.type()) {
            case "button":
                this._inputElement[0] = element.append("button");
                break;
            case "textarea":
                this._inputElement[0] = element.append("textarea");
                break;
            default:
                this._inputElement[0] = element.append("input").attr("type", this.type());
                break;
        }

        this._inputElement.forEach(function(e, idx) {
            e.attr("name", context.name());
            e.on("click", function (w) {
                w.click(w);
            });
            e.on("blur", function (w) {
                w.blur(w);
            });
            e.on("change", function (w) {
                context.value([e.property("value")]);
                w.change(w);
            });
        });
    };

    Input.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);

        switch (this.type()) {
            case "button":
                this._inputElement[0].text(this.value());
                break;
           case "textarea":
                this._inputElement[0].property("value", this.value());
                break;
            default:
                this._inputElement[0].attr("type", this.type());
                this._inputElement[0].property("value", this.value());
                break;
        }
    };

    return Input;
}));