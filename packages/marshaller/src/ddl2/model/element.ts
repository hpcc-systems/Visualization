import { PropertyExt, publish, Widget } from "@hpcc-js/common";
import { DDL2 } from "@hpcc-js/ddl-shim";
import { ChartPanel } from "@hpcc-js/layout";
import { find, isArray } from "@hpcc-js/util";
import { Activity } from "../activities/activity";
import { HipiePipeline } from "../activities/hipiepipeline";
import { Mappings } from "../activities/project";
import { Visualization } from "./visualization";

export class State extends PropertyExt {

    constructor() {
        super();
        this.selection([]);
    }

    removeInvalid(data: ReadonlyArray<object>): boolean {
        const currSelection = this.selection();
        const newSelection: object[] = [];
        for (const selRow of currSelection) {
            if (find(data, (row: { [key: string]: any }, index): boolean => {
                for (const column in selRow) {
                    if (selRow[column] !== row[column]) {
                        return false;
                    }
                }
                return true;
            })) {
                newSelection.push(selRow);
            }
        }
        if (newSelection.length !== currSelection.length) {
            this.selection(newSelection);
            return true;
        }
        return false;
    }
}
State.prototype._class += " State";
export interface State {
    selection(): Array<{ [key: string]: any }>;
    selection(_: Array<{ [key: string]: any }>): this;
}
State.prototype.publish("selection", [], "array", "State");

let vizID = 0;
export class Element extends PropertyExt {
    private _elementContainer: ElementContainer;
    private _vizChartPanel: Visualization;

    // @publishProxy("_MultiChartPanel")
    // title: publish<this, string>;
    @publish(null, "widget", "Data View")
    hipiePipeline: publish<this, HipiePipeline>;
    @publish(null, "widget", "Visualization")
    _visualization: Visualization;
    visualization(): Visualization;
    visualization(_: Visualization): this;
    visualization(_?: Visualization): Visualization | this {
        if (!arguments.length) return this._visualization;
        this._visualization = _;
        this._visualization
            .on("click", (_row: object | object[], col: string, sel: boolean) => {
                const row: any[] = isArray(_row) ? _row : [_row];
                this.selection(sel ? row.map(r => r.__lparam || r) : []);
            })
            .on("vertex_click", (_row: object | object[], col: string, sel: boolean) => {
                const row: any[] = isArray(_row) ? _row : [_row];
                this.selection(sel ? row.map(r => r.__lparam || r) : []);
            })
            ;
        return this;
    }
    @publish(null, "widget", "State")
    state: publish<this, State>;

    constructor(ec: ElementContainer) {
        super();
        this._elementContainer = ec;
        vizID++;
        this._id = `e_${vizID}`;
        const view = new HipiePipeline(ec, this._id);
        this.hipiePipeline(view);
        this._vizChartPanel = new Visualization(this.hipiePipeline())
            .id(`viz_${vizID}`)
            .title(`Element ${vizID}`)
            ;
        this._vizChartPanel.chartPanel().id(`cp_${vizID}`);
        this.visualization(this._vizChartPanel);
        this.state(new State());
    }

    id(): string;
    id(_: string): this;
    id(_?: string): string | this {
        const retVal = super.id.apply(this, arguments);
        if (arguments.length) {
            this._vizChartPanel.id(_);
        }
        return retVal;
    }

    chartType(): string {
        return this._vizChartPanel.chartType();
    }

    chartPanel(): ChartPanel;
    chartPanel(_: ChartPanel): this;
    chartPanel(_?: ChartPanel): ChartPanel | this {
        if (!arguments.length) return this._vizChartPanel.chartPanel();
        this._vizChartPanel.chartPanel(_);
        return this;
    }

    chart(): Widget {
        return this._vizChartPanel.chartPanel().widget();
    }

    mappings(): Mappings;
    mappings(_: Mappings): this;
    mappings(_?: Mappings): Mappings | this {
        if (!arguments.length) return this._vizChartPanel.mappings();
        this._vizChartPanel.mappings(_);
        return this;
    }

    pipeline(activities: Activity[]): this {
        this.hipiePipeline()
            .activities(activities)
            ;
        return this;
    }

    dataProps(): PropertyExt {
        return this.hipiePipeline();
    }

    vizProps(): Widget {
        return this.visualization().chartPanel();
    }

    stateProps(): PropertyExt {
        return this.state();
    }

