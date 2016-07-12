"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "../api/IInput", "css!./Input"], factory);
    } else {
        root.form_Select = factory(root.d3, root.common_HTMLWidget, root.api_IInput);
    }
}(this, function (d3, HTMLWidget, IInput) {
    function Select() {
        HTMLWidget.call(this);
        IInput.call(this);

        this._tag = "div";
        this._inputElement = [];
    }
    Select.prototype = Object.create(HTMLWidget.prototype);
    Select.prototype.constructor = Select;
    Select.prototype._class += " form_Select";
    Select.prototype.implements(IInput.prototype);

    Select.prototype.publish("selectOptions", [], "array", "Array of options used to fill a dropdown list");
    Select.prototype.publish("maxWidth", 120, "number", "Width", null, { optional: true });

    Select.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);

        var context = this;

        this._inputElement[0] = element.append("select")
            .attr("name", this.name())
            .on("click", function (w) {
                w.click(w);
            })
            .on("blur", function (w) {
                w.blur(w);
            })
            .on("change", function (w) {
                context.value([context._inputElement[0].property("value")]);
                w.change(w);
            })
        ;
    };

    Select.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);

        this.insertSelectOptions(this.selectOptions());
        this._inputElement[0]
            .property("value", this.value())
            .style("max-width", this.maxWidth_exists() ? this.maxWidth() + "px" : null)
        ;
    };


    Select.prototype.insertSelectOptions = function (optionsArr) {
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

    return Select;
}));