import { Database } from "@hpcc-js/common";
import { Deferred } from "@hpcc-js/dgrid-shim";
import { IColumn, RowFormatter } from "./RowFormatter";

export class DBStore {
    private _db: Database.Grid;

    Model: null;
    idProperty: "__hpcc_id";

    constructor(db: Database.Grid) {
        this._db = db;
    }

    db2Columns(fields: Database.Field[], prefix = ""): IColumn[] {
        if (!fields) return [];
        return fields.map((field, idx) => {
            const label = field.label();
            const column: IColumn = {
                label,
                leafID: "" + idx,
                field: prefix + idx,
                idx,
                className: "resultGridCell",
                sortable: true,
            };
            switch (field.type()) {
                case "nested":
                    column.children = this.db2Columns(field.children(), prefix + idx + "_");
                    break;
                default:
                    column.formatter = (cell, row) => {
                        switch (typeof cell) {
                            case "string":
                                return cell.replace("\t", "&nbsp;&nbsp;&nbsp;&nbsp;");
                            case "undefined":
                                return "";
                        }
                        return cell;
                    };
            }
            return column;
        });
    }

    columns() {
        return this.db2Columns(this._db.fields(), "");
    }

    getIdentity(object) {
        return object.__hpcc_id;
    }

    _fetchRange(opts: { start: number, end: number }): object[] {
        const rowFormatter = new RowFormatter(this.columns());
        return this._db.data().slice(opts.start, opts.end).map((row, idx) => {
            const formattedRow: any = rowFormatter.format(row);
            return {
                ...formattedRow,
                __hpcc_id: opts.start + idx,
                __origRow: row
            };
        });
    }

    fetchRange(opts: { start: number, end: number }): Promise<object[]> {
        const data = this._fetchRange(opts);
        const retVal: any = new Deferred();
        retVal.totalLength = new Deferred();
        retVal.resolve(data);
        retVal.totalLength.resolve(this._db.length() - 1);
        return retVal;
    }

    sort(opts) {
        this._db.data().sort((l, r) => {
            for (const item of opts) {
                const idx = item.property;
                if ((l[idx] === undefined && r[idx] !== undefined) || l[idx] < r[idx]) return item.descending ? 1 : -1;
                if ((l[idx] !== undefined && r[idx] === undefined) || l[idx] > r[idx]) return item.descending ? -1 : 1;
            }
            return 0;
        });
        return this;
    }
}
