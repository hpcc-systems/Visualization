import { CommonND } from "./CommonND";

export class Scatter extends CommonND {
    constructor() {
        super();

        this._type = "scatter";
    }
}
Scatter.prototype._class += " c3chart_Scatter";
