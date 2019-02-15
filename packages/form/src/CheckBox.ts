import { IInput } from "@hpcc-js/api";
import { HTMLWidget } from "@hpcc-js/common";

import "../src/Input.css";

export class CheckBox extends HTMLWidget {
    _inputElement = [];

    constructor() {
        super();
        IInput.call(this);

        this._tag = "div";
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        const context = this;

        const checkboxContainer = element.append("ul");
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
                const vals = [];
                context._inputElement.forEach(function (d) {
                    if (d.property("checked")) {
                        vals.push(d.property("value"));
                    }
                });
                context.value(vals);
                w.change(w, true);
            });
        });
    }

    update(domNode, element) {
        super.update(domNode, element);

        const context = this;

        this._inputElement.forEach(function (e, idx) {
            e.property("value", context.selectOptions()[idx]);
            if (context.value().indexOf(context.selectOptions()[idx]) !== -1 && context.value() !== "false") {
                e.property("checked", true);
            } else {
                e.property("checked", false);
            }
        });
    }

    insertSelectOptions(optionsArr) {
        let optionHTML = "";
        if (optionsArr.length > 0) {
            optionsArr.forEach(function (opt) {
                const val = (opt instanceof Array ? opt[0] : opt);
                const text = (opt instanceof Array ? (opt[1] ? opt[1] : opt[0]) : opt);
                optionHTML += "<option value='" + val + "'>" + text + "</option>";
            });
        } else {
            optionHTML += "<option>selectOptions not set</option>";
        }
        this._inputElement[0].html(optionHTML);
    }

    selectOptions: { (): any[]; (_: any[]): CheckBox };
    selectOptions_exists: () => boolean;

    //  IInput  ---
    name: { (): string; (_: string): CheckBox };
    name_exists: () => boolean;
    label: { (): string; (_: string): CheckBox };
    label_exists: () => boolean;
    value: { (): any; (_: any): CheckBox };
    value_exists: () => boolean;
    validate: { (): string; (_: string): CheckBox };
    validate_exists: () => boolean;
}
CheckBox.prototype._class += " form_CheckBox";
CheckBox.prototype.implements(IInput.prototype);

CheckBox.prototype.publish("selectOptions", [], "array", "Array of options used to fill a dropdown list");
