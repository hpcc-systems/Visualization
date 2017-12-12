import { d3SelectionType, Widget } from "@hpcc-js/common";
import { MultiChartPanel } from "@hpcc-js/composite";
import { DDL2 } from "@hpcc-js/ddl-shim";
import { DockPanel } from "@hpcc-js/phosphor";
import { compare } from "@hpcc-js/util";
import { DDLAdapter } from "./ddl";
import { createProps, JavaScriptAdapter } from "./javascriptadapter";
import { Element, ElementContainer } from "./model";

export interface ICPPersist {
    id: string;
    type: string;
    props: object;
}

export interface IDashboardPersist {
    ddl: DDL2.Schema;
    widgets: ICPPersist[];
    layout: object;
}

export class Dashboard extends DockPanel {
    private _ec: ElementContainer;

    constructor(ec: ElementContainer) {
        super();
        this._ec = ec;
        this._ec.on("vizStateChanged", this.vizStateChanged);
    }

    elementContainer(): ElementContainer {
        return this._ec;
    }

    save(): IDashboardPersist {
        const ddlAdapter = new DDLAdapter(this._ec);
        return {
            ddl: ddlAdapter.write(),
            widgets: this.widgets().map(_cp => {
                const cp: MultiChartPanel = _cp as MultiChartPanel;
                return {
                    id: cp.id(),
                    type: cp.chartType(),
                    props: createProps((cp as MultiChartPanel).chart())
                };
            }),
            layout: this.layout()
        };
    }

    restore(_: IDashboardPersist): this {
        const ddlAdapter = new DDLAdapter(this._ec);
        ddlAdapter.read(_.ddl);
        this.syncWidgets();
        for (const w of _.widgets) {
            this._ec.element(w.id).multiChartPanel()
                .chartType(w.type)
                .chartTypeProperties(w.props)
                ;
        }
        // this.layout(_.layout);
        return this;
    }

    javascript(): string {
        const jsAdapter = new JavaScriptAdapter(this);
        return jsAdapter.createJavaScript();
    }

    syncWidgets() {
        const previous = this.widgets();
        const diff = compare(previous, this._ec.elements().map(viz => viz.chartPanel()));
        for (const w of diff.removed) {
            this.removeWidget(w);
        }
        for (const w of diff.added) {
            const element: Element = this._ec.element(w);
            this.addWidget(w, element.title(), "split-bottom");
        }
        for (const w of diff.unchanged) {
            const wa: any = this.getWidgetAdapter(w);
            wa.title.label = this._ec.element(w).title();
        }
    }

    update(domNode: HTMLElement, element: d3SelectionType) {
        this.syncWidgets();
        super.update(domNode, element);
    }

    //  Events  ---
    childActivation(w: Widget) {
        super.childActivation(w);
        this.vizActivation(this._ec.element(w));
    }

    vizActivation(viz: Element) {
    }

    vizStateChanged(viz: Element) {
    }
}
Dashboard.prototype._class += " dashboard_dashboard";
