import { Palette } from "@hpcc-js/common";

export function I2DChart() {
}
I2DChart.prototype._palette = Palette.ordinal("default");

//  Events  ---
I2DChart.prototype.click = function (row, column, selected) {
    console.log("Click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
};

I2DChart.prototype.dblclick = function (row, column, selected) {
    console.log("Double click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
};
