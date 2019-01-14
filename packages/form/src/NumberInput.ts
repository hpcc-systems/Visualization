import { StringInput } from "./StringInput";

export class NumberInput extends StringInput {
    constructor() {
        super();
    }
    enter(domNode, element) {
        super.enter(domNode, element);
        this._input.attr("type", "number");

        // TODO refactor IInput to use _input and _inputs rather than the _inputElement array?
        this._inputElement = [this._input];
    }
    update(domNode, element) {
        super.update(domNode, element);
        this._input
            .attr("type", "number")
            .attr("min", this.min())
            .attr("max", this.max_exists() ? this.max() : null)
            .attr("step", this.step())
            ;
    }
}
NumberInput.prototype._class += " form_NumberInput";

export interface NumberInput {
    min(): number;
    min(_: number): this;
    max(): number;
    max(_: number): this;
    max_exists(): boolean;
    step(): number;
    step(_: number): this;
}
NumberInput.prototype.publish("min", 0, "number", "Minimum number for this input");
NumberInput.prototype.publish("max", null, "number", "Maximum number for this input", null, {optional: true});
NumberInput.prototype.publish("step", 1, "boolean", "Increment between available number values");
