"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./Table"], factory);
    } else {
        root.other_NestedTable = factory(root.other_Table);
    }
}(this, function (Table) {
    function NestedTable(target) {
        Table.call(this);
        this.minWidgetHeight(240);
        this.minWidgetWidth(360);
    }
    NestedTable.prototype = Object.create(Table.prototype);
    NestedTable.prototype.constructor = NestedTable;
    NestedTable.prototype._class += " other_NestedTable";

    var origColumns = NestedTable.prototype.columns;
    NestedTable.prototype.columns = function (_) {
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

    var origData = NestedTable.prototype.data;
    NestedTable.prototype.data = function (_) {
        if (arguments.length) {
            var context = this;
            return origData.call(this, _.map(function (row) {
                return row.map(function (cell, idx) {
                    if (cell instanceof Array) {
                        var columns = [];
                        if (typeof context._columns[idx] === "object" && context._columns[idx].columns) {
                            columns = context._columns[idx].columns;
                        } else {
                            for (var i = 0; i < cell.length; ++i) {
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

    return NestedTable;
}));
