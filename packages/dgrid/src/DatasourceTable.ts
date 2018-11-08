import { publish, Widget } from "@hpcc-js/common";
import { Memory } from "@hpcc-js/dgrid-shim";
import { Common } from "./Common";
import { DatasourceStore, IDatasource } from "./DatasourceStore";

export class DatasourceTable extends Common {
    _prevDatasource: IDatasource;

    constructor() {
        super();
    }

    @publish(null, "object", "Datasource")
    datasource: { (): IDatasource; (_: IDatasource): DatasourceTable };

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
                    const store = new DatasourceStore(this._prevDatasource);
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
