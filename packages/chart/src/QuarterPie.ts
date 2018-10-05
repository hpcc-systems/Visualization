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
        const maxTextWidth = this.textSize(this.data().map(d => this.getLabelText({ data: d })), "Verdana", 12).width;
        return Math.min(this._size.width - maxTextWidth - 10, this._size.height - 12 * 3) - 2;
    }
}
QuarterPie.prototype._class += " chart_QuarterPie";

export interface QuarterPie {
    orientation(): string;
    orientation(_: string): this;
}
QuarterPie.prototype.publish("orientation", "left", "set", "Determines the placement and start/end angle.", ["left", "right"]);
