import { Widget, select as d3Select } from "@hpcc-js/common";
import { BasePanel } from "./BasePanel.ts";
import { DockLayout, DockPanel as PhosphorDockPanel, MessageLoop, Widget as PWidget } from "./phosphor-shim.ts";
import { IClosable, WidgetAdapter } from "./WidgetAdapter.ts";
import { PDockPanel } from "./PDockPanel.ts";

import "../src/DockPanel.css";

export namespace DockPanel {
    export interface IAddWidgetOptions extends BasePanel.IAddWidgetOptions {
        /** Tab title */
        title?: string;
        /** Insertion mode relative to refWidget */
        location?: PhosphorDockPanel.InsertMode;
        /** Whether the tab can be closed */
        closable?: boolean | IClosable;
    }
}

export class DockPanel extends BasePanel {
    private _dock = new PDockPanel({ mode: "multiple-document" });
    protected _content = this._dock.content();

    constructor() {
        super();
        this._dock.id = "p" + this.id();
    }

    protected getWidgetAdapter(widget: Widget): WidgetAdapter | null {
        let retVal = null;
        this._content.some(wa => {
            if (wa.widget === widget) {
                retVal = wa;
                return true;
            }
            return false;
        });
        return retVal;
    }

    private _pendingDefaults: Map<WidgetAdapter, { defaultSize?: number }> = new Map();
    addWidget(widget: Widget, options: DockPanel.IAddWidgetOptions): this;
    /** @deprecated Use options object form instead */
    addWidget(widget: Widget, title: string, location?: PhosphorDockPanel.InsertMode, refWidget?: Widget, closable?: boolean | IClosable, padding?: number): this;
    addWidget(widget: Widget, titleOrOptions: string | DockPanel.IAddWidgetOptions, location: PhosphorDockPanel.InsertMode = "split-right", refWidget?: Widget, closable?: boolean | IClosable, padding: number = 8) {
        const opts: DockPanel.IAddWidgetOptions = typeof titleOrOptions === "string"
            ? { title: titleOrOptions, location, refWidget, closable, padding }
            : titleOrOptions;

        const {
            title = "",
            location: loc = "split-right",
            refWidget: ref,
            closable: canClose,
            padding: pad = 8,
            minSize,
            defaultSize
        } = opts;

        const addMode: PhosphorDockPanel.IAddOptions = { mode: loc, ref: this.getWidgetAdapter(ref) };
        const wa = new WidgetAdapter(this, widget, {}, canClose);
        wa.title.label = title;
        wa.padding = pad;

        if (minSize != null) {
            const style = wa.node.style;
            if (loc === "split-left" || loc === "split-right") {
                style.minWidth = `${minSize}px`;
            } else {
                style.minHeight = `${minSize}px`;
            }
        }

        this._dock.addWidget(wa, addMode);
        this._dock.appendContent(wa);
        this._dock.tabsMovable = true;

        if (defaultSize != null) {
            this._pendingDefaults.set(wa, { defaultSize });
        }

        return this;
    }

    private _applyPendingDefaults() {
        if (this._pendingDefaults.size === 0) return;

        const config = this._dock.saveLayout() as DockLayout.ILayoutConfig;
        if (!config.main) {
            this._pendingDefaults.clear();
            return;
        }

        // Build a lookup: widgetId → { defaultSize }
        const lookup = new Map<string, { defaultSize?: number }>();
        for (const [wa, defaults] of this._pendingDefaults) {
            lookup.set(wa.widget.id(), defaults);
        }
        this._pendingDefaults.clear();

        const containerWidth = this.width();
        const containerHeight = this.height();

        const applySizes = (area: DockLayout.AreaConfig, availWidth: number, availHeight: number): void => {
            if (!area || area.type !== "split-area") return;

            const isHorizontal = area.orientation === "horizontal";
            const totalSpace = isHorizontal ? availWidth : availHeight;
            const n = area.children.length;

            // Collect requested pixel sizes per child
            let usedSpace = 0;
            let flexCount = 0;
            const pixelSizes: (number | null)[] = area.children.map((child, i) => {
                if (child.type === "tab-area") {
                    for (const w of (child as any).widgets) {
                        const defaults = lookup.get(w?.__id);
                        if (defaults) {
                            const size = defaults.defaultSize;
                            if (size != null) {
                                usedSpace += size;
                                return size;
                            }
                        }
                    }
                }
                flexCount++;
                return null;
            });

            // Only apply if at least one child has a default
            if (flexCount < n) {
                const remainingSpace = Math.max(0, totalSpace - usedSpace);
                const flexSize = flexCount > 0 ? remainingSpace / flexCount : 0;
                area.sizes = pixelSizes.map(px => px != null ? px : flexSize);
            }

            // Recurse into nested split areas with their allocated portion
            for (let i = 0; i < area.children.length; i++) {
                const child = area.children[i];
                if (child.type === "split-area") {
                    const ratio = area.sizes[i] / (area.sizes.reduce((a, b) => a + b, 0) || 1);
                    const childW = isHorizontal ? availWidth * ratio : availWidth;
                    const childH = isHorizontal ? availHeight : availHeight * ratio;
                    applySizes(child, childW, childH);
                }
            }
        };

        applySizes(config.main, containerWidth, containerHeight);
        this._dock.restoreLayout(config as any);
    }

