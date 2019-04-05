import { Scatter } from "./Scatter";

export class BubbleXY extends Scatter {
    constructor() {
        super();
    }
    enter(domNode, element) {
        if (!this.pointSizeColumn_exists()) {
            this.pointSizeColumn(this.columns()[this.columns().length - 1]);
        }
        super.enter(domNode, element);
    }
}
BubbleXY.prototype._class += " chart_BubbleXY";
