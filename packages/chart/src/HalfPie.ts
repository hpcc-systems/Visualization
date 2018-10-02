import { Pie } from "./Pie";

export class HalfPie extends Pie {
    constructor() {
        super();
    }
    postUpdate(domNode, element) {
        super.postUpdate(domNode, element);
        let x = this._pos.x;
        let y = this._pos.y;
        if (this._drawStartPos === "origin" && this._target instanceof SVGElement) {
            x -= this._size.width / 2;
            y -= this._size.height / 2;
        }
        y += (this._size.height / 4);
        this._element.attr("transform", "translate(" + x + "," + y + ")scale(" + this._widgetScale + ")");
    }
    updateD3Pie() {
        super.updateD3Pie();
        this.d3Pie
            .startAngle(-Math.PI / 2)
            .endAngle(Math.PI / 2)
            ;
    }
}
HalfPie.prototype._class += " chart_HalfPie";
