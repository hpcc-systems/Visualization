import { Result, XSDSchema, XSDXMLNode } from "@hpcc-js/comms";
import { ColumnType, Deferred, domConstruct, QueryResults, RowFormatter } from "@hpcc-js/dgrid";
import { safeEncode } from "@hpcc-js/util";

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

    schema2Columns(parentNode: XSDXMLNode, prefix: string = ""): ColumnType[] {
        if (!parentNode) return [];
        return parentNode.children().filter(node => node.name.indexOf("__hidden", node.name.length - "__hidden".length) === -1).map((node, idx) => {
            const label = node.name;
            const keyed = node.attrs["hpcc:keyed"];
            const column: ColumnType = {
                field: prefix + label,
                leafID: label,
                idx,
                label: label + (keyed ? " (i)" : ""),
                className: "resultGridCell",
                sortable: false,
                width: keyed ? 16 : 0
            };
            const children = this.schema2Columns(node, prefix + label + "_");
            if (children.length) {
                column.width += 10 + children.reduce((prev: number, childNode: ColumnType) => {
                    return prev + childNode.width!;
                }, 0);
                column.children = children;
            } else {
                column.width += node.charWidth() * 9;
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
