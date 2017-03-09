import { event as d3Event, select as d3Select, selectAll as d3SelectAll } from "d3-selection";
import { ISize, Widget } from "../common//Widget";
import { HTMLWidget } from "../common/HTMLWidget";
import * as platform from "../common/Platform";
import * as Utility from "../common/Utility";
import { Paginator } from "./Paginator";

import "./Table.css";

function replacer(key, value) {
    if (value instanceof Widget) {
        return "Widget with class: " + value.classID();
    }
    return value;
}

export class Table extends HTMLWidget {
    protected _paginator;
    protected _selectionBag;
    protected _selectionPrevClick;
    protected _paginatorTableSpacing;

    tableDiv;
    thead;
    table;
    fixedHead;
    fixedHeadTable;
    fixedThead;
    unfixedThead;
    tbody;
    tfoot;
    fixedCol;
    fixedColTable;
    fixedColHead;
    fixedColHeadRow;
    fixedColBody;
    fixedColFoot;
    fixedColFootRow;
    protected _prevDescending;
    protected _prevSortByFieldIndex;
    protected _hasChildWidgets;
    protected _tNumPages;

    constructor() {
        super();
        this._tag = "div";
        this.columns([]);
        this._paginator = new Paginator();
        this._selectionBag = new Utility.Selection();
        this._selectionPrevClick = null;
        this._paginatorTableSpacing = 4;
    }

    size(): ISize;
    size(_): Widget;
    size(_?): ISize | Widget {
        const retVal = super.size.apply(this, arguments);
        if (arguments.length) {
            if (this.tableDiv) {
                const topMargin = this.showHeader() && this.fixedHeader() ? this.thead.property("offsetHeight") : 0;
                this.tableDiv
                    .style("width", this._size.width + "px")
                    .style("height", this._size.height - topMargin + "px")
                    ;
                this._element
                    .style("width", this._size.width + "px")
                    .style("height", this._size.height + "px")
                    ;
            }
        }

        return retVal;
    }

    isHidden(colIdx) {
        if (this.pivot()) {
            return false;
        }
        const fields = this.fields();
        if (fields && fields[colIdx] && fields[colIdx].type() === "hidden") {
            return true;
        }
        return false;
    }

    tableColumns(_?: string[]): string[] {
        const retVal = this.columns.apply(this, arguments);
        if (!arguments.length && this.pivot()) {
            return this._db.column(0);
        }
        return retVal;
    }

    tableData(_?) {
        const retVal = this.data.apply(this, arguments);
        if (!arguments.length && this.pivot()) {
            return this._db.columns().filter(function (col, idx) { return idx > 0; });
        }
        return retVal;
    }

    field(rowIdx, colIdx) {
        const noTransform = { transform: d => d };
        if (this.pivot()) {
            if (colIdx === 0) return noTransform;
            return this.fields()[rowIdx + 1];
        }
        if (rowIdx === -1) return noTransform;
        return this.fields()[colIdx];
    }

    enter(domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        this._parentElement.style("overflow", "hidden");

        this.tableDiv = element.append("div").attr("class", "tableDiv");
        this.table = this.tableDiv.append("table");
        this.fixedHead = element.append("div").classed("header-wrapper", true);
        this.fixedHeadTable = this.fixedHead.append("table");
        this.fixedThead = this.fixedHeadTable.append("thead").append("tr");
        this.unfixedThead = this.table.append("thead").append("tr");
        this.tbody = this.table.append("tbody");
        this.tfoot = this.table.append("tfoot").append("tr");
        this.fixedCol = element.append("div").classed("rows-wrapper", true);
        this.fixedColTable = this.fixedCol.append("table");
        this.fixedColHead = this.fixedColTable.append("thead");
        this.fixedColHeadRow = this.fixedColHead.append("tr");
        this.fixedColBody = this.fixedColTable.append("tbody");
        this.fixedColFoot = this.fixedColTable.append("tfoot");
        this.fixedColFootRow = this.fixedColFoot.append("tr");

        this.tableDiv
            .style("overflow", "auto")
            ;
    }

