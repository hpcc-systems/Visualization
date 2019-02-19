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
        super.enter(domNode, element);
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
        super.update(domNode, element);

        this._inputElement[0].text(this.value());
    }

    //  IInput  ---
    name: { (): string; (_: string): Button };
    name_exists: () => boolean;
    label: { (): string; (_: string): Button };
    label_exists: () => boolean;
    value: { (): any; (_: any): Button };
    value_exists: () => boolean;
    validate: { (): string; (_: string): Button };
    validate_exists: () => boolean;
}
Button.prototype._class += " form_Button";
Button.prototype.implements(IInput.prototype);
