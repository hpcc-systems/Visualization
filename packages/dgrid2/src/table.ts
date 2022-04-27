import * as React from "react";
import { HTMLWidget, publish } from "@hpcc-js/common";
import { render, unmountComponentAtNode } from "react-dom";
import { ReactTable } from "./reactTable";

import "../src/table.css";

export type ColumnType = "boolean" | "number" | "string" | "time";

export class Table extends HTMLWidget {

    protected _div;

    constructor() {
        super();
    }

    @publish("...empty...", "string", "No Data Message")
    noDataMessage: publish<this, string>;
    @publish(false, "boolean", "Dark Mode")
    darkMode: publish<this, boolean>;
    @publish(false, "boolean", "Multiple Selection")
    multiSelect: publish<this, boolean>;
    @publish({}, "object", "Column Types (\"boolean\" | \"number\" | \"string\" | \"time\"")
    columnTypes: publish<this, { [column: string]: ColumnType }>;
    @publish({}, "object", "Column Patterns")
    columnPatterns: publish<this, { [column: string]: string }>;
    @publish({}, "object", "Column Formats")
    columnFormats: publish<this, { [column: string]: string }>;

    columnType(column: string): ColumnType;
    columnType(column: string, type: ColumnType): this;
    columnType(column: string, type?: ColumnType): ColumnType | this {
        if (arguments.length === 1) return this.columnTypes()[column];
        this.columnTypes({ ...this.columnTypes(), [column]: type });
        return this;
    }

    columnPattern(column: string): string;
    columnPattern(column: string, pattern: string): this;
    columnPattern(column: string, pattern?: string): string | this {
        if (arguments.length === 1) return this.columnPatterns()[column];
        this.columnPatterns({ ...this.columnPatterns(), [column]: pattern });
        return this;
    }

    columnFormat(column: string): string;
    columnFormat(column: string, format: string): this;
    columnFormat(column: string, format?: string): string | this {
        if (arguments.length === 1) return this.columnFormats()[column];
        this.columnFormats({ ...this.columnFormats(), [column]: format });
        return this;
    }

    private _prevRow;
    private _prevColumn;
    onRowClickCallback(row, column) {
        if (this._prevRow && JSON.stringify(this._prevRow) !== JSON.stringify(row)) {
            this.click(this._prevRow, this._prevColumn ?? "", false);
        }
        if (row) {
            this.click(row, column, true);
        }
        this._prevRow = row;
        this._prevColumn = column;
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        this._div = element
            .append("div")
            ;
    }

    update(domNode, element) {
        super.update(domNode, element);
        this._div.style("width", this.width() + "px");
        this._div.style("height", this.height() + "px");
        render(React.createElement(ReactTable, { table: this }), this._div.node());
    }

    exit(domNode, element) {
        unmountComponentAtNode(this._div.node());
        this._div.remove();
        super.exit(domNode, element);
    }

    //  Events  ---
    click(row, col, sel) {
    }
}
Table.prototype._class += " dgrid2_Table";
