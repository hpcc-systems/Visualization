import { select as d3Select } from "d3-selection";
import { d3SelectionType, Widget } from "./Widget";

export class CanvasWidget extends Widget {

    protected _tag;

    constructor() {
        super();

        this._tag = "canvas";
    }

    resize(size) {
        const retVal = super.resize(size);
        this._placeholderElement
            .style("width", this._size.width + "px")
            .style("height", this._size.height + "px")
            ;
        this._element.attr("width", this._size.width);
        this._element.attr("height", this._size.height);
        return retVal;
    }

    //  Properties  ---
    target(): null | HTMLElement | SVGElement;
    target(_: null | string | HTMLElement | SVGElement): this;
    target(_?: null | string | HTMLElement | SVGElement): null | HTMLElement | SVGElement | this {
        const retVal = super.target.apply(this, arguments);
        if (arguments.length) {
            if (this._target) {
                this._placeholderElement = d3Select(this._target);
                if (!this._size.width && !this._size.height) {
                    const width = parseFloat(this._placeholderElement.style("width"));
                    const height = parseFloat(this._placeholderElement.style("height"));
                    this.size({
                        width,
                        height
                    });
                    this.resize(this._size);
                }
            }
        }
        return retVal;
    }

    exit(domeNode: HTMLElement, element: d3SelectionType) {
        if (this._placeholderElement) {
            this._placeholderElement.remove();
        }
        super.exit(domeNode, element);
    }
}
CanvasWidget.prototype._class += " common_CanvasWidget";
