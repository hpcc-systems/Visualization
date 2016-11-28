import { HTMLWidget } from "../common/HTMLWidget";
import { IInput } from "../api/IInput";
import "css!./Input";

export function CheckBox() {
    HTMLWidget.call(this);
    IInput.call(this);

    this._tag = "div";
    this._inputElement = [];
}
CheckBox.prototype = Object.create(HTMLWidget.prototype);
CheckBox.prototype.constructor = CheckBox;
CheckBox.prototype._class += " form_CheckBox";
CheckBox.prototype.implements(IInput.prototype);

CheckBox.prototype.publish("selectOptions", [], "array", "Array of options used to fill a dropdown list");

CheckBox.prototype.enter = function (domNode, element) {
    HTMLWidget.prototype.enter.apply(this, arguments);
    var context = this;

    var checkboxContainer = element.append("ul");
    if (!this.selectOptions().length) {
        this.selectOptions().push(""); // create an empty radio if we using .value and not selectOptions array
    }
    this.selectOptions().forEach(function (val, idx) {
        context._inputElement[idx] = checkboxContainer.append("li").append("input").attr("type", "checkbox");
        context._inputElement[idx].node().insertAdjacentHTML("afterend", "<text>" + val + "</text>");
    });

    this._inputElement.forEach(function (e, idx) {
        e.attr("name", context.name());
        e.on("click", function (w) {
            w.click(w);
        });
        e.on("blur", function (w) {
            w.blur(w);
        });
        e.on("change", function (w) {
            var vals = [];
            context._inputElement.forEach(function (d, idx) {
                if (d.property("checked")) {
                    vals.push(d.property("value"));
                }
            });
            context.value(vals);
            w.change(w);
        });
    });
};

CheckBox.prototype.update = function (domNode, element) {
    HTMLWidget.prototype.update.apply(this, arguments);

    var context = this;

    this._inputElement.forEach(function (e, idx) {
        e.property("value", context.selectOptions()[idx]);
        if (context.value().indexOf(context.selectOptions()[idx]) !== -1 && context.value() !== "false") {
            e.property("checked", true);
        } else {
            e.property("checked", false);
        }
    });
};

CheckBox.prototype.insertSelectOptions = function (optionsArr) {
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
