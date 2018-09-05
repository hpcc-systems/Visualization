import { Palette } from "@hpcc-js/common";
import { hsl as d3Hsl } from "d3-color";

export function I2DAggrChart() {
}
I2DAggrChart.prototype._palette = Palette.rainbow("default");
Palette.appendRainbowColors(I2DAggrChart);

I2DAggrChart.prototype.fillColor = function (row: any[][], column, value): string {
    return this._palette(row.length);
};

I2DAggrChart.prototype.strokeColor = function (row: any[][], column, value): string {
    return d3Hsl(this.fillColor(row, column, value)).darker().toString();
};

I2DAggrChart.prototype.textColor = function (row: any[][], column, value): string {
    return Palette.textColor(this.fillColor(row, column, value));
};

//  Events  ---
I2DAggrChart.prototype.click = function (row: object[], column, selected) {
    console.log("Click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
};

I2DAggrChart.prototype.dblclick = function (row: object[], column, selected) {
    console.log("Double click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
};
