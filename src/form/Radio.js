"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "../api/IInput", "css!./Input"], factory);
    } else {
        root.form_Radio = factory(root.d3, root.common_HTMLWidget, root.api_IInput);
    }
}(this, function (d3, HTMLWidget, IInput) {
    function Radio() {
        HTMLWidget.call(this);
        IInput.call(this);

        this._tag = "div";
        this._inputElement = [];
    }
    Radio.prototype = Object.create(HTMLWidget.prototype);
    Radio.prototype.constructor = Radio;
    Radio.prototype._class += " form_Radio";
    Radio.prototype.implements(IInput.prototype);

    Radio.prototype.publish("selectOptions", [], "array", "Array of options used to fill a dropdown list");

    Radio.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);

        var context = this;

        var radioContainer = element.append("ul");
        if (!this.selectOptions().length) {
            this.selectOptions().push(""); // create an empty radio if we using .value and not selectOptions array
        }
        this.selectOptions().forEach(function(val, idx) {
            context._inputElement[idx] = radioContainer.append("li").append("input").attr("type", "radio");
            context._inputElement[idx].node().insertAdjacentHTML("afterend", "<text>" + val + "</text>");
        });

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

    Radio.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);

        var context = this;
        
        this._inputElement.forEach(function(e, idx) {
            e.property("value", context.selectOptions()[idx]);
            if (context.value().indexOf(context.selectOptions()[idx]) !== -1 && context.value() !== "false") {
                e.property("checked", true);
            } else {
                e.property("checked", false);
            }
        });
    };

    return Radio;
}));