import { HTMLWidget, SVGWidget, Widget } from "@hpcc-js/common";
import { IMessageHandler, Message, TabPanel as PTabPanel, Widget as PWidget } from "@hpcc-js/phosphor-shim";
import { Msg, WidgetAdapter } from "./WidgetAdapter";

import "../src/DockPanel.css";

export class TabPanel extends HTMLWidget {
    private _tab = new PTabPanel({ tabPlacement: "top" });
    protected content: WidgetAdapter[] = [];

    constructor() {
        super();
        this._tag = "div";
        this._tab.id = "p" + this.id();
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
        this._tab.update();
    }

    exit(domNode, element) {
        super.exit(domNode, element);
    }

    //  Phosphor Messaging  ---
    messageHook(handler: IMessageHandler, msg: Message): boolean {
        if (handler === this) {
            this.processMessage(msg);
        }
        return true;
    }

    _prevActive: Widget;
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

    active(): Widget {
        return this._prevActive;
    }
}
TabPanel.prototype._class += " phosphor_TabPanel";
