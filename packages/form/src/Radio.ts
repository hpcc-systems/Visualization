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
        HTMLWidget.prototype.enter.apply(this, arguments);

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
        HTMLWidget.prototype.update.apply(this, arguments);

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
}
Radio.prototype._class += " form_Radio";
Radio.prototype.implements(IInput.prototype);

export interface Radio {
    name(): string;
    name(_: string): this;
    label(): string;
    label(_: string): this;
    value(): any;
    value(_: any): this;
    validate(): string;
    validate(_: string): this;
    inlineLabel(): string;
    inlineLabel(_: string): this;
    selectOptions(): any[];
    selectOptions(_: any[]): this;

    name_exists(): boolean;
    label_exists(): boolean;
    value_exists(): boolean;
    validate_exists(): boolean;
    inlineLabel_exists(): boolean;
    selectOptions_exists(): boolean;
}

Radio.prototype.publish("type", "text", "set", "InputRange type", ["number", "date", "text", "time", "datetime", "hidden"]);
Radio.prototype.publish("inlineLabel", null, "string", "InputRange Label", null, { optional: true });

Radio.prototype.publish("selectOptions", [], "array", "Array of options used to fill a dropdown list");
