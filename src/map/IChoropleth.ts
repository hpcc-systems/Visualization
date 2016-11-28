import * as Palette from "../common/Palette";
export function IChoropleth() {
}
IChoropleth.prototype._palette = Palette.rainbow("default");

//  Events  ---
IChoropleth.prototype.click = function (row, column, selected) {
    console.log("Click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
};
