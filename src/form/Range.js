"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "../api/IInput", "css!./Input.css"], factory);
    } else {
        root.form_Range = factory(root.d3, root.common_HTMLWidget, root.api_IInput);
    }
}(this, function (d3, HTMLWidget, IInput) {
    function Range() {
        HTMLWidget.call(this);
        IInput.call(this);

        this._tag = "div";
        this._inputElement = [];
    }
    Range.prototype = Object.create(HTMLWidget.prototype);
    Range.prototype.constructor = Range;
    Range.prototype._class += " form_Range";
    Range.prototype.implements(IInput.prototype);

    Range.prototype.publish("type", "text", "set", "Input type", ["html-color", "number", "checkbox", "button", "select", "textarea", "date", "text", "range", "search", "email", "time", "datetime"]);
    Range.prototype.publish("selectOptions", [], "array", "Array of options used to fill a dropdown list");
    Range.prototype.publish("low", null, "number", "Minimum value for Range input");
    Range.prototype.publish("high", null, "number", "Maximum value for Range input");
    Range.prototype.publish("step", null, "number", "Step value for Range input");

    Range.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        
        var context = this;

        this._inputElement[0] = element.append("input").attr("type", "range");
        this._inputElement[1] = element.append("input").attr("type", "number");

        this._inputElement.forEach(function(e, idx) {
            e.attr("name", context.name());
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

    Range.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);

        this._inputElement[0].attr("type", "range");
        this._inputElement[0].property("value", this.value());
        this._inputElement[0].attr("min", this.low());
        this._inputElement[0].attr("max", this.high());
        this._inputElement[0].attr("step", this.step());
        this._inputElement[1].attr("type", "number");
        this._inputElement[1].property("value", this.value());
        this._inputElement[1].attr("min", this.low());
        this._inputElement[1].attr("max", this.high());
        this._inputElement[1].attr("step", this.step());
    };

    Range.prototype.insertSelectOptions = function (optionsArr) {
        var optionHTML = "";
        if (optionsArr.length > 0) {
            optionsArr.forEach(function (opt) {
                var val = (opt instanceof Array ? opt[0] : opt);
                var text = (opt instanceof Array ? (opt[1] ? opt[1] : opt[0]) : opt);
                optionHTML += "<option value='" + val + "'>" + text + "</option>";
            });
        } else {
            optionHTML += "<option>selectOptions not set</option>";
        }
        this._inputElement[0].html(optionHTML);
    };

    return Range;
}));