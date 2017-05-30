import { HTMLWidget, PropertyExt, Utility, Widget } from "@hpcc-js/common";
import { select as d3Select } from "d3-selection";
import * as _Handsontable from "handsontable";
const Handsontable: any = _Handsontable;

import "handsontable/dist/handsontable.css";
import "../src/Table.css";

class Column extends PropertyExt {
    _owner;
    constructor(owner) {
        super();
        this._owner = owner;
    }

    label: { (): string; (_: string): Column };
    label_exists: () => boolean;
    minRange: { (): number; (_: number): Column };
    minRange_exists: () => boolean;
    maxRange: { (): number; (_: number): Column };
    maxRange_exists: () => boolean;
    belowMinRangeColor: { (): string; (_: string): Column };
    belowMinRangeColor_exists: () => boolean;
    aboveMaxRangeColor: { (): string; (_: string): Column };
    aboveMaxRangeColor_exists: () => boolean;
    rangeColor: { (): string; (_: string): Column };
    rangeColor_exists: () => boolean;
}
Column.prototype._class += " handson_Table.Column";

Column.prototype.publish("label", "", "set", "Only show column properties of the table", function () {
    return this._owner ? this._owner.columns() : [];
});
Column.prototype.publish("minRange", null, "number", "Minimum value of a handsontable", {});
Column.prototype.publish("maxRange", null, "number", "Maximum value of a handsontable", {});
Column.prototype.publish("belowMinRangeColor", "#ff0000", "html-color", "Series Color", {});
Column.prototype.publish("aboveMaxRangeColor", "#0000ff", "html-color", "Series Color", {});
Column.prototype.publish("rangeColor", "#00ff00", "html-color", "Series Color", {});

class WidgetReference {
    rowIdx;
    colIdx;

    constructor(rowIdx, colIdx) {
        this.rowIdx = rowIdx;
        this.colIdx = colIdx;
    }

    get(table) {
        if (!table._widgetCache[this.rowIdx]) {
            table._widgetCache[this.rowIdx] = {};
        }
        if (!table._widgetCache[this.rowIdx][this.colIdx]) {
            table._widgetCache[this.rowIdx][this.colIdx] = {};
        }
        if (!table._widgetCache2[this.colIdx]) {
            table._widgetCache2[this.colIdx] = {};
        }
        if (!table._widgetCache2[this.colIdx][this.rowIdx]) {
            table._widgetCache2[this.colIdx][this.rowIdx] = true;
        }
        return table._widgetCache[this.rowIdx][this.colIdx];
    }
}

export class Table extends HTMLWidget {
    Column;
    _selectionBag;
    _widgetCache;
    _widgetCache2;
    _table;
    _selectionPrevClick;

    constructor() {
        super();
        this._tag = "div";

        this._selectionBag = new Utility.Selection();
        this._widgetCache = {};
        this._widgetCache2 = {};
    }

