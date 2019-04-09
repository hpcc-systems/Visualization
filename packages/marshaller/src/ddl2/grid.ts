import { IMonitorHandle, Widget } from "@hpcc-js/common";
import { Cell, Grid } from "@hpcc-js/layout";
import { IClosable, WidgetAdapter } from "@hpcc-js/phosphor";
import { compare } from "@hpcc-js/util";
import { IDockPanel } from "./dashboard";
import { Element, ElementContainer } from "./model/element";
import { IVizPopupPanelOwner, VizChartPanel, VizPopupPanel } from "./model/vizChartPanel";

export class DashboardGrid extends Grid implements IClosable, IVizPopupPanelOwner, IDockPanel {
    private _layoutCache = [];
    constructor(private _ec: ElementContainer) {
        super();

        // this.fitTo_default("width");
        this.designMode_default(true);
        this.adaptiveSnapping_default(true);
        this.showLanes_default(false);
        // this.snappingColumns_default(900);
        // this.snappingRows_default(900);
        // this.squareDesignMode_default(true);
    }

    private _popups: VizPopupPanel[] = [];
    private _popupIdx: {
        [id: string]: {
            panel: VizPopupPanel,
            monitorHandle: IMonitorHandle
        }
    } = {};
    updateGrid(resize, transitionDuration: number = 0, _noRender: boolean = false) {
        super.updateGrid(resize, transitionDuration, _noRender);
        this._layoutCache = this.content().map(cellWidget => {
            return [
                cellWidget.gridCol(),
                cellWidget.gridRow(),
                cellWidget.gridColSpan(),
                cellWidget.gridRowSpan()
            ];
        });
    }
    layoutObj(_: object | null): this {
        if (_) {
            if ((_ as any).main) {
                const convertedLayout = ddl2_layout(_, 10, 10);
                this._layoutCache = convertedLayout;
            } else if (_ instanceof Array) {
                this._layoutCache = _;
            }
        }
        return this;

        function ddl2_layout(layoutObject, rows, cols) {
            const ret = [];
            dive(layoutObject.main, 0, 0, rows, cols);
            return ret;
            function dive(o, x, y, w, h) {
                if (o.children) {
                    if (o.type === "split-area") {
                        if (o.orientation === "horizontal") {
                            o.children.forEach((child, i) => {
                                const _w = o.sizes[i] * w;
                                const _h = h;
                                const _x = i === 0 ? x : x + o.sizes[0] * w;
                                const _y = y;
                                dive(o.children[i], _x, _y, _w, _h);
                            });
                        } else if (o.orientation === "vertical") {
                            o.children.forEach((child, i) => {
                                const _w = w;
                                const _h = o.sizes[i] * h;
                                const _x = x;
                                const _y = i === 0 ? y : y + o.sizes[0] * h;
                                dive(o.children[i], _x, _y, _w, _h);
                            });
                        } else {
                            console.error("wtf");
                            console.log("o", o);
                        }
                    } else if (o.type === "tab-area") {
                        o.children.forEach((child, i) => {
                            const _w = w;
                            const _h = o.sizes[i] * h;
                            const _x = x;
                            const _y = i === 0 ? y : y + o.sizes[0] * h;
                            dive(o.children[i], _x, _y, _w, _h);
                        });
                    }
                } else {
                    ret.push([x, y, w, h].map(Math.round));
                }
            }
        }
    }
    layout() {
        return this._layoutCache;
    }
    widgets() {
        return this.content().map(c => c.widget());
    }
    hideSingleTabs() {
        console.log("hideSingleTabs currently does nothing");
        return true;
    }
    getWidgetAdapter() {
        console.log("called getWidgetAdapter");
        console.log("getWidgetAdapter currently does nothing");
    }

    popupPanels(): VizPopupPanel[] {
        return this._popups;
    }

    popupChartPanels(): VizChartPanel[] {
        return this._popups.map(p => p.widget() as VizChartPanel);
    }

    addPopup(cp: VizChartPanel) {
        console.log("cp", cp);
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
            monitorHandle: cp.monitor((id, newVal, oldVal) => {
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

    updateTitle(w: Widget) {
        const cell: Cell = this.getWidgetCell(w.id());
        const element: Element = this._ec.element(w);
        const errors = element.validate();
        const tabTitle = this.tabTitle(element);
        const caption = errors.map(err => `${err.source}:  ${err.msg}`).join("\n");
        console.log("caption", caption);
        (cell.widget() as any)
            .title(tabTitle)
            // .altText(caption)
            ;
    }

    activate(element: Element) {
        console.log("tried to activate this element:", element);
        // const wa = this.getWidgetAdapter(element.visualization().chartPanel());
        // if (wa) {
        //     wa.activate();
        // }
    }

    removeWidget(w: Widget) {
        const cell = this.getWidgetCell(w.id());
        this.clearContent(cell);
    }

    syncMinSize(w: any): boolean {
        if (w.minWidth_exists() || w.minHeight_exists()) {
            const cell: Cell = this.getWidgetCell(w.id());
            cell.element()
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

        const prevPopups = this.popupChartPanels();
        const diffPopups = compare(prevPopups, this._ec.elements().filter(e => e.visualization().visibility() === "flyout").map((elem: Element) => elem.visualization().chartPanel()));

        for (const w of diffWidgets.removed) {
            this.removeWidget(w);
        }
        for (const w of diffPopups.removed) {
            this.removePopup(w);
        }
        for (const widget of diffWidgets.added) {
            const element: Element = this._ec.element(widget);
            const i = this.content().length;
            if (this._layoutCache && this._layoutCache[i]) {
                const [x, y, w, h] = this._layoutCache[i];
                this.setContent(y, x, element.visualization().chartPanel(), "", h, w);
            } else {
                this.snappingRows_default(i);
                this.setContent(i, 0, element.visualization().chartPanel(), "", 1, 1);
            }
        }
        for (const w of diffPopups.added) {
            this.addPopup(w);
        }

        for (const w of diffWidgets.unchanged) {
            this.updateTitle(w);
        }
        this._popups.forEach(p => p.render());

        return this;
    }

    //  Events  ---
    childActivation(w: Widget, wa?: WidgetAdapter) {
        this.vizActivation(this._ec.element(w));
    }

    postSelectionChange() {
        super.postSelectionChange();
        const selected = this._selectionBag.get();
        if (selected.length > 0) {
            this.childActivation(selected[0].widget.widget());
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

    fitTo_default: { (): string; (_: string): DashboardGrid; };
    designMode_default: { (): boolean; (_: boolean): DashboardGrid; };
    adaptiveSnapping_default: { (): boolean; (_: boolean): DashboardGrid; };
    showLanes_default: { (): boolean; (_: boolean): DashboardGrid; };
    snappingColumns_default: { (): number; (_: number): DashboardGrid; };
    snappingRows_default: { (): number; (_: number): DashboardGrid; };
    squareDesignMode_default: { (): boolean; (_: boolean): DashboardGrid; };
}
