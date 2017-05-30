import { Result, XSDSchema, XSDXMLNode } from "@hpcc-js/comms";
import { Deferred, domConstruct, QueryResults } from "@hpcc-js/dgrid-shim";

import "../src/WUResultStore.css";

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

const LINE_SPLITTER = `<br><hr class='dgrid-fakeline'>`;
const LINE_SPLITTER2 = `<br><hr class='dgrid-fakeline' style='visibility: hidden'>`;

class RowFormatter {
    private _columns;
    private _flattenedColumns = [];
    private _columnIdx = {};
    private _formattedRow = {};
    private _grid = {};

    constructor(columns) {
        this._columns = columns;
        this.flattenColumns(columns);
    }

    flattenColumns(columns) {
        for (const column of columns) this.flattenColumn(column);

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
        this._grid = {};
        this.formatRow(this._columns, row);
        return this.row();
    }

    formatRow(columns, row: any = {}, rowIdx: number = 0) {
        let maxChildLen = 0;
        const colLenBefore = {};
        for (const column of columns) {
            if (!column.children && this._formattedRow[column.field] !== undefined) {
                colLenBefore[column.field] = ("" + this._formattedRow[column.field]).split(LINE_SPLITTER).length;
            }
            const rowArr = row instanceof Array ? row : [row];
            for (const r of rowArr) {
                maxChildLen = Math.max(maxChildLen, this.formatCell(column, column.isRawHTML ? r[column.leafID] : safeEncode(r[column.leafID]), rowIdx));
            }
        }
        for (const column of columns) {
            if (!column.children) {
                const cellLength = ("" + this._formattedRow[column.field]).split(LINE_SPLITTER).length - (colLenBefore[column.field] || 0);
                const delta = maxChildLen - cellLength;
                if (delta > 0) {
                    const paddingArr = [];
                    paddingArr.length = delta + 1;
                    const padding = paddingArr.join(LINE_SPLITTER2);
                    this._formattedRow[column.field] += padding;
                }
            }
        }
        return maxChildLen;
    }

    formatCell(column, cell, rowIdx) {
        let internalRows = 0;
        if (column.children) {
            const children = cell && cell.Row ? cell.Row : [cell];
            if (children.length === 0) {
                children.push({});
            }
            for (let idx = 0, _children = children; idx < _children.length; ++idx) {
                const row = _children[idx];
                internalRows += this.formatRow(column.children, row, rowIdx + idx) + 1;
            }
            return children.length;
        }
        if (this._formattedRow[column.field] === undefined) {
            this._formattedRow[column.field] = cell === undefined ? "" : cell;
            ++internalRows;
        } else {
            this._formattedRow[column.field] += LINE_SPLITTER + (cell === undefined ? "" : cell);
            ++internalRows;
        }
        if (!this._grid[rowIdx]) {
            this._grid[rowIdx] = {};
        }
        this._grid[rowIdx][column.field] = cell;
        return internalRows;
    }

    row() {
        const retVal = {};
        for (const column of this._flattenedColumns) {
            retVal[column] = this._formattedRow[column];
        }
        return retVal;
    }
}

export class Store {
    protected wuResult: Result;
    protected schema: XSDSchema;
    protected _columns: any[];
    protected _cache: { [key: string]: Promise<{ totalLength: number, data: any[] }> } = {};
    private rowFormatter: RowFormatter;

    constructor(wuResult: Result, schema: XSDSchema) {
        this.wuResult = wuResult;
        this.schema = schema;
        this._columns = this.schema2Columns(this.schema.root);
        this.rowFormatter = new RowFormatter(this._columns);
    }

    columns() {
        return this._columns;
    }

