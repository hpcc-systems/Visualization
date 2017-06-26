import { Column } from "./Column";

export class Bar extends Column {
    constructor() {
        super();

        this._config.axis.rotated = true;
    }
}
Bar.prototype._class += " c3chart_Bar";
