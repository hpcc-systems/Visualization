import { Button, d3SelectionType, Spacer, Widget } from "@hpcc-js/common";
import { DDL2 } from "@hpcc-js/ddl-shim";
import { ChartPanel } from "@hpcc-js/layout";
import { DockPanel, IClosable, WidgetAdapter } from "@hpcc-js/phosphor";
import { compare } from "@hpcc-js/util";
import { text as d3Text } from "d3-fetch";
import { Activity } from "./activities/activity";
import { Databomb } from "./activities/databomb";
import { DSPicker } from "./activities/dspicker";
import { Filters } from "./activities/filter";
import { GroupBy } from "./activities/groupby";
import { Limit } from "./activities/limit";
import { Project } from "./activities/project";
import { Sort } from "./activities/sort";
import { DDLAdapter } from "./ddl";
import { JavaScriptAdapter } from "./javascriptadapter";
import { Element, ElementContainer } from "./model/element";

import "../../src/ddl2/dashboard.css";

class DashboardDockPanel extends DockPanel implements IClosable {
    private _ec: ElementContainer;

    constructor(ec: ElementContainer) {
        super();
        this._ec = ec;
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

    syncWidgets() {
        const previous = this.widgets();
        const diff = compare(previous, this._ec.elements().map(viz => viz.visualization().chartPanel()));
        for (const w of diff.removed) {
            this.removeWidget(w);
        }
        for (const w of diff.added) {
            const element: Element = this._ec.element(w);
            this.addWidget(w, this.tabTitle(element), "split-bottom", undefined, this.hideSingleTabs() ? undefined : this);
        }
        for (const w of diff.unchanged) {
            this.updateTitle(w);
        }
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

export class Dashboard extends ChartPanel {
    private _ec: ElementContainer;
    private _dockPanel: DashboardDockPanel;

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
                const airportsElement = this.addDatabomb("airports", airports, "csv", new Project().computedFields([
                    new Project.ComputedField().label("Code").type("=").column1("code"),
                    new Project.ComputedField().label("Airport").type("=").column1("name"),
                    new Project.ComputedField().label("Count").type("scale").column1("count").constValue(1)
                ]).trim(true), new Sort().column([new Sort.Column().fieldID("Count").descending(true)]));
                airportsElement.chartPanel().title("Airports");
                const carrierElement = this.addDatabomb("carriers", carriers, "csv", new Project().computedFields([
                    new Project.ComputedField().label("Code").type("=").column1("code"),
                    new Project.ComputedField().label("Airline").type("=").column1("name"),
                    new Project.ComputedField().label("Count").type("scale").column1("count").constValue(1)
                ]).trim(true), new Sort().column([new Sort.Column().fieldID("Count").descending(true)]));
                carrierElement.chartPanel().title("Airlines");
                const statsElement = this.addDatabomb("stats", stats, "csv", new Filters(this._ec).filter([
                    new Filters.Filter().source(airportsElement.id()).mappings([new Filters.Mapping().remoteField("Code").localField("airport")]),
                    new Filters.Filter().source(carrierElement.id()).mappings([new Filters.Mapping().remoteField("Code").localField("carrier").nullable(true)])
                ]));
                statsElement.chartPanel().title("Stats");
                return Promise.all([
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

    static create(target: string, ddl: DDL2.Schema): Promise<Dashboard> {
        return new Promise((resolve, reject) => {
            const ec = new ElementContainer();
            const dashboard = new Dashboard(ec)
                .target(target)
                .hideSingleTabs(false)
                .titleVisible(false)
                .restore(ddl)
                .render(w => {
                    ec.refresh().then(() => {
                        resolve(dashboard);
                    });
                });
        });
    }

    constructor(ec: ElementContainer) {
        super();
        this._ec = ec;
        this._ec.on("vizStateChanged", (viz) => {
            this.vizStateChanged(viz);
        });
        this._dockPanel = new DashboardDockPanel(ec)
            .on("vizActivation", (viz: Element) => {
                this.vizActivation(viz);
            })
            ;
        this
            .buttons([this._addButton, this._removeButton, new Spacer(), this._reloadButton, new Spacer(), this._addSamples])
            .widget(this._dockPanel)
            ;
    }

    elementContainer(): ElementContainer {
        return this._ec;
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

    // _delayLayout;
    restore(_: DDL2.Schema): this {
        const ddlAdapter = new DDLAdapter(this);
        ddlAdapter.read(_);
        return this;
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

    update(domNode: HTMLElement, element: d3SelectionType) {
        this._dockPanel.syncWidgets();
        super.update(domNode, element);
    }

    private _prevActive: Element;
    vizActivation(viz: Element) {
        this._prevActive = viz;
        this._removeButton.enabled(viz !== undefined).render();
    }

    vizStateChanged(viz: Element) {
    }
}
Dashboard.prototype._class += " dashboard_dashboard";
