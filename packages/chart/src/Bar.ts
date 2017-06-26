import { Column } from "./Column";

export class Bar extends Column {
    constructor() {
        super();
        this
            .orientation_default("vertical")
            ;
    }
}
Bar.prototype._class += " chart_Bar";
