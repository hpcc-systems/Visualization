import { hashSum } from "@hpcc-js/util";
import { Common } from "./Common";
import { DBStore } from "./DBStore";

export class Table extends Common {
    _prevChecksum;
    _prevColsHash;

    constructor() {
        super();
    }

    enter(domNode, element) {
        super.enter(domNode, element);
    }

    update(domNode, element) {
        super.update(domNode, element);
        const store = new DBStore(this._db);
        this._columns = store.columns();
        const colsHash = hashSum(this._columns);
        const data = store.fetchAll();
        const dataHash = hashSum(data.map(d => d));
        let changed = false;
        if (this._prevColsHash !== colsHash) {
            this._prevColsHash = colsHash;
            this._dgrid.set("columns", this._columns);
            changed = true;
        }
        if (this._prevChecksum !== dataHash) {
            this._prevChecksum = dataHash;
            this._store.setData(data);
            changed = true;
        }
        if (changed) {
            this._dgrid.refresh();
        }
    }

    click(row, col, sel) {
    }
}
Table.prototype._class += " dgrid_Table";
