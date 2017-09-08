"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "./Paginator", "../common/Utility", "../common/Widget", "css!./Table"], factory);
    } else {
        root.other_Table = factory(root.d3, root.common_HTMLWidget, root.other_Paginator, root.common_Utility, root.common_Widget);
    }
}(this, function (d3, HTMLWidget, Paginator, Utility, Widget) {
    function Table() {
        HTMLWidget.call(this);
        this._tag = "div";
        this.columns([]);
        this._paginator = new Paginator();
        this._selectionBag = new Utility.Selection();
        this._selectionPrevClick = null;
        this._paginatorTableSpacing = 4;
    }
    Table.prototype = Object.create(HTMLWidget.prototype);
    Table.prototype.constructor = Table;
    Table.prototype._class += " other_Table";

    Table.prototype.publish("renderHtmlDataCells", false, "boolean", "enable or disable HTML within cells",null,{tags:["Private"]});
    Table.prototype.publish("pagination", true, "boolean", "Enable or disable pagination",null,{tags:["Private"]});
    Table.prototype.publish("paginationLimit", null, "number", "Maximum number of rows allowed before pagination defaults to on",null,{tags:["Private"]});
    Table.prototype.publishProxy("itemsPerPage", "_paginator");
    Table.prototype.publishProxy("pageNumber", "_paginator", "pageNumber",1);
    Table.prototype.publishProxy("adjacentPages", "_paginator");
    Table.prototype.publish("topN", null, "number", "Total number or rows of data to be displayed in the table",null,{tags:["Private"]});
    Table.prototype.publish("pivot", false, "boolean", "Pivot Table");
    Table.prototype.publish("showHeader", true, "boolean", "Show or hide the table header", null, { tags: ["Private"] });
    Table.prototype.publish("fixedHeader", true, "boolean", "Enable or disable fixed table header",null,{tags:["Private"]});
    Table.prototype.publish("fixedColumn", false, "boolean", "Enable or disable fixed first column",null,{tags:["Private"]});
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
    Table.prototype.publish("totalledColumns", [], "array", "Array of indices of the columns to be totalled", null, { tags: ["Basic"], optional: true, disable: function (w) { return w.pivot();} });
    Table.prototype.publish("totalledLabel", null, "string", "Adds a label to the first column of the 'Totalled' row", null, { tags: ["Basic"], optional: true, disable: function (w) { return w.pivot(); } });
    
    Table.prototype.publish("stringAlign", "left", "set", "Cell alignment for strings", ["left", "right", "center"], { tags: ["Basic"], optional: true });
    Table.prototype.publish("numberAlign", "right", "set", "Cell alignment for numbers", ["left","right","center"], { tags: ["Basic"], optional: true });
    Table.prototype.publish("verticalAlign", null, "set", "Cell vertical alignment", [null, "middle", "top", "bottom"], { tags: ["Basic"], optional: true });

    Table.prototype.publish("minWidgetWidth", 320, "number", "Minimum width of a child widget", null, { tags: ["Basic"], optional: true });
    Table.prototype.publish("minWidgetHeight", 240, "number", "Minimum height of a child widget", null, { tags: ["Basic"], optional: true });

    Table.prototype.publish("sortByFieldIndex", null, "number", "Index for the field/column to sort the data", null, { tags: ["Basic"], optional: true });
    Table.prototype.publish("descending", false, "boolean", "Direction for sorting the data: ascending (true) or descending (false)", null, { tags: ["Basic"], optional: true });


    Table.prototype.size = function (_) {
        var retVal = HTMLWidget.prototype.size.apply(this, arguments);
        if (arguments.length) {
            if (this.tableDiv) {
                var topMargin = this.showHeader() && this.fixedHeader() ? this.thead.property("offsetHeight") : 0;
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
    };

    Table.prototype.isHidden = function (colIdx) {
        if (this.pivot()) {
            return false;
        }
        var fields = this.fields();
        if (fields && fields[colIdx] && fields[colIdx].type() === "hidden") {
            return true;
        }
        return false;
    };

    Table.prototype.tableColumns = function (_) {
        var retVal = Table.prototype.columns.apply(this, arguments);
        if (!arguments.length && this.pivot()) {
            return this._db.column(0);
        }
        return retVal;
    };

    Table.prototype.tableData = function (_) {
        var retVal = Table.prototype.data.apply(this, arguments);
        if (!arguments.length && this.pivot()) {
            return this._db.columns().filter(function (col, idx) { return idx > 0; });
        }
        return retVal;
    };

    var noTransform = { transform: function (d) { return d; } };
    Table.prototype.field = function (rowIdx, colIdx) {
        if (this.pivot()) {
            if (colIdx === 0) return noTransform;
            return this.fields()[rowIdx + 1];
        }
        if (rowIdx === -1) return noTransform;
        return this.fields()[colIdx];
    };

    Table.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        this._parentElement.style("overflow", "hidden");

        this.tableDiv = element.append("div").attr("class", "tableDiv");
        this.table = this.tableDiv.append("table");
        this.fixedHead =  element.append("div").classed("header-wrapper", true);
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
    };

    Table.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        var context = this;
        var columns = context.tableColumns();
        var data = context.tableData();

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

        var th = this.thead.selectAll("th").data(this.showHeader() ? columns.filter(function (col, idx) {
            return !context.isHidden(idx);
        }) : []);
        th
            .enter()
            .append("th")
                .each(function (d) {
                    var element = d3.select(this);
                    element
                        .append("span")
                            .attr("class", "thText")
                    ;
                    element
                        .append("span")
                            .attr("class", "thIcon")
                    ;
                })
            .on("click", function (column, idx) {
                context.headerClick(column, idx);
            })
        ;
        th
            .style("background-color",this.theadRowBackgroundColor())
            .style("border-color",this.theadCellBorderColor())
            .style("color",this.theadFontColor())
            .style("font-size",this.theadFontSize())
        ;
        th.select(".thText")
            .style("font-family",this.theadFontFamily())
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

            var ipp = this._calcRowsPerPage(th);
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
        var startIndex = this.pageNumber() - 1;
        var itemsOnPage = this.itemsPerPage();

        var start = startIndex * itemsOnPage;
        var end = parseInt(startIndex * itemsOnPage) + parseInt(itemsOnPage);

        var tData = null;

        if (this.topN()) {
            tData = data.slice(0, this.topN());
        } else if (this.pagination()) {
            tData = data.slice(start, end);
        } else {
            tData = data;
        }

        var totalRow = [this.totalledLabel() ? this.totalledLabel() : null];
        if (this.totalledColumns().length !== 0) {
            for (var i = 0; i < this.totalledColumns().length; i++) this.totalledColumns()[i] = +this.totalledColumns()[i];
            for (var j = 1; j < columns.length; j++) {
                var sum = 0;
                if (this.totalledColumns().indexOf(j) !== -1) {
                    for (var k = 0; k < tData.length; k++) {
                        sum = sum + tData[k][j];
                    }
                    totalRow.push(sum);
                } else {
                    totalRow.push("");
                }
            }

            var tf = this.tfoot.selectAll("td").data(totalRow);
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
                .style("background-color",this.tfootRowBackgroundColor())
                .style("border-color",this.tfootCellBorderColor())
                .style("color",this.tfootFontColor())
                .style("font-size",this.tfootFontSize())
            ;
        }

        var rows = this.tbody.selectAll("tr.tr_" + this.id()).data(tData.map(function (d, idx) {
            //  TODO - Move fix closer to data source?
            for (var i = 0; i < d.length; ++i) {
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
                    var d = _d.row;
                    var i = _d.rowIdx;
                    context.selectionBagClick(d, i);
                    context.applyRowStyles(context.getBodyRow(i));
                    context.applyFirstColRowStyles(context.getFixedRow(i));
                }
            }, true)  //  capture=true:  event is caught on the way down the DOM before the cell click.
            .on("mouseover", function (_d) {
                if (_d.row) {
                    var i = _d.rowIdx;
                    var fixedLeftRows = context.getFixedRow(i);
                    if (!fixedLeftRows.empty()) {
                        fixedLeftRows.classed("hover", true);
                    }
                    var tbodyRows = context.getBodyRow(i);
                    tbodyRows.classed("hover", true);
                    context.applyStyleToRows(tbodyRows);
                    context.applyFirstColRowStyles(fixedLeftRows);
                }
            })
            .on("mouseout", function (_d) {
                if (_d.row) {
                    var i = _d.rowIdx;
                    var fixedLeftRows = context.getFixedRow(i);
                    fixedLeftRows.classed("hover", false);
                    var tbodyRows = context.getBodyRow(i);
                    tbodyRows.classed("hover", false);
                    context.applyStyleToRows(tbodyRows);
                    context.applyFirstColRowStyles(fixedLeftRows);
                }
            })
        ;
        rows
            .classed("selected", function (_d) {
                var d = _d.row;
                return context._selectionBag.isSelected(context._createSelectionObject(d));
            })
            .classed("trId" + this._id, true)
        ;
        rows.exit()
            .remove()
        ;
        this.applyStyleToRows(rows);

        var cells = rows.selectAll(".td_" + this.id()).data(function (_d, _trIdx) {
            return _d.row.filter(function (cell, idx) {
                return idx < columns.length && !context.isHidden(idx);
            }).map(function (cell, idx) {
                return {
                    rowInfo: _d,
                    colIdx: idx,
                    cell: cell
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
                var alignment = context.getColumnAlignment(tdContents.rowInfo.rowIdx, tdContents.colIdx, tdContents.cell);
                var el = d3.select(this);
                el
                    .style({
                        "height": null,
                        "text-align": alignment,
                        "vertical-align": context.verticalAlign()
                    })
                    .classed("tr-" + tdContents.rowInfo.rowIdx + "-td-" + tdIdx, true)
                ;
            })
        ;
        cells
            .each(function (tdContents) {
                var el = d3.select(this);
                if (tdContents.cell instanceof Widget) {
                    el[context.renderHtmlDataCells() ? "html" : "text"](null);
                    var widgetDiv = el.selectAll(".div_" + context.id()).data([tdContents.cell], function (d) { return d.id(); });
                    widgetDiv.exit()
                        .each(function (d) {
                            d.target(null);
                        })
                        .remove()
                    ;
                    widgetDiv.enter().append("div")
                        .attr("class", "div_" + context.id())
                        .style({
                            "width": context.minWidgetWidth() + "px",
                            "height": context.minWidgetHeight() + "px"
                        })
                        .each(function (d) {
                            var widgetDiv = d3.select(this);
                            d._parentWidget = context;
                            if (d._class.indexOf("childWidget") < 0) {
                                d._class = "childWidget " + d._class;
                            }
                            d
                                .target(null)
                                .target(widgetDiv.node())
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
        var tableMarginHeight = parseInt(this.thead.node().offsetHeight);

        if (this.pagination() && this._hasChildWidgets) {
            this.tableDiv.style("overflow-y", "auto");
            this.table.style("margin-bottom", "50px");
            console.log("Warning: displaying another widget in the table may cause problems with pagination");
        } else {
            this.tableDiv.style("overflow-y", null);
            this.table.style("margin-bottom", null);

        }
        this.size(this._size);

        var fixedColWidth = 0;
        var fixedColTh = this.fixedColHeadRow.selectAll("th").data(this.fixedColumn() && this.showHeader() ? [columns[0]] : []);
        fixedColTh
            .enter()
            .append("th")
                .each(function (d) {
                    var element = d3.select(this);
                    element
                        .append("span")
                            .attr("class", "thText")
                    ;
                    element
                        .append("span")
                            .attr("class", "thIcon")
                    ;
                })
            .on("click", function (column, idx) {
                context.headerClick(column, idx);
            })
        ;
        fixedColTh
            .style("background-color",this.theadRowBackgroundColor())
            .style("border-color",this.theadCellBorderColor())
            .style("color",this.theadFontColor())
            .style("font-size",this.theadFontSize())
        ;
        fixedColTh.select(".thText")
            .style("font-family",this.theadFontFamily())
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

        var fixedColTr = this.fixedColBody.selectAll("tr").data(this.fixedColumn() ? tData : []);
        fixedColTr.enter()
            .append("tr")
            .attr("class", function(){
                return "trId" + context._id;
            })
        ;
        fixedColTr
            .on("click", function (d, i) {
                d3.select(rows[0][i]).on("click.selectionBag")(rows.data()[i], i)
                ;
            })
            .on("mouseover", function (d, i) {
                d3.select(rows[0][i]).on("mouseover")(rows.data()[i], i)
                ;
            })
            .on("mouseout", function (d, i) {
                d3.select(rows[0][i]).on("mouseout")(rows.data()[i], i)
                ;
            })
            .classed("selected", function (d) {
                return context._selectionBag.isSelected(context._createSelectionObject(d));
            })
        ;
        fixedColTr.exit()
            .remove()
        ;
        var fixedColTd = fixedColTr.selectAll("td").data(function(d, i) {
            return [d[0]];
        });
        fixedColTd
            .enter()
            .append("td")
        ;
        fixedColTd[this.renderHtmlDataCells() ? "html" : "text"](function (d) { 
            if(typeof(d) === "string"){
                return d.trim();
            } else if (typeof(d) === "number") {
                return d;
            }
            return ""; 
        });
        fixedColTd.exit()
            .remove()
        ;

        var fixedColFootTd = this.fixedColFootRow.selectAll("td").data(this.fixedColumn() && this.totalledLabel() ? [this.totalledLabel()] : []);
        fixedColFootTd
            .enter()
            .append("td")
        ;
        fixedColFootTd[this.renderHtmlDataCells() ? "html" : "text"](function (d) { 
            if(typeof(d) === "string"){
                return d.trim();
            } else if (typeof(d) === "number") {
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
                .style("margin-top", (this.fixedHeader() ? this.tableDiv.property("scrollTop"): 0) - tableMarginHeight + "px")
            ;
            fixedColTh
                .style("width", fixedColWidth + "px")
            ;
            rows.each(function(d, i) {
                var height = d3.select(this).select("td").property("offsetHeight");
                d3.select(fixedColTd[i][0]).style("height", height + "px");
            });
        }

        this.table
            .style("margin-left", -fixedColWidth + "px" )
        ;
        this.tableDiv
            .style("margin-left", fixedColWidth + "px" )
            .style("width", this.width() - fixedColWidth + "px")
        ;

        if (!rows.empty()) this.setColumnWidths(rows);

        if (this.fixedSize()) {
            var node = d3.select(".tableDiv > table").node();
            if (node) {
                var box = node.getBoundingClientRect();
                var newTableHeight, finalWidth, maxWidth;
                if (box.width !== 0 && box.height !== 0) {
                    calcWidth();
                    calcHeight();
                } else {
                    if (box.height - tableMarginHeight <= context.tableDiv.property("offsetHeight")) {
                        calcHeight();
                    } else {
                        if (context.fixedHeader()) {
                            newTableHeight = context.property("offsetHeight");
                            newTableHeight = newTableHeight + "px";
                        } else {
                            newTableHeight = "100%";
                        }
                    }
                    if (box.width - fixedColWidth < context.tableDiv.property("offsetWidth")) {
                        calcWidth();
                    } else {
                        if (context.fixedColumn()) {
                            finalWidth = context.property("offsetWidth") - fixedColWidth;
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
            var newTableWidth = box.width;
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
                .right((context.hasVScroll(element) ? context.getScrollbarWidth() : 0) + context._paginatorTableSpacing)
                .bottom((context.hasHScroll(element) ? context.getScrollbarWidth() : 0) + context._paginatorTableSpacing)
                .render()
            ;
        }, 0);
    };

    Table.prototype.exit = function (domNode, element) {
        this._paginator.target(null);
        HTMLWidget.prototype.exit.apply(this, arguments);
    };
        
    Table.prototype.setColumnWidths = function(rows) {
        var context = this;
        var firstRow = rows.filter(function(d,i){ return i === 0; });

        var tds = [];
        firstRow.each(function(d) {
            tds = d3.selectAll(this.childNodes);
        });

        var tableMarginHeight = this.fixedHeader() ? this.thead.property("offsetHeight") : 0;
        var totalWidth = 1;
        var tdWidths = {};
        if(!context.fixedHeader()){
            tds.each(function(d, i) {
                tdWidths[i] = this.offsetWidth;
            });
        }else{
            tds.each(function(d, i) {
                tdWidths[i] = "100px";
            });
        }


        var th = this.thead.selectAll("th");
        th.each(function(d, i) {
            var thwidth = this.offsetWidth;
            var tdwidth = tds.empty() ? 0 : tdWidths[i];
            var usewidth = thwidth >= tdwidth ? thwidth : tdwidth;
            if(!context.fixedHeader()){
                this.style.width = usewidth + "px";
                if (!tds.empty() &&  tds[0][i]) {
                    tds[0][i].style.width = usewidth + "px";
                }
            }else{
                this.style.width = "100px";
                this.style['word-break'] = "break-word";
                if (!tds.empty() &&  tds[0][i]) {
                    tds[0][i].style.width = "120px";
                    tds[0][i].style['word-break'] = "break-word";
                }
            }

            totalWidth += usewidth;
        });
        this.thead
            .style("position", this.fixedHeader() ? "absolute" : "relative")
            .style("width", totalWidth + "px")
            .style("margin-top", "0px")
        ;
        this.table
            .style("width", totalWidth + "px" )
        ;
        if(context.fixedHeader()){
            if(this.thead && this.thead[0] && this.thead[0][0] && this.thead[0][0].clientHeight){
                this.tableDiv
                    .style("margin-top", (this.thead[0][0].clientHeight) + "px" )
                ;
            }

        }else{
            this.tableDiv
                .style("margin-top", (context.fixedHeader() ? tableMarginHeight : 0) + "px" )
            ;
        }

        this.tbody
            .style("width", totalWidth + "px" )
        ;
    };

    Table.prototype.getBodyRow = function(i) {
        return this.table.selectAll("tbody tr.trId" + this._id)
            .filter(function (d, idx) {
                return idx === i;
            })
        ;
    };

    Table.prototype.getFixedRow = function(i) {
        return this._element.selectAll(".rows-wrapper tbody tr")
            .filter(function (d, idx) {
                return idx === i;
            })
        ;
    };

    Table.prototype.setOnScrollEvents = function(scrollNode, margHeight) {
        var context = this;
        scrollNode.onscroll = function (e) {
            var topDelta = e.target.scrollTop;
            var leftDelta = e.target.scrollLeft;
            if (context.fixedHeader()) {
                context.thead
                    .style("margin-left", -leftDelta +  "px")
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
    };

    Table.prototype._generateTempRow = function() {
        var trow = this.tbody.append("tr");
        trow.append("td").text("QQQ");
        return trow;
    };

    Table.prototype._createSelectionObject = function (d) {
        var context = this;
        return {
            _id: d,
            element: function () {
                return context.tbody ? context.tbody.selectAll("tr").filter(function (d2) { return d2 === d; }) : d3.select();
            }
        };
    };

    Table.prototype._calcRowsPerPage = function(th) {
        if (this._paginator.numItems() === 0) { // only run on first render
            this._paginator.numItems(1);
            this.itemsPerPage(1);
        }
        this._paginator.render();

        var thHeight = this.thead.selectAll("th").node() ? this.thead.selectAll("th").node().clientHeight : 0;
        var tfootHeight = this.tfoot.selectAll("td").node() ? this.tfoot.selectAll("td").node().clientHeight : 0;
        var tmpRow = this._generateTempRow();
        var tcellHeight = tmpRow.node().clientHeight;
        tmpRow.remove();
        var paginatorHeight = this.calcHeight(this._paginator.element());
        var ipp = Math.floor((this.height() - thHeight - tfootHeight - paginatorHeight - (this.table.style("width") >= this.table.style("width") ? this.getScrollbarWidth() : 0) - this._paginatorTableSpacing * 2) / tcellHeight) || 1;
        if (this.totalledColumns().length !== 0) {
            ipp -= 1;
        }
        return ipp;
    };

    Table.prototype.sort = function (idx) {
        if (this.sortByFieldIndex() !== idx) {
            this.descending(false);
        } else {
            this.descending(!this.descending());
        }
        this.sortByFieldIndex(idx);

        return this;
    };

    Table.prototype.selection = function (_) {
        if (!arguments.length) return this._selectionBag.get().map(function (d) { return d._id; });
        this._selectionBag.set(_.map(function (row) {
            return this._createSelectionObject(row);
        }, this));
        return this;
    };

    Table.prototype.selectionBagClick = function (d, i) {
        if (this.multiSelect() && d3.event.shiftKey && this._selectionPrevClick) {
            var inRange = false;
            var rows = [];
            var selection = this.tableData().filter(function (row, i) {
                var lastInRangeRow = false;
                if (row === d || row === this._selectionPrevClick) {
                    if (inRange) {
                        lastInRangeRow = true;
                    }
                    inRange = !inRange;
                    rows.push(i);
                }
                return inRange || lastInRangeRow;
            }, this);
            this.selection(selection);
        } else if (this.multiSelect()) {
            this._selectionBag.click(this._createSelectionObject(d), d3.event);
            this._selectionPrevClick = d;
        } else {
            var selObj = this._createSelectionObject(d);
            this._selectionBag.click(selObj, { ctrlKey: this._selectionBag.isSelected(selObj) });
            this._selectionPrevClick = d;
        }
        this.render();
    };

    Table.prototype.applyHoverRowStyles = function(row){
        var context = this;
        row
            .style("color",context.tbodyHoverRowFontColor())
            .style("background-color",context.tbodyHoverRowBackgroundColor())
        ;
    };
    Table.prototype.applySelectedRowStyles = function(row){
        var context = this;
        row
            .style("color",context.tbodySelectedRowFontColor())
            .style("background-color",context.tbodySelectedRowBackgroundColor())
        ;
    };
    Table.prototype.applyRowStyles = function (row, isFirstCol) {
        var dataRow = row.datum().row;
        row
            .style("color", isFirstCol ? this.tbodyFirstColFontColor() : this.tbodyFontColor())
            .style("background-color", isFirstCol ? this.tbodyFirstColBackgroundColor() : this.tableZebraColor_exists() && this.tableData().indexOf(dataRow) % 2 ? this.tbodyRowBackgroundColor() : this.tableZebraColor())
        ;
    };
    Table.prototype.applyFirstColRowStyles = function(rows){
        this.applyStyleToRows(rows,true);
    };
    Table.prototype.applyStyleToRows = function(rows,isFirstCol){
        isFirstCol = typeof isFirstCol !== "undefined" ? isFirstCol : false;
        var context = this;
        rows.each(function () {
                var tr = d3.select(this);
                if (tr.classed("hover")) {
                    context.applyHoverRowStyles(tr);
                } else if (tr.classed("selected")) {
                    context.applySelectedRowStyles(tr);
                } else {
                    context.applyRowStyles(tr,isFirstCol);
                }
            })
        ;
    };

    Table.prototype.getColumnAlignment = function (rowIdx, colIdx, cell) {
        var field = this.field(rowIdx, colIdx);
        switch (field.__prop_type) {
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
    };

    Table.prototype.serializeState = function () {
        return {
            selection: this._selectionBag.get().map(function (d) {
                return d._id;
            }),
            data: this.data()
        };
    };

    Table.prototype.deserializeState = function (state) {
        if (state) {
            if (state.selection) {
                var context = this;
                this._selectionBag.set(state.selection.map(function (d) {
                    return context._createSelectionObject(d);
                }));
            }
            if (state.data) {
                this.data(state.data);
            }
        }
        return this;
    };

    function replacer(key, value) {
        if (value instanceof Widget) {
            return "Widget with class: " + value.classID();
        }
        return value;
    }

    Table.prototype.click = function (row, column, selected) {
        console.log("click:  " + JSON.stringify(row, replacer) + ", " + column + "," + selected);
    };

    Table.prototype.dblclick = function (row, column, selected) {
        console.log("dblclick:  " + JSON.stringify(row, replacer) + ", " + column + "," + selected);
    };

    Table.prototype.headerClick = function (column, idx) {
        this
            .sort(idx)
            .render()
        ;
    };

    return Table;
}));
