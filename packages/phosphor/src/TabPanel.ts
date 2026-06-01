import { HTMLWidget, SVGWidget, Widget } from "@hpcc-js/common";
import { BasePanel } from "./BasePanel.ts";
import { TabPanel as PTabPanel, Widget as PWidget } from "./phosphor-shim.ts";
import { WidgetAdapter, WidgetAdapterArray, WidgetAdapterExt } from "./WidgetAdapter.ts";

import "../src/DockPanel.css";

export namespace TabPanel {

    export interface IAddWidgetOptions {
        /** Inner padding in pixels (default 8) */
        padding?: number;
        /** Tab title */
        title?: string;
        /** Widget adapter extensions (overflow settings) */
        ext?: WidgetAdapterExt;
    }
}

export class TabPanel extends BasePanel {
    private _tab = new PTabPanel({ tabPlacement: "top" });
    protected _content = WidgetAdapterArray.create();

    constructor() {
        super();
        this._tab.id = "p" + this.id();
    }

    addWidget(widget: SVGWidget | HTMLWidget, options: TabPanel.IAddWidgetOptions): this;
    /** @deprecated Use options object form instead */
    addWidget(widget: SVGWidget | HTMLWidget, title: string, ext?: WidgetAdapterExt): this;
    addWidget(widget: SVGWidget | HTMLWidget, titleOrOptions: string | TabPanel.IAddWidgetOptions, ext: WidgetAdapterExt = {}) {
        const opts: TabPanel.IAddWidgetOptions = typeof titleOrOptions === "string"
            ? { title: titleOrOptions, ext }
            : titleOrOptions;

        const {
            title = "",
            ext: widgetExt = {},
            padding = 8
        } = opts;

        if (!this._prevActive) {
            this._prevActive = widget;
        }
        const wa = new WidgetAdapter(this, widget, undefined, undefined, widgetExt);
        wa.title.label = title;
        wa.padding = padding;

        this._tab.addWidget(wa);
        this._content.push(wa);
        return this;
    }

    removeWidget(widget: SVGWidget | HTMLWidget) {
        const wa = this.getWidgetAdapter(widget);
        if (wa) {
            const found = this._content.indexOf(wa);
            if (found >= 0) {
                this._content.splice(found, 1);
            }
            widget.target(null);
            wa.dispose();
        }
        return this;
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        PWidget.attach(this._tab, domNode);
    }

    update(domNode, element) {
        super.update(domNode, element);
        element.select(".lm-Widget")
            .style("width", this.width() + "px")
            .style("height", this.height() + "px")
            ;
    }

    exit(domNode, element) {
        PWidget.detach(this._tab);
        super.exit(domNode, element);
    }

    render(callback?: (w: Widget) => void): this {
        return super.render(w => {
            this._content.watchRendered(this, callback);
            this._tab.update();
        });
    }

    active(): Widget;
    active(_: Widget);
    active(_?: Widget): Widget | this {
        if (!arguments.length) return this.getWidget(this._tab.currentWidget);
        this._tab.currentWidget = this.getWidgetAdapter(_);
        return this;
    }

    //  Events  ---
    childActivation(w: Widget, wa: WidgetAdapter) {
    }

    layoutChanged() {
    }
}
TabPanel.prototype._class += " phosphor_TabPanel";
