import { Database } from "@hpcc-js/common";
import { Deferred } from "./dgrid-shim.ts";
import { CellFormatter, CellRenderer, ColumnType, RowFormatter } from "./RowFormatter.ts";

export class DBStore {
    private _db: Database.Grid;

    Model: null;
    idProperty: "__hpcc_id";

    constructor(db: Database.Grid) {
        this._db = db;
    }

    protected _renderHtml = true;
    renderHtml(_: boolean) {
        this._renderHtml = _;
    }

    db2Columns(sortable: boolean, fields: Database.Field[], prefix = "", formatter?: CellFormatter, renderCell?: CellRenderer): ColumnType[] {
        if (!fields) return [];
        return fields.map((field, idx) => {
            const label = field.label();
            const column: ColumnType = {
                label,
                leafID: "" + idx,
                field: prefix + idx,
                idx,
                className: "resultGridCell",
                sortable,
                isSet: false
            };
            switch (field.type()) {
                case "nested":
                    column.children = this.db2Columns(false, field.children(), prefix + idx + "_", formatter);
                    column.sortable = false;
                    break;
                default:
                    column.formatter = formatter;
                    column.renderCell = renderCell;
            }
            return column;
        });
    }

    columns(sortable: boolean, formatter?: CellFormatter, renderCell?: CellRenderer) {
        return this.db2Columns(sortable, this._db.fields(), "", formatter, renderCell);
    }

    getIdentity(object) {
        return object.__hpcc_id;
    }

    get(row: number) {
        return this._db.row(row + 1);
    }

    _fetchRange(opts: { start: number, end: number }): object[] {
        const rowFormatter = new RowFormatter(this.columns(false), this._renderHtml);
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
