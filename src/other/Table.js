"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "./Paginator", "../common/Utility", "css!./Table"], factory);
    } else {
        root.other_Table = factory(root.d3, root.common_HTMLWidget, root.other_Paginator, root.common_Utility);
    }
}(this, function (d3, HTMLWidget, Paginator, Utility) {
    function Table() {
        HTMLWidget.call(this);
        this._tag = "div";
        this._currentSort = "";
        this._currentSortOrder = 1;
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
    Table.prototype.publish("pagination", false, "boolean", "Enable or disable pagination",null,{tags:["Private"]});
    Table.prototype.publish("paginationLimit", null, "number", "Maximum number of rows allowed before pagination defaults to on",null,{tags:["Private"]});
    Table.prototype.publishProxy("itemsPerPage", "_paginator");
    Table.prototype.publishProxy("pageNumber", "_paginator", "pageNumber",1);
    Table.prototype.publishProxy("adjacentPages", "_paginator");
    Table.prototype.publish("showHeader", true, "boolean", "Show or hide the table header",null,{tags:["Private"]});
    Table.prototype.publish("fixedHeader", true, "boolean", "Enable or disable fixed table header",null,{tags:["Private"]});
    Table.prototype.publish("fixedColumn", false, "boolean", "Enable or disable fixed first column",null,{tags:["Private"]});
    
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
    Table.prototype.publish("totalledColumns", [], "array", "Array of indices of the columns to be totalled", null, { tags: ["Basic"], optional: true });
    Table.prototype.publish("totalledLabel", null, "string", "Adds a label to the first column of the 'Totalled' row", null, { tags: ["Basic"], optional: true });
    
    Table.prototype.publish("columnPatterns", [], "array", "Array of formatting rules for each column", null, { tags: ["Basic"], optional: true });
    Table.prototype.publish("stringAlign", "left", "set", "Array of alignment positions for strings", ["left","right","center"], { tags: ["Basic"], optional: true });
    Table.prototype.publish("numberAlign", "right", "set", "Array of alignment positions for numbers", ["left","right","center"], { tags: ["Basic"], optional: true });

    Table.prototype.data = function (_) {
        var retVal = HTMLWidget.prototype.data.apply(this, arguments);
        if (arguments.length) {
            this._currentSort = "";
            this._currentSortOrder = 1;
        }
        return retVal;
    };

    Table.prototype.size = function (_) {
        var retVal = HTMLWidget.prototype.size.apply(this, arguments);
        
        if (arguments.length) {
            if (this.tableDiv) {
                var topMargin = this.showHeader() && this.fixedHeader() ? this.thead.node().offsetHeight : 0;
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

    Table.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        this._parentElement.style("overflow", "hidden");

        this.tableDiv = element.append("div").attr("class", "tableDiv");
        this.table = this.tableDiv.append("table");
        this.fixedHead =  this._element.append("div").classed("header-wrapper", true);
        this.fixedHeadTable = this.fixedHead.append("table");
        this.fixedThead = this.fixedHeadTable.append("thead").append("tr");
        this.unfixedThead = this.table.append("thead").append("tr");
        this.tbody = this.table.append("tbody");
        this.tfoot = this.table.append("tfoot").append("tr");
        this.fixedCol = this._element.append("div").classed("rows-wrapper", true);
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

        if (this.fixedHeader()) {
            this.thead = this.fixedThead;
        } else {
            this.thead = this.unfixedThead;
        }
        this.fixedHead.style("display", this.fixedHeader() ? "table-row" : "none");
        this.unfixedThead.style("display", this.fixedHeader() ? "none" : "table-row");

        var th = this.thead.selectAll("th").data(this.showHeader() ? this.columns() : [], function (d) { return d; });
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
            .text(function (column) {
                return column;
            })
        ;
        th.select(".thIcon")
            .text(function (column, idx) {
                if (context._currentSortOrder === -1) {
                    return context._currentSort === idx ? "\uf078" : "";
                } else {
                    return context._currentSort === idx ? "\uf077" : "";
                }
            })
        ;
        th.exit()
            .remove()
        ;
        th.order();

        if (this.paginationLimit()) {
            this.pagination(this.data().length >= parseInt(this.paginationLimit()) ? true : false);
        }
        if (this.pagination()) {
            if (this._paginator.target() === null) {
                this._paginator.target(element.node());
            }

            var ipp = this._calcRowsPerPage(th);
            this.itemsPerPage(ipp);

            this._paginator.numItems(this.data().length);
            this._tNumPages = Math.ceil(this._paginator.numItems() / this.itemsPerPage()) || 1;
            if (this.pageNumber() > this._tNumPages || this.pageNumber() <= 0) { this.pageNumber(1); } // resets if current pagenum selected out of range

            this._paginator._onSelect = function (p, d) {
                context.pageNumber(p);
                context.render();
                return;
            };
            this.tableDiv.style("overflow-y", "hidden");
        } else {
            this.tableDiv.style("overflow-y", null);
            this._paginator.numItems(0); // remove widget
        }

        // pageNumber starts at index 1
        var startIndex = this.pageNumber() - 1;
        var itemsOnPage = this.itemsPerPage();

        var start = startIndex * itemsOnPage;
        var end = parseInt(startIndex * itemsOnPage) + parseInt(itemsOnPage);

        var tData = null;

        if (this.pagination()) {
            tData = this.data().slice(start, end);
        } else {
            tData = this.data();
        }

        var totalRow = [this.totalledLabel() ? this.totalledLabel() : null];
        if (context.totalledColumns().length !== 0) {
            for(var i=0; i < context.totalledColumns().length; i++) context.totalledColumns()[i] = +context.totalledColumns()[i];

            for (var j = 1; j < context.columns().length; j++) {
                var sum = 0;
                if (context.totalledColumns().indexOf(j) !== -1) {                  
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
                var retVal = context.columnPatterns()[idx] ? context.getColumnFormatting(d, idx) : d;
                return retVal; 
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

        var rows = this.tbody.selectAll("tr").data(tData);
        rows
            .enter()
            .append("tr")
            .on("click.selectionBag", function (d, i) {
                context.selectionBagClick(d);
                context.render();
                context.applyRowStyles(context.getBodyRow(i));
                context.applyFirstColRowStyles(context.getFixedRow(i));
            })
            .on("click", function (d) {
                context.click(context.rowToObj(d), null, context._selectionBag.isSelected(context._createSelectionObject(d)));
                context.applyRowStyles(d3.select(this));
            })
            .on("mouseover", function (d, i) {
                var fixedLeftRows = context.getFixedRow(i);
                if (fixedLeftRows.empty()) { return; }
                fixedLeftRows.classed("hover", true);
                var tbodyRows = context.getBodyRow(i);
                tbodyRows.classed("hover", true);
                if (tbodyRows.classed("selected")) {
                    fixedLeftRows.classed("selected", true);
                }
                context.applyStyleToRows(tbodyRows);
                context.applyFirstColRowStyles(fixedLeftRows);
            })
            .on("mouseout", function (d, i) {
                var fixedLeftRows = context.getFixedRow(i);
                fixedLeftRows.classed("hover", false);
                var tbodyRows = context.getBodyRow(i);
                tbodyRows.classed("hover", false);
                context.applyStyleToRows(tbodyRows);
                context.applyFirstColRowStyles(fixedLeftRows);
            })
        ;
        rows
            .attr("class", function (d) {
                if (context._selectionBag.isSelected(context._createSelectionObject(d))) {
                    return "selected";
                }
            })
        ;
        rows.exit()
            .remove()
        ;

        var cells = rows.selectAll("td").data(function (row, i) {
            return row;
        });
        cells.enter()
            .append("td")
        ;
        cells[this.renderHtmlDataCells() ? "html" : "text"](function (d, idx) { 
            var retVal = context.columnPatterns()[idx] ? context.getColumnFormatting(d, idx) : d;
            return retVal; 
        });
        cells.exit()
            .remove()
        ;      
        rows.each(function(tr,trIdx){
            d3.select(this).selectAll("td").each(function(tdContents,tdIdx){
                var alignment = context.getColumnAlignment(tdContents);
                d3.select(this)
                    .classed("tr-"+trIdx+"-td-"+tdIdx,true)
                    .style("text-align", alignment)
                ;
            });
            var dis = d3.select(this);
            context.applyStyleToRows(dis);
        });  

        var tableMarginHeight = this.thead.node().offsetHeight;

        var tbodyRows = context.table.select("tbody tr");
        var tds = tbodyRows.selectAll("td");
        var totalWidth = 0;
        if (this.fixedHeader()) {
            th.each(function(d, i) {
                var thwidth = this.offsetWidth;
                var tdwidth = tds.length ? tds[0][i].offsetWidth : 0;
                var usewidth = thwidth >= tdwidth ? thwidth : tdwidth;
                this.style.width = usewidth + "px";
                if (tds.length) {
                    tds[0][i].style.width = usewidth + "px";
                }
                totalWidth += usewidth;
            });
        }

        this.size(this._size);

        this.thead
            .style("position", this.fixedHeader() ? "absolute" : "relative")
            .style("width", totalWidth + "px")
        ;
        this.table
            .style("width", totalWidth + "px" )
        ;
        this.tbody
            .style("width", totalWidth + "px" )
        ;
        
        var fixedColWidth = 0;
        var fixedColTh = this.fixedColHeadRow.selectAll("th").data(this.fixedColumn() && this.showHeader() ? [this.columns()[0]] : []);
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
                if (context._currentSortOrder === -1) {
                    return context._currentSort === idx ? "\uf078" : "";
                } else {
                    return context._currentSort === idx ? "\uf077" : "";
                }
            })
        ;
        fixedColTh.exit()
            .remove()
        ;

        var fixedColTr = this.fixedColBody.selectAll("tr").data(this.fixedColumn() ? tData : []);
        fixedColTr.enter()
            .append("tr")
        ;
        fixedColTr
            .classed("selected", function (d) {
                return context._selectionBag.isSelected(context._createSelectionObject(d));
            })
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

        if (this.fixedColumn()) {
            if (this.showHeader()) {
                fixedColWidth = fixedColTd.node().offsetWidth > fixedColTh.node().offsetWidth ? fixedColTd.node().offsetWidth : fixedColTh.node().offsetWidth;
            } else {
                fixedColWidth = fixedColTd.node().offsetWidth;
            }
            this.fixedCol
                .style("position", "absolute")
                .style("margin-top", -this.tableDiv.node().scrollTop + tableMarginHeight + "px")
            ;
            fixedColTd
                .style("width", fixedColWidth + "px")
            ;
            this.fixedColHead
                .style("position", "absolute")
                .style("margin-top", (this.fixedHeader() ? this.tableDiv.node().scrollTop: 0) - tableMarginHeight + "px")
            ;
            fixedColTh
                .style("width", fixedColWidth + "px")
            ;
        }

        this.table
            .style("margin-left", -fixedColWidth + "px" )
        ;
        this.tableDiv
            .style("margin-left", fixedColWidth + "px" )
            .style("margin-top", (this.fixedHeader() ? tableMarginHeight : 0) + "px" )
            .style("width", this.width() - fixedColWidth + "px")
        ;

        this._paginator.render();
        
        context.applyStyleToRows(this.tbody.selectAll("tr"));
        this._paginator
            .right((this.hasVScroll(this.tableDiv) ? this.getScrollbarWidth() : 0 ) + this._paginatorTableSpacing)
            .bottom((this.hasHScroll(this.tableDiv) ? this.getScrollbarWidth() : 0) + this._paginatorTableSpacing)
            .render()
        ;

        if(this.fixedSize()) {
            var box = d3.select(".tableDiv > table").node().getBoundingClientRect();
            var newTableHeight, finalWidth, maxWidth;
            if (box.width !== 0 && box.height !== 0) {
                calcWidth();
                calcHeight();
            } else {
                if (box.height - tableMarginHeight <= context.tableDiv.node().offsetHeight ) {
                    calcHeight();
                } else {
                    if (context.fixedHeader()) {
                        newTableHeight = context.node().offsetHeight;
                        newTableHeight = newTableHeight + "px";
                    } else {
                        newTableHeight ="100%";
                    }
                }
                if (box.width - parseInt(fixedColWidth) < context.tableDiv.node().offsetWidth ) {
                    calcWidth();
                } else {
                    if (context.fixedColumn()) {
                        finalWidth = context.node().offsetWidth - parseInt(fixedColWidth);
                        finalWidth = finalWidth + "px";
                    } else {
                        finalWidth = "100%";
                    }
                }            
            }
            context.tableDiv
                .style("width", finalWidth)
                .style("height", newTableHeight)
            ;
        }

        this.setOnScrollEvents(this.tableDiv.node(), tableMarginHeight);


        function calcWidth() {
            var newTableWidth = box.width - parseInt(fixedColWidth);
            maxWidth = context.table.node().offsetWidth - fixedColWidth + context.getScrollbarWidth();
            finalWidth = newTableWidth > maxWidth ? maxWidth : newTableWidth;
            finalWidth = finalWidth + "px";
        }

        function calcHeight() {
            newTableHeight = box.height - tableMarginHeight + context.getScrollbarWidth();
            newTableHeight = newTableHeight + "px";
        }

    };

    Table.prototype.exit = function (domNode, element) {
        this._paginator.target(null);
        HTMLWidget.prototype.exit.apply(this, arguments);
    };
        
    Table.prototype.getBodyRow = function(i) {
        return this.table.selectAll("tbody tr")
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
                    .style("margin-top", -topDelta + parseInt(margHeight) + "px")
                ;
                if (context.fixedHeader()) {
                    context.fixedColHead
                        .style("margin-top", topDelta - parseInt(margHeight) + "px")
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
                return context.tbody.selectAll("tr").filter(function (d2) { return d2 === d; });
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
        var ipp = Math.floor((this.height() - thHeight - tfootHeight- paginatorHeight - (this.hasHScroll(this.tableDiv) ? this.getScrollbarWidth() : 0) - this._paginatorTableSpacing * 2) / tcellHeight) || 1;
        return ipp;
    };

    Table.prototype.sort = function (idx) {
        if (this._currentSort !== idx) {
            this._currentSort = idx;
            this._currentSortOrder = 1;
        } else {
            this._currentSortOrder *= -1;
        }
        var context = this;
        this.data().sort(function (l, r) {
            if (l[idx] === r[idx]) {
                return 0;
            } else if (typeof (r[idx]) === "undefined" || l[idx] > r[idx]) {
                return context._currentSortOrder;
            }
            return context._currentSortOrder * -1;
        });
        return this;
    };

    Table.prototype.headerClick = function (column, idx) {
        this
            .sort(idx)
            .render()
        ;
    };

    Table.prototype.selection = function (_) {
        if (!arguments.length) return this._selectionBag.get().map(function (d) { return d._id; });
        this._selectionBag.set(_.map(function (row) {
            return this._createSelectionObject(row);
        }, this));
        return this;
    };

    Table.prototype.selectionBagClick = function (d) {
        if (d3.event.shiftKey && this._selectionPrevClick) {
            var inRange = false;
            var rows = [];
            var selection = this.data().filter(function (row, i) {
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
            return rows;
        } else {
            if (this._selectionBag.isSelected(this._createSelectionObject(d))) {
                this._selectionBag.clear();
                this._selectionPrevClick = null;
            } else {
                this._selectionBag.click(this._createSelectionObject(d), d3.event);
                this._selectionPrevClick = d;
            }
        }
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
    Table.prototype.applyRowStyles = function(row, isFirstCol){
        row
            .style("color", isFirstCol ? this.tbodyFirstColFontColor() : this.tbodyFontColor())
            .style("background-color", isFirstCol ? this.tbodyFirstColBackgroundColor() : this.tableZebraColor_exists() && this.data().indexOf(row.datum()) % 2 ? this.tbodyRowBackgroundColor() : this.tableZebraColor())
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

    Table.prototype.getColumnFormatting = function(cellData,colIdx){
         var context = this;
         if(typeof(cellData) === "string"){
            var timeFormat = d3.time.format(context.columnPatterns()[colIdx]);
            return timeFormat(new Date(cellData));
        } else if (typeof(cellData) === "number") {
            var format = d3.format(context.columnPatterns()[colIdx]);
            return format(cellData);
        }
        return cellData;
    };

    Table.prototype.getColumnAlignment = function(cellData){
         var context = this;
         switch(typeof(cellData)){
            case "number":
                return function(){
                    return context.numberAlign();
                };
            case "string":
                return function(){
                    return context.stringAlign();
                };
            default:
                return "";
        }
     };

    Table.prototype.click = function (row, column) {
        console.log("Click:  " + JSON.stringify(row) + ", " + column);
    };

    Table.prototype.headerClick = function (column, idx) {
        this
            .sort(idx)
            .render()
        ;
    };

    return Table;
}));
