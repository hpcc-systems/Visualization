import * as Palette from "../common/Palette";

export function I1DChart() {
}
I1DChart.prototype._palette = Palette.rainbow("default");

//  Events  ---
I1DChart.prototype.click = function (row, column, selected) {
    console.log("Click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
};

I1DChart.prototype.dblclick = function (row, column, selected) {
    console.log("Double click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
};
