import { CommonND } from "./CommonND";

export function Scatter(target) {
    CommonND.call(this);

    this._type = "scatter";
}
Scatter.prototype = Object.create(CommonND.prototype);
Scatter.prototype.constructor = Scatter;
Scatter.prototype._class += " c3chart_Scatter";
