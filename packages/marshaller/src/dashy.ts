import { JSEditor, JSONEditor } from "@hpcc-js/codemirror";
import { PropertyExt, Utility, Widget } from "@hpcc-js/common";
import { DDL1, ddl2Schema, upgrade } from "@hpcc-js/ddl-shim";
import { DatasourceTable } from "@hpcc-js/dgrid";
import { Graph } from "@hpcc-js/graph";
import { PropertyEditor } from "@hpcc-js/other";
import { CommandPalette, CommandRegistry, ContextMenu, SplitPanel, TabPanel } from "@hpcc-js/phosphor";
import { scopedLogger } from "@hpcc-js/util";
import { Activity, DatasourceAdapt } from "./ddl2/activities/activity";
import { Dashboard, IDashboardPersist } from "./ddl2/dashboard";
import { DDLEditor } from "./ddl2/ddleditor";
import { GraphAdapter } from "./ddl2/graphadapter";
import { Element, ElementContainer } from "./ddl2/model";

const logger = scopedLogger("marshaller/dashy");

import "../src/dashy.css";

class Palette extends PropertyExt {
    constructor() {
        super();
    }
}
Palette.prototype._class += " Palette";
interface Palette {
    paletteID(): string;
    paletteID(_: string): this;
    colors(): { [color: string]: string[] };
    colors(_: { [color: string]: string[] }): this;
}
Palette.prototype.publish("paletteID", "", "string", "ID", null, { optional: true });
Palette.prototype.publish("colors", {}, "object", "Custom Palette");

class Palettes extends PropertyExt {
    constructor() {
        super();
    }
}
Palettes.prototype._class += " Palettes";
interface Palettes {
    palette(): Palette[];
    palette(_: Palette[]): this;
}
Palettes.prototype.publish("palette", [], "propertyArray", "Custom Palettes", null, { autoExpand: Palette });

const palettes = new Palettes();

export class Dashy extends SplitPanel {

    private _elementContainer: ElementContainer = new ElementContainer();

    private _tabLHS = new TabPanel();
    private _dashboard: Dashboard = new Dashboard(this._elementContainer)
        .on("vizActivation", (viz: Element) => {
            this.selectionChanged(viz);
        })
        .on("vizStateChanged", (viz: Element) => {
            for (const filteredViz of this._elementContainer.filteredBy(viz.id())) {
                if (this._currViz === filteredViz) {
                    this.refreshPreview();
                }
            }
        })
        ;
    private _graphAdapter = new GraphAdapter(this._elementContainer);
    private _pipeline: Graph = new Graph()
        .allowDragging(false)
        .applyScaleOnLayout(true)
        .on("vertex_click", (row: any, col: string, sel: boolean, ext: any) => {
            const obj = row.__lparam[0];
            this.selectionChanged(obj.viz, obj.activity);
        })
        .on("vertex_contextmenu", (row: any, col: string, sel: boolean, ext: any) => {
        })
        ;

    private _tabDDL = new TabPanel();
    private _ddlSchema = new JSONEditor().json(ddl2Schema);
    private _ddlEditor = new DDLEditor();
    private _jsEditor = new JSEditor();
    private _layoutEditor = new JSONEditor();
    private _ddlv1 = new JSONEditor();
    private _ddlv2 = new JSONEditor();

    private _tabRHS = new TabPanel();
    private _splitData = new SplitPanel();
    private _dataProperties: PropertyEditor = new PropertyEditor()
        .show_settings(false)
        .showFields(false)
        ;
    private _preview = new DatasourceTable();
    private _vizProperties: PropertyEditor = new PropertyEditor()
        .show_settings(false)
        .showFields(false)
        ;
    private _paletteProperties: PropertyEditor = new PropertyEditor()
        .show_settings(false)
        .showFields(false)
        ;
    private _stateProperties: PropertyEditor = new PropertyEditor()
        .show_settings(false)
        .showFields(false)
        ;
    private _cloneEC: ElementContainer = new ElementContainer();
    private _clone: Dashboard = new Dashboard(this._cloneEC).hideSingleTabs(true);
    private _fileOpen;

    constructor() {
        super("horizontal");
    }

    clear() {
        this._elementContainer.clear();
        this.loadDashboard().then(() => {
            this._elementContainer.refresh();
        });
    }

