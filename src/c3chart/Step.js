import { CommonND } from "./CommonND";

export function Step(target) {
    CommonND.call(this);

    this._type = "step";
}
Step.prototype = Object.create(CommonND.prototype);
Step.prototype.constructor = Step;
Step.prototype._class += " c3chart_Step";
