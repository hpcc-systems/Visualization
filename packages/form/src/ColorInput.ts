import { IInput } from "@hpcc-js/api";
import { HTMLWidget } from "@hpcc-js/common";
import { rgb as d3Rgb } from "d3-color";

import "../src/Input.css";

export class ColorInput extends HTMLWidget {
    _inputElement = [];

    constructor() {
        super();
        IInput.call(this);

        this._tag = "div";
    }

    enter(domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);

        const context = this;

        this._inputElement[0] = element.append("input").attr("type", "text");
        this._inputElement[0].classed("color-text", true);
        this._inputElement[1] = element.append("input").attr("type", "color");

        this._inputElement.forEach(function (e, idx) {
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
                w.change(w, true);
            });
        });
    }

    update(domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);

        const context = this;
        this._inputElement.forEach(function (e) {
            e.attr("name", context.name());
        });

        this._inputElement[0].attr("type", "text");
        this._inputElement[1].attr("type", "color");
        this._inputElement[0].property("value", this.value());
        this._inputElement[1].property("value", d3Rgb(this.value()).toString());

        const bbox = this._inputElement[0].node().getBoundingClientRect();
        this._inputElement[1].style("height", (bbox.height - 2) + "px");

    }
}
ColorInput.prototype._class += " form_ColorInput";
ColorInput.prototype.implements(IInput.prototype);

export interface ColorInput {
    name(): string;
    name(_: string): this;
    label(): string;
    label(_: string): this;
    value(): any;
    value(_: any): this;
    validate(): string;
    validate(_: string): this;

    name_exists(): boolean;
    label_exists(): boolean;
    value_exists(): boolean;
    validate_exists(): boolean;
}
