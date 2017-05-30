import { Common } from "./Common";
import { DBStore } from "./DBStore";

export class Table extends Common {
    _prevChecksum;

    constructor() {
        super();
    }

    enter(domNode, element) {
        super.enter(domNode, element);
    }

    update(domNode, element) {
        super.update(domNode, element);
        if (this._prevChecksum !== this._db.checksum()) {
            this._prevChecksum = this._db.checksum();
            const store = new DBStore(this._db);
            this._dgrid.set("columns", store.columns());
            this._dgrid.set("collection", store);
        }
    }

    click(row, col, sel) {
    }
}
Table.prototype._class += " dgrid_Table";
