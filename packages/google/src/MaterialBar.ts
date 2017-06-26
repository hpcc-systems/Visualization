import { CommonND } from "./CommonND";

export class MaterialBar extends CommonND {
    constructor() {
        super();
        this._chartLibrary = "charts";
        this._chartPackage = "bar";
        this._chartType = "Bar";
    }

    getChartOptions() {
        const retVal: any = super.getChartOptions();
        retVal.bars = "horizontal";
        return retVal;
    }
}
MaterialBar.prototype._class += " google_MaterialBar";
