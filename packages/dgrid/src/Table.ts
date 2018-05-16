import { hashSum } from "@hpcc-js/util";
import { Common } from "./Common";

function charW(w, c) {
    if (c === "W" || c === "M") w += 15;
    else if (c === "w" || c === "m") w += 12;
    else if (c === "I" || c === "i" || c === "l" || c === "t" || c === "f") w += 4;
    else if (c === "r") w += 8;
    else if (c === c.toUpperCase()) w += 12;
    else w += 10;
    return w;
}

function textWidth(s) {
    return s.split("").reduce(charW, 0);
}

export class Table extends Common {
    private _prevColsHash;
    private _prevFieldsHash;
    private _prevDataHash;
    _colsRefresh = false;
    _forceRefresh = false;

    constructor() {
        super();
    }

    fields(_?: any): any | this {
        const retVal = super.fields.apply(this, arguments);
        if (arguments.length) {
            const hash = hashSum({ _, guess: this.guessColumnWidth() });
            if (this._prevFieldsHash !== hash) {
                this._prevFieldsHash = hash;
                this._colsRefresh = true;
                this._forceRefresh = true;
            }
        }
        return retVal;
    }

    columns(_?: any): any | this {
        const retVal = super.columns.apply(this, arguments);
        if (arguments.length) {
            const hash = hashSum({ _, guess: this.guessColumnWidth() });
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
            const hash = JSON.stringify(_); // TODO - Should be a more efficent way.
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

    guessWidth(columns, data) {
        for (const column of columns) {
            if (column.children) {
                const sampleData = [];
                for (let i = 0; i < Math.min(3, data.length); ++i) {
                    sampleData.push(data[i][column.idx]);
                }
                this.guessWidth(column.children, sampleData);
            } else {
                column.width = data.reduce((prevVal: number, row) => {
                    const cell = ("" + row[column.idx]).trim();
                    return Math.max(prevVal, textWidth(cell));
                }, textWidth("" + column.label));
            }
        }
    }

    update(domNode, element) {
        super.update(domNode, element);
        this._columns = this._store.columns();
        if (this._colsRefresh) {
            if (this.guessColumnWidth()) {
                const data = this.data().filter((row, idx) => idx < 10);
                this.guessWidth(this._columns, data);
            }
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

export interface Table {
    guessColumnWidth(): boolean;
    guessColumnWidth(_: boolean): this;
}

Table.prototype.publish("guessColumnWidth", true, "boolean", "Estime column width.");