    removeWidget(widget: Widget) {
        const wa = this.getWidgetAdapter(widget);
        if (wa) {
            widget.target(null);
            this._dock.removeContent(wa);
        }
        return this;
    }

    isVisible(widget: Widget) {
        return this.getWidgetAdapter(widget).isVisible;
    }

    widgetAdapters(): WidgetAdapter[] {
        return this._dock.content();
    }

    widgets(): Widget[] {
        return this._dock.content().map(wa => wa.widget);
    }

    layout(): object;
    layout(_: object): this;
    layout(_?: object): object | this {
        if (!arguments.length) return this._dock.saveLayout();
        this._dock.restoreLayout(_ as any);
        return this;
    }

    //  Used to delay load a layout during render...
    private _layoutObj: object = null;
    layoutObj(_: object | null): this {
        this._layoutObj = _;
        return this;
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        PWidget.attach(this._dock, domNode);
    }

    _prevHideSingleTabs;
    update(domNode, element) {
        super.update(domNode, element);
        element.select(".lm-Widget")
            .style("width", this.width() + "px")
            .style("height", this.height() + "px")
            ;

        this.widgets().forEach(w => w.render());
    }

    exit(domNode, element) {
        if (this._dock.isAttached) {
            if (this._dock.node.isConnected) {
                // Proper Lumino detach — propagates AfterDetach to all children
                // (TabBars etc.), clearing their isAttached flags before disposal.
                PWidget.detach(this._dock);
            } else {
                // The DOM node has already been removed from the document by the
                // parent framework (e.g. React unmount).  We cannot call the
                // static Widget.detach() because it guards against !isConnected,
                // so manually broadcast AfterDetach so that Lumino's isAttached
                // bookkeeping is consistent before we dispose child widgets.
                MessageLoop.sendMessage(this._dock, PWidget.Msg.AfterDetach);
            }
        }
        [...this.widgets()].forEach(w => this.removeWidget(w));
        super.exit(domNode, element);
    }

    render(callback?: (w: Widget) => void): this {
        const context = this;
        if (this._layoutObj !== null) {
            this.layout(this._layoutObj);
            this.layoutObj(null);
        }
        return super.render((w) => {
            this._applyPendingDefaults();
            this._dock.content().watchRendered(this, callback);
            this._dock.update();
            setTimeout(() => {
                const tabBars = this.element().selectAll(".lm-Widget.lm-TabBar.lm-DockPanel-tabBar");
                let refit = false;
                tabBars.each(function (this: HTMLElement) {
                    const tabBar = d3Select(this);
                    const tabsCount = (tabBar.node() as HTMLElement).childNodes[0].childNodes.length;
                    const hide = context.hideSingleTabs() && tabsCount === 1;
                    if (hide !== tabBar.classed("hide")) {
                        tabBar.classed("hide", hide);
                        refit = true;
                    }
                });
                if (refit) {
                    this._dock.fit();
                }
            }, 0);
        });
    }

    refit() {
        this._dock.fit();
    }

    //  Events  ---
    childActivation(w: Widget, wa: WidgetAdapter) {
    }

    layoutChanged() {
    }
}
DockPanel.prototype._class += " phosphor_DockPanel";

export interface DockPanel {
    hideSingleTabs(): boolean;
    hideSingleTabs(_: boolean): this;
}

DockPanel.prototype.publish("hideSingleTabs", false, "boolean");
