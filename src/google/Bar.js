import { Column } from "./Column";

export function Bar() {
    Column.call(this);

    this._chartType = "BarChart";
}
Bar.prototype = Object.create(Column.prototype);
Bar.prototype.constructor = Bar;
Bar.prototype._class += " google_Bar";
