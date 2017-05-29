import { Palette } from "@hpcc-js/common";

export function INDChart() {
}
INDChart.prototype._palette = Palette.ordinal("default");

//  Events  ---
INDChart.prototype.click = function (row, column, selected) {
    console.log("Click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
};

INDChart.prototype.dblclick = function (row, column, selected) {
    console.log("Double click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
};
