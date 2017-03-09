import { Message } from "@phosphor/messaging";
import { Widget as PWidget } from "@phosphor/widgets";
import { select as d3Select } from "d3-selection";
import { HTMLWidget } from "../common/HTMLWidget";
import { SVGWidget } from "../common/SVGWidget";

import "./WidgetAdapter.css";

export class WidgetAdapter<T extends HTMLWidget | SVGWidget> extends PWidget {
    _element;
    _viz: T;
    get viz() { return this._viz; }

    constructor(name: string, VizWidget: { new (): T; }) {
        super();
        this._element = d3Select(this.node);
        // this.setFlag(Widget.Flag.DisallowLayout);
        this.addClass("phosphor_WidgetAdapter");
        // this.addClass(name.toLowerCase());
        this.title.label = name;
        this.title.closable = false;
        this.title.caption = `Long description for: ${name}`;

        this._viz = new VizWidget()
            .target(this.node)
            ;
    }

    get inputNode(): HTMLInputElement {
        return this.node.getElementsByTagName("input")[0] as HTMLInputElement;
    }

    protected onActivateRequest(msg: Message): void {
        if (this.isAttached) {
        }
    }
    protected onResize(msg: PWidget.ResizeMessage): void {
        if (msg.width < 0 || msg.height < 0) {
            // this._colChart.refresh();
        } else {
            d3Select(this.node)
                .style("width", msg.width - 4 + "px") //  adjust for padding
                .style("height", msg.height - 4 + "px") //  adjust for padding
                ;
            this._viz
                .resize({ width: msg.width - 20, height: msg.height - 20 })
                .render()
                ;
        }
    }
}