    enter(domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        element.style("overflow", "hidden");
        const context = this;

        this._table = new Handsontable(domNode, {
            columnSorting: true,
            readOnlyCellClassName: "",
            manualColumnResize: true,
            sortIndicator: true,
            wordWrap: false,
            manualRowResize: true,
            formulas: true,
            colHeaders: true,
            stretchH: "all",
            currentRowClassName: "currentRow",
            rowHeights: (row) => {
                if (context._table.sortIndex.length) {
                    row = context._table.sortIndex[row][0];
                }
                if (context.minWidgetHeight_exists() && context._widgetCache[row]) {
                    return context.minWidgetHeight();
                }
                return undefined;
            },
            colWidths: (col) => {
                if (context.minWidgetWidth_exists() && context._widgetCache2[col]) {
                    return context.minWidgetWidth();
                }
                return undefined;
            },
            // tslint:disable-next-line:object-literal-shorthand
            beforeOnCellMouseDown: function (event, coords, TD) {
                if (!event.shiftKey && !event.ctrlKey) {
                    event.stopImmediatePropagation();
                    event.preventDefault();
                    const d = this.getDataAtRow(coords.row);
                    context.selectionBagClick(d, coords.row, event);
                    const isSelected = context._selectionBag.isSelected(context._createSelectionObject(coords.row));
                    context.click(context.rowToObj(d), coords.col, isSelected);
                    if (isSelected) {
                        context._table.selectCell(coords.row, coords.col, coords.row, coords.col, false, false);
                    } else {
                        context._table.deselectCell();
                    }
                    context._table.render();
                }
            },
            afterRenderer: (TD, row, col, prop, value, cellProperties) => {
                if (value instanceof WidgetReference) {
                    if (document.body.contains(value.get(context).domNode)) {
                        setTimeout(function () {
                            value.get(context).widget
                                .resize()
                                .lazyRender();
                        }, 0);
                    }
                }
            },

            // tslint:disable-next-line:object-literal-shorthand
            cells: function (row, col, prop) {
                return {
                    // tslint:disable-next-line:object-literal-shorthand
                    renderer: function (instance, td, row2, col2, prop2, value, cellProperties) {
                        if (context.minWidgetWidth_exists() && context.minWidgetHeight_exists() && value instanceof WidgetReference) {
                            const retVal = new WidgetReference(row2, col2);
                            const width = Math.max(context._table.getColWidth(col2) || 50, context.minWidgetWidth()) - 8;
                            const height = Math.max(context._table.getRowHeight(row2) || 16, context.minWidgetHeight());
                            if (retVal.get(context) && !value.get(context).domNode) {
                                retVal.get(context).domNode = document.createElement("DIV");
                                retVal.get(context).widget
                                    .width(width)
                                    .height(height)
                                    .target(retVal.get(context).domNode);
                            }
                            Handsontable.Dom.empty(td);
                            td.appendChild(retVal.get(context).domNode);
                            return retVal;
                        }
                        const field = context.fields()[col2];
                        const textRender = context.renderHtmlDataCells() ? Handsontable.renderers.HtmlRenderer : Handsontable.renderers.TextRenderer;
                        switch (field.type()) {
                            case "string":
                                value = field.transform(value);
                                textRender.call(this, instance, td, row2, col2, prop2, value, cellProperties);
                                break;
                            case "number":
                                Handsontable.renderers.NumericRenderer.call(this, instance, td, row2, col2, prop2, value, cellProperties);
                                break;
                            case "boolean":
                                Handsontable.renderers.CheckboxRenderer.call(this, instance, td, row2, col2, prop2, value, cellProperties);
                                break;
                            default:
                                value = field.transform(value);
                                textRender.call(this, instance, td, row2, col2, prop2, value, cellProperties);
                                break;
                        }
                        if (context._selectionBag.isSelected({
                            _id: row2
                        })) {
                            td.style.color = "white";
                            td.style.background = "#f48a00";
                        } else {
                            td.style.color = null;
                            td.style.background = null;
                        }
                        if (context.editLastRow() === true) {
                            if (row2 === context.data().length - 1) {
                                cellProperties.readOnly = false;
                                if (col2 === context.columns().indexOf(field.label())) {
                                    cellProperties.formulas = true;
                                    if (value === "sum(" + field.label() + ")") {
                                        let temp = 0;
                                        for (let i = 0; i < context.data().length; i++) {
                                            const innerArray = context.data()[i];
                                            for (let j = 0; j < innerArray.length; j++) {
                                                const cellValue = parseFloat(innerArray[col2]);
                                                if (typeof cellValue === "number" && !isNaN(cellValue)) {
                                                    temp += cellValue;
                                                    break;
                                                }
                                            }
                                        }

                                        td.textContent = temp;
                                    }
                                }
                            }

                            if (context.editLastRow() === false) {
                                cellProperties.readOnly = true;
                            }
                        } else {
                            cellProperties.readOnly = true;
                        }

                        if (context.columnFormatting().length > 0) {
                            for (let k = 0; k < context.columns().length; k++) {
                                if ((context.columnFormatting()[k]) !== undefined && (context.columnFormatting()[k]).label_exists() && ((context.columnFormatting()[k]).label() === field.label())) {
                                    if ((context.columnFormatting()[k]).minRange_exists() && value < (context.columnFormatting()[k]).minRange()) {
                                        td.style.color = (context.columnFormatting()[k]).belowMinRangeColor();
                                    } else if ((context.columnFormatting()[k]).maxRange_exists() && value > (context.columnFormatting()[k]).maxRange()) {
                                        td.style.color = (context.columnFormatting()[k]).aboveMaxRangeColor();
                                    } else if ((context.columnFormatting()[k]).minRange_exists() && value >= (context.columnFormatting()[k]).minRange() && (context.columnFormatting()[k]).maxRange_exists() && value <= (context.columnFormatting()[k]).maxRange()) {
                                        td.style.color = (context.columnFormatting()[k]).rangeColor();
                                    }
                                }
                            }
                        }

                        return td;
                    }
                };
            },
            columns: [],
            fixedColumnsLeft: 1,
            width: this.width(),
            height: this.height(),
            data: []
        });
    }

