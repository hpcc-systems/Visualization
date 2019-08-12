import { JSEditor, JSONEditor } from "@hpcc-js/codemirror";
import { PropertyExt, publish, publishProxy, Utility, Widget } from "@hpcc-js/common";
import { DDL1, DDL2, ddl2Schema, isDDL2Schema, upgrade } from "@hpcc-js/ddl-shim";
import { Graph } from "@hpcc-js/graph";
import { CommandPalette, CommandRegistry, ContextMenu, SplitPanel, TabPanel, WidgetAdapter } from "@hpcc-js/phosphor";
import { scopedLogger } from "@hpcc-js/util";
import { Activity } from "./ddl2/activities/activity";
import { Databomb } from "./ddl2/activities/databomb";
import { DSPicker } from "./ddl2/activities/dspicker";
import { Dashboard } from "./ddl2/dashboard";
import { DDLEditor } from "./ddl2/ddleditor";
import { DSTable } from "./ddl2/dsTable";
import { DVTable } from "./ddl2/dvTable";
import { GraphAdapter, VertexData } from "./ddl2/graphadapter";
import { Element, ElementContainer, State } from "./ddl2/model/element";
import { Visualization } from "./ddl2/model/visualization";
import { VizChartPanel } from "./ddl2/model/vizChartPanel";
import { PipelineSplitPanel } from "./ddl2/pipelinePanel";

const logger = scopedLogger("marshaller/dashy");

import "../src/dashy.css";

export type FocusType = Element | Activity | Visualization | VizChartPanel | State | undefined;

export class Dashy extends SplitPanel {

    private _elementContainer: ElementContainer = new ElementContainer();

    private _lhsSheet = new TabPanel();
    private _lhsDashboard: Dashboard = new Dashboard(this._elementContainer)
        .on("vizActivation", (elem: Element, wa: WidgetAdapter) => {
            this.focus(this._lhsDashboard, elem);
        })
        .on("vizStateChanged", (elem: Element) => {
            for (const filteredViz of this._elementContainer.filteredBy(elem.id())) {
                if (this.focus() === filteredViz) {
                    this._rhsSplitView.refreshPreview();
                }
            }
        })
        ;
    private _lhsDataviews: DVTable = new DVTable(this._elementContainer)
        .on("click", (row: any, col: string, sel: boolean, ext: any) => {
            this.focus(this._lhsDataviews, row.__lparam);
            this._rhsSplitView.refreshPreview();
        })
        ;
    private _lhsDatasources: DSTable = new DSTable(this._elementContainer)
        .on("click", (row: any, col: string, sel: boolean, ext: any) => {
            this.focus(this._lhsDatasources, row.__lparam);
            this._rhsSplitView.refreshPreview();
        })
        ;
    private _graphAdapter = new GraphAdapter(this._elementContainer);
    private _lhsPipeline: Graph = new Graph()
        .layout("Hierarchy")
        .allowDragging(false)
        .applyScaleOnLayout(true)
        .on("vertex_click", (row: any, col: string, sel: boolean, ext: any) => {
            const obj: VertexData = row.__lparam[0] || {};
            this.focus(this._lhsPipeline, obj.state || obj.chartPanel || obj.visualization || obj.activity || obj.view);
        })
        .on("vertex_contextmenu", (row: any, col: string, sel: boolean, ext: any) => {
        })
        ;
    private _lhsDebugSheet = new TabPanel();
    private _lhsDebugDDLSchema = new JSONEditor().json(ddl2Schema);
    private _lhsDebugDDLEditor = new DDLEditor();
    private _lhsDebugJSEditor = new JSEditor();
    private _lhsDebugCloneEC: ElementContainer = new ElementContainer();
    private _lhsDebugClone: Dashboard = new Dashboard(this._lhsDebugCloneEC).hideSingleTabs(true).titleVisible(false);
    private _lhsDebugDDLv1 = new JSONEditor();
    private _lhsDebugDDLv2 = new JSONEditor();

