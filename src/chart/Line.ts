import "./Line.css";
import { Scatter } from "./Scatter";

export class Line extends Scatter {
    constructor() {
        super();

        this
            .interpolate_default("linear")
            ;
    }
}
Line.prototype._class += " chart_Line";
