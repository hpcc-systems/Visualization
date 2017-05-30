import { DDLEditor, JSEditor, JSONEditor } from "@hpcc-js/codemirror";
import { PropertyExt, Widget } from "@hpcc-js/common";
import { DatasourceTable } from "@hpcc-js/dgrid";
import { Graph } from "@hpcc-js/graph";
import { Activity, Dashboard, DatasourceAdapt, GraphAdapter, JavaScriptAdapter, Viz } from "@hpcc-js/marshaller";
import { PropertyEditor } from "@hpcc-js/other";
import { DockPanel, SplitPanel } from "@hpcc-js/phosphor";
import { CommandPalette, CommandRegistry, ContextMenu } from "@hpcc-js/phosphor-shim";
import { ddl } from "./sampleddl";

export class Mutex {
    private _locking: Promise<any>;
    private _locked: boolean;

    constructor() {
        this._locking = Promise.resolve();
        this._locked = false;
    }

    isLocked() {
        return this._locked;
    }

    lock() {
        this._locked = true;
        let unlockNext: any;
        const willLock = new Promise(resolve => unlockNext = resolve);
        willLock.then(() => this._locked = false);
        const willUnlock = this._locking.then(() => unlockNext);
        this._locking = this._locking.then(() => willLock);
        return willUnlock;
    }
}

export async function scopedLock(m: Mutex, func: (...params: any[]) => Promise<void>) {
    const unlock = await m.lock();
    try {
        m.lock();
        return await func();
    } finally {
        unlock();
    }
}

export class App {
    private _dockPanel = new DockPanel();
    private _dataSplit = new SplitPanel();
    private _dashboard: Dashboard = new Dashboard()
        .on("vizActivation", (viz: Viz) => {
            this.selectionChanged(viz);
        })
        .on("vizStateChanged", (viz: Viz) => {
            for (const filteredViz of this._dashboard.filteredBy(viz)) {
                if (this._currViz === filteredViz) {
                    this.refreshPreview();
                }
            }
        })
    ;
    private _graphAdapter = new GraphAdapter(this._dashboard);
    private _javaScripAdapter = new JavaScriptAdapter(this._dashboard);
    private _graph: Graph = new Graph()
        .allowDragging(false)
        .applyScaleOnLayout(true)
        .on("vertex_click", (row: any, col: string, sel: boolean, ext: any) => {
            const obj = row.__lparam[0];
            this.selectionChanged(obj.viz, obj.activity);
        })
        .on("vertex_contextmenu", (row: any, col: string, sel: boolean, ext: any) => {
        })
    ;
    private _dataProperties: PropertyEditor = new PropertyEditor()
        .show_settings(false)
        .showFields(false)
    ;
    private _vizProperties: PropertyEditor = new PropertyEditor()
        .show_settings(false)
        .showFields(false)
    ;
    private _stateProperties: PropertyEditor = new PropertyEditor()
        .show_settings(false)
        .showFields(false)
    ;
    private _ddlEditor = new DDLEditor();
    private _layoutEditor = new JSONEditor();
    private _jsEditor = new JSEditor();
    private _clone: Dashboard = new Dashboard();
    private _preview = new DatasourceTable();

