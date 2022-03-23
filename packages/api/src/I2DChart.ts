import { Palette } from "@hpcc-js/common";
import { hsl as d3Hsl } from "d3-color";

export function I2DChart() {
}
I2DChart.prototype._dataFamily = "2D";
I2DChart.prototype._palette = Palette.ordinal("default");

I2DChart.prototype.fillColor = function (row: any[], column, value, origRow): string {
    return this._palette(row[0]);
};

I2DChart.prototype.strokeColor = function (row: any[], column, value, origRow): string {
    return d3Hsl(this.fillColor(row, column, value, origRow)).darker().toString();
};

I2DChart.prototype.textColor = function (row: any[], column, value, origRow): string {
    return Palette.textColor(this.fillColor(row, column, value, origRow));
};

//  Events  ---
I2DChart.prototype.click = function (row: object, column, selected) {
};

I2DChart.prototype.dblclick = function (row: object, column, selected) {
};
