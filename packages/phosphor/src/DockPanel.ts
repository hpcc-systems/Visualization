import { HTMLWidget, Widget, Utility, select as d3Select } from "@hpcc-js/common";
import { DockPanel as PhosphorDockPanel, IMessageHandler, IMessageHook, Message, MessageLoop, Widget as PWidget } from "@hpcc-js/phosphor-shim";
import { PDockPanel } from "./PDockPanel.ts";
import { IClosable, Msg, WidgetAdapter } from "./WidgetAdapter.ts";

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

    addWidget(widget: Widget, title: string, location: PhosphorDockPanel.InsertMode = "split-right", refWidget?: Widget, closable?: boolean | IClosable, padding: number = 8) {
        const addMode: PhosphorDockPanel.IAddOptions = { mode: location, ref: this.getWidgetAdapter(refWidget) };
        const wa = new WidgetAdapter(this, widget, {}, closable);
        wa.title.label = title;
        wa.padding = padding;
        this._dock.addWidget(wa, addMode);
        this._dock.appendContent(wa);
        this._dock.tabsMovable = true;
        return this;
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

    private _pPlaceholder;
    enter(domNode, element) {
        super.enter(domNode, element);
        this._pPlaceholder = element.append("div");
        PWidget.attach(this._dock, this._pPlaceholder.node());
    }

    _prevHideSingleTabs;
    update(domNode, element) {
        super.update(domNode, element);

        this._pPlaceholder
            .style("width", this.width() + "px")
            .style("height", this.height() + "px")
            .style("overflow", "auto")
            ;

        element.select(".p-Widget")
            .style("width", this._pPlaceholder.node().clientWidth + "px")
            .style("height", this.height() + "px")
            ;

        this.widgets().forEach(w => w.render());
    }

    exit(domNode, element) {
        [...this.widgets()].forEach(w => this.removeWidget(w));
        PWidget.detach(this._dock);
        super.exit(domNode, element);
    }

    render(callback?: (w: Widget) => void): this {
        const context = this;
        if (this._layoutObj !== null) {
            this.layout(this._layoutObj);
            this.layoutObj(null);
        }
        return super.render((w) => {
            this._dock.content().watchRendered(this, callback);
            this._dock.update();
            setTimeout(() => {
                const tabBars = this.element().selectAll(".p-Widget.p-TabBar.p-DockPanel-tabBar");
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

    //  Phosphor Messaging  ---
    messageHook(handler: IMessageHandler, msg: Message): boolean {
        if (handler === this) {
            this.processMessage(msg);
        }
        return true;
    }

    private _lazyLayoutChanged = Utility.debounce(async () => {
        this.layoutChanged();
    }, 1000);

    _prevActive: Widget;
    processMessage(msg: Message): void {
        switch (msg.type) {
            case Msg.WAActivateRequest.type:
                const wa = (msg as Msg.WAActivateRequest).wa;
                const widget = wa.widget;
                if (this._prevActive !== widget) {
                    this._prevActive = widget;
                    this.childActivation(widget, wa);
                }
                break;
            case Msg.WALayoutChanged.type:
                this._lazyLayoutChanged();
                break;
        }
    }

    active(): Widget {
        return this._prevActive;
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
