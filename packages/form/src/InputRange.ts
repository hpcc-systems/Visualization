import { IInput } from "@hpcc-js/api";
import { HTMLWidget } from "@hpcc-js/common";

import "../src/Input.css";

export class InputRange extends HTMLWidget {
    _inputElement = [];
    _labelElement = [];
    _rangeData = [];

    constructor() {
        super();
        IInput.call(this);

        this._tag = "div";
    }

    enter(domNode, element) {
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

        const context = this;
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
    }

    update(domNode, element) {
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
    }

    type_exists: () => boolean;
    inlineLabel_exists: () => boolean;
    value_exists: () => boolean;

    //  IInput  ---
    name: { (): string; (_: string): InputRange };
    name_exists: () => boolean;
    label: { (): string; (_: string): InputRange };
    label_exists: () => boolean;
    validate: { (): string; (_: string): InputRange };
    validate_exists: () => boolean;
}
InputRange.prototype._class += " form_InputRange";
InputRange.prototype.implements(IInput.prototype);

export interface InputRange {
    type(): string;
    type(_: string): this;
    inlineLabel(): string;
    inlineLabel(_: string): this;
    value(): any[];
    value(_: any[]): this;
}
InputRange.prototype.publish("type", "text", "set", "InputRange type", ["number", "date", "text", "time", "datetime", "hidden"]);
InputRange.prototype.publish("inlineLabel", null, "string", "InputRange Label", null, { optional: true });
InputRange.prototype.publish("value", ["", ""], "array", "Input Current Value", null, { override: true });
