import { PropertyExt, publish, publishProxy, Widget } from "@hpcc-js/common";
import { MultiChartPanel } from "@hpcc-js/composite";
import { DDL1 } from "@hpcc-js/ddl-shim";
import { ChartPanel } from "@hpcc-js/layout";
import { find } from "@hpcc-js/util";
import { Activity } from "./activities/activity";
import { HipiePipeline } from "./activities/hipiepipeline";
import { DDL2, DDLAdapter } from "./ddl";
import { DDLImport } from "./ddlimport";

export class State extends PropertyExt {

    constructor() {
        super();
        this.selection([]);
    }

    removeInvalid(data: object[]) {
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

    @publishProxy("_MultiChartPanel")
    title: publish<this, string>;
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
                this.state().selection(sel ? [row.__lparam ? row.__lparam : row] : []);
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
        this._id = `element_${vizID}`;
        const view = new HipiePipeline(ec, `pipeline_${vizID}`);
        this.hipiePipeline(view);
        this._MultiChartPanel
            .id(`viz_${vizID}`)
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

    pipeline(activities: Activity[]): this {
        this.hipiePipeline().activities(activities);
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

    async refresh() {
        const view = this.hipiePipeline();
        await view.refreshMeta();
        const columns = view.mappings().outFields().map(field => field.label);
        // const fields = view.outFields().map(field => new Field());
        await view.mappings().exec();
        const data = view.mappings().pullData();
        const mappedData = data.map((row: any) => {
            const retVal = [];
            for (const column of columns) {
                retVal.push(row[column]);
            }
            if (row.__lparam) {
                retVal.push(row.__lparam);
            }
            return retVal;
        });
        this.chartPanel()
            .columns(columns)
            .data(mappedData)
            .lazyRender()
            ;
        this.state().removeInvalid(data);
    }

    //  Events  ---
    selectionChanged() {
        const promises: Array<Promise<void>> = [];
        for (const filteredViz of this._elementContainer.filteredBy(this)) {
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

    elements() {
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

    filteredBy(viz: Element): Element[] {
        return this._elements.filter(otherViz => {
            const filterIDs = otherViz.hipiePipeline().updatedBy();
            return filterIDs.indexOf(viz.id()) >= 0;
        });
    }

    views(): HipiePipeline[] {
        return this._elements.map(viz => viz.hipiePipeline());
    }

    view(id: string): HipiePipeline | undefined {
        return this.views().filter(view => view.id() === id)[0];
    }

    ddl(): DDL2.Schema;
    ddl(_: DDL2.Schema): this;
    ddl(_?: DDL2.Schema): DDL2.Schema | this {
        const ddlAdapter = new DDLAdapter(this);
        if (!arguments.length) return ddlAdapter.write();
        this.clear();
        ddlAdapter.read(_);
        return this;
    }

    importV1DDL(url: string, ddlObj: DDL1.DDLSchema, seri?: object) {
        const ddl = new DDLImport(this, url, ddlObj);
        if (seri) {
            // try {
            const props = this.normalizePersist(seri);
            for (const element of this.elements()) {
                const mcp = element.multiChartPanel();
                const mc = mcp.multiChart();
                const _props = props[mcp.id()];
                let _chartType;
                for (const n in mc._allChartTypesMap) {
                    _chartType = mc._allChartTypesMap[n].widgetClass === `${_props.package}_${_props.object}` ? mc._allChartTypesMap[n].id : _chartType;
                }
                _chartType = _chartType === "TABLE_LEGACY" ? "TABLE" : _chartType;
                if (_chartType) {
                    mcp
                        .chartType(_chartType)
                        .chartTypeProperties(_props.widget)
                        ;
                }
            }
            // } catch (e) { }
        }
        ddl;
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

    async refresh(): Promise<this> {
        await Promise.all(this.elements().map(viz => viz.refresh()));
        return this;
    }

    //  Events  ---
    vizStateChanged(viz: Element) {
    }
}
ElementContainer.prototype._class += " dashboard_ElementContainer";
