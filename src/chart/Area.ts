import { Scatter } from "./Scatter";

export class Area extends Scatter {
    constructor() {
        super();
        this
            .interpolate_default("linear")
            .interpolateFill_default(true)
            ;
    }
}
Area.prototype._class += " chart_Area";
