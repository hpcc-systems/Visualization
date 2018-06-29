import { IInput } from "@hpcc-js/api";
import { HTMLWidget } from "@hpcc-js/common";

import "../src/Input.css";

export class Input extends HTMLWidget {
    _inputElement = [];
    _labelElement = [];

    constructor() {
        super();
        IInput.call(this);

        this._tag = "div";
    }

    checked(_) {
        if (!arguments.length) return this._inputElement[0] ? this._inputElement[0].property("checked") : false;
        if (this._inputElement[0]) {
            this._inputElement[0].property("checked", _);
        }
        return this;
    }

    enter(domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);

        this._labelElement[0] = element.append("label")
            .attr("for", this.id() + "_input")
            .style("visibility", this.inlineLabel_exists() ? "visible" : "hidden")
            ;

        const context = this;
        switch (this.type()) {
            case "button":
                this._inputElement[0] = element.append("button")
                    .attr("id", this.id() + "_input")
                    ;
                break;
            case "textarea":
                this._inputElement[0] = element.append("textarea")
                    .attr("id", this.id() + "_input")
                    ;
                break;
            default:
                this._inputElement[0] = element.append("input")
                    .attr("id", this.id() + "_input")
                    .attr("type", this.type())
                    ;
                break;
        }

        this._inputElement.forEach(function (e, idx) {
            e.attr("name", context.name());
            e.on("click", function (w: Input) {
                w.click(w);
            });
            e.on("blur", function (w: Input) {
                w.blur(w);
            });
            e.on("change", function (w: Input) {
                context.value([e.property("value")]);
                w.change(w, true);
            });
            e.on("keyup", function (w: Input) {
                context.value([e.property("value")]);
                w.change(w, false);
            });
        });
    }

    update(domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);

        this._labelElement[0]
            .style("visibility", this.inlineLabel_exists() ? "visible" : "hidden")
            .text(this.inlineLabel())
            ;
        switch (this.type()) {
            case "button":
                this._inputElement[0].text(this.value());
                break;
            case "textarea":
                this._inputElement[0].property("value", this.value());
                break;
            default:
                this._inputElement[0].attr("type", this.type());
                this._inputElement[0].property("value", this.value());
                break;
        }
    }

    //  IInput Events ---
    blur: (w: Input) => void;
    click: (w: Input) => void;
    dblclick: (w: Input) => void;
    change: (w: Input, complete: boolean) => void;
}
Input.prototype._class += " form_Input";
Input.prototype.implements(IInput.prototype);

export interface Input {
    name(): string;
    name(_: string): this;
    type(): string;
    type(_: string): this;
    label(): string;
    label(_: string): this;
    value(): any;
    value(_: any): this;
    validate(): string;
    validate(_: string): this;
    inlineLabel(): string;
    inlineLabel(_: string): this;

    name_exists(): boolean;
    type_exists(): boolean;
    label_exists(): boolean;
    value_exists(): boolean;
    validate_exists(): boolean;
    inlineLabel_exists(): boolean;

    type_default(): string;
    type_default(_: string): this;
}

Input.prototype.publish("type", "text", "set", "Input type", ["number", "button", "checkbox", "date", "text", "textarea", "search", "email", "time", "datetime", "hidden"]);
Input.prototype.publish("inlineLabel", null, "string", "Input Label", null, { optional: true });
