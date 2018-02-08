import { hashSum } from "@hpcc-js/util";
import { Common } from "./Common";

export class Table extends Common {
    private _prevColsHash;
    private _prevDataHash;
    _colsRefresh = false;
    _forceRefresh = false;

    constructor() {
        super();
    }

    columns(_?: any): any | this {
        const retVal = super.columns.apply(this, arguments);
        if (arguments.length) {
            const hash = hashSum(_); // TODO - Should be a more efficent way.
            if (this._prevColsHash !== hash) {
                this._prevColsHash = hash;
                this._colsRefresh = true;
                this._forceRefresh = true;
            }
        }
        return retVal;
    }

    data(_?: any): any | this {
        const retVal = super.data.apply(this, arguments);
        if (arguments.length) {
            const hash = hashSum(_); // TODO - Should be a more efficent way.
            if (this._prevDataHash !== hash) {
                this._prevDataHash = hash;
                this._forceRefresh = true;
            }
        }
        return retVal;
    }

    enter(domNode, element) {
        super.enter(domNode, element);
    }

    update(domNode, element) {
        super.update(domNode, element);
        this._columns = this._store.columns();
        if (this._colsRefresh) {
            this._dgrid.set("columns", this._columns);
            this._colsRefresh = false;
        }
        if (this._forceRefresh) {
            this._dgrid.refresh();
            this._forceRefresh = false;
        }
    }

    click(row, col, sel) {
    }
}
Table.prototype._class += " dgrid_Table";