    update(domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        const context = this;
        const columns = context.tableColumns();
        const data = context.tableData();

        this.element().selectAll("table,tbody,th,td").style("width", null);

        if (this.sortByFieldIndex_exists() && (this._prevSortByFieldIndex !== this.sortByFieldIndex() || this._prevDescending !== this.descending())) {
            Utility.multiSort(data, [{ idx: this.sortByFieldIndex(), reverse: this.descending() }]);
            this._prevSortByFieldIndex = this.sortByFieldIndex();
            this._prevDescending = this.descending();
        }

        this._hasChildWidgets = false;

        if (this.fixedHeader()) {
            this.thead = this.fixedThead;
        } else {
            this.thead = this.unfixedThead;
        }
        this.fixedHead.style("display", this.fixedHeader() ? "table-row" : "none");
        this.unfixedThead.style("display", this.fixedHeader() ? "none" : "table-row");

        const th = this.thead.selectAll("th").data(this.showHeader() ? columns.filter(function (col, idx) {
            return !context.isHidden(idx);
        }) : []);
        th
            .enter()
            .append("th")
            .each(function (d) {
                const element2 = d3Select(this);
                element2
                    .append("span")
                    .attr("class", "thText")
                    ;
                element2
                    .append("span")
                    .attr("class", "thIcon")
                    ;
            })
            .on("click", function (column, idx) {
                context.headerClick(column, idx);
            })
            ;
        th
            .style("background-color", this.theadRowBackgroundColor())
            .style("border-color", this.theadCellBorderColor())
            .style("color", this.theadFontColor())
            .style("font-size", this.theadFontSize())
            ;
        th.select(".thText")
            .style("font-family", this.theadFontFamily())
            .text(function (column, idx) {
                return context.field(-1, idx).transform(column);
            })
            ;
        th.select(".thIcon")
            .text(function (column, idx) {
                if (context.descending()) {
                    return context.sortByFieldIndex() === idx ? "\uf078" : "";
                } else {
                    return context.sortByFieldIndex() === idx ? "\uf077" : "";
                }
            })
            ;
        th.exit()
            .remove()
            ;
        th.order();

        if (this.paginationLimit()) {
            this.pagination(data.length >= parseInt(this.paginationLimit()) ? true : false);
        }
        if (this.pagination()) {
            if (this._paginator.target() === null) {
                this._paginator.target(element.node());
            }

            const ipp = this._calcRowsPerPage(th);
            this.itemsPerPage(ipp);

            this._paginator.numItems(data.length);
            this._tNumPages = Math.ceil(this._paginator.numItems() / this.itemsPerPage()) || 1;
            if (this.pageNumber() > this._tNumPages || this.pageNumber() <= 0) { this.pageNumber(1); } // resets if current pagenum selected out of range

            this._paginator._onSelect = function (p, d) {
                context.pageNumber(p);
                context.render();
                return;
            };
        } else {
            this._paginator.numItems(0); // remove widget
        }

        // pageNumber starts at index 1
        const startIndex = this.pageNumber() - 1;
        const itemsOnPage = this.itemsPerPage();

        const start = startIndex * itemsOnPage;
        const end = startIndex * parseInt(itemsOnPage) + parseInt(itemsOnPage);

        let tData = null;

        if (this.topN()) {
            tData = data.slice(0, this.topN());
        } else if (this.pagination()) {
            tData = data.slice(start, end);
        } else {
            tData = data;
        }

        const totalRow: any[] = [this.totalledLabel() ? this.totalledLabel() : null];
        if (this.totalledColumns().length !== 0) {
            for (let i = 0; i < this.totalledColumns().length; i++) this.totalledColumns()[i] = +this.totalledColumns()[i];
            for (let j = 1; j < columns.length; j++) {
                let sum = 0;
                if (this.totalledColumns().indexOf(j) !== -1) {
                    for (let k = 0; k < tData.length; k++) {
                        sum = sum + tData[k][j];
                    }
                    totalRow.push(sum);
                } else {
                    totalRow.push("");
                }
            }

            const tf = this.tfoot.selectAll("td").data(totalRow);
            tf.enter()
                .append("td")
                ;
            tf[this.renderHtmlDataCells() ? "html" : "text"](function (d, idx) {
                return context.fields()[idx].transform(d);
            });
            tf.exit()
                .remove()
                ;
            tf
                .style("background-color", this.tfootRowBackgroundColor())
                .style("border-color", this.tfootCellBorderColor())
                .style("color", this.tfootFontColor())
                .style("font-size", this.tfootFontSize())
                ;
        }

        const rows = this.tbody.selectAll("tr.tr_" + this.id()).data(tData.map(function (d, idx) {
            //  TODO - Move fix closer to data source?
            for (let i = 0; i < d.length; ++i) {
                if (d[i] === undefined) {
                    d[i] = null;
                }
            }
            return {
                rowIdx: idx,
                row: d
            };
        }));
        rows.enter().append("tr")
            .attr("class", "tr_" + this.id())
            .on("click.selectionBag", function (_d) {
                if (_d.row) {
                    const d = _d.row;
                    const i = _d.rowIdx;
                    context.selectionBagClick(d, i);
                    context.applyRowStyles(context.getBodyRow(i));
                    context.applyFirstColRowStyles(context.getFixedRow(i));
                }
            }, true)  //  capture=true:  event is caught on the way down the DOM before the cell click.
            .on("mouseover", function (_d) {
                if (_d.row) {
                    const i = _d.rowIdx;
                    const fixedLeftRows = context.getFixedRow(i);
                    if (!fixedLeftRows.empty()) {
                        fixedLeftRows.classed("hover", true);
                    }
                    const tbodyRows = context.getBodyRow(i);
                    tbodyRows.classed("hover", true);
                    context.applyStyleToRows(tbodyRows);
                    context.applyFirstColRowStyles(fixedLeftRows);
                }
            })
            .on("mouseout", function (_d) {
                if (_d.row) {
                    const i = _d.rowIdx;
                    const fixedLeftRows = context.getFixedRow(i);
                    fixedLeftRows.classed("hover", false);
                    const tbodyRows = context.getBodyRow(i);
                    tbodyRows.classed("hover", false);
                    context.applyStyleToRows(tbodyRows);
                    context.applyFirstColRowStyles(fixedLeftRows);
                }
            })
            ;
        rows
            .classed("selected", function (_d) {
                const d = _d.row;
                return context._selectionBag.isSelected(context._createSelectionObject(d));
            })
            .classed("trId" + this._id, true)
            ;
        rows.exit()
            .remove()
            ;
        this.applyStyleToRows(rows);

        const cells = rows.selectAll(".td_" + this.id()).data(function (_d, _trIdx) {
            return _d.row.filter(function (cell, idx) {
                return idx < columns.length && !context.isHidden(idx);
            }).map(function (cell, idx) {
                return {
                    rowInfo: _d,
                    colIdx: idx,
                    cell
                };
            });
        });
        cells.enter()
            .append("td")
            .attr("class", "td_" + this.id())
            .on("click", function (tdContents) {
                if (tdContents.rowInfo) {
                    context.click(context.rowToObj(tdContents.rowInfo.row), context.columns()[tdContents.colIdx], context._selectionBag.isSelected(context._createSelectionObject(tdContents.rowInfo.row)));
                }
            })
            .on("dblclick", function (tdContents, idx) {
                if (tdContents.rowInfo) {
                    context.dblclick(context.rowToObj(tdContents.rowInfo.row), context.columns()[tdContents.colIdx], context._selectionBag.isSelected(context._createSelectionObject(tdContents.rowInfo.row)));
                }
            })
            .each(function (tdContents, tdIdx) {
                const alignment = context.getColumnAlignment(tdContents.rowInfo.rowIdx, tdContents.colIdx, tdContents.cell);
                const el = d3Select(this);
                el
                    .style("height", null)
                    .style("text-align", alignment)
                    .style("vertical-align", context.verticalAlign())
                    .classed("tr-" + tdContents.rowInfo.rowIdx + "-td-" + tdIdx, true)
                    ;
            })
            ;
        cells
            .each(function (tdContents) {
                const el = d3Select(this);
                if (tdContents.cell instanceof Widget) {
                    el[context.renderHtmlDataCells() ? "html" : "text"](null);
                    const widgetDiv = el.selectAll(".div_" + context.id()).data([tdContents.cell], function (d) { return d.id(); });
                    widgetDiv.exit()
                        .each(function (d: any) {
                            d.target(null);
                        })
                        .remove()
                        ;
                    widgetDiv.enter().append("div")
                        .attr("class", "div_" + context.id())
                        .style("width", context.minWidgetWidth() + "px")
                        .style("height", context.minWidgetHeight() + "px")
                        .each(function (d) {
                            const widgetDiv2 = d3Select(this);
                            d._parentWidget = context;
                            if (d._class.indexOf("childWidget") < 0) {
                                d._class = "childWidget " + d._class;
                            }
                            d
                                .target(null)
                                .target(widgetDiv2.node())
                                ;
                        })
                        ;
                    widgetDiv
                        .each(function (d) {
                            d
                                .resize()
                                .lazyRender()
                                ;
                            context._hasChildWidgets = true;
                        })
                        ;
                } else {
                    el.selectAll(".div_" + context.id()).remove();
                    el[context.renderHtmlDataCells() ? "html" : "text"](
                        context.field(tdContents.rowInfo.rowIdx, tdContents.colIdx).transform(tdContents.cell)
                    );
                }
            })
            ;
        cells.exit()
            .remove()
            ;
        const tableMarginHeight = parseInt(this.thead.node().offsetHeight);

        if (this.pagination() && this._hasChildWidgets) {
            this.tableDiv.style("overflow-y", "auto");
            this.table.style("margin-bottom", "50px");
            console.log("Warning: displaying another widget in the table may cause problems with pagination");
        } else {
            this.tableDiv.style("overflow-y", null);
            this.table.style("margin-bottom", null);

        }
        this.size(this._size);

        let fixedColWidth = 0;
        const fixedColTh = this.fixedColHeadRow.selectAll("th").data(this.fixedColumn() && this.showHeader() ? [columns[0]] : []);
        fixedColTh
            .enter()
            .append("th")
            .each(function (d) {
                const element2 = d3Select(this);
                element2
                    .append("span")
                    .attr("class", "thText")
                    ;
                element2
                    .append("span")
                    .attr("class", "thIcon")
                    ;
            })
            .on("click", function (column, idx) {
                context.headerClick(column, idx);
            })
            ;
        fixedColTh
            .style("background-color", this.theadRowBackgroundColor())
            .style("border-color", this.theadCellBorderColor())
            .style("color", this.theadFontColor())
            .style("font-size", this.theadFontSize())
            ;
        fixedColTh.select(".thText")
            .style("font-family", this.theadFontFamily())
            .text(function (column) {
                return column;
            })
            ;
        fixedColTh.select(".thIcon")
            .text(function (column, idx) {
                if (context.descending()) {
                    return context.sortByFieldIndex() === idx ? "\uf078" : "";
                } else {
                    return context.sortByFieldIndex() === idx ? "\uf077" : "";
                }
            })
            ;
        fixedColTh.exit()
            .remove()
            ;

        const fixedColTr = this.fixedColBody.selectAll("tr").data(this.fixedColumn() ? tData : []);
        fixedColTr.enter()
            .append("tr")
            .attr("class", function () {
                return "trId" + context._id;
            })
            ;
        fixedColTr
            .on("click", function (d, i) {
                (d3Select(rows[0][i]).on("click.selectionBag") as any)(rows.data()[i], i)
                    ;
            })
            .on("mouseover", function (d, i) {
                (d3Select(rows[0][i]).on("mouseover") as any)(rows.data()[i], i)
                    ;
            })
            .on("mouseout", function (d, i) {
                (d3Select(rows[0][i]).on("mouseout") as any)(rows.data()[i], i)
                    ;
            })
            .classed("selected", function (d) {
                return context._selectionBag.isSelected(context._createSelectionObject(d));
            })
            ;
        fixedColTr.exit()
            .remove()
            ;
        const fixedColTd = fixedColTr.selectAll("td").data(function (d, i) {
            return [d[0]];
        });
        fixedColTd
            .enter()
            .append("td")
            ;
        fixedColTd[this.renderHtmlDataCells() ? "html" : "text"](function (d): any {
            if (typeof (d) === "string") {
                return d.trim();
            } else if (typeof (d) === "number") {
                return d;
            }
            return "";
        });
        fixedColTd.exit()
            .remove()
            ;

        const fixedColFootTd = this.fixedColFootRow.selectAll("td").data(this.fixedColumn() && this.totalledLabel() ? [this.totalledLabel()] : []);
        fixedColFootTd
            .enter()
            .append("td")
            ;
        fixedColFootTd[this.renderHtmlDataCells() ? "html" : "text"](function (d): any {
            if (typeof (d) === "string") {
                return d.trim();
            } else if (typeof (d) === "number") {
                return d;
            }
            return "";
        });
        fixedColFootTd.exit()
            .remove()
            ;

        if (this.fixedColumn() && !this.fixedSize() && fixedColTd.length) {
            if (this.showHeader()) {
                fixedColWidth = fixedColTd.property("offsetWidth") > fixedColTh.property("offsetWidth") ? fixedColTd.property("offsetWidth") : fixedColTh.property("offsetWidth");
            } else {
                fixedColWidth = fixedColTd.property("offsetWidth");
            }
            this.fixedCol
                .style("position", "absolute")
                .style("margin-top", -this.tableDiv.property("scrollTop") + tableMarginHeight + "px")
                ;
            fixedColTd
                .style("width", fixedColWidth + "px")
                ;
            this.fixedColHead
                .style("position", "absolute")
                .style("margin-top", (this.fixedHeader() ? this.tableDiv.property("scrollTop") : 0) - tableMarginHeight + "px")
                ;
            fixedColTh
                .style("width", fixedColWidth + "px")
                ;
            rows.each(function (d, i) {
                const height = d3Select(this).select("td").property("offsetHeight");
                d3Select(fixedColTd[i][0]).style("height", height + "px");
            });
        }

        this.table
            .style("margin-left", -fixedColWidth + "px")
            ;
        this.tableDiv
            .style("margin-left", fixedColWidth + "px")
            .style("width", this.width() - fixedColWidth + "px")
            ;

        if (!rows.empty()) this.setColumnWidths(rows);

        let box;
        let newTableHeight;
        let finalWidth;
        let maxWidth;
        if (this.fixedSize()) {
            const node = d3Select(".tableDiv > table").node();
            if (node) {
                box = (node as any).getBoundingClientRect();
                if (box.width !== 0 && box.height !== 0) {
                    calcWidth();
                    calcHeight();
                } else {
                    if (box.height - tableMarginHeight <= context.tableDiv.property("offsetHeight")) {
                        calcHeight();
                    } else {
                        if (context.fixedHeader()) {
                            newTableHeight = context.tableDiv.property("offsetHeight"); //  is tableDiv correct?
                            newTableHeight = newTableHeight + "px";
                        } else {
                            newTableHeight = "100%";
                        }
                    }
                    if (box.width - fixedColWidth < context.tableDiv.property("offsetWidth")) {
                        calcWidth();
                    } else {
                        if (context.fixedColumn()) {
                            finalWidth = context.tableDiv.property("offsetWidth") - fixedColWidth; //  is tableDiv correct?
                            finalWidth = finalWidth + "px";
                        } else {
                            finalWidth = "100%";
                        }
                    }
                }
                if (element.classed("childWidget")) {
                    context._parentElement
                        .style("width", finalWidth + "px")
                        .style("height", newTableHeight + "px")
                        ;
                    context.tableDiv
                        .style("overflow", "hidden")
                        ;
                }
                context.size({ width: finalWidth, height: newTableHeight });
            }
        }

        this.setOnScrollEvents(this.tableDiv.node(), tableMarginHeight);

        function calcWidth() {
            const newTableWidth = box.width;
            maxWidth = context.tbody.property("offsetWidth") + 1;
            finalWidth = newTableWidth > maxWidth ? maxWidth : newTableWidth;
            finalWidth = finalWidth;
        }

        function calcHeight() {
            newTableHeight = context.tbody.property("offsetHeight") + tableMarginHeight;
            newTableHeight = newTableHeight;
        }

        this._paginator.render();
        setTimeout(function () {
            context._paginator
                .right((context.hasVScroll(element) ? platform.getScrollbarWidth() : 0) + context._paginatorTableSpacing)
                .bottom((context.hasHScroll(element) ? platform.getScrollbarWidth() : 0) + context._paginatorTableSpacing)
                .render()
                ;
        }, 0);
    }

