import { HTMLWidget, Spacer, ToggleButton, Widget } from "@hpcc-js/common";
import { ChartPanel } from "@hpcc-js/layout";

export interface IVizPopupPanelOwner {
    vizActivation(viz);
}

export class VizPopupPanel extends HTMLWidget {

    private _owner: IVizPopupPanelOwner;
    private _ownerLParam;

    constructor(owner: IVizPopupPanelOwner, ownerLParam) {
        super();
        this._owner = owner;
        this._ownerLParam = ownerLParam;
        this._drawStartPos = "origin";
        this
            .pos({ x: 0, y: 0 })
            .size({ width: 640, height: 480 })
            .visible(false)
            ;
    }

    private _host: VizChartPanel;
    host(_?: VizChartPanel): VizChartPanel | this {
        if (!arguments.length) return this._host;
        if (this._host && this._host !== _) {
            this._host._togglePopup
                .selected(false)
                .render()
                ;
        }
        this._host = _;
        this._owner.vizActivation(this._ownerLParam);
        return this;
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        element
            .attr("tabindex", "-1")
            .classed("p-Widget", true)
            .classed("p-Menu", true)
            ;
    }

    update(domNode, element) {
        super.update(domNode, element);
        const widgets = element.selectAll(".popupWidget").data(this.widget_exists() ? [this.widget()] : []);
        widgets.enter().append("div")
            .attr("class", "popupWidget")
            .each(function (w) {
                w.target(this);
            })
            .merge(widgets)
            .style("width", `${this.width() - 2}px`)
            .style("height", `${this.height() - 8}px`)
            .style("overflow", "hidden")
            .each(function (w) {
                w
                    .resize()
                    .render()
                    ;
            })
            .exit().each(function (w) {
                w.target(null);
            })
            .remove();
    }

    postUpdate(domNode, element) {
        super.postUpdate(domNode, element);
        this._element
            .style("position", null)
            .style("left", this._pos.x + "px")
            .style("top", this._pos.y + "px")
            .style("width", `${this.width()}px`)
            .style("height", `${this.height()}px`)
            ;
    }
}
VizPopupPanel.prototype._class += " marshaller_VizPopupPanel";

export interface VizPopupPanel {
    widget(_: Widget): this;
    widget(): Widget;
    widget_exists(): boolean;
}

VizPopupPanel.prototype.publish("widget", null, "widget", "Widget", null, { render: false });

//  ===========================================================================

export interface VizChartPanel {
}

export class VizChartPanel extends ChartPanel {

    private _popup: VizPopupPanel;
    _togglePopup = new ToggleButton().faChar("fa-filter").tooltip("Filter")
        .on("click", () => {
            this._popup.host(this);
            const dp = this.locateAncestor("phosphor_DockPanel");
            const dpBBox = dp.getBBox();
            const cp = this._popup.widget() as VizChartPanel;
            /*
            // const cpBBox = this.getBBox();
            const ppBBox = this._popup.getBBox();
            */
            const tbBBox = this._togglePopup.getBBox();
            this._popup
                .pos({
                    x: -dpBBox.x + tbBBox.x + tbBBox.width - cp.minWidth(), // tbBBox.x + tbBBox.width - ppBBox.width,
                    y: -dpBBox.y + tbBBox.y + tbBBox.height  // (tbBBox.y - dpBBox.y) + (tbBBox.height - dpBBox.height)
                })
                .resize({ width: cp.minWidth(), height: cp.minHeight() })
                .visible(this._togglePopup.selected())
                .render()
                ;
        });

    private _origButtons: Widget[];
    private _filterButtons: Widget[];

    constructor() {
        super();

        this._origButtons = this.buttons();
        this._filterButtons = [this._togglePopup, new Spacer(), ...this._origButtons];
    }

    popup(_?: VizPopupPanel): VizPopupPanel | this {
        if (!arguments.length) return this._popup;
        this._popup = _;
        this.buttons(this._popup ? this._filterButtons : this._origButtons);
        return this;
    }
}
VizChartPanel.prototype._class += " marshaller_VizChartPanel";

export interface VizChartPanel {
    minWidth(): number;
    minWidth(_: number): this;
    minWidth(_: number): this;
    minWidth_exists(): boolean;
    minHeight(): number;
    minHeight(_: number): this;
    minHeight_exists(): boolean;
}
VizChartPanel.prototype.publish("descriptionTemplate", "", "string");
VizChartPanel.prototype.publish("minWidth", 320, "number", "Min Width");
VizChartPanel.prototype.publish("minHeight", 240, "number", "Min Height");
