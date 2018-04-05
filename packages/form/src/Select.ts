import { IInput } from "@hpcc-js/api";
import { HTMLWidget } from "@hpcc-js/common";

import "../src/Input.css";

export class Select extends HTMLWidget {
    _inputElement = [];

    constructor() {
        super();

        IInput.call(this);

        this._tag = "div";
    }

    enter(domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);

        const context = this;

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
                w.change(w, true);
            })
            ;
    }

    update(domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);

        this.insertSelectOptions(this.selectOptions());
        this._inputElement[0]
            .property("value", this.value())
            .style("max-width", this.maxWidth_exists() ? this.maxWidth() + "px" : null)
            ;
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

    selectOptions: { (): any[]; (_: any[]): Select };
    selectOptions_exists: () => boolean;
    maxWidth: { (): number; (_: number): Select };
    maxWidth_exists: () => boolean;

    //  IInput  ---
    name: { (): string; (_: string): Select };
    name_exists: () => boolean;
    label: { (): string; (_: string): Select };
    label_exists: () => boolean;
    value: { (): any; (_: any): Select };
    value_exists: () => boolean;
    validate: { (): string; (_: string): Select };
    validate_exists: () => boolean;
}
Select.prototype._class += " form_Select";
Select.prototype.implements(IInput.prototype);

Select.prototype.publish("selectOptions", [], "array", "Array of options used to fill a dropdown list");
Select.prototype.publish("maxWidth", 120, "number", "Width", null, { optional: true });
