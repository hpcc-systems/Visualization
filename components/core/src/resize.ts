import { HPCCElement } from "./element";

type Size = { width: number, height: number };

export class HPCCResizeElement extends HPCCElement {

    private _prevSize: Size = { width: 0, height: 0 };

    protected observer = new ResizeObserver(() => {
        const size = { width: this.clientWidth, height: this.clientHeight };
        this._fire("resize", this._prevSize, size);
        this._prevSize = size;
    });

    connectedCallback(): void {
        super.connectedCallback();
        this.observer.observe(this);
    }

    disconnectedCallback(): void {
        this.observer.unobserve(this);
        super.disconnectedCallback();
    }
}
