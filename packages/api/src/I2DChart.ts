import { Palette } from "@hpcc-js/common";
import { hsl as d3Hsl } from "d3-color";

export function I2DChart() {
}
I2DChart.prototype._palette = Palette.ordinal("default");

I2DChart.prototype.fillColor = function (row, column, value): string {
    return this._palette(row[0]);
};

I2DChart.prototype.strokeColor = function (row, column, value): string {
    return d3Hsl(this.fillColor(row, column, value)).darker().toString();
};

I2DChart.prototype.textColor = function (row, column, value): string {
    return Palette.textColor(this.fillColor(row, column, value));
};

//  Events  ---
I2DChart.prototype.click = function (row, column, selected) {
    console.log("Click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
};

I2DChart.prototype.dblclick = function (row, column, selected) {
    console.log("Double click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
};
