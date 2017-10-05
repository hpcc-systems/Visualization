import { Deferred } from "@hpcc-js/dgrid-shim";
import { QueryResults } from "@hpcc-js/dgrid-shim";

import "../src/WUResultStore.css";

export interface IField {
    id: string;
    label: string;
    type: "string" | "number" | "boolean" | "symbol" | "undefined" | "object" | "function";
    children: IField[] | null;
}

export interface IDatasource {
    id: () => string;
    hash: () => string;
    label: () => string;

    outFields: () => IField[];
    total: () => number;
    fetch: (from: number, count: number) => Promise<any[]>;
}

export class DatasourceCache implements IDatasource {
    protected _datasource: IDatasource;
    _prevHash: string;
    _fetchCache: { [key: string]: Promise<any[]> } = {};

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
    fetch(from: number, count: number) {
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
const LINE_SPLITTER = `<br><hr class='dgrid-fakeline'>`;
const LINE_SPLITTER2 = `<br><hr class='dgrid-fakeline' style='visibility: hidden'>`;

class RowFormatter {
    private _columns;
    private _flattenedColumns = [];
    private _columnIdx = {};
    private _formattedRow = {};

    constructor(columns) {
        this._columns = columns;
        this.flattenColumns(columns);
    }

    flattenColumns(columns) {
        for (const column of columns) {
            this.flattenColumn(column);
        }
    }

    flattenColumn(column) {
        if (column.children) {
            for (const childColumn of column.children) this.flattenColumn(childColumn);
        } else {
            this._columnIdx[column.field] = this._flattenedColumns.length;
            this._flattenedColumns.push(column.field);
        }
    }

    format(row) {
        this._formattedRow = {};
        this.formatRow(this._columns, row);
        return this.row();
    }

    calcDepth(columns, row) {
        let maxChildDepth = 1;
        for (const column of columns) {
            if (column.children) {
                let childDepth = 0;
                for (const childRow of row[column.leafID]) {
                    if (childRow instanceof Array) {
                    }
                    childDepth += this.calcDepth(column.children, childRow);
                }
                maxChildDepth = Math.max(maxChildDepth, childDepth);
            }
        }
        return maxChildDepth;
    }

    formatCell(column, cell, maxChildDepth) {
        if (column.children) {
            let childDepth = 0;
            if (!(cell instanceof Array)) {
                if (cell instanceof Object && cell.Row instanceof Array) {  //  Push fix in comms?
                    cell = cell.Row;
                } else {
                    cell = [cell];
                }
            }
            for (const row of cell) {
                childDepth = Math.max(childDepth, this.formatRow(column.children, row));
            }
        } else {
            if (this._formattedRow[column.field] === undefined) {
                this._formattedRow[column.field] = "" + cell;
            } else {
                this._formattedRow[column.field] += LINE_SPLITTER;
                this._formattedRow[column.field] += "" + cell;
            }
            if (maxChildDepth > 1) {
                const paddingArr = [];
                paddingArr.length = maxChildDepth;
                const padding = paddingArr.join(LINE_SPLITTER2);
                this._formattedRow[column.field] += padding;
            }
        }
    }

    formatRow(columns, row: { [key: string]: any } = [], rowIdx: number = 0) {
        const maxChildDepth = this.calcDepth(columns, row);
        for (const column of columns) {
            this.formatCell(column, row[column.leafID], maxChildDepth);
        }
        return maxChildDepth;
    }

    row() {
        const retVal = {};
        for (const column of this._flattenedColumns) {
            retVal[column] = this._formattedRow[column];
        }
        return retVal;
    }
}

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

    db2Columns(fields: IField[], prefix = ""): any[] {
        if (!fields) return [];
        return fields.map((field, idx) => {
            const column: any = {
                label: field.label,
                leafID: field.id,
                field: prefix + field.id,
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
                    formattedRow.__hpcc_orig = row;
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
