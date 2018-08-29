import { Palette } from "@hpcc-js/common";
import { hsl as d3Hsl } from "d3-color";

export function INDChart() {
}
INDChart.prototype._dataFamily = "ND";
INDChart.prototype._palette = Palette.ordinal("default");

INDChart.prototype.fillColor = function (row: any[], column: string, value: number): string {
    return this._palette(column);
};

INDChart.prototype.strokeColor = function (row: any[], column: string, value: number): string {
    return d3Hsl(this.fillColor(row, column, value)).darker().toString();
};

INDChart.prototype.textColor = function (row: any[], column: string, value: number): string {
    return Palette.textColor(this.fillColor(row, column, value));
};

//  Events  ---
INDChart.prototype.click = function (row, column, selected) {
    console.log("Click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
};

INDChart.prototype.dblclick = function (row, column, selected) {
    console.log("Double click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
};
