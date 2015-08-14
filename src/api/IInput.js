/**
 * @file Form Input Interface
 * @author HPCC Systems
 */

"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["../common/Widget"], factory);
    } else {
        root.api_IInput = factory(root.common_Widget);
    }
}(this, function (Widget) {
    /**
     * @interface api_IInput
     * @class api_IInput
     */
    function IInput() {
        Widget.call(this);
    }
    IInput.prototype = Object.create(Widget.prototype);

    IInput.prototype.publish("name", "", "string", "HTML name for the input");
    IInput.prototype.publish("label", "", "string", "Descriptive label");
    IInput.prototype.publish("value", "", "string", "Input type");
    IInput.prototype.publish("validate", null, "string", "Input Validation");

    /**
     * Tests if an input is valid via regex
     * @method isValid
     * @memberof api_IInput
     * @instance
     * @returns {Widget}
     */
    IInput.prototype.isValid = function () {
        if (this.validate()) {
            var re = new RegExp(this.validate());
            if (!re.test(this.value())) {
                return false;
            }
        }
        return true;
    };

    //  Events  ---
    IInput.prototype.blur = function (w) {
    };
    IInput.prototype.click = function (w) {
    };
    IInput.prototype.change = function (w) {
    };

    /**
     * Populates Data and Columns with test data. (empty testData function)
     * @method testData
     * @memberof api_IInput
     * @instance
     * @returns {Widget}
     */
    IInput.prototype.testData = function () {
        return this;
    };

    return IInput;
}));
