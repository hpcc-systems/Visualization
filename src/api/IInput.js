"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["../common/Widget"], factory);
    } else {
        root.api_IInput = factory(root.common_Widget);
    }
}(this, function (Widget) {
    function IInput() {
        Widget.call(this);
    }
    IInput.prototype = Object.create(Widget.prototype);

    IInput.prototype.publish("name", "", "string", "HTML name for the input");
    IInput.prototype.publish("label", "", "string", "Descriptive label");
    IInput.prototype.publish("value", "", "string", "Input Current Value");
    IInput.prototype.publish("validate", null, "string", "Input Validation");

    //  Implementation  ---
    IInput.prototype.isValid = function () {
        if (this.validate()) {
            var re = new RegExp(this.validate());
            if (!re.test(this.value())) {
                return false;
            }
        }
        return true;
    };

    IInput.prototype.hasValue = function () {
        if (typeof this.type === "function") {
            switch (this.type()) {
                case "radio":
                    /* falls through */
                case "checkbox":
                    if (this.value() && this.value() !== "false") {
                        return true;
                    }
                    break;
                default:
                    if (this.value()) {
                        return true;
                    }
                    break;
            }
            return false;
        }
        return this.value() !== "";
    };

    //  Events  ---
    IInput.prototype.blur = function (w) {
    };
    IInput.prototype.click = function (w) {
    };
    IInput.prototype.change = function (w) {
    };

    IInput.prototype.resetValue = function (w) {
        w.value(w._inputElement[0].node().value);
    };

    IInput.prototype.disable = function (disable) {
        this._inputElement.forEach(function(e, idx) {
            e.attr("disabled", disable ? "disabled" : null);
        });
    };

    return IInput;
}));
