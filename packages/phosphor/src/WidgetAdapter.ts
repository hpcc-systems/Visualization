import { Widget, select as d3Select } from "@hpcc-js/common";
// import { Persist } from "@hpcc-js/other";
import { ConflatableMessage, Message, MessageLoop, Widget as PWidget } from "@hpcc-js/phosphor-shim";

import "../src/WidgetAdapter.css";

export namespace Msg {

    export class WAConflatableMessage extends ConflatableMessage {
        private _wa: WidgetAdapter;

        constructor(wa: WidgetAdapter, msg: string) {
            super(msg);
            this._wa = wa;
        }

        get wa(): WidgetAdapter {
            return this._wa;
        }

        conflate(other: WAConflatableMessage): boolean {
            this._wa = other.wa;
            return true;
        }
    }

    export class WAActivateRequest extends WAConflatableMessage {

        static type = "wa-activate-request";

        constructor(wa: WidgetAdapter) {
            super(wa, WAActivateRequest.type);
        }
    }

    export class WALayoutChanged extends WAConflatableMessage {

        static type = "wa-layout-changed";

        constructor(wa: WidgetAdapter) {
            super(wa, WALayoutChanged.type);
        }
    }
}

export interface IClosable {
    canClose(e: Widget, wa: WidgetAdapter): boolean;
}

export interface WidgetAdapterExt {
    overflowX?: string;
    overflowY?: string;
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
    _ext: WidgetAdapterExt;
    private _closable: IClosable;

    constructor(owner?: Widget, widget?: Widget | object, lparam: object = {}, closable: boolean | IClosable = false, ext: WidgetAdapterExt = {}) {
        super();
        this._owner = owner;
        this._element = d3Select(this.node);
        // this.setFlag(Widget.Flag.DisallowLayout);
        this.addClass("phosphor_WidgetAdapter");
        // this.addClass(name.toLowerCase());
        this.title.label = "";
        this.title.closable = !!closable;
        this.title.caption = `Long description for: ${name}`;
        this._ext = ext;

        if (typeof closable === "boolean") {
            this._closable = {
                canClose(e: Widget, wa: WidgetAdapter): boolean { return closable; }
            };
        } else {
            this._closable = closable;
        }

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
                .style("overflow-x", this._ext.overflowX)
                .style("overflow-y", this._ext.overflowY)
                ;
            this._widget
                .resize({ width: this._width - this.padding * 2 - 2, height: this._height - this.padding * 2 - 2 })
                .lazyRender()
                ;
            if (this._owner) {
                MessageLoop.postMessage(this._owner, new Msg.WALayoutChanged(this));
            }
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

export class WidgetAdapterArray extends Array<WidgetAdapter> {

    private constructor(items?: WidgetAdapter[]) {
        super(...items);
    }

    static create<WidgetAdapter>(): WidgetAdapterArray {
        return Object.create(WidgetAdapterArray.prototype);
    }

    watchRendered(w: Widget, callback?: (w: Widget) => void) {
        if (!callback) return;

        const content = this.map(wa => {
            return {
                wa,
                w: wa.widget,
                rc: wa.widget.renderCount()
            };
        });

        const intervalHandle = setInterval(() => {
            if (complete()) {
                clearInterval(intervalHandle);
                callback(w);
            }
        }, 20);

        function complete(): boolean {
            for (const item of content) {
                if (item.wa.isVisible && item.rc >= item.w.renderCount()) {
                    return false;
                }
            }
            return true;
        }
    }
}
