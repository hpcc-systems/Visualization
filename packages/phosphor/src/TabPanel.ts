import { HTMLWidget, SVGWidget, Widget } from "@hpcc-js/common";
import { IMessageHandler, Message, TabPanel as PTabPanel, Widget as PWidget } from "@hpcc-js/phosphor-shim";
import { Msg, WidgetAdapter, WidgetAdapterArray } from "./WidgetAdapter";

import "../src/DockPanel.css";

export class TabPanel extends HTMLWidget {
    private _tab = new PTabPanel({ tabPlacement: "top" });
    protected content = WidgetAdapterArray.create();

    constructor() {
        super();
        this._tag = "div";
        this._tab.id = "p" + this.id();
    }

    protected getWidget(wa: PWidget): Widget | undefined {
        if (wa instanceof WidgetAdapter) {
            return wa.widget;
        }
    }

    protected getWidgetAdapter(widget: Widget): WidgetAdapter | null {
        let retVal = null;
        this.content.some(wa => {
            if (wa.widget === widget) {
                retVal = wa;
                return true;
            }
            return false;
        });
        return retVal;
    }

    addWidget(widget: SVGWidget | HTMLWidget, title: string) {
        if (!this._prevActive) {
            this._prevActive = widget;
        }
        const wa = new WidgetAdapter(this, widget);
        wa.title.label = title;
        wa.padding = 8;
        this._tab.addWidget(wa);
        this.content.push(wa);
        return this;
    }

    removeWidget(widget: SVGWidget | HTMLWidget) {
        const wa = this.getWidgetAdapter(widget);
        if (wa) {
            const found = this.content.indexOf(wa);
            if (found >= 0) {
                this.content.splice(found, 1);
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
        element.select(".p-Widget")
            .style("width", this.width() + "px")
            .style("height", this.height() + "px")
            ;
    }

    exit(domNode, element) {
        super.exit(domNode, element);
    }

    render(callback?: (w: Widget) => void): this {
        return super.render(w => {
            this.content.watchRendered(this, callback);
            this._tab.update();
        });
    }

    //  Phosphor Messaging  ---
    messageHook(handler: IMessageHandler, msg: Message): boolean {
        if (handler === this) {
            this.processMessage(msg);
        }
        return true;
    }

    private _prevActive: Widget;
    processMessage(msg: Message): void {
        switch (msg.type) {
            case "wa-activate-request":
                const widget = (msg as Msg.WAActivateRequest).wa.widget;
                if (this._prevActive !== widget) {
                    this._prevActive = widget;
                    this.childActivation(widget);
                }
                break;
        }
    }

    childActivation(w: Widget) {
    }

    active(): Widget;
    active(_: Widget);
    active(_?: Widget): Widget | this {
        if (!arguments.length) return this.getWidget(this._tab.currentWidget);
        this._tab.currentWidget = this.getWidgetAdapter(_);
        return this;
    }
}
TabPanel.prototype._class += " phosphor_TabPanel";