    schema2Columns(parentNode: XSDXMLNode, prefix: string = ""): any[] {
        if (!parentNode) return [];
        return parentNode.children().filter(node => node.name.indexOf("__hidden", node.name.length - "__hidden".length) === -1).map(node => {
            const label = node.name;
            const keyed = node.attrs["hpcc:keyed"];
            const column: any = {
                label: label + (keyed ? " (i)" : ""),
                leafID: label,
                field: prefix + label,
                className: "resultGridCell",
                sortable: false,
                width: keyed ? 16 : 0
            };
            const children = this.schema2Columns(node, prefix + label + "_");
            if (children.length) {
                column.width += 10 + children.reduce((childNode, prev) => {
                    return prev + childNode.width;
                }, 0);
                column.children = children;
            } else {
                column.width += node.charWidth() * 9;
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

    isChildDataset(cell) {
        if (Object.prototype.toString.call(cell) !== "[object Object]") {
            return false;
        }
        let propCount = 0;
        let firstPropType = null;
        for (const key in cell) {
            if (!firstPropType) {
                firstPropType = Object.prototype.toString.call(cell[key]);
            }
            propCount++;
        }
        return propCount === 1 && firstPropType === "[object Array]";
    }

    rowToTable(cell, __row, node) {
        if (this.isChildDataset(cell)) {  //  Don't display "Row" as a header  ---
            for (const key in cell) {
                this.rowToTable(cell[key], __row, node);
            }
            return;
        }

        const table = domConstruct.create("table", { border: 1, cellspacing: 0, width: "100%" }, node);
        switch (Object.prototype.toString.call(cell)) {
            case "[object Object]":
                let tr = domConstruct.create("tr", null, table);
                for (const key in cell) {
                    domConstruct.create("th", { innerHTML: safeEncode(key) }, tr);
                }
                tr = domConstruct.create("tr", null, table);
                for (const key in cell) {
                    switch (Object.prototype.toString.call(cell[key])) {
                        case "[object Object]":
                        case "[object Array]":
                            this.rowToTable(cell[key], __row, node);
                            break;
                        default:
                            domConstruct.create("td", { innerHTML: safeEncode(cell[key]) }, tr);
                            break;
                    }
                }
                break;
            case "[object Array]":
                for (let i = 0; i < cell.length; ++i) {
                    switch (Object.prototype.toString.call(cell[i])) {
                        case "[object Boolean]":
                        case "[object Number]":
                        case "[object String]":
                            //  Item in Scalar  ---
                            const tr1 = domConstruct.create("tr", null, table);
                            domConstruct.create("td", { innerHTML: safeEncode(cell[i]) }, tr1);
                            break;
                        default:
                            //  Child Dataset  ---
                            if (i === 0) {
                                const tr2 = domConstruct.create("tr", null, table);
                                for (const key in cell[i]) {
                                    domConstruct.create("th", { innerHTML: safeEncode(key) }, tr2);
                                }
                            }
                            domConstruct.create("tr", null, table);
                            for (const key in cell[i]) {
                                if (cell[i][key]) {
                                    if (Object.prototype.toString.call(cell[i][key]) === "[object Object]" || Object.prototype.toString.call(cell[i][key]) === "[object Array]") {
                                        const td = domConstruct.create("td", null, tr1);
                                        this.rowToTable(cell[i][key], cell[i], td);
                                    } else if (key.indexOf("__html", key.length - "__html".length) !== -1) {
                                        domConstruct.create("td", { innerHTML: cell[i][key] }, tr1);
                                    } else if (key.indexOf("__javascript", key.length - "__javascript".length) !== -1) {
                                        /*const td = */ domConstruct.create("td", null, tr1);
                                        // this.injectJavascript(cell[i][key], cell[i], td);
                                    } else {
                                        const val = cell[i][key];
                                        domConstruct.create("td", { innerHTML: safeEncode(val) }, tr1);
                                    }
                                } else {
                                    domConstruct.create("td", { innerHTML: "" }, tr1);
                                }
                            }
                    }
                }
                break;
        }
    }
    getIdentity(row) {
        return row.__hpcc_id;
    }

    _request(start, end): Promise<{ totalLength: number, data: any[] }> {
        if (!this.wuResult) return Promise.resolve({ totalLength: 0, data: [] });
        const cacheKey = `${start}->${end}`;
        if (this._cache[cacheKey]) return this._cache[cacheKey];
        const retVal = this.wuResult.fetchRows(start, end - start).then((rows: any[]) => {
            return {
                totalLength: this.wuResult.Total,
                data: rows.map((row, idx) => {
                    const formattedRow: any = this.rowFormatter.format(row);
                    formattedRow.__hpcc_id = start + idx;
                    formattedRow.__hpcc_orig = row;
                    return formattedRow;
                })
            };
        });
        this._cache[cacheKey] = retVal;
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