    constructor(placeholder: string) {
        // app = this;
        this._dataSplit
            .addWidget(this._dataProperties)
            .addWidget(this._preview)
            ;
        this._dockPanel
            .target(placeholder)
            .addWidget(this._dashboard, "Dashboard")
            .addWidget(this._dataSplit, "Data", "split-right", this._dashboard)
            .addWidget(this._vizProperties, "Widget", "tab-after", this._dataSplit)
            .addWidget(this._stateProperties, "State", "tab-after", this._vizProperties)
            .addWidget(this._graph as any, "Pipeline", "tab-after", this._dashboard)    //  TODO Fix Graph Declaration  ---
            .addWidget(this._ddlEditor, "DDL", "tab-after", this._graph as any)         //  TODO Fix Graph Declaration  ---
            .addWidget(this._layoutEditor, "Layout", "tab-after", this._ddlEditor)
            .addWidget(this._clone, "Clone", "tab-after", this._layoutEditor)
            .on("childActivation", (w: Widget) => {
                switch (w) {
                    case this._dashboard:
                        this.selectionChanged(this._currViz);
                        break;
                    case this._graph:
                        this.loadGraph(true);
                        break;
                    case this._ddlEditor:
                        this.loadDDL(true);
                        break;
                    case this._layoutEditor:
                        this.loadLayout(true);
                        break;
                    case this._clone:
                        this.loadClone();
                        this.loadDataProps(this._clone.test());
                        break;
                }
            })
            .lazyRender()
            ;
        this.initMenu();
        this._dataProperties.monitor((id: string, newValue: any, oldValue: any, source: PropertyExt) => {
            if (source !== this._dataProperties && this._currViz) {
                this._currViz.refresh().then(() => {
                    this.refreshPreview();
                });
                switch (this._dockPanel.active()) {
                    case this._dashboard:
                        break;
                    case this._graph:
                        this.loadGraph(true);
                        break;
                    case this._ddlEditor:
                        this.loadDDL(true);
                        break;
                    case this._layoutEditor:
                        this.loadLayout(true);
                        break;
                    case this._clone:
                        break;
                }
            }
        });
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

    private _currViz: Viz | undefined;
    private _currActivity: Activity | undefined;
    selectionChanged(viz?: Viz, activity?: Activity) {
        if (activity && (this._currActivity !== activity)) {
            this.loadDataProps(activity);
            this.loadPreview(activity);
        } else if (viz && (this._currViz !== viz || this._currActivity !== activity)) {
            this.loadDataProps(viz.view());
            this.loadWidgetProps(viz.widget());
            this.loadStateProps(viz.state());
            this.loadPreview(viz.view().last());
        }
        this._currViz = viz;
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

    loadStateProps(pe: PropertyExt) {
        this._stateProperties
            .widget(pe)
            .render()
            ;
    }

    loadPreview(activity: Activity) {
        this._preview
            .datasource(new DatasourceAdapt(activity))
            .paging(true)
            .lazyRender()
            ;
    }

    loadEditor() {
        //        this._editor.ddl(serialize(this._model) as object);
    }

    loadDashboard(refresh: boolean = true) {
        if (refresh && this._dockPanel.isVisible(this._dashboard as any)) {
            this._dashboard.lazyRender();
        }
    }

    loadGraph(refresh: boolean = false) {
        this._graph
            .layout("Hierarchy")
            .data({ ...this._graphAdapter.createGraph(), merge: false })
            ;
        if (refresh && this._dockPanel.isVisible(this._graph as any)) {
            this._graph.lazyRender();
        }
    }

    loadDDL(refresh: boolean = false) {
        this._ddlEditor
            .ddl(this._dashboard.ddl())
            ;
        if (refresh && this._dockPanel.isVisible(this._ddlEditor as any)) {
            this._ddlEditor
                .lazyRender()
                ;
        }
    }

    loadLayout(refresh: boolean = false) {
        this._layoutEditor
            .json(this._dashboard.layout())
            ;
        if (refresh && this._dockPanel.isVisible(this._layoutEditor as any)) {
            this._layoutEditor
                .lazyRender()
                ;
        }
    }

    async loadClone() {
        await this._clone.restore(this._dashboard.save());
        this._clone.lazyRender();
    }

    initMenu() {
        const commands = new CommandRegistry();

        //  Dashboard  Commands  ---
        commands.addCommand("dash_add", {
            label: "Add Viz",
            execute: () => {
                const viz = new Viz(this._dashboard);
                this._dashboard.addVisualization(viz);
                this.loadDashboard();
                viz.refresh().then(() => {
                    this.selectionChanged(viz);
                });
            }
        });

        commands.addCommand("dash_add_ddl", {
            label: "Add DDL",
            execute: () => {
                this._dashboard.restoreDDL("http://10.173.147.1:8010/WsWorkunits/WUResult.json?Wuid=W20170905-105711&ResultName=pro2_Comp_Ins122_DDL", ddl);
                this.loadDashboard();
                for (const viz of this._dashboard.visualizations()) {
                    viz.refresh();
                }
            }
        });

        commands.addCommand("dash_clear", {
            label: "Clear",
            execute: () => {
                this._dashboard.clear();
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
        contextMenu.addItem({ command: "dash_add_ddl", selector: `#${this._dashboard.id()}` });
        contextMenu.addItem({ command: "dash_clear", selector: `#${this._dashboard.id()}` });

        document.addEventListener("contextmenu", (event: MouseEvent) => {
            if (contextMenu.open(event)) {
                event.preventDefault();
            }
        });
    }

    doResize(width: number, height: number) {
        this._dockPanel
            .resize({ width, height })
            .lazyRender();
    }

}
