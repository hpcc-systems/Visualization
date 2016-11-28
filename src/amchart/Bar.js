import { Column } from "./Column";

export function Bar() {
    Column.call(this);
    this._tag = "div";
    this._gType = "column";

    this.orientation("vertical");
}
Bar.prototype = Object.create(Column.prototype);
Bar.prototype.constructor = Bar;
Bar.prototype._class += " amchart_Bar";
