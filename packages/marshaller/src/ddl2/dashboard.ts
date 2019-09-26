import { Button, Spacer, ToggleButton, Widget } from "@hpcc-js/common";
import { DDL1, DDL2, isDDL2Schema, upgrade } from "@hpcc-js/ddl-shim";
import { ChartPanel } from "@hpcc-js/layout";
import { text as d3Text } from "d3-fetch";
import { Activity } from "./activities/activity";
import { Databomb } from "./activities/databomb";
import { DSPicker } from "./activities/dspicker";
import { Filters } from "./activities/filter";
import { Form } from "./activities/form";
import { GroupBy } from "./activities/groupby";
import { Limit } from "./activities/limit";
import { Project } from "./activities/project";
import { Sort } from "./activities/sort";
import { DashboardDockPanel } from "./dashboardDockPanel";
import { DashboardGrid } from "./dashboardGrid";
import { DDLAdapter } from "./ddl";
import { JavaScriptAdapter } from "./javascriptadapter";
import { Element, ElementContainer } from "./model/element";

import "../../src/ddl2/dashboard.css";

export interface IDockPanel {
    layoutObj(_: object | null): this;
    layout();
    widgets();
    activate(element: Element);
    hideSingleTabs(bool?: boolean);
    syncWidgets();
    syncPopups();
}

export class Dashboard extends ChartPanel {

    private _dockPanel: IDockPanel;

    private _designModeButton = new ToggleButton().faChar("fa-object-group").tooltip("Design Mode...")
        .selected(true)
        .on("click", () => {
            if (this._dockPanel instanceof DashboardGrid) {
                this._dockPanel
                    .designMode(this._designModeButton.selected())
                    .lazyRender()
                    ;
            }
        });

    private _addButton = new Button().faChar("fa-plus").tooltip("Add...")
        .on("click", () => {
            const newElem = new Element(this._ec);
            this._ec.append(newElem);
            this.renderPromise().then(() => {
                newElem.refresh().then(() => {
                    this.activate(newElem);
                });
            });
        });

    private _removeButton = new Button().faChar("fa-minus").tooltip("Remove...")
        .enabled(false)
        .on("click", () => {
            const elem = this._prevActive;
            if (elem && window.confirm(`Remove Widget "${elem.id()}"?`)) {
                this._ec.clear(elem.id());
                this.renderPromise().then(() => {
                    this.vizActivation(undefined);
                });
            }
        });

    private _reloadButton = new Button().faChar("fa-refresh").tooltip("Reload...")
        .on("click", () => {
            const json = this.save();
            this._ec.clear();
            this.vizActivation(undefined);
            this.renderPromise().then(() => {
                this.restore(json);
                this.renderPromise().then(() => {
                    this._ec.refresh().then(() => {
                    });
                });
            });
        });

