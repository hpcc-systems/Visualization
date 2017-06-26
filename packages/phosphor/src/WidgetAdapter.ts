import { HTMLWidget, SVGWidget } from "@hpcc-js/common";
import { Message, Widget } from "@hpcc-js/phosphor-shim";
import { select as d3Select } from "d3-selection";

import "../src/WidgetAdapter.css";

export class WidgetAdapter extends Widget {
    base: any = this;
    protected _element;
    _widget: HTMLWidget | SVGWidget;
    get widget() { return this._widget; }
    lparam: any = {};

    constructor(name: string, widget: HTMLWidget | SVGWidget, lparam: any = {}) {

        super();
        this._element = d3Select(this.base.node);
        // this.setFlag(Widget.Flag.DisallowLayout);
        this.base.addClass("phosphor_WidgetAdapter");
        // this.addClass(name.toLowerCase());
        this.base.title.label = name;
        this.base.title.closable = false;
        this.base.title.caption = `Long description for: ${name}`;

        this._widget = widget
            .target(this.base.node)
            ;
        this.lparam = lparam;
    }

    get inputNode(): HTMLInputElement {
        return this.base.node.getElementsByTagName("input")[0] as HTMLInputElement;
    }

    protected onActivateRequest(msg: Message): void {
        if (this.base.isAttached) {
        }
    }
    protected onResize(msg: Widget.ResizeMessage): void {
        super.onResize(msg);
        if (msg.width < 0 || msg.height < 0) {
            // this._colChart.refresh();
        } else {

            d3Select(this.base.node)
                .style("width", msg.width + "px") //  adjust for padding
                .style("height", msg.height + "px") //  adjust for padding
                ;
            this._widget
                .resize({ width: msg.width - 20, height: msg.height - 20 })
                .lazyRender()
                ;
        }
    }
}
