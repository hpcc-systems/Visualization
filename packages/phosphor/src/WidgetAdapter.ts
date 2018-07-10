import { Widget } from "@hpcc-js/common";
// import { Persist } from "@hpcc-js/other";
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

export interface IClosable {
    canClose(e: Widget, wa: WidgetAdapter): boolean;
}

export class WidgetAdapter extends PWidget {
    protected _owner;
    protected _element;
    private _widget: Widget;
    get widget(): Widget { return this._widget; }
    private _widgetLayout: object;
    lparam: any = {};
    padding: number = 0;
    _width: number = 0;
    _height: number = 0;
    private _closable: IClosable;

    constructor(owner?: Widget, widget?: Widget | object, lparam: object = {}, closable?: IClosable) {
        super();
        this._owner = owner;
        this._element = d3Select(this.node);
        // this.setFlag(Widget.Flag.DisallowLayout);
        this.addClass("phosphor_WidgetAdapter");
        // this.addClass(name.toLowerCase());
        this.title.label = "";
        this._closable = closable;
        this.title.closable = closable ? true : false;
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

    resizeAndRender() {
        if (this._widget) {
            d3Select(this.node)
                .style("padding", this.padding + "px")
                .style("width", this._width + "px")
                .style("height", this._height + "px")
                ;
            this._widget
                .resize({ width: this._width - this.padding * 2 - 2, height: this._height - this.padding * 2 - 2 })
                .lazyRender()
                ;
        }
    }

    protected onActivateRequest(msg: Message): void {
        super.onActivateRequest(msg);
        if (this._widget) {
            this.resizeAndRender();
        }
        if (this._owner) {
            MessageLoop.postMessage(this._owner, new Msg.WAActivateRequest(this));
        }
    }

    protected onResize(msg: PWidget.ResizeMessage): void {
        super.onResize(msg);
        if (this.node && this.node.offsetParent !== null && msg.width >= 0 && msg.height >= 0) {
            this._width = msg.width;
            this._height = msg.height;
            this.resizeAndRender();
        } else if (this._widgetLayout) {
            /*
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
            */
        }
    }

    protected onCloseRequest(msg: Message): void {
        if (this._closable.canClose(this._widget, this)) {
            this.dispose();
        }
    }
}