    private _addSamples = new Button().faChar("fa-database").tooltip("Add Samples")
        .on("click", () => {
            Promise.all([
                d3Text("https://raw.githubusercontent.com/hpcc-systems/Visualization/master/utils/data/data/airports.csv"),
                d3Text("https://raw.githubusercontent.com/hpcc-systems/Visualization/master/utils/data/data/carriers.csv"),
                d3Text("https://raw.githubusercontent.com/hpcc-systems/Visualization/master/utils/data/data/stats.csv")
            ]).then(([airports, carriers, stats]) => {
                const popupElement = this.addForm("popup", {
                    type: "form",
                    id: "global_filter",
                    fields: [{
                        type: "string",
                        id: "Airport"
                    }, {
                        type: "string",
                        id: "Airline"
                    }]
                });
                popupElement.visualization()
                    .title("Global Filter")
                    .visibility("flyout")
                    .chartType("FieldForm")
                    ;
                const airportsElement = this.addDatabomb("airports", airports, "csv",
                    new Filters(this._ec).filter([
                        new Filters.Filter().source(popupElement.id()).mappings([new Filters.Mapping().remoteField("Airport").localField("code").nullable(true)])
                    ]),
                    new Project().computedFields([
                        new Project.ComputedField().label("Code").type("=").column1("code"),
                        new Project.ComputedField().label("Airport").type("=").column1("name"),
                        new Project.ComputedField().label("Count").type("scale").column1("count").constValue(1)
                    ]),
                    new Sort().column([new Sort.Column().fieldID("Count").descending(true)])
                );
                airportsElement.chartPanel().title("Airports");
                const carrierElement = this.addDatabomb("carriers", carriers, "csv",
                    new Filters(this._ec).filter([
                        new Filters.Filter().source(popupElement.id()).mappings([new Filters.Mapping().remoteField("Airline").localField("code").nullable(true)])
                    ]),
                    new Project().computedFields([
                        new Project.ComputedField().label("Code").type("=").column1("code"),
                        new Project.ComputedField().label("Airline").type("=").column1("name"),
                        new Project.ComputedField().label("Count").type("scale").column1("count").constValue(1)
                    ]),
                    new Sort().column([new Sort.Column().fieldID("Count").descending(true)])
                );
                carrierElement.chartPanel().title("Airlines");
                const statsElement = this.addDatabomb("stats", stats, "csv", new Filters(this._ec).filter([
                    new Filters.Filter().source(airportsElement.id()).mappings([new Filters.Mapping().remoteField("Code").localField("airport")]),
                    new Filters.Filter().source(carrierElement.id()).mappings([new Filters.Mapping().remoteField("Code").localField("carrier").nullable(true)])
                ]));
                statsElement.chartPanel().title("Stats");
                return Promise.all([
                    popupElement.refresh(),
                    airportsElement.refresh(),
                    carrierElement.refresh(),
                    statsElement.refresh()
                ]);
            }).then(() => {
                this.render();
            });
        });

    addDatabomb(label: string, payload: string, format: "csv" | "tsv" | "json" = "csv", ...activities: Activity[]): Element {
        const databomb = new Databomb().id(label).format(format).payload(payload);
        this._ec.appendDatasource(databomb);
        const newElem = new Element(this._ec);
        const ds = newElem.hipiePipeline().datasource();
        if (ds instanceof DSPicker) {
            ds.datasourceID(databomb.id());
        }
        for (const activity of activities) {
            if (activity instanceof Filters) {
                newElem.hipiePipeline().filters(activity);
            } else if (activity instanceof Project) {
                newElem.hipiePipeline().project(activity);
            } else if (activity instanceof GroupBy) {
                newElem.hipiePipeline().groupBy(activity);
            } else if (activity instanceof Sort) {
                newElem.hipiePipeline().sort(activity);
            } else if (activity instanceof Limit) {
                newElem.hipiePipeline().limit(activity);
            }
        }
        this._ec.append(newElem);
        return newElem;
    }

    addForm(label: string, ddl: DDL2.IForm): Element {
        const databomb = new Form().id(label).fromDDL(ddl);
        this._ec.appendDatasource(databomb);
        const newElem = new Element(this._ec);
        const ds = newElem.hipiePipeline().datasource();
        if (ds instanceof DSPicker) {
            ds.datasourceID(databomb.id());
        }
        this._ec.append(newElem);
        return newElem;
    }

    static create(target: string, ddl: DDL2.Schema): Promise<Dashboard> {
        return new Promise((resolve, reject) => {
            const ec = new ElementContainer();
            const dashboard = new Dashboard(ec)
                .target(target)
                .hideSingleTabs(true)
                .titleVisible(false)
                .restore(ddl)
                .render(w => {
                    ec.refresh().then(() => {
                        resolve(dashboard);
                    });
                });
        });
    }

    constructor(private _ec: ElementContainer) {
        super();
        this._ec.on("vizStateChanged", (viz) => {
            this.vizStateChanged(viz);
        });
        this.buttons([this._designModeButton, new Spacer(), this._addButton, this._removeButton, new Spacer(), this._reloadButton, new Spacer(), this._addSamples]);
        this.ensureDockPanel("dock");
    }

