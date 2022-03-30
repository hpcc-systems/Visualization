import { Widget } from "@hpcc-js/common";

//  Use old school class declaration as this is a mixin  ---
export function IInput() {
}
IInput.prototype = Object.create(Widget.prototype);
IInput.prototype.constructor = IInput;

// abstract target(): any;
// abstract target(_: any): this;

//  Implementation  ---
IInput.prototype.isValid = function () {
    if (this.validate()) {
        const re = new RegExp(this.validate());
        if (!re.test(this.value())) {
            return false;
        }
    }
    return true;
};

IInput.prototype.hasValue = function () {
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
};

//  Events  ---
IInput.prototype.blur = function (_w) {
};
IInput.prototype.keyup = function (_w) {
};
IInput.prototype.focus = function (_w) {
};
IInput.prototype.click = function (_w) {
};
IInput.prototype.dblclick = function (_w) {
};
IInput.prototype.change = function (_w, complete: boolean) {
};

IInput.prototype.resetValue = function (w) {
    w.value(w._inputElement[0].node().value);
};

IInput.prototype.disable = function (disable) {
    this._inputElement.forEach(function (e, idx) {
        e.attr("disabled", disable ? "disabled" : null);
    });
};

IInput.prototype.setFocus = function () {
    if (this._inputElement.length) {
        this._inputElement[0].node().focus();
    }
};

export interface IInput {
    name: { (): string; (_: string): IInput };
    name_exists: () => boolean;
    label: { (): string; (_: string): IInput };
    label_exists: () => boolean;
    value: { (): any; (_: any): IInput };
    value_exists: () => boolean;
    validate: { (): string; (_: string): IInput };
    validate_exists: () => boolean;
}
IInput.prototype.publish("name", "", "string", "HTML name for the input");
IInput.prototype.publish("label", "", "string", "Descriptive label");
IInput.prototype.publish("value", "", "string", "Input Current Value");
IInput.prototype.publish("validate", null, "string", "Input Validation");
