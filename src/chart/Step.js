import { Scatter } from "./Scatter";

export function Step(target) {
    Scatter.call(this);

    this
        .interpolate_default("step")
        ;
}
Step.prototype = Object.create(Scatter.prototype);
Step.prototype.constructor = Step;
Step.prototype._class += " chart_Step";
