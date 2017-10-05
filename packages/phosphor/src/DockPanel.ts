import { HTMLWidget } from "@hpcc-js/common";
import { Widget } from "@hpcc-js/common";
import { DockPanel as PhosphorDockPanel, IMessageHandler, IMessageHook, Message, MessageLoop, Widget as PWidget } from "@hpcc-js/phosphor-shim";
import { PDockPanel } from "./PDockPanel";
import { Msg, WidgetAdapter } from "./WidgetAdapter";

import "../src/DockPanel.css";

export class DockPanel extends HTMLWidget implements IMessageHandler, IMessageHook {
    private _dock = new PDockPanel({ mode: "multiple-document" });

    constructor() {
        super();
        this._tag = "div";
        this._dock.id = "p" + this.id();
        MessageLoop.installMessageHook(this, this);
    }

    protected getWidgetAdapter(widget: Widget): WidgetAdapter | null {
        let retVal = null;
        this._dock.content().some(wa => {
            if (wa.widget === widget) {
                retVal = wa;
                return true;
            }
            return false;
        });
        return retVal;
    }

    addWidget(widget: Widget, title: string, location: PhosphorDockPanel.InsertMode = "split-right", refWidget?: Widget) {
        const addMode: PhosphorDockPanel.IAddOptions = { mode: location, ref: this.getWidgetAdapter(refWidget) };
        const wa = new WidgetAdapter(this, widget);
        wa.title.label = title;
        wa.padding = 8;
        this._dock.addWidget(wa, addMode);
        this._dock.appendContent(wa);
        this._dock.tabsMovable = false;
        return this;
    }

    removeWidget(widget: Widget) {
        const wa = this.getWidgetAdapter(widget);
        if (wa) {
            wa.dispose();
        }
        return this;
    }

    isVisible(widget: Widget) {
        return this.getWidgetAdapter(widget).isVisible;
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

    enter(domNode, element) {
        super.enter(domNode, element);
        PWidget.attach(this._dock, domNode);
    }

    update(domNode, element) {
        super.update(domNode, element);
        element.select(".p-Widget")
            .style("width", this.width() + "px")
            .style("height", this.height() + "px")
            ;
        this._dock.update();
    }

    exit(domNode, element) {
        super.exit(domNode, element);
    }

    //  Phosor Messaging  ---
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
DockPanel.prototype._class += " phosphor_DockPanel";
