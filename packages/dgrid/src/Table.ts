import { Palette, PropertyExt } from "@hpcc-js/common";
import { hashSum } from "@hpcc-js/util";
import { select as d3Select } from "d3-selection";
import { Common } from "./Common";
import { CellRenderer, ColumnType, RowType } from "./RowFormatter";

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

function defaultFormatter(this: ColumnType, cell: any, row: RowType) {
    switch (typeof cell) {
        case "string":
            return cell.replace("\t", "&nbsp;&nbsp;&nbsp;&nbsp;");
        case "undefined":
            return "";
    }
    return cell;
}

function createCellRenderer(columns: string[], columnPalettes: ColumnPalette[]): CellRenderer {
    const palettes = {};
    columnPalettes.forEach((columnPalette, idx) => {
        if (columnPalette.column()) {
            palettes[columns.indexOf(columnPalette.column())] = {
                palette: Palette.rainbow(columnPalette.paletteID()),
                min: columnPalette.min(),
                max: columnPalette.max()
            };
        }
    });
    return function (this: ColumnType, row: RowType, cell: any, cellElement: HTMLElement): HTMLElement | void {
        const pal = palettes[this.idx];
        if (pal) {
            const background = pal.palette(cell, pal.min, pal.max);
            d3Select(cellElement)
                .style("background", background)
                .style("color", Palette.textColor(background))
                ;
        }
        cellElement.innerText = defaultFormatter.call(this, cell, row);
    };
}

//  ColumnPalette ---
export class ColumnPalette extends PropertyExt {
    _owner: Table;

    constructor(owner: Table) {
        super();
        this._owner = owner;
    }

    valid(): boolean {
        return !!this.column();
    }
}
ColumnPalette.prototype._class += " dgrid_Table.ColumnPalette";

export interface ColumnPalette {
    column(): string;
    column(_: string): this;
    paletteID(): string;
    paletteID(_: string): this;
    min(): number;
    min(_: number): this;
    max(): number;
    max(_: number): this;
}
ColumnPalette.prototype.publish("column", null, "set", "Column", function (this: ColumnPalette) { return this._owner.columns(); }, { optional: true });
ColumnPalette.prototype.publish("paletteID", "default", "set", "Palette ID", Palette.rainbow("default").switch());
ColumnPalette.prototype.publish("min", 0, "number", "Min Value");
ColumnPalette.prototype.publish("max", 100, "number", "Max Value");

//  Table ---
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
            const hash = hashSum({ _ });
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
            const hash = hashSum({ _ });
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
            const hash = JSON.stringify(_); // TODO - Should be a more efficent way (immutable?).
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

    _prevHash;
    update(domNode, element) {
        super.update(domNode, element);
        const hash = this.hash();
        if (this._prevHash !== hash) {
            this._prevHash = hash;
            this._colsRefresh = true;
            this._forceRefresh = true;
        }
        if (this._colsRefresh) {
            this._columns = this._store.columns(defaultFormatter, createCellRenderer(this.columns(), this.columnPalettes()));
            switch (this.columnWidth()) {
                case "auto":
                    const data = this.data().filter((row, idx) => idx < 10);
                    this.guessWidth(this._columns, data);
                    break;
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
    columnWidth(): "auto" | "none";
    columnWidth(_: "auto" | "none"): this;
    columnPalettes(): ColumnPalette[];
    columnPalettes(_: ColumnPalette[]): this;
}

Table.prototype.publish("columnWidth", "auto", "set", "Default column width", ["auto", "none"]);
Table.prototype.publish("columnPalettes", [], "propertyArray", "Source Columns", null, { autoExpand: ColumnPalette });
