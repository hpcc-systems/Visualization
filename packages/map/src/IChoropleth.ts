import { Palette } from "@hpcc-js/common";
export function IChoropleth() {
}
IChoropleth.prototype._palette = Palette.rainbow("default");
Palette.appendRainbowColors(IChoropleth);

//  Events  ---
IChoropleth.prototype.click = function (row, column, selected) {
    console.log("Click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
};