    exit(domNode, element) {
        this._paginator.target(null);
        HTMLWidget.prototype.exit.apply(this, arguments);
    }

    setColumnWidths(rows) {
        const context = this;
        const firstRow = rows.filter(function (d, i) { return i === 0; });

        let tds = d3Select(null);
        firstRow.each(function (d) {
            tds = d3SelectAll(this.childNodes);
        });

        const tableMarginHeight = this.fixedHeader() ? this.thead.property("offsetHeight") : 0;
        let totalWidth = 1;
        const tdWidths = {};

        tds.each(function (d, i) {
            tdWidths[i] = (this as any).offsetWidth;
        });

        const th = this.thead.selectAll("th");
        th.each(function (d, i) {
            const thwidth = this.offsetWidth;
            const tdwidth = tds.empty() ? 0 : tdWidths[i];
            const usewidth = thwidth >= tdwidth ? thwidth : tdwidth;
            this.style.width = usewidth + "px";
            tds
                .filter((_d, idx) => idx === 0)
                .each(function () {
                    d3Select(this).style("width", usewidth + "px");
                })
                ;
            totalWidth += usewidth;
        });
        this.thead
            .style("position", this.fixedHeader() ? "absolute" : "relative")
            .style("width", totalWidth + "px")
            .style("margin-top", "0px")
            ;
        this.table
            .style("width", totalWidth + "px")
            ;
        this.tableDiv
            .style("margin-top", (context.fixedHeader() ? tableMarginHeight : 0) + "px")
            ;
        this.tbody
            .style("width", totalWidth + "px")
            ;
    }

