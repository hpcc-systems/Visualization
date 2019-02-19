import { IInput } from "@hpcc-js/api";
import { HTMLWidget } from "@hpcc-js/common";

import "../src/Input.css";

export class Radio extends HTMLWidget {
    _inputElement = [];
    constructor() {
        super();
        IInput.call(this);

        this._tag = "div";
    }

    enter(domNode, element) {
        super.enter(domNode, element);

        const context = this;

        const radioContainer = element.append("ul");
        if (!this.selectOptions().length) {
            this.selectOptions().push(""); // create an empty radio if we using .value and not selectOptions array
        }
        this.selectOptions().forEach(function (val, idx) {
            context._inputElement[idx] = radioContainer.append("li").append("input").attr("type", "radio");
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
                context.value([e.property("value")]);
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

    selectOptions: { (): any[]; (_: any[]): Radio };
    selectOptions_exists: () => boolean;

    //  IInput  ---
    name: { (): string; (_: string): Radio };
    name_exists: () => boolean;
    label: { (): string; (_: string): Radio };
    label_exists: () => boolean;
    value: { (): any; (_: any): Radio };
    value_exists: () => boolean;
    validate: { (): string; (_: string): Radio };
    validate_exists: () => boolean;
}
Radio.prototype._class += " form_Radio";
Radio.prototype.implements(IInput.prototype);

Radio.prototype.publish("selectOptions", [], "array", "Array of options used to fill a dropdown list");
