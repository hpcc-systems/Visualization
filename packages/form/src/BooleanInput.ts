import { HTMLInput } from "./HTMLInput";

export class BooleanInput extends HTMLInput {
    constructor() {
        super();
    }
    enter(domNode, element) {
        super.enter(domNode, element);
        this._input.attr("type", "checkbox");

        // TODO refactor IInput to use _input and _inputs rather than the _inputElement array?
        this._inputElement = [this._input];
    }
    update(domNode, element) {
        super.update(domNode, element);

        this._span
            .style("line-height", (this.minHeight() + this.gutter()) + "px")
            ;
        this._input
            .style("float", this.float())
            ;

        this._inputElement.forEach((e, idx) => {
            e.attr("name", this.name());
            e.on("click", w => {
                w.click(w);
            });
            e.on("focus", w => {
            });
            e.on("blur", w => {
                w.blur(w);
            });
            e.on("change", w => {
                const vals = [];
                this._inputElement.forEach(function (d) {
                    if (d.property("checked")) {
                        vals.push(d.property("value"));
                    }
                });
                this.value(vals);
                w.change(w, true);
            });
        });
    }
}
BooleanInput.prototype._class += " form_BooleanInput";

export interface BooleanInput {
    float(): "left" | "right";
    float(_: "left" | "right"): this;
}
BooleanInput.prototype.publish("float", "right", "string", "Left/right placement of checkbox", ["left", "right"]);