    getBodyRow(i) {
        return this.table.selectAll("tbody tr.trId" + this._id)
            .filter(function (d, idx) {
                return idx === i;
            })
            ;
    }

    getFixedRow(i) {
        return this._element.selectAll(".rows-wrapper tbody tr")
            .filter(function (d, idx) {
                return idx === i;
            })
            ;
    }

    setOnScrollEvents(scrollNode, margHeight) {
        const context = this;
        scrollNode.onscroll = function (e) {
            const topDelta = e.target.scrollTop;
            const leftDelta = e.target.scrollLeft;
            if (context.fixedHeader()) {
                context.thead
                    .style("margin-left", -leftDelta + "px")
                    ;
            }
            if (context.fixedColumn()) {
                context.fixedCol
                    .style("margin-top", -topDelta + margHeight + "px")
                    ;
                if (context.fixedHeader()) {
                    context.fixedColHead
                        .style("margin-top", topDelta - margHeight + "px")
                        ;
                }
            }
        };
    }

    _generateTempRow() {
        const trow = this.tbody.append("tr");
        trow.append("td").text("QQQ");
        return trow;
    }

    _createSelectionObject(d) {
        const context = this;
        return {
            _id: d,
            element: () => context.tbody ? context.tbody.selectAll("tr").filter(function (d2) { return d2 === d; }) : d3Select(null)
        };
    }