    save(): IDashboardPersist {
        return this._dashboard.save();
    }

    restore(json: IDashboardPersist): Promise<void> {
        this._elementContainer.clear();
        this._dashboard.restore(json);
        return Promise.all([
            this._elementContainer.refresh(),
            this._dashboard.renderPromise()
        ]).then(promises => {
            for (const error of this._elementContainer.validate()) {
                logger.warning(error.elementID + " (" + error.source + "):  " + error.msg);
            }
        });
    }

    importV1DDL(ddl: DDL1.DDLSchema, baseUrl?: string, wuid?: string) {
        this._ddlv1.json(ddl);
        const ddl2 = upgrade(ddl, baseUrl, wuid);
        this._ddlv2.json(ddl2);
        this._tabDDL
            .addWidget(this._ddlv1, "v1")
            .addWidget(this._ddlv2, "v1->v2")
            ;
        this.restore({ ddl: ddl2 });
    }

    refreshPreview() {
        const ds = this._preview.datasource() as DatasourceAdapt;
        if (ds) {
            ds.exec().then(() => {
                this._preview
                    .invalidate()
                    .lazyRender()
                    ;
            });
        }
    }

    private _currViz: Element | undefined;
    private _currActivity: Activity | undefined;
    selectionChanged(elem?: Element, activity?: Activity) {
        if (activity && (this._currActivity !== activity)) {
            this.loadDataProps(activity);
            if (activity instanceof Activity) {
                this.loadPreview(activity);
            }
        } else if (elem && (this._currViz !== elem || this._currActivity !== activity)) {
            this.loadDataProps(elem.hipiePipeline());
            this.loadWidgetProps(elem.multiChartPanel());
            this.loadStateProps(elem.state());
            this.loadPreview(elem.hipiePipeline()!.last()!);
        }
        this._currViz = elem;
        this._currActivity = activity;
    }

    loadDataProps(pe: PropertyExt) {
        this._dataProperties
            .widget(pe)
            .render()
            ;
    }

    loadWidgetProps(w: Widget) {
        this._vizProperties
            .widget(w)
            .render()
            ;
    }

    loadPaletteProps(pe: PropertyExt) {
        this._paletteProperties
            .widget(pe)
            .render()
            ;
    }

    loadStateProps(pe: PropertyExt) {
        this._stateProperties
            .widget(pe)
            .render()
            ;
    }

    loadPreview(activity: Activity) {
        this._preview
            .datasource(new DatasourceAdapt(activity))
            // .paging(true)
            .lazyRender()
            ;
    }

    loadEditor() {
        //        this._editor.ddl(serialize(this._model) as object);
    }

    loadDashboard(refresh: boolean = true): Promise<Widget | undefined> {
        if (refresh && this._tabLHS.active() === this._dashboard) {
            return this._dashboard.renderPromise();
        }
        return Promise.resolve(undefined);
    }

    loadGraph(refresh: boolean = false) {
        this._pipeline
            .data({ ...this._graphAdapter.createGraph() }, false)
            ;
        if (refresh && this._tabLHS.active() === this._pipeline) {
            this._pipeline
                .layout("Hierarchy")
                .lazyRender()
                ;
        }
    }

    loadDDL(refresh: boolean = false) {
        this._ddlEditor
            .ddl(this._dashboard.ddl())
            ;
        if (refresh && this._tabLHS.active() === this._tabDDL && this._tabDDL.active() === this._ddlEditor) {
            this._ddlEditor
                .lazyRender()
                ;
        }
    }

    loadJavaScript(refresh: boolean = false) {
        this._jsEditor
            .javascript(this._dashboard.javascript())
            ;
        if (refresh && this._tabLHS.active() === this._tabDDL && this._tabDDL.active() === this._jsEditor) {
            this._jsEditor
                .lazyRender()
                ;
        }
    }

    loadLayout(refresh: boolean = false) {
        this._layoutEditor
            .json(this._dashboard.layout())
            ;
        if (refresh && this._tabLHS.active() === this._tabDDL && this._tabDDL.active() === this._layoutEditor) {
            this._layoutEditor
                .lazyRender()
                ;
        }
    }

