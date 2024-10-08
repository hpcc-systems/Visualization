import { Bar } from "./Bar.ts";

export class Gantt extends Bar {
    constructor() {
        super();

        this
            .orientation_default("vertical")
            .xAxisType_default("ordinal")
            .yAxisType_default("time")
            ;
    }
}
Gantt.prototype._class += " chart_Gantt";