    _calcRowsPerPage(th) {
        if (this._paginator.numItems() === 0) { // only run on first render
            this._paginator.numItems(1);
            this.itemsPerPage(1);
        }
        this._paginator.render();

        const thHeight = this.thead.selectAll("th").node() ? this.thead.selectAll("th").node().clientHeight : 0;
        const tfootHeight = this.tfoot.selectAll("td").node() ? this.tfoot.selectAll("td").node().clientHeight : 0;
        const tmpRow = this._generateTempRow();
        const tcellHeight = tmpRow.node().clientHeight;
        tmpRow.remove();
        const paginatorHeight = this.calcHeight(this._paginator.element());
        let ipp = Math.floor((this.height() - thHeight - tfootHeight - paginatorHeight - (this.table.style("width") >= this.table.style("width") ? platform.getScrollbarWidth() : 0) - this._paginatorTableSpacing * 2) / tcellHeight) || 1;
        if (this.totalledColumns().length !== 0) {
            ipp -= 1;
        }
        return ipp;
    }

    sort(idx) {
        if (this.sortByFieldIndex() !== idx) {
            this.descending(false);
        } else {
            this.descending(!this.descending());
        }
        this.sortByFieldIndex(idx);

        return this;
    }

    selection(_) {
        if (!arguments.length) return this._selectionBag.get().map(function (d) { return d._id; });
        this._selectionBag.set(_.map(function (row) {
            return this._createSelectionObject(row);
        }, this));
        return this;
    }

