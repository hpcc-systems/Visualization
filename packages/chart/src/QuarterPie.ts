import { Pie } from "./Pie";

export class QuarterPie extends Pie {
    constructor() {
        super();
    }
    postUpdate(domNode, element) {
        super.postUpdate(domNode, element);
        let x = this.orientation() === "left" ? 0 : this._size.width;
        let y = this._size.height;
        if (this._drawStartPos === "origin" && this._target instanceof SVGElement) {
            x -= this._size.width / 2;
            y -= this._size.height / 2;
        }
        this._element.attr("transform", "translate(" + x + "," + y + ")scale(" + this._widgetScale + ")");
    }
    updateD3Pie() {
        super.updateD3Pie();
        this.d3Pie
            .startAngle(this.orientation() === "left" ? 0 : -Math.PI / 2)
            .endAngle(this.orientation() === "left" ? Math.PI / 2 : 0)
            ;
    }
    calcOuterRadius() {
        const maxTextWidth = this.textSize(this.data().map(d => this.getLabelText({ data: d }, false)), "Verdana", 12).width;
        const horizontalLimit = this._size.width - maxTextWidth - 10;
        const verticalLimit = this._size.height - this._smallValueLabelHeight;
        const outerRadius = Math.min(horizontalLimit, verticalLimit) / 2 - 2;
        if ((horizontalLimit / 2) - 2 < this.minOuterRadius()) {
            this._labelWidthLimit = maxTextWidth - (this.minOuterRadius() - ((horizontalLimit / 2) - 2));
        } else {
            this._labelWidthLimit = maxTextWidth;
        }
        if (outerRadius < this.minOuterRadius()) {
            return this.minOuterRadius();
        }
        return outerRadius;
    }
}
QuarterPie.prototype._class += " chart_QuarterPie";

export interface QuarterPie {
    orientation(): string;
    orientation(_: string): this;
}
QuarterPie.prototype.publish("orientation", "left", "set", "Determines the placement and start/end angle.", ["left", "right"]);
