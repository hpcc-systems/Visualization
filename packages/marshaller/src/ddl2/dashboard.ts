
import { d3SelectionType, PropertyExt, publish, Widget } from "@hpcc-js/common";
import { DockPanel } from "@hpcc-js/phosphor";
import { compare } from "@hpcc-js/util";
import { View } from "./activities/view";
import { DDL2, DDLAdapter } from "./ddl";
import { DDLImport } from "./ddlimport";
import { Viz } from "./viz";

export interface IPersist {
    ddl: DDL2.Schema;
    layout: any;
}

export class Test extends PropertyExt {
    @publish([], "widgetArray")
    visualizations: publish<this, Viz[]>;
}

export class Dashboard extends DockPanel {
    private _visualizations: Viz[] = [];
    private _nullVisualization = new Viz(this);

    test(): Test {
        return new Test().visualizations(this.visualizations());
    }

    clear() {
        this._visualizations = [];
        this.render();
    }

    visualizations() {
        return [...this._visualizations];
    }

    visualization(w: string | PropertyExt): Viz {
        let retVal: Viz[];
        if (typeof w === "string") {
            retVal = this._visualizations.filter(viz => viz.id() === w);
        } else {
            retVal = this._visualizations.filter(v => v.vizProps() === w);
        }
        if (retVal.length) {
            return retVal[0];
        }
        return this._nullVisualization;
    }

    visualizationIDs() {
        return this._visualizations.map(viz => viz.id());
    }

    addVisualization(viz: Viz): this {
        this._visualizations.push(viz);
        viz.state().monitorProperty("selection", (id, newVal, oldVal) => {
            const promises: Array<Promise<void>> = [];
            for (const filteredViz of this.filteredBy(viz)) {
                promises.push(filteredViz.refresh());
            }
            Promise.all(promises).then(() => {
                this.vizStateChanged(viz);
            });
        });
        return this;
    }

    filteredBy(viz: Viz): Viz[] {
        return this._visualizations.filter(otherViz => {
            const filterIDs = otherViz.view().updatedBy();
            return filterIDs.indexOf(viz.id()) >= 0;
        });
    }

    views(): View[] {
        return this._visualizations.map(viz => viz.view());
    }

    view(id: string): View | undefined {
        return this.views().filter(view => view.id() === id)[0];
    }

    syncWidgets() {
        const previous = this.widgets();
        const diff = compare(previous, this.visualizations().map(viz => viz.widget()));
        for (const w of diff.removed) {
            this.removeWidget(w);
        }
        for (const w of diff.added) {
            this.addWidget(w, this.visualization(w).title(), "split-bottom");
        }
        for (const w of diff.unchanged) {
            const wa: any = this.getWidgetAdapter(w);
            wa.title.label = this.visualization(w).title();
        }
    }

    update(domNode: HTMLElement, element: d3SelectionType) {
        this.syncWidgets();
        super.update(domNode, element);
    }

    ddl(): DDL2.Schema;
    ddl(_: DDL2.Schema): this;
    ddl(_?: DDL2.Schema): DDL2.Schema | this {
        const ddlAdapter = new DDLAdapter(this);
        if (!arguments.length) return ddlAdapter.write();
        ddlAdapter.read(_);
        return this;
    }

    /*
    layout(): object;
    layout(_: object): this;
    layout(_?: object): object | this {
        if (!arguments.length) return super.layout();
        super.layout(_);
        return this;
    }
    */

    save(): IPersist {
        return {
            ddl: this.ddl(),
            layout: this.layout()
        };
    }

    async restore(obj: IPersist): Promise<this> {
        this.clear();
        this.ddl(obj.ddl);
        this.layout(obj.layout);
        await Promise.all(this.visualizations().map(viz => viz.refresh()));
        return this;
    }

    childActivation(w: Widget) {
        super.childActivation(w);
        this.vizActivation(this.visualization(w));
    }

    vizActivation(viz: Viz) {
    }

    restoreDDL(url: string, ddlObj: any) {
        const ddl = new DDLImport(this, url, ddlObj);
        ddl;
    }

    //  Events  ---
    vizStateChanged(viz: Viz) {
    }
}
Dashboard.prototype._class += " dashboard_dashboard";