    private _rhsSplitView = new PipelineSplitPanel();

    @publishProxy("_rhsSplitView")
    disableActivities: publish<this, string[]>;

    private _fileOpen;

    static create(target: string, ddl?: DDL1.DDLSchema | DDL2.Schema, baseUrl?: string, wuid?: string): Promise<Dashy> {
        return new Promise((resolve, reject) => {
            const dashy = new Dashy()
                .target(target)
                .render((w: Dashy) => {
                    if (ddl) {
                        w.importDDL(ddl, baseUrl, wuid).then(() => {
                            resolve(dashy);
                        });
                    } else {
                        resolve(dashy);
                    }
                });
        });
    }

    constructor() {
        super("horizontal");
    }

    elementContainer(): ElementContainer {
        return this._elementContainer;
    }

    clear(): Promise<void> {
        this._lhsDebugSheet.removeWidget(this._lhsDebugDDLv1);
        this._lhsDebugSheet.removeWidget(this._lhsDebugDDLv2);
        this._elementContainer.clear();
        this._graphAdapter.clear();
        this.focus(this._lhsDashboard, undefined);
        return this.loadDashboard().then(() => {
            return this._elementContainer.refresh();
        }).then(ec => {
            return;
        });
    }

    save(): DDL2.Schema {
        return this._lhsDashboard.save();
    }

    restore(json: DDL2.Schema): Promise<void> {
        this._lhsSheet.active(this._lhsDashboard);
        return this.clear().then(() => {
            this._lhsDashboard.restore(json);
            this._lhsDataviews.render();
            this._lhsDatasources.render();
            return this._lhsDashboard.renderPromise().then(() => {
                const elements = this._elementContainer.elements();
                if (elements.length) {
                    this._lhsDashboard.activate(elements[0]);
                }
                return this._elementContainer.refresh();
            }).then(() => {
                let hasError = false;
                for (const error of this._elementContainer.validate()) {
                    hasError = true;
                    logger.warning(error.elementID + " (" + error.source + "):  " + error.msg);
                }
                if (hasError) {
                    //  Re-render to highlight errrors  ---
                    this._lhsDashboard.renderPromise();
                }
            });
        });
    }

    importDDL(ddl: DDL1.DDLSchema | DDL2.Schema, baseUrl?: string, wuid?: string, dermatologyJson: object = {}): Promise<void> {
        const ddl2: DDL2.Schema = isDDL2Schema(ddl) ? ddl : upgrade(ddl, baseUrl, wuid, true, dermatologyJson);
        const retVal = this.restore(ddl2);
        if (isDDL2Schema(ddl)) {
            this._lhsDebugDDLv2.json(ddl2);
            this._lhsDebugSheet
                .addWidget(this._lhsDebugDDLv2, "orig v2")
                ;
        } else {
            this._lhsDebugDDLv1.json(ddl);
            this._lhsDebugDDLv2.json(ddl2);
            this._lhsDebugSheet
                .addWidget(this._lhsDebugDDLv1, "v1")
                .addWidget(this._lhsDebugDDLv2, "v1 -> v2")
                ;
        }
        return retVal;
    }

    activeLHS(): Widget {
        let retVal = this._lhsSheet.active();
        if (retVal === this._lhsDebugSheet) {
            retVal = this._lhsDebugSheet.active();
        }
        return retVal;
    }

    activeRHS(): Widget {
        return this._rhsSplitView;
    }

    private _currSelection: { [sourceID: string]: FocusType } = {};

    private focusAsElement(): Element | undefined {
        const currSelection = this.focus();
        return currSelection instanceof Element ? currSelection : undefined;
    }

    private focus(): FocusType;
    private focus(source: Widget, item: FocusType): this;
    private focus(source?: Widget, item?: FocusType): FocusType | this {
        if (!arguments.length) return this._currSelection[this.activeLHS().id()];
        if (this._currSelection[source.id()] !== item) {
            this._currSelection[source.id()] = item;
            this.loadRHSSplit();
        }
        return this;
    }

