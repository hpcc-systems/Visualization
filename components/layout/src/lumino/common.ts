import { isTrue, HPCCResizeElement } from "@hpcc-js/wc-core";
import { Widget } from "@lumino/widgets";
import { WidgetAdapter } from "./widgetAdapter";

let hpccSlotID = 0;

export abstract class HPCCLuminoElement extends HPCCResizeElement {

    protected _slot: HTMLSlotElement;
    private _childCount = 0;

    constructor() {
        super();
        this.createPanel();
        this.slotChanged();
        this._slot.addEventListener("slotchange", () => this.slotChanged());
    }

    abstract createPanel(): void;
    abstract addWidget(w: WidgetAdapter, _e: HTMLElement, _ref?: Widget): void;

    private slotChanged() {
        const slotElements = this._slot.assignedElements();
        const widgetIdx: { [id: string]: WidgetAdapter } = {};
        for (let i = 0; i < slotElements.length; ++i) {
            ++this._childCount;
            const e = slotElements[i] as HTMLElement;
            const slot = document.createElement("slot");
            slot.setAttribute("name", `slot_${++hpccSlotID}`);
            slot.style.cssText = e.style.cssText;
            slot.style.display = "inline-block";
            const w = new WidgetAdapter(this, slot);
            widgetIdx[e.id] = w;
            w.title.label = e.dataset.label || (e.id && `#${e.id}`) || `${e.tagName} ${this._childCount}`;
            w.title.closable = isTrue(e.dataset.closable);
            w.title.caption = e.dataset.caption || w.title.label;
            w.title.className = e.dataset.className || "";
            w.title.iconClass = e.dataset.iconClass || "";
            w.title.iconLabel = e.dataset.iconLabel || "";
            this.addWidget(w, e, e.dataset.ref ? widgetIdx[e.dataset.ref] : undefined);
            e.setAttribute("slot", `slot_${hpccSlotID}`);
        }
    }

    private destruct() {
        for (let i = 0; i < this.childElementCount; ++i) {
            --this._childCount;
            this.children[i].setAttribute("slot", "");
        }
    }

    exit() {
        this.destruct();
        super.exit();
    }
}
