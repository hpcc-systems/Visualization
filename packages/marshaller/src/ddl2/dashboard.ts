import { Button, Database, IMonitorHandle, Spacer, Widget } from "@hpcc-js/common";
import { DDL2 } from "@hpcc-js/ddl-shim";
import { FieldForm } from "@hpcc-js/form";
import { ChartPanel, Modal } from "@hpcc-js/layout";
import { DockPanel, IClosable, WidgetAdapter } from "@hpcc-js/phosphor";
import { compare } from "@hpcc-js/util";
import { json as d3Json, text as d3Text } from "d3-fetch";
import { select as d3Select } from "d3-selection";
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
import { IVizPopupPanelOwner, VizChartPanel, VizPopupPanel } from "./model/vizChartPanel";

import "../../src/ddl2/dashboard.css";

class DashboardDockPanel extends DockPanel implements IClosable, IVizPopupPanelOwner {

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

        const prevPopups = this.popupChartPanels();
        const diffPopups = compare(prevPopups, this._ec.elements().filter(e => e.visualization().visibility() === "flyout").map((elem: Element) => elem.visualization().chartPanel()));

        let refit = false;
        for (const w of diffWidgets.removed) {
            this.removeWidget(w);
        }
        for (const w of diffPopups.removed) {
            this.removePopup(w);
        }

        for (const w of diffWidgets.added) {
            const element: Element = this._ec.element(w);
            this.addWidget(w, this.tabTitle(element), "split-bottom", undefined, this.hideSingleTabs() ? undefined : this);
            refit = this.syncMinSize(w) || refit;  // ensure syncMinSize is called
        }
        for (const w of diffPopups.added) {
            this.addPopup(w);
        }

        for (const w of diffWidgets.unchanged) {
            this.updateTitle(w);
            refit = this.syncMinSize(w) || refit;  // ensure syncMinSize is called
        }
        this._popups.forEach(p => p.render());

        if (refit) {
            this.refit();
        }

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

export class Dashboard extends ChartPanel {
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
                const popupElement = this.addDatabomb("popup", '[{ "Airport": "", "Airline": "" }]', "json");
                popupElement.visualization()
                    .title("Global Filter")
                    .visibility("flyout")
                    .chartType("FieldForm")
                    ;
                console.log("airports", airports);
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
                airportsElement.visualization()
                    // .chartType("Line")
                    ;
                airportsElement.chartPanel().title("Airports");
                console.log("carriers", carriers);
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