    selectionBagClick(d, i) {
        if (this.multiSelect() && d3Event.shiftKey && this._selectionPrevClick) {
            let inRange = false;
            const rows = [];
            const selection = this.tableData().filter(function (row, i2) {
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
            this._selectionBag.click(this._createSelectionObject(d), d3Event);
            this._selectionPrevClick = d;
        } else {
            const selObj = this._createSelectionObject(d);
            this._selectionBag.click(selObj, { ctrlKey: this._selectionBag.isSelected(selObj) });
            this._selectionPrevClick = d;
        }
        this.render();
    }

    applyHoverRowStyles(row) {
        const context = this;
        row
            .style("color", context.tbodyHoverRowFontColor())
            .style("background-color", context.tbodyHoverRowBackgroundColor())
            ;
    }
    applySelectedRowStyles(row) {
        const context = this;
        row
            .style("color", context.tbodySelectedRowFontColor())
            .style("background-color", context.tbodySelectedRowBackgroundColor())
            ;
    }
    applyRowStyles(row, isFirstCol: boolean = false) {
        const dataRow = row.datum().row;
        row
            .style("color", isFirstCol ? this.tbodyFirstColFontColor() : this.tbodyFontColor())
            .style("background-color", isFirstCol ? this.tbodyFirstColBackgroundColor() : this.tableZebraColor_exists() && this.tableData().indexOf(dataRow) % 2 ? this.tbodyRowBackgroundColor() : this.tableZebraColor())
            ;
    }
    applyFirstColRowStyles(rows) {
        this.applyStyleToRows(rows, true);
    }
    applyStyleToRows(rows, isFirstCol: boolean = false) {
        isFirstCol = typeof isFirstCol !== "undefined" ? isFirstCol : false;
        const context = this;
        rows.each(function () {
            const tr = d3Select(this);
            if (tr.classed("hover")) {
                context.applyHoverRowStyles(tr);
            } else if (tr.classed("selected")) {
                context.applySelectedRowStyles(tr);
            } else {
                context.applyRowStyles(tr, isFirstCol);
            }
        })
            ;
    }

    getColumnAlignment(rowIdx, colIdx, cell) {
        const field = this.field(rowIdx, colIdx);
        switch ((field as any).__prop_type) {
            case "string":
                return this.stringAlign();
            case "number":
                return this.numberAlign();
            case "":
            case undefined:
                switch (typeof cell) {
                    case "string":
                        return this.stringAlign();
                    case "number":
                        return this.numberAlign();
                }
        }
        return null;
    }

    serializeState() {
        return {
            selection: this._selectionBag.get().map(function (d) {
                return d._id;
            }),
            data: this.data()
        };
    }

    deserializeState(state) {
        if (state) {
            if (state.selection) {
                const context = this;
                this._selectionBag.set(state.selection.map(function (d) {
                    return context._createSelectionObject(d);
                }));
            }
            if (state.data) {
                this.data(state.data);
            }
        }
        return this;
    }

    click(row, column, selected) {
        console.log("click:  " + JSON.stringify(row, replacer) + ", " + column + "," + selected);
    }

    dblclick(row, column, selected) {
        console.log("dblclick:  " + JSON.stringify(row, replacer) + ", " + column + "," + selected);
    }

    headerClick(column, idx) {
        this
            .sort(idx)
            .render()
            ;
    }
    renderHtmlDataCells: { (): boolean; (_: boolean): Table; };
    pagination: { (): boolean; (_: boolean): Table; };
    paginationLimit: { (): any; (_: any): Table; };
    itemsPerPage: { (): any; (_: any): Table; };
    pageNumber: { (): number; (_: number): Table; };
    adjacentPages: { (): number; (_: number): Table; };
    topN: { (): number; (_: number): Table; };
    pivot: { (): boolean; (_: boolean): Table; };
    showHeader: { (): boolean; (_: boolean): Table; };
    fixedHeader: { (): boolean; (_: boolean): Table; };
    fixedColumn: { (): boolean; (_: boolean): Table; };
    multiSelect: { (): boolean; (_: boolean): Table; };

    fixedSize: { (): boolean; (_: boolean): Table; };

    theadFontSize: { (): string; (_: string): Table; };
    tbodyFontSize: { (): string; (_: string): Table; };
    tfootFontSize: { (): string; (_: string): Table; };
    theadFontColor: { (): string; (_: string): Table; };
    tbodyFontColor: { (): string; (_: string): Table; };
    tfootFontColor: { (): string; (_: string): Table; };
    theadFontFamily: { (): string; (_: string): Table; };
    tbodyFontFamily: { (): string; (_: string): Table; };
    tfootFontFamily: { (): string; (_: string): Table; };

    theadCellBorderColor: { (): string; (_: string): Table; };
    tfootCellBorderColor: { (): string; (_: string): Table; };
    theadRowBackgroundColor: { (): string; (_: string): Table; };
    tfootRowBackgroundColor: { (): string; (_: string): Table; };

    tbodyCellBorderColor: { (): string; (_: string): Table; };

    tbodyRowBackgroundColor: { (): string; (_: string): Table; };
    tbodyFirstColFontColor: { (): string; (_: string): Table; };
    tbodyFirstColBackgroundColor: { (): string; (_: string): Table; };

    tbodyHoverRowFontColor: { (): string; (_: string): Table; };
    tbodyHoverRowBackgroundColor: { (): string; (_: string): Table; };

    tbodySelectedRowFontColor: { (): string; (_: string): Table; };
    tbodySelectedRowBackgroundColor: { (): string; (_: string): Table; };
    tableZebraColor: { (): string; (_: string): Table; };
    tableZebraColor_exists: () => boolean;
    totalledColumns: { (): any[]; (_: any[]): Table; };
    totalledLabel: { (): string; (_: string): Table; };

    stringAlign: { (): string; (_: string): Table; };
    numberAlign: { (): string; (_: string): Table; };
    verticalAlign: { (): string; (_: string): Table; };

    minWidgetWidth: { (): number; (_: number): Table; };
    minWidgetHeight: { (): number; (_: number): Table; };

    sortByFieldIndex: { (): number; (_: number): Table; };
    sortByFieldIndex_exists: () => boolean;
    descending: { (): boolean; (_: boolean): Table; };
}
Table.prototype._class += " other_Table";

Table.prototype.publish("renderHtmlDataCells", false, "boolean", "enable or disable HTML within cells", null, { tags: ["Private"] });
Table.prototype.publish("pagination", true, "boolean", "Enable or disable pagination", null, { tags: ["Private"] });
Table.prototype.publish("paginationLimit", null, "number", "Maximum number of rows allowed before pagination defaults to on", null, { tags: ["Private"] });
Table.prototype.publishProxy("itemsPerPage", "_paginator");
Table.prototype.publishProxy("pageNumber", "_paginator", "pageNumber", 1);
Table.prototype.publishProxy("adjacentPages", "_paginator");
Table.prototype.publish("topN", null, "number", "Total number or rows of data to be displayed in the table", null, { tags: ["Private"] });
Table.prototype.publish("pivot", false, "boolean", "Pivot Table");
Table.prototype.publish("showHeader", true, "boolean", "Show or hide the table header", null, { tags: ["Private"] });
Table.prototype.publish("fixedHeader", true, "boolean", "Enable or disable fixed table header", null, { tags: ["Private"] });
Table.prototype.publish("fixedColumn", false, "boolean", "Enable or disable fixed first column", null, { tags: ["Private"] });
Table.prototype.publish("multiSelect", false, "boolean", "Multiple Selection", null, { tags: ["Basic"] });

Table.prototype.publish("fixedSize", false, "boolean", "Fix Size to Min Width/Height");

Table.prototype.publish("theadFontSize", null, "string", "Table head font size", null, { tags: ["Basic"], optional: true });
Table.prototype.publish("tbodyFontSize", null, "string", "Table body font size", null, { tags: ["Basic"], optional: true });
Table.prototype.publish("tfootFontSize", null, "string", "Table body font size", null, { tags: ["Basic"], optional: true });
Table.prototype.publish("theadFontColor", null, "html-color", "Table head font color", null, { tags: ["Basic"], optional: true });
Table.prototype.publish("tbodyFontColor", null, "html-color", "Table body font color", null, { tags: ["Basic"], optional: true });
Table.prototype.publish("tfootFontColor", null, "html-color", "Table body font color", null, { tags: ["Basic"], optional: true });
Table.prototype.publish("theadFontFamily", null, "string", "Table head font family", null, { tags: ["Basic"], optional: true });
Table.prototype.publish("tbodyFontFamily", null, "string", "Table body font family", null, { tags: ["Basic"], optional: true });
Table.prototype.publish("tfootFontFamily", null, "string", "Table body font family", null, { tags: ["Basic"], optional: true });

Table.prototype.publish("theadCellBorderColor", null, "html-color", "Table head cell border color", null, { tags: ["Basic"], optional: true });
Table.prototype.publish("tfootCellBorderColor", null, "html-color", "Table head cell border color", null, { tags: ["Basic"], optional: true });
Table.prototype.publish("theadRowBackgroundColor", null, "html-color", "Table head row color", null, { tags: ["Basic"], optional: true });
Table.prototype.publish("tfootRowBackgroundColor", null, "html-color", "Table head row color", null, { tags: ["Basic"], optional: true });

Table.prototype.publish("tbodyCellBorderColor", null, "html-color", "Table body cell border color", null, { tags: ["Basic"], optional: true });

Table.prototype.publish("tbodyRowBackgroundColor", null, "html-color", "Table body row color", null, { tags: ["Basic"], optional: true });
Table.prototype.publish("tbodyFirstColFontColor", null, "html-color", "Table body first column font color", null, { tags: ["Basic"], optional: true });
Table.prototype.publish("tbodyFirstColBackgroundColor", null, "html-color", "Table body first column background color", null, { tags: ["Basic"], optional: true });

Table.prototype.publish("tbodyHoverRowFontColor", null, "html-color", "Table body hover row font color", null, { tags: ["Basic"], optional: true });
Table.prototype.publish("tbodyHoverRowBackgroundColor", null, "html-color", "Table body hover row background color", null, { tags: ["Basic"], optional: true });

Table.prototype.publish("tbodySelectedRowFontColor", null, "html-color", "Table body selected row color", null, { tags: ["Basic"], optional: true });
Table.prototype.publish("tbodySelectedRowBackgroundColor", null, "html-color", "Table body selected row color", null, { tags: ["Basic"], optional: true });
Table.prototype.publish("tableZebraColor", null, "html-color", "Table zebra row color", null, { tags: ["Basic"], optional: true });
Table.prototype.publish("totalledColumns", [], "array", "Array of indices of the columns to be totalled", null, { tags: ["Basic"], optional: true, disable: (w: any) => w.pivot() });
Table.prototype.publish("totalledLabel", null, "string", "Adds a label to the first column of the 'Totalled' row", null, { tags: ["Basic"], optional: true, disable: (w: any) => w.pivot() });

Table.prototype.publish("stringAlign", "left", "set", "Cell alignment for strings", ["left", "right", "center"], { tags: ["Basic"], optional: true });
Table.prototype.publish("numberAlign", "right", "set", "Cell alignment for numbers", ["left", "right", "center"], { tags: ["Basic"], optional: true });
Table.prototype.publish("verticalAlign", null, "set", "Cell vertical alignment", [null, "middle", "top", "bottom"], { tags: ["Basic"], optional: true });

Table.prototype.publish("minWidgetWidth", 320, "number", "Minimum width of a child widget", null, { tags: ["Basic"], optional: true });
Table.prototype.publish("minWidgetHeight", 240, "number", "Minimum height of a child widget", null, { tags: ["Basic"], optional: true });

Table.prototype.publish("sortByFieldIndex", null, "number", "Index for the field/column to sort the data", null, { tags: ["Basic"], optional: true });
Table.prototype.publish("descending", false, "boolean", "Direction for sorting the data: ascending (true) or descending (false)", null, { tags: ["Basic"], optional: true });
