import { HTMLWidget } from "./HTMLWidget";

export class CanvasWidget extends HTMLWidget {

    constructor() {
        super();
        this._tag = "canvas";
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        element.attr("width", this._size.width);
        element.attr("height", this._size.height);
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
