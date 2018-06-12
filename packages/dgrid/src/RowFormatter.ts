const LINE_SPLITTER = `<br><hr class='dgrid-fakeline'>`;
const LINE_SPLITTER2 = `<br><hr class='dgrid-fakeline' style='visibility: hidden'>`;

export interface ColumnType {
    field: string;
    leafID: string;
    label: string;
    idx: number;
    className: string;
    sortable: boolean;
    width?: number;
    formatter?: CellFormatter;
    renderCell?: CellRenderer;
    children?: ColumnType[];
}
export interface RowType {
    __hpcc_id: number;
    __origRow: any[];
    [colIdx: number]: any;
}
export type CellFormatter = (this: ColumnType, cell: any, row: RowType) => string;
export type CellRenderer = (this: ColumnType, row: RowType, cell: any, cellElement: HTMLElement) => HTMLElement | void;

export class RowFormatter {
    private _columns: ColumnType[];
    private _flattenedColumns = [];
    private _columnIdx = {};
    private _formattedRow = {};

    constructor(columns: ColumnType[]) {
        this._columns = columns;
        this.flattenColumns(columns);
    }

    flattenColumns(columns: ColumnType[]) {
        for (const column of columns) {
            this.flattenColumn(column);
        }
    }

    flattenColumn(column: ColumnType) {
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

    calcDepth(columns: ColumnType[], row) {
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

    formatCell(column: ColumnType, cell, maxChildDepth) {
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
                this._formattedRow[column.field] = "" + cell === undefined ? "" : cell;
            } else {
                this._formattedRow[column.field] += LINE_SPLITTER;
                this._formattedRow[column.field] += "" + cell === undefined ? "" : cell;
            }
            if (maxChildDepth > 1) {
                const paddingArr = [];
                paddingArr.length = maxChildDepth;
                const padding = paddingArr.join(LINE_SPLITTER2);
                this._formattedRow[column.field] += padding;
            }
        }
    }

    formatRow(columns: ColumnType[], row: { [key: string]: any } = [], rowIdx: number = 0) {
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
