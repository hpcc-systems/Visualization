import { DDL2 } from "@hpcc-js/ddl-shim";
import { Deferred, QueryResults } from "@hpcc-js/dgrid-shim";
import { ColumnType, RowFormatter } from "./RowFormatter";

export interface IDatasource {
    id: () => string;
    hash: () => string;
    label: () => string;

    outFields: () => DDL2.IField[];
    total: () => number;
    fetch: (from: number, count: number) => Promise<ReadonlyArray<object>>;
}

export class DatasourceCache implements IDatasource {
    protected _datasource: IDatasource;
    _prevHash: string;
    _fetchCache: { [key: string]: Promise<ReadonlyArray<object>> } = {};

    constructor(datasource: IDatasource) {
        this._datasource = datasource;
    }

    validateCache() {
        const hash = this.hash();
        if (this._prevHash !== hash) {
            this._prevHash = hash;
            this._fetchCache = {};
        }
    }

    id() { return this._datasource.id(); }
    hash() { return this._datasource.hash(); }
    label() { return this._datasource.label(); }

    outFields() { return this._datasource.outFields(); }
    total() { return this._datasource.total(); }
    fetch(from: number, count: number): Promise<ReadonlyArray<object>> {
        this.validateCache();
        const cacheID = `${from}->${count}`;
        let retVal = this._fetchCache[cacheID];
        if (!retVal) {
            retVal = this._datasource.fetch(from, count);
            this._fetchCache[cacheID] = retVal;
        }
        return retVal;
    }
}

/*
function entitiesEncode(str) {
    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function safeEncode(item) {
    switch (Object.prototype.toString.call(item)) {
        case "[object Undefined]":
        case "[object Boolean]":
        case "[object Number]":
            return item;
        case "[object String]":
            return entitiesEncode(item);
        default:
            console.log("Unknown cell type:  " + Object.prototype.toString.call(item));
    }
    return item;
}
*/
export class DatasourceStore {
    _datasource: DatasourceCache;
    _columnsIdx: { [key: string]: number } = {};
    _columns;

    private rowFormatter: RowFormatter;

    constructor(datasource: IDatasource) {
        this._datasource = new DatasourceCache(datasource);

        this._columnsIdx = {};
        this._columns = this.db2Columns(this._datasource.outFields()).map((column, idx) => {
            this._columnsIdx[column.field] = idx;
            return column;
        });
        this.rowFormatter = new RowFormatter(this._columns);
    }

    columns() {
        return this._columns;
    }

    db2Columns(fields: DDL2.IField[], prefix = ""): ColumnType[] {
        if (!fields) return [];
        return fields.map((field, idx) => {
            const column: ColumnType = {
                field: prefix + field.id,
                leafID: field.id,
                label: field.id,
                idx,
                className: "resultGridCell",
                sortable: true
            };
            if (field.children) {
                column.children = this.db2Columns(field.children, prefix + field.id + "_");
            } else {
                column.formatter = (cell, row) => {
                    switch (typeof cell) {
                        case "string":
                            return cell.replace("\t", "&nbsp;&nbsp;&nbsp;&nbsp;");
                    }
                    return cell;
                };
            }
            return column;
        });
    }

    getIdentity(row) {
        return row.__hpcc_id;
    }

    _request(start, end): Promise<{ totalLength: number, data: any[] }> {
        if (!this._datasource) return Promise.resolve({ totalLength: 0, data: [] });
        const retVal = this._datasource.fetch(start, end - start).then(response => {
            return {
                totalLength: this._datasource.total(),
                data: response.map((row, idx) => {
                    const formattedRow: any = this.rowFormatter.format(row);
                    formattedRow.__hpcc_id = start + idx;
                    formattedRow.__origRow = row;
                    return formattedRow;
                })
            };
        });
        return retVal;
    }

    fetchRange(options): Promise<any[]> {
        const retVal = new Deferred();
        this._request(options.start, options.end).then(response => retVal.resolve(response));
        return new QueryResults(retVal.then(response => response.data), {
            totalLength: retVal.then(response => response.totalLength)
        });
    }
}
