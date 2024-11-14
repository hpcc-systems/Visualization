import { Widget } from "@hpcc-js/common";
import { Memory } from "./dgrid-shim.ts";
import { Common } from "./Common.ts";
import { DatasourceStore, IDatasource } from "./DatasourceStore.ts";

export class DatasourceTable extends Common {
    _prevDatasource?: IDatasource;

    constructor() {
        super();
    }

    invalidate(): this {
        delete this._prevDatasource;
        return this;
    }

    enter(domNode, element) {
        super.enter(domNode, element);
    }

    update(domNode, element) {
        super.update(domNode, element);
    }
    render(callback?: (w: Widget) => void): this {
        return super.render(w => {
            if (this._prevDatasource !== this.datasource()) {
                this._dgrid.set("collection", new Memory());
                this._dgrid.set("columns", []);
                this._prevDatasource = this.datasource();
                if (this._prevDatasource) {
                    const store = new DatasourceStore(this._prevDatasource, this.renderHtml());
                    this._dgrid.set("columns", store.columns());
                    this._dgrid.set("collection", store);
                    if (callback) {
                        callback(w);
                    }
                } else {
                    if (callback) {
                        callback(w);
                    }
                }
            } else {
                if (callback) {
                    callback(w);
                }
            }
        });
    }

    click(row, col, sel) {
    }
}
DatasourceTable.prototype._class += " dgrid_DatasourceTable";

export interface DatasourceTable {
    datasource(): IDatasource;
    datasource(_: IDatasource): this;
}

DatasourceTable.prototype.publish("datasource", null, "object", "Datasource");