    ensureDockPanel(mode: "dock" | "grid" = "dock") {
        if ((mode === "dock" && !(this._dockPanel instanceof DashboardDockPanel)) || (mode === "grid" && !(this._dockPanel instanceof DashboardGrid))) {
            this._dockPanel = (mode === "dock" ? new DashboardDockPanel(this._ec) : new DashboardGrid(this._ec).designMode(this.titleVisible()))
                .on("vizActivation", (elem: Element) => {
                    this.vizActivation(elem);
                })
                ;
            this.widget(this._dockPanel as any);
        }
    }

    elementContainer(): ElementContainer {
        return this._ec;
    }

    private _hipieProps;
    hipieProps(): DDL2.IProperties;
    hipieProps(_: DDL2.IProperties): this;
    hipieProps(_?: DDL2.IProperties): DDL2.IProperties | this {
        if (!arguments.length) return this._hipieProps;
        this._hipieProps = _;
        return this;
    }

    ddl(): DDL2.Schema;
    ddl(_: DDL2.Schema): this;
    ddl(_?: DDL2.Schema): DDL2.Schema | this {
        const ddlAdapter = new DDLAdapter(this);
        if (!arguments.length) return ddlAdapter.write();
        this._ec.clear();
        ddlAdapter.read(_);
        return this;
    }

    //  Used to delay load a layout after a render...
    layoutObj(_: object | null): this {
        this._dockPanel.layoutObj(_);
        return this;
    }

    save(): DDL2.Schema {
        const ddlAdapter = new DDLAdapter(this);
        return ddlAdapter.write();
    }

    restore(_: DDL2.Schema, render: boolean = false): this {
        this.ensureDockPanel(_ && _.properties && _.properties.layout instanceof Array ? "grid" : "dock");
        const ddlAdapter = new DDLAdapter(this);
        ddlAdapter.read(_);
        if (render) {
            this.renderPromise().then(() => {
                this._ec.refresh();
            });
        }
        return this;
    }

    importDDL(ddl: DDL1.DDLSchema | DDL2.Schema, baseUrl?: string, wuid?: string, dermatologyJson: object = {}): this {
        const ddl2: DDL2.Schema = isDDL2Schema(ddl) ? ddl : upgrade(ddl, baseUrl, wuid, true, dermatologyJson);
        return this.restore(ddl2, true);
    }

    javascript(): string {
        const jsAdapter = new JavaScriptAdapter(this);
        return jsAdapter.createJavaScript();
    }

    layout() {
        return this._dockPanel.layout();
    }

    widgets(): Widget[] {
        return this._dockPanel.widgets();
    }

    activate(element: Element) {
        this._dockPanel.activate(element);
    }

    hideSingleTabs(): boolean;
    hideSingleTabs(_: boolean): this;
    hideSingleTabs(_?: boolean): boolean | this {
        if (!arguments.length) return this._dockPanel.hideSingleTabs();
        this._dockPanel.hideSingleTabs(_);
        return this;
    }

    updateButtonState() {
        this._designModeButton.enabled(this._dockPanel instanceof DashboardGrid).render();
        this._removeButton.enabled(this._prevActive !== undefined).render();
    }

    update(domNode: HTMLElement, element) {
        this._dockPanel.syncWidgets();
        super.update(domNode, element);
        this.updateButtonState();
    }

    private _prevActive: Element;
    vizActivation(viz: Element) {
        this._prevActive = viz;
        this._removeButton.enabled(viz !== undefined).render();
    }

    vizStateChanged(viz: Element) {
    }

    render(callback?): this {
        this._dockPanel.syncPopups();
        return super.render(w => {
            if (callback) {
                callback(w);
            }
        });
    }
}
Dashboard.prototype._class += " dashboard_dashboard";
