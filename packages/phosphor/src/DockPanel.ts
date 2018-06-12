import { HTMLWidget } from "@hpcc-js/common";
import { Widget } from "@hpcc-js/common";
import { DockPanel as PhosphorDockPanel, IMessageHandler, IMessageHook, Message, MessageLoop, Widget as PWidget } from "@hpcc-js/phosphor-shim";
import { select as d3Select } from "d3-selection";
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
        this._dock.tabsMovable = true;
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

    enter(domNode, element) {
        super.enter(domNode, element);
        PWidget.attach(this._dock, domNode);
    }

    _prevHideSingleTabs;
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

    render(callback) {
        const context = this;
        return super.render((w) => {
            setTimeout(() => {
                const tabBars = this.element().selectAll(".p-Widget.p-TabBar.p-DockPanel-tabBar");
                let refit = false;
                tabBars.each(function () {
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
                if (callback) {
                    callback(this);
                }
            }, 0);
        });
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
                const wa = (msg as Msg.WAActivateRequest).wa;
                const widget = wa.widget;
                if (this._prevActive !== widget) {
                    this._prevActive = widget;
                    this.childActivation(widget, wa);
                }
                break;
        }
    }

    childActivation(w: Widget, wa: WidgetAdapter) {
    }

    active(): Widget {
        return this._prevActive;
    }
}
DockPanel.prototype._class += " phosphor_DockPanel";

export interface DockPanel {
    hideSingleTabs(): boolean;
    hideSingleTabs(_: boolean): this;
}

DockPanel.prototype.publish("hideSingleTabs", false, "boolean");
