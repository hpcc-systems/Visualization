import { Material } from "./Material";

export function MaterialBar() {
    Material.call(this);

    this._chartType = "Bar";
    this._gType = "Bar";
    this._chartLibrary = "charts";
}
MaterialBar.prototype = Object.create(Material.prototype);
MaterialBar.prototype.constructor = MaterialBar;
MaterialBar.prototype._class += " google_MaterialBar";

MaterialBar.prototype.getChartOptions = function () {
    var retVal = Material.prototype.getChartOptions.apply(this, arguments);
    retVal.bars = "horizontal";
    return retVal;
};
