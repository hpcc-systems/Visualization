import { Column } from "./Column";

export function Bar(target) {
    Column.call(this);
    this
        .orientation_default("vertical")
        ;
}
Bar.prototype = Object.create(Column.prototype);
Bar.prototype.constructor = Bar;
Bar.prototype._class += " chart_Bar";
