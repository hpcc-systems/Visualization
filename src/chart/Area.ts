import { Scatter } from "./Scatter";

export function Area(target) {
    Scatter.call(this);
    this
        .interpolate_default("linear")
        .interpolateFill_default(true)
        ;
}
Area.prototype = Object.create(Scatter.prototype);
Area.prototype.constructor = Area;
Area.prototype._class += " chart_Area";
