"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["../common/HTMLWidget", "../api/IInput", "css!./Input"], factory);
    } else {
        root.form_Input = factory(root.common_HTMLWidget, root.api_IInput);
    }
}(this, function (HTMLWidget, IInput) {

    function InputRange() {
        HTMLWidget.call(this);
        IInput.call(this);

        this._tag = "div";
        this._inputElement = [];
        this._labelElement = [];
        this._rangeData = [];
    }
    InputRange.prototype = Object.create(HTMLWidget.prototype);
    InputRange.prototype.constructor = InputRange;
    InputRange.prototype._class += " form_InputRange";
    InputRange.prototype.implements(IInput.prototype);

    InputRange.prototype.publish("type", "text", "set", "InputRange type", ["number", "date", "text", "time", "datetime", "hidden"]);
    InputRange.prototype.publish("inlineLabel", null, "string", "InputRange Label", null, { optional: true });
    InputRange.prototype.publish("value", ["", ""], "array", "Input Current Value", null, { override: true });

    InputRange.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);

        this._labelElement[0] = element.append("label")
            .attr("for", this.id() + "_input")
            .style("visibility", this.inlineLabel_exists() ? "visible" : "hidden")
        ;

        this._inputElement.push(element.append("input")
            .attr("id", this.id() + "_input_min")
            .attr("type", this.type()));
        this._inputElement.push(element.append("input")
            .attr("id", this.id() + "_input_max")
            .attr("type", this.type()));

        var context = this;
        this._inputElement.forEach(function (e, idx) {
            e.attr("name", context.name());
            e.on("click", function (w) {
                w.click(w);
            });
            e.on("blur", function (w) {
                w.blur(w);
            });
            e.on("change", function (w) {
                context._rangeData[idx] = e.property("value");
                context.value(context._rangeData);
                w.change(w);
            });
        });
    };

    InputRange.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);

        this._labelElement[0]
            .style("visibility", this.inlineLabel_exists() ? "visible" : "hidden")
            .text(this.inlineLabel())
        ;

        this._rangeData = this.value();
        this._inputElement.forEach(function (e, idx) {
            e
                .attr("type", this.type())
                .property("value", this._rangeData.length > idx ? this._rangeData[idx] : "");
        }, this);
    };

    return InputRange;
}));

