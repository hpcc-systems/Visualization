import { CommonND } from "./CommonND";

export class Step extends CommonND {
    constructor() {
        super();

        this._type = "step";
    }
}
Step.prototype._class += " c3chart_Step";
