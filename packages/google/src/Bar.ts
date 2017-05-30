import { Column } from "./Column";

export class Bar extends Column {
    constructor() {
        super();

        this._chartType = "BarChart";
    }
}
Bar.prototype._class += " google_Bar";
