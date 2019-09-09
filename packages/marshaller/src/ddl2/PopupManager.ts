import { IMonitorHandle, Widget } from "@hpcc-js/common";
import { compare } from "@hpcc-js/util";
import { ElementContainer } from "./model/element";
import { IVizPopupPanelOwner, VizChartPanel, VizPopupPanel } from "./model/vizChartPanel";

export class PopupManager extends Widget implements IVizPopupPanelOwner {
    protected _ec: ElementContainer;
    protected _popups: VizPopupPanel[] = [];
    protected _popupIdx: {
        [id: string]: {
            panel: VizPopupPanel,
            monitorHandle: IMonitorHandle
        }
    } = {};

    popupPanels(): VizPopupPanel[] {
        if (!this._popups) this._popups = [];
        if (!this._popupIdx) this._popupIdx = {};
        return this._popups;
    }

    popupChartPanels(): VizChartPanel[] {
        return this.popupPanels().map(p => p.widget() as VizChartPanel);
    }

    addPopup(cp: VizChartPanel) {
        const elem = this._ec.element(cp);
        const targetNode = this.element().node();
        const pp = new VizPopupPanel(this, elem)
            .target(targetNode)
            .widget(cp)
            .relativeTargetId(this.id())
            .size({
                width: cp.minWidth(),
                height: cp.minHeight()
            });
        this._popups.push(pp);
        this._popupIdx[cp.id()] = {
            panel: pp,
            monitorHandle: cp.monitor((id) => {
                switch (id) {
                    case "minWidth":
                    case "minHeight":
                        pp
                            .resize({ width: cp.minWidth(), height: cp.minHeight() })
                            .render()
                            ;
                        break;
                }
            })
        };
        this._ec.filteredBy(elem.id()).forEach(otherElem => {
            otherElem.visualization().chartPanel().popup(pp);
        });
    }

    removePopup(cp: VizChartPanel) {
        const elem = this._ec.element(cp);
        this._ec.filteredBy(elem.id()).forEach(otherElem => {
            otherElem.visualization().chartPanel().popup(null);
        });
        this._popupIdx[cp.id()].panel.target(null);
        this._popupIdx[cp.id()].monitorHandle.remove();
        cp.target(null);
        delete this._popupIdx[cp.id()];
        this._popups = this._popups.filter(p => p.widget() !== cp);
    }

    syncPopups() {
        const prevPopups = this.popupChartPanels();
        const diffPopups = compare(prevPopups, this._ec.elements()
            .filter(e => e.visualization().visibility() === "flyout")
            .map((elem: any) => elem.visualization().chartPanel()))
            ;

        for (const w of diffPopups.removed) {
            this.removePopup(w);
        }

        for (const w of diffPopups.added) {
            this.addPopup(w);
        }

        return this;
    }

    vizActivation() {
    }
}
