import { IInput } from "@hpcc-js/api";
import { HTMLWidget } from "@hpcc-js/common";
import { rgb as d3Rgb } from "d3-color";

import "../src/Input.css";

export class Range extends HTMLWidget {
    _inputElement = [];

    constructor() {
        super();

        IInput.call(this);

        this._tag = "div";
    }

    enter(domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);

        const context = this;

        this._inputElement[0] = element.append("input").attr("type", "range");
        this._inputElement[1] = element.append("input").attr("type", "number");

        this._inputElement.forEach(function (e, idx) {
            e.attr("name", context.name());
            e.on("click", function (w) {
                w.click(w);
            });
            e.on("blur", function (w) {
                w.blur(w);
            });
            e.on("change", function (w) {
                if (idx === 0) {
                    context._inputElement[1].property("value", d3Rgb(context._inputElement[0].property("value")).toString());
                    context.value(context._inputElement[0].property("value"));
                } else {
                    context._inputElement[0].property("value", context._inputElement[1].property("value"));
                    context.value(d3Rgb(context._inputElement[1].property("value")).toString());
                }
                w.change(w);
            });
        });
    }

    update(domNode, element) {
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

    type: { (): string; (_: string): Range };
    type_exists: () => boolean;
    selectOptions: { (): any[]; (_: any[]): Range };
    selectOptions_exists: () => boolean;
    low: { (): number; (_: number): Range };
    low_exists: () => boolean;
    high: { (): number; (_: number): Range };
    high_exists: () => boolean;
    step: { (): number; (_: number): Range };
    step_exists: () => boolean;

    //  IInput  ---
    name: { (): string; (_: string): Range };
    name_exists: () => boolean;
    label: { (): string; (_: string): Range };
    label_exists: () => boolean;
    value: { (): any; (_: any): Range };
    value_exists: () => boolean;
    validate: { (): string; (_: string): Range };
    validate_exists: () => boolean;
}
Range.prototype._class += " form_Range";
Range.prototype.implements(IInput.prototype);

Range.prototype.publish("type", "text", "set", "Input type", ["html-color", "number", "checkbox", "button", "select", "textarea", "date", "text", "range", "search", "email", "time", "datetime"]);
Range.prototype.publish("selectOptions", [], "array", "Array of options used to fill a dropdown list");
Range.prototype.publish("low", null, "number", "Minimum value for Range input");
Range.prototype.publish("high", null, "number", "Maximum value for Range input");
Range.prototype.publish("step", null, "number", "Step value for Range input");
