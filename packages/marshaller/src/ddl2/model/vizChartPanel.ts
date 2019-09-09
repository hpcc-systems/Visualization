import { Spacer, ToggleButton, Widget } from "@hpcc-js/common";
import { ChartPanel, Modal } from "@hpcc-js/layout";

export interface IVizPopupPanelOwner {
    vizActivation(viz);
}

export class VizPopupPanel extends Modal {

    private _owner: IVizPopupPanelOwner;
    private _ownerLParam;

    constructor(owner: IVizPopupPanelOwner, ownerLParam) {
        super();
        this._owner = owner;
        this._ownerLParam = ownerLParam;
        this._drawStartPos = "origin";
        this.visible(false);
        this.minHeight_default("240px");
        this.minWidth_default("320px");
        this.overflowY_default("hidden");
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
        domNode.parentElement.style.position = "absolute";
        const widgetTitle = (this.widget() as any).title();
        if (widgetTitle) {
            this.title(widgetTitle);
            (this.widget() as any).titleVisible(false);
        }
        super.enter(domNode, element);
    }

    update(domNode, element) {
        this.fixedTop(this._pos.y + "px");
        this.fixedLeft(this._pos.x + "px");
        super.update(domNode, element);
    }

    closeModal() {
        super.closeModal();
        if (this._host) {
            this._host._togglePopup
                .selected(false)
                .render()
                ;
        }
    }
}
VizPopupPanel.prototype._class += " marshaller_VizPopupPanel";

export interface VizPopupPanel {
    widget(_: Widget): this;
    widget(): Widget;
    widget_exists(): boolean;
    minHeight_default(_: string);
    minWidth_default(_: string);
    overflowY_default(_: string);
}

//  ===========================================================================

export interface VizChartPanel {
}

export class VizChartPanel extends ChartPanel {

    private _popup: VizPopupPanel;
    _togglePopup = new ToggleButton().faChar("fa-filter").tooltip("Filter")
        .on("click", () => {
            this._popup.host(this);
            const dp = this.locateClosestAncestor(["marshaller_DashboardDockPanel", "marshaller_DashboardGrid"]);
            const dpBBox = dp.getBBox(true);
            const cp = this._popup.widget() as VizChartPanel;
            const tbBBox = this._togglePopup.getBBox();
            this._popup
                .pos({
                    x: -dpBBox.x + tbBBox.x + tbBBox.width - cp.minWidth(),
                    y: -dpBBox.y + tbBBox.y + tbBBox.height
                })
                .resize({ width: cp.minWidth(), height: cp.minHeight() })
                .visible(this._togglePopup.selected())
                .render((popup: any) => {
                    const widgetSelector = "#" + popup.id() + " .layout_Carousel .common_Widget";
                    const { height, width } = popup.element().node().querySelector(widgetSelector).getBoundingClientRect();
                    popup.resizeBodySync(width, height);
                })
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
