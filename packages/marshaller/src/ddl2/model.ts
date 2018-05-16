import { Database, PropertyExt, publish, Widget } from "@hpcc-js/common";
import { MultiChart, MultiChartPanel } from "@hpcc-js/composite";
import { DDL2 } from "@hpcc-js/ddl-shim";
import { ChartPanel } from "@hpcc-js/layout";
import { find } from "@hpcc-js/util";
import { Activity } from "./activities/activity";
import { HipiePipeline } from "./activities/hipiepipeline";

export class State extends PropertyExt {

    constructor() {
        super();
        this.selection([]);
    }

    removeInvalid(data: ReadonlyArray<object>) {
        const newSelection: object[] = [];
        for (const selRow of this.selection()) {
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
        this.selection(newSelection);
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
    private _MultiChartPanel: MultiChartPanel = new MultiChartPanel();

    // @publishProxy("_MultiChartPanel")
    // title: publish<this, string>;
    @publish(null, "widget", "Data View")
    hipiePipeline: publish<this, HipiePipeline>;
    @publish(null, "widget", "Visualization")
    _widget: ChartPanel;
    chartPanel(): ChartPanel;
    chartPanel(_: ChartPanel): this;
    chartPanel(_?: ChartPanel): ChartPanel | this {
        if (!arguments.length) return this._widget;
        this._widget = _;
        this._widget
            .on("click", (row: any, col: string, sel: boolean) => {
                if (sel) {
                    this.state().selection([row.__lparam || row]);
                } else {
                    this.state().selection([]);
                }
            })
            .on("vertex_click", (row: any, col: string, sel: boolean) => {
                if (sel) {
                    this.state().selection([row.__lparam || row]);
                } else {
                    this.state().selection([]);
                }
            })
            ;
        return this;
    }
    multiChartPanel(): MultiChartPanel;
    multiChartPanel(_: MultiChartPanel): this;
    multiChartPanel(_?: MultiChartPanel): MultiChartPanel | this {
        if (!arguments.length) return this._widget as MultiChartPanel;
        this._widget = _;
        this._widget
            .on("click", (row: object, col: string, sel: boolean) => {
                this.state().selection(sel ? [row] : []);
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
        const view = new HipiePipeline(ec, `p_${vizID}`);
        this.hipiePipeline(view);
        this._MultiChartPanel
            .id(`cp_${vizID}`)
            .title(this.id())
            .chartType("TABLE")
            ;
        this.chartPanel(this._MultiChartPanel);
        this.state(new State());
    }

    id(): string;
    id(_: string): this;
    id(_?: string): string | this {
        const retVal = super.id.apply(this, arguments);
        if (arguments.length) {
            this._MultiChartPanel.id(_);
        }
        return retVal;
    }

    chartType(): string {
        return this._MultiChartPanel.chartType();
    }

    chart(): Widget {
        let widget = this._MultiChartPanel.widget();
        if (widget instanceof MultiChart) {
            widget = widget.chart();
        }
        return widget;
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
        return this.chartPanel();
    }

    stateProps(): PropertyExt {
        return this.state();
    }

    toDBFields(fields: DDL2.IField[]): Database.Field[] {
        const retVal: Database.Field[] = [];
        for (const field of fields) {
            const f = new Database.Field()
                .id(field.id)
                .label(field.id)
                ;
            if (field.children) {
                f.children(this.toDBFields(field.children));
            }
            retVal.push(f);
        }
        return retVal;
    }

    toDBData(fields: Database.Field[], data) {
        return data.map((row: any) => {
            const retVal = [];
            for (const field of fields) {
                if (field.type() === "nested") {
                    retVal.push(this.toDBData(field.children() as Database.Field[], row[field.id()].Row || row[field.id()]));
                } else {
                    retVal.push(row[field.label()]);
                }
            }
            return retVal;
        });
    }

    async refresh(localMeta: boolean = false) {
        // TODO - just wrong for DashPOC  ---
        this.chartPanel().startProgress && this.chartPanel().startProgress();
        const view = this.hipiePipeline();
        await view.refreshMeta();
        const mappings = view.last();
        const fields = this.toDBFields(mappings.outFields());
        await mappings.exec();
        const data = mappings.outData();
        const mappedData = this.toDBData(fields, data);

        this.chartPanel().finishProgress && this.chartPanel().finishProgress();
        this.chartPanel()
            .fields(fields.filter(f => f.id() !== "__lparam"))
            .data(mappedData)
            .render()
            ;
        this.state().removeInvalid(data);
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

    clear() {
        this._elements = [];
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
        element.state().monitorProperty("selection", () => {
            element.selectionChanged();
        });
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

    async refresh(localMeta: boolean = false): Promise<this> {
        await Promise.all(this.elements().map(viz => viz.refresh(localMeta)));
        return this;
    }

    //  Events  ---
    vizStateChanged(viz: Element) {
    }
}
ElementContainer.prototype._class += " dashboard_ElementContainer";
