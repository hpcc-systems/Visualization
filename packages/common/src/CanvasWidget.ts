import { HTMLWidget } from "./HTMLWidget";

export class CanvasWidget extends HTMLWidget {

    constructor() {
        super();
        this._tag = "canvas";
    }

    resize(size) {
        const retVal = super.resize(size);
        this._element.attr("width", this._size.width);
        this._element.attr("height", this._size.height);
        return retVal;
    }

    click(d, c) {
        console.log(d);
    }
}
CanvasWidget.prototype._class += " common_CanvasWidget";