    async refresh() {
        await this.visualization().refresh();
        const data = this.hipiePipeline().outData();
        if (this.state().removeInvalid(data)) {
            this.selectionChanged();
        }
    }

    //  Selection  ---
    selection(): object[];
    selection(_: object[]): this;
    selection(_?: object[]): object[] | this {
        if (!arguments.length) return this.state().selection();
        this.state().selection(_);
        this.selectionChanged();
        return this;
    }

    //  Events  ---
    selectionChanged() {
        const promises: Array<Promise<void>> = [];
        for (const filteredViz of this._elementContainer.filteredBy(this.id())) {
            promises.push(filteredViz.refresh());
        }
        Promise.all(promises).then(() => {
            this._elementContainer.vizStateChanged(this);
        });
    }

    monitor(func: (id: string, newVal: any, oldVal: any, source: PropertyExt) => void): { remove: () => void; } {
        return this.hipiePipeline().monitor(func);
    }
}
Element.prototype._class += " Viz";

export interface IPersist {
    ddl: DDL2.Schema;
    layout: any;
}

export class ElementContainer extends PropertyExt {
    private _elements: Element[] = [];
    private _nullElement = new Element(this);

    clear(eid?: string) {
        if (typeof eid === "undefined") {
            this._elements = [];
        } else {
            let element_idx;
            for (const _element of this._elements) {
                if (_element.id() === eid) {
                    element_idx = this._elements.indexOf(_element);
                }
            }
            if (typeof element_idx !== "undefined") {
                this._elements = this._elements
                    .slice(0, element_idx)
                    .concat(
                        this._elements.slice(element_idx + 1)
                    );
            }
        }
    }

    elements(): Element[] {
        return [...this._elements];
    }

    element(w: string | PropertyExt): Element {
        let retVal: Element[];
        if (typeof w === "string") {
            retVal = this._elements.filter(viz => viz.id() === w);
        } else {
            retVal = this._elements.filter(v => v.vizProps() === w);
        }
        if (retVal.length) {
            return retVal[0];
        }
        return this._nullElement;
    }

    elementIDs() {
        return this._elements.map(viz => viz.id());
    }

    append(element: Element): this {
        this._elements.push(element);
        return this;
    }

    filteredBy(vizID: string): Element[] {
        return this._elements.filter(otherViz => {
            const filterIDs = otherViz.hipiePipeline().updatedBy();
            return filterIDs.indexOf(vizID) >= 0;
        });
    }

    views(): HipiePipeline[] {
        return this._elements.map(viz => viz.hipiePipeline());
    }

    view(id: string): HipiePipeline | undefined {
        return this.views().filter(view => view.id() === id)[0];
    }

    normalizePersist(seri: any): { [key: string]: { [key: string]: any } } {
        const ret = {};
        seri.__properties.content.map((n) => {
            const _is_MegaChart = !!n.__properties.widget.__properties.chart;
            const _cell = n;
            const _panel = n.__properties.widget;
            const _widget = _is_MegaChart ? n.__properties.widget.__properties.chart : n.__properties.widget.__properties.widget;
            const _id = n.__properties.widget.__id ? n.__properties.widget.__id : n.__properties.widget.__properties.widget.__id;
            ret[_id] = {
                id: _id,
                package: _widget.__class.split("_")[0],
                object: _widget.__class.split("_")[1],
                cell: _get_params(_cell, ["chart", "widget", "fields"]),
                panel: _get_params(_panel, ["chart", "widget", "fields"]),
                widget: _get_params(_widget, ["fields"]),
            };
        });
        return ret;
        function _get_params(_o, exclude_list) {
            const ret = {};
            Object.keys(_o.__properties)
                .filter(n => exclude_list.indexOf(n) === -1)
                .forEach(n => ret[n] = _o.__properties[n]);
            return ret;
        }
    }

    validate() {
        const retVal: Array<{ elementID: string, source: string, msg: string, hint: string }> = [];
        for (const element of this._elements) {
            const pipeline = element.hipiePipeline();
            for (const activity of pipeline.activities()) {
                for (const error of activity.validate()) {
                    retVal.push({
                        elementID: element.id(),
                        ...error
                    });
                }
            }
        }
        return retVal;
    }

    async refresh(): Promise<this> {
        await Promise.all(this.elements().map(element => element.refresh()));
        return this;
    }

    //  Events  ---
    vizStateChanged(viz: Element) {
    }
}
ElementContainer.prototype._class += " dashboard_ElementContainer";
