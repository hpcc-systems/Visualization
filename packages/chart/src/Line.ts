import { Scatter } from "./Scatter";

import "../src/Line.css";

export class Line extends Scatter {
    constructor() {
        super();

        this
            .interpolate_default("linear")
            ;
    }
}
Line.prototype._class += " chart_Line";
