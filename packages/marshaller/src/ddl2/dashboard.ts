import { d3SelectionType, Widget } from "@hpcc-js/common";
import { DDL2 } from "@hpcc-js/ddl-shim";
import { DockPanel, IClosable, WidgetAdapter } from "@hpcc-js/phosphor";
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
        wa.activate();
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