    update(domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        const context = this;
        const settings: any = {};
        settings.colHeaders = context.columns();
        settings.columns = this.fields().map(function (field) {
            return {
                sortFunction: (sortOrder) => {
                    return function (a, b) {
                        const l = sortOrder ? field.parse(a[1]) : field.parse(b[1]);
                        const r = sortOrder ? field.parse(b[1]) : field.parse(a[1]);
                        if (l === r) {
                            return 0;
                        }
                        if (l < r) {
                            return -1;
                        }
                        return 1;
                    };
                }
            };
        });
        settings.fixedColumnsLeft = this.fixedColumn() ? 1 : 0;
        settings.width = this.width();
        settings.height = this.height();
        settings.data = this.data().map(function (row, rowIdx) {
            return row.map(function (cell, colIdx) {
                if (cell instanceof Widget) {
                    const retVal = new WidgetReference(rowIdx, colIdx);
                    if (retVal.get(context).widget !== cell) {
                        delete retVal.get(context).domNode;
                        retVal.get(context).widget = cell;
                    }
                    return retVal;
                }
                return cell;
            });
        });
        this._table.updateSettings(settings);
        if (this._table.sortingEnabled) {
            this._table.sort(this._table.sortColumn, this._table.sortOrder);
        }
    }

    exit(domNode, element) {
        HTMLWidget.prototype.exit.apply(this, arguments);
    }

    _createSelectionObject(i) {
        return {
            _id: i,
            element: () => d3Select()
        };
    }

    selection(_) {
        if (!arguments.length) return this._selectionBag.get().map(function (d) {
            return d._id;
        });
        this._selectionBag.set(_.map(function (row) {
            return this._createSelectionObject(row);
        }, this));
        return this;
    }

    selectionBagClick(d, i, event) {
        if (this.multiSelect() && event.shiftKey && this._selectionPrevClick) {
            let inRange = false;
            const rows = [];
            const selection = this.data().filter(function (row, i2) {
                let lastInRangeRow = false;
                if (row === d || row === this._selectionPrevClick) {
                    if (inRange) {
                        lastInRangeRow = true;
                    }
                    inRange = !inRange;
                    rows.push(i2);
                }
                return inRange || lastInRangeRow;
            }, this);
            this.selection(selection);
        } else if (this.multiSelect()) {
            this._selectionBag.click(this._createSelectionObject(d), event);
            this._selectionPrevClick = d;
        } else {
            const selObj = this._createSelectionObject(i);
            this._selectionBag.click(selObj, {
                ctrlKey: this._selectionBag.isSelected(selObj)
            });
            this._selectionPrevClick = d;
        }
    }

    click(row, column, selected) {
        function replacer(key, value) {
            if (value instanceof Widget) {
                return "Widget with class: " + value.classID();
            }
            return value;
        }
        console.log("Click:  " + JSON.stringify(row, replacer) + ", " + column + "," + selected);
    }
    columnFormatting: { (): any[]; (_: any[]): Table };
    columnFormatting_exists: () => boolean;
    editLastRow: { (): boolean; (_: boolean): Table };
    editLastRow_exists: () => boolean;
    renderHtmlDataCells: { (): boolean; (_: boolean): Table };
    renderHtmlDataCells_exists: () => boolean;
    fixedColumn: { (): boolean; (_: boolean): Table };
    fixedColumn_exists: () => boolean;
    multiSelect: { (): boolean; (_: boolean): Table };
    multiSelect_exists: () => boolean;
    minWidgetWidth: { (): number; (_: number): Table };
    minWidgetWidth_exists: () => boolean;
    minWidgetHeight: { (): number; (_: number): Table };
    minWidgetHeight_exists: () => boolean;
}
Table.prototype._class += " handson_Table";
Table.prototype.Column = Column;
Table.prototype.publish("columnFormatting", [], "propertyArray", "Source Columns", null, { autoExpand: Column });
Table.prototype.publish("editLastRow", true, "boolean", "To make last row editable", null, { tags: ["Basic"], optional: true });
Table.prototype.publish("renderHtmlDataCells", false, "boolean", "enable or disable HTML within cells", null, { tags: ["Basic"] });
Table.prototype.publish("fixedColumn", false, "boolean", "Enable or disable fixed first column", null, { tags: ["Basic"] });
Table.prototype.publish("multiSelect", false, "boolean", "Multiple Selection", null, { tags: ["Basic"] });
Table.prototype.publish("minWidgetWidth", 100, "number", "Minimum width of a child widget", null, { tags: ["Basic"], optional: true });
Table.prototype.publish("minWidgetHeight", 100, "number", "Minimum height of a child widget", null, { tags: ["Basic"], optional: true });