    loadClone() {
        this._cloneEC.clear();
        this._clone.restore(this.save());
        this._cloneEC.refresh();
        this._clone.render();
    }

    initMenu() {
        const commands = new CommandRegistry();

        //  Dashboard  Commands  ---
        commands.addCommand("dash_add", {
            label: "Add Element",
            execute: () => {
                const viz = new Element(this._elementContainer);
                this._elementContainer.append(viz);
                this.loadDashboard().then(() => {
                    viz.refresh().then(() => {
                        this.selectionChanged(viz);
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
                Utility.downloadBlob("JSON", text, "dashy", "json");
            }
        });

        commands.addCommand("dash_load", {
            label: "Open",
            execute: () => {
                this._fileOpen.property("accept", ".json");
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

        contextMenu.addItem({ command: "dash_add", selector: `#${this._dashboard.id()}` });
        contextMenu.addItem({ command: "dash_clear", selector: `#${this._dashboard.id()}` });
        contextMenu.addItem({ type: "separator", selector: `#${this._dashboard.id()}` });

        contextMenu.addItem({ command: "dash_load", selector: `#${this.id()}` });
        contextMenu.addItem({ command: "dash_save", selector: `#${this.id()}` });

        document.addEventListener("contextmenu", (event: MouseEvent) => {
            if (contextMenu.open(event)) {
                event.preventDefault();
            }
        });
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        this
            .addWidget(this._tabLHS)
            .addWidget(this._tabRHS)
            ;
        this._tabLHS
            .addWidget(this._dashboard, "Dashboard")
            .addWidget(this._pipeline, "Pipeline")
            .addWidget(this._tabDDL, "DDL")
            .on("childActivation", (w: Widget) => {
                switch (w) {
                    case this._dashboard:
                        this.selectionChanged(this._currViz);
                        break;
                    case this._pipeline:
                        this.loadGraph(true);
                        break;
                    case this._tabDDL:
                        this._tabDDL.childActivation(this._tabDDL.active());
                        break;
                }
            })
            ;
        this._tabDDL
            .addWidget(this._ddlSchema, "Schema")
            .addWidget(this._ddlEditor, "v2")
            .addWidget(this._jsEditor, "TS")
            .addWidget(this._layoutEditor, "Layout")
            .on("childActivation", (w: Widget) => {
                switch (w) {
                    case this._ddlEditor:
                        this.loadDDL(true);
                        break;
                    case this._jsEditor:
                        this.loadJavaScript(true);
                        break;
                    case this._layoutEditor:
                        this.loadLayout(true);
                        break;
                }
            })
            ;
        this._tabRHS
            .addWidget(this._splitData, "Data")
            .addWidget(this._vizProperties, "Widget")
            .addWidget(this._paletteProperties, "Palette")
            .addWidget(this._stateProperties, "State")
            .addWidget(this._clone, "Clone")
            .on("childActivation", (w: Widget) => {
                switch (w) {
                    case this._clone:
                        this.loadClone();
                        break;
                }
            })
            ;
        this._splitData
            .addWidget(this._dataProperties)
            .addWidget(this._preview)
            ;

        this.initMenu();
        this._dataProperties.monitor((id: string, newValue: any, oldValue: any, source: PropertyExt) => {
            if (source !== this._dataProperties && this._currViz) {
                this._currViz.refresh().then(() => {
                    this.refreshPreview();
                });
                switch (this._tabLHS.active()) {
                    case this._dashboard:
                        break;
                    case this._pipeline:
                        setTimeout(() => {
                            this.loadGraph(true);
                        }, 500);
                        break;
                    case this._tabDDL:
                        switch (this._tabDDL.active()) {
                            case this._ddlEditor:
                                this.loadDDL(true);
                                break;
                            case this._layoutEditor:
                                this.loadLayout(true);
                                break;
                        }
                    case this._clone:
                        break;
                }
            }
        });

        const context = this;
        this._fileOpen = element.append("input")
            .attr("type", "file")
            .property("accept", ".json")
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
                                if (json.visualizationversion) {
                                    context.importV1DDL(json);
                                } else {
                                    context.restore(json);
                                }
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

        this.loadPaletteProps(palettes);
    }

    update(domNode, element) {
        super.update(domNode, element);
    }
}
Dashy.prototype._class += " composite_Dashy";
