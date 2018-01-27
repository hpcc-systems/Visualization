import { JSEditor, JSONEditor } from "@hpcc-js/codemirror";
import { PropertyExt, Widget } from "@hpcc-js/common";
import { Connection, hookSend, IOptions, ResponseType, SendFunc, serializeRequest } from "@hpcc-js/comms";
import { DDL1 } from "@hpcc-js/ddl-shim";
import { DatasourceTable } from "@hpcc-js/dgrid";
import { Graph } from "@hpcc-js/graph";
import { Activity, Dashboard, DatasourceAdapt, DDLEditor, Element, ElementContainer, GraphAdapter, JavaScriptAdapter, upgrade } from "@hpcc-js/marshaller";
import { PropertyEditor } from "@hpcc-js/other";
import { DockPanel, SplitPanel } from "@hpcc-js/phosphor";
import { CommandPalette, CommandRegistry, ContextMenu } from "@hpcc-js/phosphor-shim";
import { ddl } from "./sampleddl";

export function doHook() {
    const origSend = hookSend((opts: IOptions, action: string, request: any, responseType: ResponseType): Promise<any> => {
        if (opts.baseUrl === "https://webmiscdev.risk.regn.net") {
            return origSend(opts, action, request, responseType);
        }
        let newUrl = "";
        if (opts.baseUrl.split("").reverse()[0] === "/" || action[0] === "/") {
            newUrl = btoa(`${opts.baseUrl}${action}?${serializeRequest(request)}`);
        } else {
            newUrl = btoa(`${opts.baseUrl}/${action}?${serializeRequest(request)}`);
        }
        const connection = new Connection({ baseUrl: "https://webmiscdev.risk.regn.net", type: "get" });
        return connection.send("brundajx/DASH2/demos/dashy/bis_proxy.php", { encoded: newUrl }, responseType).then(response => {
            return response;
        }).catch(e => {
            throw e;
        });
    });
}
if (window.location.origin.indexOf("http") === 0) {
    doHook();
}

// const test = upgrade("http://10.173.147.1:8010/WsWorkunits/WUResult.json?Wuid=W20170905-105711&ResultName=pro2_Comp_Ins122_DDL", JSON.stringify(ddl));

class Mutex {
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

async function scopedLock(m: Mutex, func: (...params: any[]) => Promise<void>) {
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
    private _elementContainer: ElementContainer = new ElementContainer();

    private _dashboard: Dashboard = new Dashboard(this._elementContainer)
        .on("vizActivation", (viz: Element) => {
            this.selectionChanged(viz);
        })
        .on("vizStateChanged", (viz: Element) => {
            for (const filteredViz of this._elementContainer.filteredBy(viz)) {
                if (this._currViz === filteredViz) {
                    this.refreshPreview();
                }
            }
        })
        ;
    private _graphAdapter = new GraphAdapter(this._elementContainer);
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
    private _cloneEC: ElementContainer = new ElementContainer();
    private _clone: Dashboard = new Dashboard(this._cloneEC);
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
            .addWidget(this._jsEditor, "TS", "tab-after", this._ddlEditor)
            .addWidget(this._layoutEditor, "Layout", "tab-after", this._jsEditor)
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
                    case this._jsEditor:
                        this.loadJavaScript(true);
                        break;
                    case this._layoutEditor:
                        this.loadLayout(true);
                        break;
                    case this._clone:
                        this.loadClone();
                        //  this.loadDataProps(this._clone.test());
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

    clear() {
        this._elementContainer.clear();
        this.loadDashboard();
        this._elementContainer.refresh();
    }

    importV1DDL(target: string, ddl: DDL1.DDLSchema, seri: object) {
        this._elementContainer.importV1DDL(target, ddl, seri);
        this.loadDashboard();
        this._elementContainer.refresh();
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
    selectionChanged(viz?: Element, activity?: Activity) {
        if (activity && (this._currActivity !== activity)) {
            this.loadDataProps(activity);
            this.loadPreview(activity);
        } else if (viz && (this._currViz !== viz || this._currActivity !== activity)) {
            this.loadDataProps(viz.hipiePipeline());
            this.loadWidgetProps(viz.multiChartPanel());
            this.loadStateProps(viz.state());
            this.loadPreview(viz.hipiePipeline()!.last()!);
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
            // .paging(true)
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
            .data({ ...this._graphAdapter.createGraph(), merge: false })
            ;
        if (refresh && this._dockPanel.isVisible(this._graph as any)) {
            this._graph
                .layout("Hierarchy")
                .lazyRender()
                ;
        }
    }

    loadDDL(refresh: boolean = false) {
        this._ddlEditor
            .ddl(this._elementContainer.ddl())
            ;
        if (refresh && this._dockPanel.isVisible(this._ddlEditor as any)) {
            this._ddlEditor
                .lazyRender()
                ;
        }
    }

    loadJavaScript(refresh: boolean = false) {
        this._jsEditor
            .javascript(this._dashboard.javascript())
            ;
        if (refresh && this._dockPanel.isVisible(this._jsEditor as any)) {
            this._jsEditor
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

    loadClone() {
        this._cloneEC.clear();
        this._clone.restore(this._dashboard.save());
        this._clone.render(w => {
            this._cloneEC.refresh();
        });
    }

    initMenu() {
        const commands = new CommandRegistry();

        //  Dashboard  Commands  ---
        commands.addCommand("dash_add", {
            label: "Add Element",
            execute: () => {
                const viz = new Element(this._elementContainer);
                this._elementContainer.append(viz);
                this.loadDashboard();
                viz.refresh().then(() => {
                    this.selectionChanged(viz);
                });
            }
        });

        commands.addCommand("dash_add_ddl", {
            label: "Add DDL",
            execute: () => {
                this.importV1DDL("http://10.173.147.1:8010/WsWorkunits/WUResult.json?Wuid=W20170905-105711&ResultName=pro2_Comp_Ins122_DDL", ddl, {});
            }
        });

        commands.addCommand("dash_clear", {
            label: "Clear",
            execute: () => {
                this.clear();
            }
        });

        /*
        commands.addCommand("dash_save", {
            label: "Save",
            execute: () => {
                this._elementContainer.save();
            }
        });

        commands.addCommand("dash_load", {
            label: "Load",
            execute: () => {
                this._elementContainer.load();
            }
        });
        */

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
