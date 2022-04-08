import { HTMLWidget, publish } from "@hpcc-js/common";
import * as React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import DataGrid, { Column, SelectColumn, SortColumn } from "react-data-grid";

import "../src/table.css";

export type QuerySortItem = { attribute: string, descending: boolean };
function copyAndSort<T>(items: T[], attribute: string, descending?: boolean): T[] {
    const key = attribute as keyof T;
    return [...items].sort((a: T, b: T) => {
        if (a[key] < b[key]) {
            return descending ? 1 : -1;
        } else if (a[key] > b[key]) {
            return descending ? -1 : 1;
        }
        return 0;
    });
}

interface ReactTableProps {
    columns: string[];
    data: Array<string | number>[];
    onRowClickCallback: (row: any) => void;
    sort?: QuerySortItem,
    darkMode?: boolean;
    multiSelect?: boolean;
}

const ReactTable: React.FunctionComponent<ReactTableProps> = ({
    columns,
    data,
    onRowClickCallback,
    sort,
    darkMode = false,
    multiSelect = false
}) => {
    const [listColumns, setListColumns] = React.useState<Column<object>[]>([]);
    const [sortColumn, setSortColumn] = React.useState<SortColumn>();
    const [items, setItems] = React.useState<any[]>([]);
    const [selectedRows, setSelectedRows] = React.useState<ReadonlySet<number>>(() => new Set());

    //  Columns  ---
    React.useEffect(() => {
        setListColumns([
            ...multiSelect ? [SelectColumn] : [],
            ...columns.map(column => ({
                key: column,
                name: column,
                resizable: true,
                sortable: true,
                minWidth: 80,
            }))
        ]);
    }, [columns, multiSelect]);

    const onSortColumnsChange = React.useCallback((sortColumns: SortColumn[]) => {
        const futureSortColumn = sortColumns.slice(-1)[0];
        const sorted = futureSortColumn !== undefined;
        const isSortedDescending: boolean = futureSortColumn?.direction === "DESC";
        setSortColumn(futureSortColumn);
        setItems(copyAndSort(items, sorted ? futureSortColumn.columnKey : "key", sorted ? isSortedDescending : false));
    }, [items]);

    const rowKeyGetter = React.useCallback((row: any) => {
        return row.key;
    }, []);

    const onSelectedRowsChange = React.useCallback((selectedRows: Set<any>) => {
        setSelectedRows(selectedRows);
        onRowClickCallback(items.filter(row => selectedRows.has(rowKeyGetter(row))));
    }, [items, onRowClickCallback, rowKeyGetter]);

    const onRowClick = React.useCallback((row, column) => {
        onRowClickCallback(items.filter(item => rowKeyGetter(item) === rowKeyGetter(row)));
    }, [items, onRowClickCallback, rowKeyGetter]);

    //  Rows  ---
    React.useEffect(() => {
        let items = data.map((row, index) => {
            const retVal = {
                key: index
            };
            columns.forEach((column, index) => {
                retVal[column] = row[index];
            });
            return retVal;
        });
        if (sort?.attribute) {
            items = copyAndSort(items, sort.attribute, sort.descending);
        }
        setItems(items);
    }, [columns, data, sort]);

    return <DataGrid
        columns={listColumns}
        headerRowHeight={24}
        rows={items}
        rowKeyGetter={rowKeyGetter}
        rowHeight={20}
        className={darkMode ? "rdg-dark" : "rdg-light"}
        sortColumns={sortColumn ? [sortColumn] : []}
        onSortColumnsChange={onSortColumnsChange}
        selectedRows={selectedRows}
        onSelectedRowsChange={multiSelect ? onSelectedRowsChange : undefined}
        onRowClick={multiSelect ? undefined : onRowClick}
        aria-describedby={""}
        aria-label={""}
        aria-labelledby={""}
        style={{ height: "100%" }}
    />;
};

export class Table extends HTMLWidget {

    protected _div;

    constructor() {
        super();
    }

    @publish(false, "boolean", "Dark Mode")
    darkMode: publish<this, boolean>;
    @publish(false, "boolean", "Multiple Selection")
    multiSelect: publish<this, boolean>;

    _prevRow;
    _prevColumn;
    private renderTable() {
        return <ReactTable columns={this.columns()} data={this.data()} darkMode={this.darkMode()} onRowClickCallback={(row, column = "") => {
            if (this._prevRow && JSON.stringify(this._prevRow) !== JSON.stringify(row)) {
                this.click(this._prevRow, this._prevColumn ?? "", false);
            }
            if (row) {
                this.click(row, column, true);
            }
            this._prevRow = row;
            this._prevColumn = column;
        }} />;
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
        render(this.renderTable(), this._div.node());
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
