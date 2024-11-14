import React from "react";
import { createRoot, Root } from "react-dom/client";
import { HTMLWidget } from "@hpcc-js/common";
import { ReactTable } from "./reactTable.tsx";

import "./table.css";

export type ColumnType = "boolean" | "number" | "string" | "time";

export class Table extends HTMLWidget {

    protected _div;
    protected _root: Root;

    constructor() {
        super();
    }

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
            .style("display", "grid")
            ;
        this._root = createRoot(this._div.node());
    }

    update(domNode, element) {
        super.update(domNode, element);
        this._div.style("width", this.width() + "px");
        this._div.style("height", this.height() + "px");
        this._root.render(React.createElement(ReactTable, { table: this }));
    }

    exit(domNode, element) {
        this._root.unmount();
        this._div.remove();
        super.exit(domNode, element);
    }

    //  Events  ---
    click(row, col, sel) {
    }
}
Table.prototype._class += " dgrid2_Table";

export interface Table {
    noDataMessage(): string;
    noDataMessage(_: string): this;
    darkMode(): boolean;
    darkMode(_: boolean): this;
    multiSelect(): boolean;
    multiSelect(_: boolean): this;
    columnTypes(): { [column: string]: ColumnType };
    columnTypes(_: { [column: string]: ColumnType }): this;
    columnPatterns(): { [column: string]: string };
    columnPatterns(_: { [column: string]: string }): this;
    columnFormats(): { [column: string]: string };
    columnFormats(_: { [column: string]: string }): this;
}

Table.prototype.publish("noDataMessage", "...empty...", "string", "No Data Message");
Table.prototype.publish("darkMode", false, "boolean", "Dark Mode");
Table.prototype.publish("multiSelect", false, "boolean", "Multiple Selection");
Table.prototype.publish("columnTypes", {}, "object", "Column Types (\"boolean\" | \"number\" | \"string\" | \"time\"");
Table.prototype.publish("columnPatterns", {}, "object", "Column Patterns");
Table.prototype.publish("columnFormats", {}, "object", "Column Formats");

