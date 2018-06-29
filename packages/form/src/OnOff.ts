import { IInput } from "@hpcc-js/api";
import { HTMLWidget } from "@hpcc-js/common";

import "../src/OnOff.css";

export class OnOff extends HTMLWidget {
    _inputElement = [];
    _input;

    constructor() {
        super();
        IInput.call(this);

        this._tag = "div";
    }

    enter(domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        element.classed("onoffswitch", true);
        const context = this;
        this._input = element.append("input")
            .attr("class", "onoffswitch-checkbox")
            .attr("type", "checkbox")
            .attr("id", this.id() + "_onOff")
            .on("click", function (w) {
                w.click(w);
            })
            .on("blur", function (w) {
                w.blur(w);
            })
            .on("change", function (w) {
                const vals = [];
                context._inputElement.forEach(function (d, idx) {
                    if (d.property("checked")) {
                        vals.push(d.property("value"));
                    }
                });
                context.value(vals);
                w.change(w, true);
            })
            ;
        const label = element.append("label")
            .attr("class", "onoffswitch-label")
            .attr("for", this.id() + "_onOff")
            ;
        label.append("span")
            .attr("class", "onoffswitch-inner")
            ;
        label.append("span")
            .attr("class", "onoffswitch-switch")
            ;
    }

    update(domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        this._input
            .attr("name", this.name())
            ;
    }
}
OnOff.prototype._class += " form_OnOff";
OnOff.prototype.implements(IInput.prototype);

export interface OnOff {
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

    name_exists(): boolean;
    label_exists(): boolean;
    value_exists(): boolean;
    validate_exists(): boolean;
    inlineLabel_exists(): boolean;
}

OnOff.prototype.publish("type", "text", "set", "InputRange type", ["number", "date", "text", "time", "datetime", "hidden"]);
OnOff.prototype.publish("inlineLabel", null, "string", "InputRange Label", null, { optional: true });
