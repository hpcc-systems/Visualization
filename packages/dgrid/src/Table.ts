import { Palette, PropertyExt } from "@hpcc-js/common";
import { hashSum } from "@hpcc-js/util";
import { format as d3Format } from "d3-format";
import { select as d3Select } from "d3-selection";
import { Common } from "./Common";
import { CellFormatter, CellRenderer, ColumnType, RowType } from "./RowFormatter";

//  ColumnPalette ---
export class ColumnFormat extends PropertyExt {
    _owner: Table;

    constructor() {
        super();
    }

    owner(): Table;
    owner(_: Table): this;
    owner(_?: Table): Table | this {
        if (!arguments.length) return this._owner;
        this._owner = _;
        return this;
    }

    valid(): boolean {
        return !!this.column();
    }

    formatterFunc(): CellFormatter | undefined {
        const defaultFormatter = this._owner.formatterFunc();
        if (this.valid() && this.format()) {
            const numberFormatter = d3Format(this.format());

            return function (this: ColumnType, cell: any, row: RowType): string {
                if (typeof cell === "number")
                    return numberFormatter(cell);
                return defaultFormatter.call(this, cell, row);
            };
        }
        return defaultFormatter;
    }

    renderCellFunc(): CellRenderer | undefined {
        const defaultRenderCell = this._owner.renderCellFunc();
        const defaultFormatter = this.formatterFunc();
        if (this.valid() && this.paletteID()) {
            const columns = this._owner.columns();
            const palette = Palette.rainbow(this.paletteID());
            const min = this.min();
            const max = this.max();
            const valueColIdx = this.valueColumn() ? columns.indexOf(this.valueColumn()) : undefined;
            return function (this: ColumnType, row: RowType, cell: any, cellElement: HTMLElement): HTMLElement | void {
                if (defaultRenderCell) {
                    defaultRenderCell.call(this, row, cell, cellElement);
                }
                const value = valueColIdx ? row.__origRow[valueColIdx] : cell;
                const background = palette(value, min, max);
                d3Select(cellElement)
                    .style("background", background)
                    .style("color", Palette.textColor(background))
                    .text(defaultFormatter.call(this, cell, row))
                    ;
            };
        }
        return defaultRenderCell;
    }
}
ColumnFormat.prototype._class += " dgrid_Table.ColumnFormat";

export interface ColumnFormat {
    column(): string;
    column(_: string): this;
    width(): number;
    width(_: number): this;
    format(): string;
    format(_: string): this;
    paletteID(): string;
    paletteID(_: string): this;
    min(): number;
    min(_: number): this;
    max(): number;
    max(_: number): this;
    valueColumn(): string;
    valueColumn(_: string): this;
}
ColumnFormat.prototype.publish("column", null, "set", "Column", function (this: ColumnFormat) { return this._owner.columns(); }, { optional: true });
ColumnFormat.prototype.publish("width", null, "number", "Width", null, { optional: true });
ColumnFormat.prototype.publish("format", null, "string", "Format (d3-format)", null, { optional: true });
ColumnFormat.prototype.publish("paletteID", null, "set", "Color palette for this widget", ["", ...Palette.rainbow("default").switch()], { optional: true });
ColumnFormat.prototype.publish("min", 0, "number", "Min Value", null, { disable: (cf: ColumnFormat) => !cf.paletteID() });
ColumnFormat.prototype.publish("max", 100, "number", "Max Value", null, { disable: (cf: ColumnFormat) => !cf.paletteID() });
ColumnFormat.prototype.publish("valueColumn", null, "set", "Column", function (this: ColumnFormat) { return this._owner.columns(); }, { optional: true, disable: (cf: ColumnFormat) => !cf.paletteID() });

//  Table ---
export class Table extends Common {
    private _prevColsHash;
    private _prevFieldsHash;
    _colsRefresh = false;
    _dataRefresh = false;

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
            }
        }
        return retVal;
    }

    data(_?: any): any | this {
        const retVal = super.data.apply(this, arguments);
        if (arguments.length) {
            this._dataRefresh = true;
        }
        return retVal;
    }

    enter(domNode, element) {
        super.enter(domNode, element);
    }

    guessWidth(columns, data) {
        const sortablePadding = this.sortable() ? 12 : 0;
        for (const column of columns) {
            if (column.children) {
                let sampleData = [];
                for (let i = 0; i < Math.min(3, data.length); ++i) {
                    sampleData = sampleData.concat(data[i][column.idx]);
                }
                this.guessWidth(column.children, sampleData);
            } else {
                column.width = data.reduce((prevVal: number, row) => {
                    const cell = ("" + row[column.idx]).trim();
                    return Math.max(prevVal, this.textSize(cell).width);
                }, this.textSize("" + column.label, undefined, undefined, true).width + sortablePadding) + 8; // +12 for the sort icon, +8 for the cell padding.
            }
        }
    }

    _prevHash;
    update(domNode, element) {
        super.update(domNode, element);
        const hash = this.hashSum();
        if (this._prevHash !== hash) {
            this._prevHash = hash;
            this._colsRefresh = true;
        }
        if (this._colsRefresh) {
            this._columns = this._store.columns(this.sortable(), this.formatterFunc(), this.renderCellFunc());
            switch (this.columnWidth()) {
                case "auto":
                    const tenRows = this.data().filter((row, idx) => idx < 10);
                    this.guessWidth(this._columns, tenRows);
                    break;
            }
            const columns = this.columns();
            for (const columnFormat of this.columnFormats()) {
                if (columnFormat.valid()) {
                    const colIdx = columns.indexOf(columnFormat.column());
                    if (this._columns[colIdx]) {
                        this._columns[colIdx].hidden = columnFormat.width() === 0;
                        this._columns[colIdx].width = columnFormat.width() || this._columns[colIdx].width;
                        this._columns[colIdx].formatter = columnFormat.formatterFunc();
                        this._columns[colIdx].renderCell = columnFormat.renderCellFunc();
                    }
                }
            }
            this._dgrid.set("columns", this._columns);
            this._colsRefresh = false;
        }
        if (this._colsRefresh || this._dataRefresh) {
            if (this._colsRefresh) {
                this._dgrid.refresh({});
            } else {
                this._dgrid.refresh();
            }
            this._colsRefresh = false;
            this._dataRefresh = false;
        }
    }

    //  Cell  ---
    formatterFunc(): CellFormatter | undefined {
        return function (this: ColumnType, cell: any, row: RowType): string {
            switch (typeof cell) {
                case "string":
                    return cell.replace("\t", "&nbsp;&nbsp;&nbsp;&nbsp;").trim();
                case "undefined":
                    return "";
            }
            return cell;
        };
    }

    renderCellFunc(): CellRenderer | undefined {
        return undefined;  //  Undefined will defualt to formatter  ---
    }

    //  Events  ---
    click(row, col, sel) {
    }
}
Table.prototype._class += " dgrid_Table";

export interface Table {
    columnWidth(): "auto" | "none";
    columnWidth(_: "auto" | "none"): this;
    columnFormats(): ColumnFormat[];
    columnFormats(_: ColumnFormat[]): this;
}

Table.prototype.publish("columnWidth", "auto", "set", "Default column width", ["auto", "none"]);
Table.prototype.publish("columnFormats", [], "propertyArray", "Source Columns", null, { autoExpand: ColumnFormat });