    loadRHSSplit() {
        this._rhsSplitView.loadDataProps(this.focus());
    }

    loadDataviews(): Promise<Widget | undefined> {
        if (this.activeLHS() === this._lhsDataviews) {
            return this._lhsDataviews.renderPromise();
        }
        return Promise.resolve(undefined);
    }

    loadDatasources(): Promise<Widget | undefined> {
        if (this.activeLHS() === this._lhsDatasources) {
            return this._lhsDatasources.renderPromise();
        }
        return Promise.resolve(undefined);
    }

    loadDashboard(): Promise<Widget | undefined> {
        if (this.activeLHS() === this._lhsDashboard) {
            this._elementContainer.validate();
            return this._lhsDashboard.renderPromise();
        }
        return Promise.resolve(undefined);
    }

    loadGraph() {
        this._lhsPipeline
            .data({ ...this._graphAdapter.createGraph() }, true)
            ;
        if (this.activeLHS() === this._lhsPipeline) {
            this._lhsPipeline
                .lazyRender()
                ;
        }
    }

    loadDDL() {
        this._lhsDebugDDLEditor
            .ddl(this._lhsDashboard.ddl())
            ;
        if (this.activeLHS() === this._lhsDebugDDLEditor) {
            this._lhsDebugDDLEditor
                .lazyRender()
                ;
        }
    }

    loadJavaScript() {
        this._lhsDebugJSEditor
            .javascript(this._lhsDashboard.javascript())
            ;
        if (this.activeLHS() === this._lhsDebugJSEditor) {
            this._lhsDebugJSEditor
                .lazyRender()
                ;
        }
    }

    loadClone() {
        const json = this.save();
        this._lhsDebugCloneEC.clear();
        this._lhsDebugClone.renderPromise().then(() => {
            this._lhsDebugClone.restore(json);
            this._lhsDebugClone.renderPromise().then(() => {
                return this._lhsDebugCloneEC.refresh();
            }).then(() => {
                for (const error of this._lhsDebugCloneEC.validate()) {
                    logger.warning(error.elementID + " (" + error.source + "):  " + error.msg);
                }
            });
        });
    }

    initMenu() {
        const commands = new CommandRegistry();

        //  Dashboard  Commands  ---
        commands.addCommand("dash_add", {
            label: "Add View",
            execute: () => {
                const newElem = new Element(this._elementContainer);
                this._elementContainer.append(newElem);
                this.loadDashboard().then(() => {
                    newElem.refresh().then(() => {
                        this._lhsDashboard.activate(newElem);
                    });
                });
            }
        });

        commands.addCommand("dash_clear", {
            label: "Clear",
            execute: () => {
                this.clear();
            }
        });

        commands.addCommand("dash_save", {
            label: "Save",
            execute: () => {
                const text = JSON.stringify(this.save(), null, "  ");
                Utility.downloadString("JSON", text, "dashy");
            }
        });

        commands.addCommand("dash_load", {
            label: "Open",
            execute: () => {
                this._fileOpen.property("accept", ".dashy,.json");
                this._fileOpen.node().click();
            }
        });

        //  Model Commands  ---
        const palette = new CommandPalette({ commands });
        palette.addItem({ command: "addWUResult", category: "Notebook" });
        palette.addItem({ command: "addView", category: "Notebook" });
        palette.addItem({ command: "remove", category: "Notebook" });
        palette.id = "palette";

        const contextMenu = new ContextMenu({ commands });

        contextMenu.addItem({ command: "dash_add", selector: `#${this._lhsDashboard.id()}` });
        contextMenu.addItem({ command: "dash_clear", selector: `#${this._lhsDashboard.id()}` });
        contextMenu.addItem({ type: "separator", selector: `#${this._lhsDashboard.id()}` });

        contextMenu.addItem({ command: "dash_load", selector: `#${this.id()}` });
        contextMenu.addItem({ command: "dash_save", selector: `#${this.id()}` });

        document.addEventListener("contextmenu", (event: MouseEvent) => {
            if (contextMenu.open(event)) {
                event.preventDefault();
            }
        });
    }

