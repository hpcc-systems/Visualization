import { HTMLWidget } from "./HTMLWidget";

export class CanvasWidget extends HTMLWidget {

    _ctx: CanvasRenderingContext2D;
    constructor() {
        super();
        this._tag = "canvas";
    }

    resize(size) {
        const retVal = super.resize(size);
        try {
            this._element.attr("width", this._size.width);
            this._element.attr("height", this._size.height);
            this.resetContext();
        } catch (e) {
            console.error(e);
        }
        return retVal;
    }

    resetContext() {
        this._ctx = this._element.node().getContext("2d");
    }

    click(d, c) {
        console.log(d);
    }
}
CanvasWidget.prototype._class += " common_CanvasWidget";
