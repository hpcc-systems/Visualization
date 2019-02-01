import { Palette } from "@hpcc-js/common";

export function I1DChart() {
}
I1DChart.prototype._dataFamily = "1D";
I1DChart.prototype._palette = Palette.rainbow("default");
Palette.appendRainbowColors(I1DChart);

//  Events  ---
I1DChart.prototype.click = function (row, column, selected) {
    console.log("Click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
};

I1DChart.prototype.dblclick = function (row, column, selected) {
    console.log("Double click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
};
