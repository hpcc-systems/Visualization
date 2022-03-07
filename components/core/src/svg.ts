import { ChangeMap } from "./message";
import { HPCCResizeElement } from "./resize";

export class HPCCSVGElement extends HPCCResizeElement {

    protected _svg: SVGSVGElement;

    constructor() {
        super();
        if (!this._svg) {
            throw new Error("SVG element not found");
        }
    }

    enter() {
    }

    update(changes: ChangeMap<this>) {
        super.update(changes);
        if ("resize" in changes) {
            this._svg.setAttribute("width", `${this.clientWidth}px`);
            this._svg.setAttribute("height", `${this.clientHeight}px`);
            this._svg.setAttribute("viewBox", `0 0 ${this._svg.clientWidth} ${this._svg.clientHeight}`);
        }
    }
}
