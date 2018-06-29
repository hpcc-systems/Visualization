import { IInput } from "@hpcc-js/api";
import { HTMLWidget } from "@hpcc-js/common";

import "../src/Input.css";

export class Button extends HTMLWidget {
    _inputElement = [];

    constructor() {
        super();
        IInput.call(this);

        this._tag = "div";
    }

    enter(domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        const context = this;
        this._inputElement[0] = element.append("button")
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

        this._inputElement[0].text(this.value());
    }
}
Button.prototype._class += " form_Button";
Button.prototype.implements(IInput.prototype);

export interface Button {
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
