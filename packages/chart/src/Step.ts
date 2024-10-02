import { Scatter } from "./Scatter.ts";

export class Step extends Scatter {
    constructor() {
        super();

        this
            .interpolate_default("step")
            ;
    }
}
Step.prototype._class += " chart_Step";