    private _addReddit = new Button().faChar("fa-reddit-alien").tooltip("Sample Reddit")
        .on("click", () => {
            const context = this;
            const form = new FieldForm()
                .fields([
                    new Database.Field().id("dataname").label("Datasource Name"),
                    new Database.Field().id("substr").label("Search String"),
                    new Database.Field().id("after").label("After"),
                    new Database.Field().id("before").label("Before"),
                    new Database.Field().id("freq").label('Frequency ("second", "minute", "hour", "day")')
                ])
                .data([["reddit", "facebook", "", "", "day"]])
                ;
            (window as any).g_reddit_modal = new Modal()
                .title("Reddit Comment API")
                .minWidth("800px")
                .minHeight("500px")
                .target(document.body)
                .widget(form)
                .render()
                ;
            form.click = function (options, col, sel) {
                const substr = options.substr;
                const after = options.after;
                const before = options.before;
                const freq = options.freq;
                const url = `https://api.pushshift.io/reddit/search/comment/?q=${substr}&after=${after}&before=${before}&aggs=author,link_id,subreddit,created_utc&frequency=${freq}&size=0`;
                Promise.all([
                    d3Json(url)
                ]).then(([json]) => {
                    const element1 = context.addDatabomb(options.dataname + "_authors", JSON.stringify(json.aggs.author), "json",
                        new Project().computedFields([
                            new Project.ComputedField().label("Author").type("=").column1("key"),
                            new Project.ComputedField().label("Count").type("scale").column1("doc_count").constValue(1)
                        ]),
                        new Sort().column([new Sort.Column().fieldID("Count").descending(false)]),
                        new Limit().rows(10)
                    );
                    element1.chartPanel().title("Author Comments");
                    element1.visualization().chartType("Bar");
                    setTimeout(function () {
                        const w = element1.chartPanel().widget(); // TODO - is there a legitimate way to do this?
                        w.columns(w.columns().slice(0, 2));
                        w.data(w.data().map(row => {
                            return [row[0], row[1]];
                        }));
                        w.render();
                    }, 100);

                    const submissionData = json.aggs.link_id.map((row) => {
                        return {
                            key: row.data.author,
                            doc_count: row.doc_count
                        };
                    });
                    const element2 = context.addDatabomb(options.dataname + "_submissions", JSON.stringify(submissionData), "json",
                        new Project().computedFields([
                            new Project.ComputedField().label("Author").type("=").column1("key"),
                            new Project.ComputedField().label("Count").type("scale").column1("doc_count").constValue(1)
                        ]),
                        new Sort().column([new Sort.Column().fieldID("Count").descending(false)]),
                        new Limit().rows(10)
                    );
                    element2.chartPanel().title("Author Submissions");
                    element2.visualization().chartType("Bar");
                    setTimeout(function () {
                        const w = element2.chartPanel().widget(); // TODO - is there a legitimate way to do this?
                        w.columns(w.columns().slice(0, 2));
                        w.data(w.data().map(row => {
                            return [row[0], row[1]];
                        }));
                        w.render();
                    }, 100);

                    const element3 = context.addDatabomb(options.dataname + "_subreddits", JSON.stringify(json.aggs.subreddit), "json",
                        new Project().computedFields([
                            new Project.ComputedField().label("Subreddit").type("=").column1("key"),
                            new Project.ComputedField().label("Count").type("scale").column1("doc_count").constValue(1)
                        ]),
                        new Sort().column([new Sort.Column().fieldID("Count").descending(false)]),
                        new Limit().rows(10)
                    );
                    element3.chartPanel().title("Subreddits");
                    element3.visualization().chartType("Bar");
                    setTimeout(function () {
                        const w = element3.chartPanel().widget(); // TODO - is there a legitimate way to do this?
                        w.columns(w.columns().slice(0, 2));
                        w.data(w.data().map(row => {
                            return [row[0], row[1]];
                        }));
                        w.render();
                    }, 100);

                    const element4 = context.addDatabomb(options.dataname + "_freq", JSON.stringify(json.aggs.created_utc), "json",
                        new Project().computedFields([
                            new Project.ComputedField().label("Timestamp").type("=").column1("key"),
                            new Project.ComputedField().label("Count").type("scale").column1("doc_count").constValue(1)
                        ]),
                        new Sort().column([new Sort.Column().fieldID("Timestamp").descending(false)])
                    );
                    console.log("element4", element4);
                    const props4 = element4.visualization()
                        .chartType("Line")
                        .properties()
                        ;
                    (props4.widget as any).xAxisType = "time";
                    (props4.widget as any).xAxisTypeTimePattern = "%s";
                    (props4.widget as any).xAxisGuideLines = false;
                    (props4.widget as any).xAxisHidden = true;
                    element4.visualization()
                        .properties(props4)
                        ;
                    element4.chartPanel()
                        .title(`'${substr}' per ${freq}`)
                        ;
                    setTimeout(function () {
                        const widget4 = element4.chartPanel().widget(); // TODO - is there a legitimate way to do this?
                        widget4.columns(widget4.columns().slice(0, 2));
                        widget4.data(widget4.data().map(row => {
                            return [row[0], row[1]];
                        }));
                        widget4.render();
                    }, 100);
                    (window as any).g_reddit_modal.target(null);
                    delete (window as any).g_reddit_modal;
                    return Promise.all([
                        element1.refresh(),
                        element2.refresh(),
                        element3.refresh(),
                        element4.refresh()
                    ]);
                }).then(() => {
                    context.render();
                });
            };
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
        this._dockPanel = new DashboardDockPanel(this._ec)
            .on("vizActivation", (elem: Element) => {
                this.vizActivation(elem);
            })
            ;
        this
            .buttons([this._addButton, this._removeButton, new Spacer(), this._reloadButton, new Spacer(), this._addSamples, this._addReddit])
            .widget(this._dockPanel)
            ;
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

    update(domNode: HTMLElement, element) {
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