    addDatabomb(label: string, payload: string, format: "csv" | "tsv" | "json") {
        const databomb = new Databomb().id(label).format(format).payload(payload);
        this._elementContainer.appendDatasource(databomb);
        const newElem = new Element(this._elementContainer);
        const ds = newElem.hipiePipeline().datasource();
        if (ds instanceof DSPicker) {
            ds.datasourceID(databomb.id());
        }
        this._elementContainer.append(newElem);
        this.loadDashboard().then(() => {
            newElem.refresh().then(() => {
                this._lhsDashboard.activate(newElem);
            });
        });
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        this
            .addWidget(this._lhsSheet)
            .addWidget(this._rhsSplitView)
            ;
        this._lhsSheet
            .addWidget(this._lhsDashboard, "Dashboard")
            .addWidget(this._lhsDataviews, "Dataviews")
            .addWidget(this._lhsDatasources, "Datasources")
            .addWidget(this._lhsPipeline, "Pipeline")
            .addWidget(this._lhsDebugSheet, "Debug")
            .on("childActivation", (w: Widget) => {
                switch (w) {
                    case this._lhsDataviews:
                        this.loadRHSSplit();
                        break;
                    case this._lhsDatasources:
                        this.loadRHSSplit();
                        break;
                    case this._lhsDashboard:
                        this.loadRHSSplit();
                        break;
                    case this._lhsPipeline:
                        this.loadRHSSplit();
                        this.loadGraph();
                        break;
                    case this._lhsDebugSheet:
                        this._lhsDebugSheet.childActivation(this._lhsDebugSheet.active());
                        break;
                }
            })
            ;
        this._lhsDebugSheet
            .addWidget(this._lhsDebugDDLEditor, "v2")
            .addWidget(this._lhsDebugDDLSchema, "Schema")
            .addWidget(this._lhsDebugJSEditor, "TS")
            .addWidget(this._lhsDebugClone, "Clone")
            .on("childActivation", (w: Widget) => {
                switch (w) {
                    case this._lhsDebugDDLEditor:
                        this.loadRHSSplit();
                        this.loadDDL();
                        break;
                    case this._lhsDebugJSEditor:
                        this.loadRHSSplit();
                        this.loadJavaScript();
                        break;
                    case this._lhsDebugClone:
                        this.loadClone();
                        break;
                }
            })
            ;

        this.initMenu();
        this._rhsSplitView.on("propChanged", (id: string, newValue: any, oldValue: any, source: PropertyExt) => {
            const currElement = this.focusAsElement();
            if (currElement) {
                currElement.refresh().then(() => {
                    this._rhsSplitView.refreshPreview();
                });
            } else {
                this._rhsSplitView.refreshPreview();
            }
            switch (this.activeLHS()) {
                case this._lhsDashboard:
                    this.loadDashboard();
                    break;
                case this._lhsPipeline:
                    this.loadGraph();
                    break;
                case this._lhsDebugDDLEditor:
                    this.loadDDL();
                    break;
                case this._lhsDebugClone:
                    this.loadClone();
                    break;
            }
        });

        const context = this;
        this._fileOpen = element.append("input")
            .attr("type", "file")
            .property("accept", ".dashy,.json")
            .style("display", "none")
            .on("change", function () {
                let i = 0;
                let f = this.files[i];
                while (f) {
                    const reader = new FileReader();
                    reader.onload = (function (theFile) {
                        return function (e) {
                            try {
                                const json = JSON.parse(e.target.result);
                                context.importDDL(json);
                            } catch (ex) {
                                alert("ex when trying to parse json = " + ex);
                            }
                        };
                    })(f);
                    reader.readAsText(f);
                    f = this.files[++i];
                    break;
                }
            })
            ;
    }

    update(domNode, element) {
        super.update(domNode, element);
    }
}
Dashy.prototype._class += " composite_Dashy";
