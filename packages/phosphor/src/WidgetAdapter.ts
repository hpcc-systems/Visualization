import { Widget as Widget } from "@hpcc-js/common";
import { Persist } from "@hpcc-js/other";
import { ConflatableMessage, Message, MessageLoop, Widget as PWidget } from "@hpcc-js/phosphor-shim";
import { select as d3Select } from "d3-selection";

import "../src/WidgetAdapter.css";

export namespace Msg {
    export class WAActivateRequest extends ConflatableMessage {
        private _wa: WidgetAdapter;

        constructor(wa: WidgetAdapter) {
            super("wa-activate-request");
            this._wa = wa;
        }
        get wa(): WidgetAdapter {
            return this._wa;
        }

        conflate(other: WAActivateRequest): boolean {
            this._wa = other.wa;
            return true;
        }
    }
}

export class WidgetAdapter extends PWidget {
    protected _owner;
    protected _element;
    private _widget: Widget;
    get widget() { return this._widget; }
    private _widgetLayout: object;
    lparam: any = {};
    padding: number = 0;

    constructor(owner?: Widget, widget?: Widget | object, lparam: object = {}) {
        super();
        this._owner = owner;
        this._element = d3Select(this.node);
        // this.setFlag(Widget.Flag.DisallowLayout);
        this.addClass("phosphor_WidgetAdapter");
        // this.addClass(name.toLowerCase());
        this.title.label = "";
        this.title.closable = false;
        this.title.caption = `Long description for: ${name}`;

        if (widget instanceof Widget) {
            this._widget = widget
                .target(this.node)
                ;
        } else {
            this._widgetLayout = widget;
        }
        this.lparam = lparam;
    }

    get inputNode(): HTMLInputElement {
        return this.node.getElementsByTagName("input")[0] as HTMLInputElement;
    }

    protected onActivateRequest(msg: Message): void {
        super.onActivateRequest(msg);
        if (this._widget) {
            this._widget
                .lazyRender()
                ;
        }
        if (this._owner) {
            MessageLoop.postMessage(this._owner, new Msg.WAActivateRequest(this));
        }
    }

    protected onResize(msg: PWidget.ResizeMessage): void {
        super.onResize(msg);
        if (msg.width >= 0 && msg.height >= 0) {
            d3Select(this.node)
                .style("padding", this.padding + "px")
                .style("width", msg.width + "px")
                .style("height", msg.height + "px")
                ;
            if (this._widget) {
                this._widget
                    .resize({ width: msg.width - this.padding * 2 - 2, height: msg.height - this.padding * 2 - 2 })
                    .lazyRender()
                    ;
            } else if (this._widgetLayout) {
                Persist.create(this._widgetLayout).then((widget: Widget) => {
                    delete this._widgetLayout;
                    this._widget = widget;
                    this._widget
                        .target(this.node)
                        .resize({ width: msg.width - this.padding * 2 - 2, height: msg.height - this.padding * 2 - 2 })
                        .lazyRender()
                        ;
                    if (this._widget["title"]) {
                        this.title.label = this._widget["title"]();
                    }
                });
            }
        }
    }
}
