import { Button, d3SelectionType, Spacer, Widget } from "@hpcc-js/common";
import { DDL2 } from "@hpcc-js/ddl-shim";
import { ChartPanel } from "@hpcc-js/layout";
import { CommandRegistry, ContextMenu, DockPanel, IClosable, WidgetAdapter } from "@hpcc-js/phosphor";
import { compare } from "@hpcc-js/util";
import { DDLAdapter } from "./ddl";
import { JavaScriptAdapter } from "./javascriptadapter";
import { Element, ElementContainer } from "./model/element";

import "../../src/ddl2/dashboard.css";

export class Dashboard extends DockPanel implements IClosable {
    private _ec: ElementContainer;

    constructor(ec: ElementContainer) {
        super();
        this._ec = ec;
        this._ec.on("vizStateChanged", this.vizStateChanged);
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
    private _layoutObj: object = null;
    layoutObj(): object | null;
    layoutObj(_: object | null): this;
    layoutObj(_?: object): this | object | null {
        if (!arguments.length) return this._layoutObj;
        this._layoutObj = _;
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

    tabTitle(element: Element): string {
        if (this.hideSingleTabs()) {
            return element.visualization().title ? element.visualization().title() : element.visualization().id();
        }
        return element.id();
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
            const wa: any = this.getWidgetAdapter(w);
            wa.title.label = this.tabTitle(this._ec.element(w));
        }
    }

    update(domNode: HTMLElement, element: d3SelectionType) {
        this.syncWidgets();
        super.update(domNode, element);
    }

    render(callback?: (w: Widget) => void): this {
        return super.render(w => {
            if (this.layoutObj() !== null) {
                this.layout(this.layoutObj());
                this.layoutObj(null);
            }
            if (callback) {
                callback(w);
            }
        });
    }

    //  Events  ---
    childActivation(w: Widget, wa: WidgetAdapter) {
        super.childActivation(w, wa);
        this.vizActivation(this._ec.element(w));
        for (const wa2 of this.widgetAdapters()) {
            if (wa2 === wa) {
                wa2.addClass("active");
                wa2.title.className = "active";
                wa2.title.iconClass = "active";
            } else {
                wa2.removeClass("active");
                wa2.title.className = "";
                wa2.title.iconClass = "";
            }
        }
    }

    vizActivation(viz: Element) {
    }

    vizStateChanged(viz: Element) {
    }

    //  IClosable  ---
    canClose(w: Widget, wa: WidgetAdapter): boolean {
        const id = this._ec.element(w).id();
        const retVal = window.confirm(`Remove Widget "${id}"?`);
        if (retVal) {
            this._ec.clear(id);
        }
        return retVal;
    }
}
Dashboard.prototype._class += " dashboard_dashboard";

export class DashboardCP extends ChartPanel {

    private _ec: ElementContainer;

    private _addButton = new Button().faChar("fa-plus").tooltip("Add...")
        .on("click", () => {
            const node = this._addButton.element().node();
            const rect = node.getBoundingClientRect();
            if (this._contextMenu.open({
                target: node,
                currentTarget: node,
                clientX: rect.left,
                clientY: rect.bottom
            })) {
            }
        });

    private _removeButton = new Button().faChar("fa-minus").tooltip("Remove...")
        .enabled(false)
        .on("click", () => {
            this.remove();
        });

    private _addSamples = new Button().faChar("fa-database").tooltip("Add Samples")
        .on("click", () => {
            this.render();
        });

    _dashboard: Dashboard;
    // private _selectedDS;

    private _contextMenu;

    constructor(ec: ElementContainer) {
        super();
        this._ec = ec;
        this._dashboard = new Dashboard(this._ec);

        this
            .buttons([this._addButton, this._removeButton, new Spacer(), this._addSamples])
            .widget(this._dashboard)
            ;

        this.initMenu();
    }

    initMenu() {
        const commands = new CommandRegistry();

        //  Dashboard  Commands  ---
        commands.addCommand("add_wu_result", {
            label: "Workunit Result",
            execute: () => {
            }
        });

        commands.addCommand("add_logicalfile", {
            label: "Logical File",
            execute: () => {
            }
        });

        commands.addCommand("add_roxie", {
            label: "Roxie Service",
            execute: () => {
            }
        });

        commands.addCommand("add_databomb", {
            label: "Databomb",
            execute: () => {
            }
        });

        commands.addCommand("add_form", {
            label: "Form",
            execute: () => {
            }
        });

        this._contextMenu = new ContextMenu({ commands });
        this._contextMenu.addItem({ command: "add_wu_result", selector: ".common_Button" });
        this._contextMenu.addItem({ command: "add_logicalfile", selector: ".common_Button" });
        this._contextMenu.addItem({ command: "add_roxie", selector: ".common_Button" });
        this._contextMenu.addItem({ command: "add_databomb", selector: ".common_Button" });
        this._contextMenu.addItem({ command: "add_form", selector: ".common_Button" });
    }

    add(ds: any) {
        this.render();
    }

    remove() {
    }

    render(callback?) {
        return super.render(w => {
            this._dashboard.render();
            if (callback) {
                callback(this);
            }
        });
    }
}
