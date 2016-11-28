import { Bar } from "./Bar";

export function Gantt(target) {
    Bar.call(this);

    this
        .orientation_default("vertical")
        .xAxisType_default("ordinal")
        .yAxisType_default("time")
        ;
}
Gantt.prototype = Object.create(Bar.prototype);
Gantt.prototype.constructor = Gantt;
Gantt.prototype._class += " chart_Gantt";
