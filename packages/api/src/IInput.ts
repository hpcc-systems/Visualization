import { Widget } from "@hpcc-js/common";

export abstract class IInput extends Widget {
    _inputElement;

    constructor() {
        super();
    }

    abstract target(): any;
    abstract target(_: any): this;

    //  Implementation  ---
    isValid() {
        if (this.validate()) {
            const re = new RegExp(this.validate());
            if (!re.test(this.value())) {
                return false;
            }
        }
        return true;
    }

    hasValue() {
        if (typeof (this as any).type === "function") {
            switch ((this as any).type()) {
                case "radio":
                /* falls through */
                case "checkbox":
                    if (this.value() && this.value() !== "false") {
                        return true;
                    }
                    break;
                default:
                    if (this.value()) {
                        return true;
                    }
                    break;
            }
            return false;
        }
        return this.value() !== "";
    }

    //  Events  ---
    blur(_w) {
    }
    click(_w) {
    }
    dblclick(_w) {
    }
    change(_w) {
    }

    resetValue(w) {
        w.value(w._inputElement[0].node().value);
    }

    disable(disable) {
        this._inputElement.forEach(function (e, idx) {
            e.attr("disabled", disable ? "disabled" : null);
        });
    }

    setFocus() {
        if (this._inputElement.length) {
            this._inputElement[0].node().focus();
        }
    }

    name_exists: () => boolean;
    label_exists: () => boolean;
    value_exists: () => boolean;
    validate_exists: () => boolean;
}

export interface IInput {
    name(): string;
    name(_: string): this;
    label(): string;
    label(_: string): this;
    value(): string;
    value(_: string): this;
    validate(): string;
    validate(_: string): this;
}
IInput.prototype.publish("name", "", "string", "HTML name for the input");
IInput.prototype.publish("label", "", "string", "Descriptive label");
IInput.prototype.publish("value", "", "string", "Input Current Value");
IInput.prototype.publish("validate", null, "string", "Input Validation");
