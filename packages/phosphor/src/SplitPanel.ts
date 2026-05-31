import { HTMLWidget, SVGWidget, Widget } from "@hpcc-js/common";
import { BasePanel } from "./BasePanel.ts";
import { SplitPanel as PSplitPanel, Widget as PWidget } from "./phosphor-shim.ts";
import { WidgetAdapter, WidgetAdapterArray } from "./WidgetAdapter.ts";

import "../src/DockPanel.css";


export namespace SplitPanel {

    export interface IAddWidgetOptions extends BasePanel.IAddWidgetOptions {
        /** Maximum size in pixels */
        maxSize?: number;
    }
}

export class SplitPanel extends BasePanel {
    private _split: PSplitPanel;
    protected _content = WidgetAdapterArray.create();

    constructor(readonly _orientation: "horizontal" | "vertical" = "vertical") {
        super();
        this._split = new PSplitPanel({ orientation: _orientation });
        this._split.id = "p" + this.id();
    }

    private _pendingDefaults: Map<number, { defaultSize?: number }> = new Map();
    addWidget(widget: SVGWidget | HTMLWidget, options?: SplitPanel.IAddWidgetOptions): this {
        const opts = options || {};
        const wa = new WidgetAdapter(this, widget);
        wa.padding = opts.padding ?? 0;

        if (opts.minSize != null || opts.maxSize != null) {
            const style = wa.node.style;
            if (opts.minSize != null) {
                if (this._orientation === "horizontal") {
                    style.minWidth = `${opts.minSize}px`;
                } else {
                    style.minHeight = `${opts.minSize}px`;
                }
            }
            if (opts.maxSize != null) {
                if (this._orientation === "horizontal") {
                    style.maxWidth = `${opts.maxSize}px`;
                } else {
                    style.maxHeight = `${opts.maxSize}px`;
                }
            }
        }

        this._split.addWidget(wa);
        this._content.push(wa);

        if (opts.defaultSize != null) {
            this._pendingDefaults.set(this._content.length - 1, {
                defaultSize: opts.defaultSize
            });
        }

        return this;
    }

    relativeSizes(): number[];
    relativeSizes(_: number[]): this;
    relativeSizes(_?: number[]): number[] | this {
        if (!arguments.length) return this._split.relativeSizes();
        this._split.setRelativeSizes(_);
        return this;
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        PWidget.attach(this._split, domNode);
    }

    update(domNode, element) {
        super.update(domNode, element);
        element.select(".lm-Widget")
            .style("width", this.width() + "px")
            .style("height", this.height() + "px")
            ;
    }

    exit(domNode, element) {
        PWidget.detach(this._split);
        super.exit(domNode, element);
    }

    render(callback?: (w: Widget) => void): this {
        return super.render(w => {
            this._applyPendingDefaults();
            this._content.watchRendered(this, callback);
            this._split.update();
        });
    }

    private _applyPendingDefaults() {
        if (this._pendingDefaults.size === 0) return;

        const isHorizontal = this._orientation === "horizontal";
        const totalSpace = isHorizontal ? this.width() : this.height();
        const n = this._content.length;

        let usedSpace = 0;
        let flexCount = 0;
        const pixelSizes: (number | null)[] = [];

        for (let i = 0; i < n; i++) {
            const defaults = this._pendingDefaults.get(i);
            if (defaults) {
                const size = defaults.defaultSize;
                if (size != null) {
                    pixelSizes.push(size);
                    usedSpace += size;
                    continue;
                }
            }
            pixelSizes.push(null);
            flexCount++;
        }

        this._pendingDefaults.clear();

        const remainingSpace = Math.max(0, totalSpace - usedSpace);
        const flexSize = flexCount > 0 ? remainingSpace / flexCount : 0;
        const sizes = pixelSizes.map(px => px != null ? px : flexSize);
        this._split.setRelativeSizes(sizes);
    }

    //  Events  ---
    childActivation(w: Widget, wa: WidgetAdapter) {
    }

    layoutChanged() {
    }
}
SplitPanel.prototype._class += " phosphor_SplitPanel";

