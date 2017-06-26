import { Column } from "./Column";

export class Bar extends Column {
    constructor() {
        super();
        this._tag = "div";
        this._gType = "column";

        this.orientation("vertical");
    }
}
Bar.prototype._class += " amchart_Bar";
