import { IMonitorHandle, Widget } from "@hpcc-js/common";
import { DockPanel, IClosable, WidgetAdapter } from "@hpcc-js/phosphor";
import { compare } from "@hpcc-js/util";
import { select as d3Select } from "d3-selection";
import { Element, ElementContainer } from "./model/element";
import { IVizPopupPanelOwner, VizChartPanel, VizPopupPanel } from "./model/vizChartPanel";

export class DashboardDockPanel extends DockPanel implements IClosable, IVizPopupPanelOwner {

    constructor(private _ec: ElementContainer) {
        super();
    }

    private _popups: VizPopupPanel[] = [];
    private _popupIdx: {
        [id: string]: {
            panel: VizPopupPanel,
            monitorHandle: IMonitorHandle
        }
    } = {};

    popupPanels(): VizPopupPanel[] {
        return this._popups;
    }

    popupChartPanels(): VizChartPanel[] {
        return this._popups.map(p => p.widget() as VizChartPanel);
    }

    addPopup(cp: VizChartPanel) {
        const elem = this._ec.element(cp);
        const pp = new VizPopupPanel(this, elem)
            .target(this.element().node())
            .widget(cp)
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

    tabTitle(element: Element): string {
        if (this.hideSingleTabs()) {
            return element.visualization().title ? element.visualization().title() : element.visualization().id();
        }
        return element.id();
    }

    titleClassed(wa: WidgetAdapter, classID: string, include: boolean) {
        let classes = wa.title.className.split(" ");
        if (include && classes.indexOf(classID) < 0) {
            classes.push(classID);
        } else if (!include && classes.indexOf(classID) > 0) {
            classes = classes.filter(c => c !== classID);
        }
        wa.title.className = classes.join(" ");
    }

    updateTitle(w: Widget) {
        const wa: WidgetAdapter = this.getWidgetAdapter(w);
        const element: Element = this._ec.element(w);
        const errors = element.validate();
        wa.title.label = this.tabTitle(element);
        this.titleClassed(wa, "error", errors.length > 0);
        wa.title.caption = errors.map(err => `${err.source}:  ${err.msg}`).join("\n");
    }

    activate(element: Element) {
        const wa = this.getWidgetAdapter(element.visualization().chartPanel());
        if (wa) {
            wa.activate();
        }
    }

    syncMinSize(w: any): boolean {
        if (w.minWidth_exists() || w.minHeight_exists()) {
            const wa = this.getWidgetAdapter(w);
            d3Select(wa.node)
                .style("min-width", `${w.minWidth()}px`)
                .style("min-height", `${w.minHeight()}px`)
                ;
            return true;
        }
        return false;
    }

    syncWidgets() {
        const prevWidgets = this.widgets();
        const diffWidgets = compare(prevWidgets, this._ec.elements().filter(e => e.visualization().visibility() === "normal").map(viz => viz.visualization().chartPanel()));

        let refit = false;
        for (const w of diffWidgets.removed) {
            this.removeWidget(w);
        }

        for (const w of diffWidgets.added) {
            const element: Element = this._ec.element(w);
            this.addWidget(w, this.tabTitle(element), "split-bottom", undefined, this.hideSingleTabs() ? undefined : this);
            refit = this.syncMinSize(w) || refit;  // ensure syncMinSize is called
        }

        for (const w of diffWidgets.unchanged) {
            this.updateTitle(w);
            refit = this.syncMinSize(w) || refit;  // ensure syncMinSize is called
        }

        if (refit) {
            this.refit();
        }

        return this;
    }

    syncPopups() {
        const prevPopups = this.popupChartPanels();
        const diffPopups = compare(prevPopups, this._ec.elements().filter(e => e.visualization().visibility() === "flyout").map((elem: Element) => elem.visualization().chartPanel()));

        for (const w of diffPopups.removed) {
            this.removePopup(w);
        }

        for (const w of diffPopups.added) {
            this.addPopup(w);
        }

        this._popups.forEach(p => p.render());

        return this;
    }

    //  Events  ---
    childActivation(w: Widget, wa: WidgetAdapter) {
        super.childActivation(w, wa);
        this.vizActivation(this._ec.element(w));
        for (const wa2 of this.widgetAdapters()) {
            if (wa2 === wa) {
                wa2.addClass("active");
                this.titleClassed(wa2, "active", true);
                wa2.title.iconClass = "active";
            } else {
                wa2.removeClass("active");
                this.titleClassed(wa2, "active", false);
                wa2.title.iconClass = "";
            }
        }
    }

    vizActivation(viz: Element) {
    }

    //  IClosable  ---
    canClose(w: Widget, wa: WidgetAdapter): boolean {
        const id = this._ec.element(w).id();
        const retVal = window.confirm(`Remove Widget "${id}"?`);
        if (retVal) {
            this._ec.clear(id);
            this.syncWidgets();
            this.vizActivation(undefined);
        }
        return retVal;
    }
}
DashboardDockPanel.prototype._class += " marshaller_DashboardDockPanel";
