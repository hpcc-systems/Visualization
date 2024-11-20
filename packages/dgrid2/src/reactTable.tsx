import * as React from "react";
import DataGrid, { Column, SelectColumn, SortColumn } from "react-data-grid";
import { format, timeFormat, timeParse } from "@hpcc-js/common";
import { useData } from "./hooks.ts";
import type { Table } from "./table.ts";

import "react-data-grid/lib/styles.css";

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

interface EmptyRowsRendererProps {
    message: string
}

const EmptyRowsRenderer: React.FunctionComponent<EmptyRowsRendererProps> = ({
    message
}) => {

    return <div style={{ textAlign: "center", gridColumn: "1/-1" }} >
        {message}
    </div>;
};

interface ColumnEx<TRow, TSummaryRow = unknown> extends Column<TRow, TSummaryRow> {
    renderCell?: (props: any) => any;
    __hpcc_pattern?: ReturnType<typeof timeParse>;
    __hpcc_format?: ReturnType<typeof format> | ReturnType<typeof timeFormat>;
}

export interface ReactTableProps {
    table: Table;
    sort?: QuerySortItem,
}

export const ReactTable: React.FunctionComponent<ReactTableProps> = ({
    table,
    sort
}) => {
    const [columns, data] = useData(table);
    const multiSelect = table.multiSelect();
    const columnTypes = table.columnTypes();
    const columnPatterns = table.columnPatterns();
    const columnFormats = table.columnFormats();

    const [listColumns, setListColumns] = React.useState<ColumnEx<any[]>[]>([]);
    const [sortColumn, setSortColumn] = React.useState<SortColumn>();
    const [rows, setRows] = React.useState<any[]>([]);
    const [selectedRows, setSelectedRows] = React.useState<ReadonlySet<number>>(new Set());

    //  Columns  ---
    React.useEffect(() => {
        setListColumns([
            ...multiSelect ? [SelectColumn as ColumnEx<any[]>] : [],
            ...columns.map((column): ColumnEx<any[]> => {
                const type = columnTypes[column] ?? "string";
                let formatter;
                let __hpcc_pattern;
                let __hpcc_format;
                switch (type) {
                    case "time":
                        __hpcc_pattern = columnPatterns[column] !== undefined ? timeParse(columnPatterns[column]) : undefined;
                        __hpcc_format = columnFormats[column] !== undefined ? timeFormat(columnFormats[column]) : undefined;
                        break;
                    case "number":
                        formatter = (props) => {
                            return <div style={{ textAlign: "right" }}>{props.row[props.column.key]}</div>;
                        };
                    // eslint-disable-next-line no-fallthrough
                    default:
                        __hpcc_format = columnFormats[column] !== undefined ? format(columnFormats[column]) : undefined;
                }
                return {
                    key: column,
                    name: column,
                    resizable: true,
                    sortable: true,
                    minWidth: 80,
                    renderCell: formatter,
                    __hpcc_pattern,
                    __hpcc_format
                };
            })
        ]);
    }, [columnFormats, columnPatterns, columnTypes, columns, multiSelect]);

    const onSortColumnsChange = React.useCallback((sortColumns: SortColumn[]) => {
        const futureSortColumn = sortColumns.slice(-1)[0];
        const sorted = futureSortColumn !== undefined;
        const isSortedDescending: boolean = futureSortColumn?.direction === "DESC";
        setSortColumn(futureSortColumn);
        setRows(copyAndSort(rows, sorted ? futureSortColumn.columnKey : "key", sorted ? isSortedDescending : false));
    }, [rows]);

    const rowKeyGetter = React.useCallback((row: any) => {
        return row.key;
    }, []);

    const onSelectedRowsChange = React.useCallback((selectedRows: Set<any>) => {
        setSelectedRows(selectedRows);
    }, []);

    const onCellClick = React.useCallback((row, column) => {
        table.onRowClickCallback(row, column.key);
    }, [table]);

    //  Rows  ---
    React.useEffect(() => {
        let items = data.map((row, index) => {
            const retVal = {
                key: index
            };
            listColumns.forEach((column, index) => {
                let val = row[index] as string;
                if (column.__hpcc_pattern && column.__hpcc_format) {
                    val = column.__hpcc_format(column.__hpcc_pattern(val));
                } else if (column.__hpcc_pattern) {
                    val = column.__hpcc_pattern(val).toString();
                } else if (column.__hpcc_format) {
                    val = column.__hpcc_format(val as any);
                }
                retVal[column.key] = val;
            });
            return retVal;
        });
        if (sort?.attribute) {
            items = copyAndSort(items, sort.attribute, sort.descending);
        }
        setRows(items);
    }, [listColumns, data, sort]);

    return <DataGrid
        columns={listColumns}
        headerRowHeight={24}
        rows={rows}
        rowKeyGetter={rowKeyGetter}
        rowHeight={20}
        renderers={{ noRowsFallback: <EmptyRowsRenderer message={table.noDataMessage()} /> as any }}
        className={table.darkMode() ? "rdg-dark" : "rdg-light"}
        sortColumns={sortColumn ? [sortColumn] : []}
        onSortColumnsChange={onSortColumnsChange}
        selectedRows={selectedRows}
        onSelectedRowsChange={multiSelect ? onSelectedRowsChange : undefined}
        onCellClick={multiSelect ? undefined : (args, event) => onCellClick(args.row, args.column)}
        aria-describedby={""}
        aria-label={""}
        aria-labelledby={""}
        style={{ height: "100%" }}
    />;
};

