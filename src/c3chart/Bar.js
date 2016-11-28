import { Column } from "./Column";

export function Bar(target) {
    Column.call(this);

    this._config.axis.rotated = true;
}
Bar.prototype = Object.create(Column.prototype);
Bar.prototype.constructor = Bar;
Bar.prototype._class += " c3chart_Bar";
