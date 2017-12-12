import { Table } from "./Table";

export class NestedTable extends Table {
    constructor() {
        super();
        this.minWidgetHeight(240);
        this.minWidgetWidth(360);
    }
}
NestedTable.prototype._class += " other_NestedTable";

const origColumns = NestedTable.prototype.columns;
NestedTable.prototype.columns = function (_?) {
    if (arguments.length) {
        this._columns = _;
        return origColumns.call(this, _.map(function (col) {
            if (typeof col === "object") {
                return col.label;
            }
            return col;
        }));
    }
    return origColumns.apply(this, arguments);
};

const origData = NestedTable.prototype.data;
NestedTable.prototype.data = function (_?: any): NestedTable | any {
    if (arguments.length) {
        const context = this;
        return origData.call(this, _.map(function (row) {
            return row.map(function (cell, idx) {
                if (cell instanceof Array) {
                    let columns = [];
                    if (typeof context._columns[idx] === "object" && context._columns[idx].columns) {
                        columns = context._columns[idx].columns;
                    } else {
                        for (let i = 0; i < cell.length; ++i) {
                            columns.push(context._columns[idx] + "." + i);
                        }
                    }
                    return new Table()
                        .columns(columns)
                        .data(cell)
                        ;
                }
                return cell;
            });
        }));
    }
    return origData.apply(this, arguments);
};
