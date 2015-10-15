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
    Table.prototype.publishProxy("itemsPerPage", "_paginator");
    Table.prototype.publishProxy("pageNumber", "_paginator", "pageNumber",1);
    Table.prototype.publishProxy("adjacentPages", "_paginator");
    Table.prototype.publish("showHeader", true, "boolean", "Show or hide the table header",null,{tags:["Private"]});
    Table.prototype.publish("fixedHeader", false, "boolean", "Enable or disable fixed table header",null,{tags:["Private"]});
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
    Table.prototype.publish("tbodyFixedColFontColor", null, "html-color", "Table body first column font color", null, { tags: ["Basic"], optional: true });
    Table.prototype.publish("tbodyFixedColBackgroundColor", null, "html-color", "Table body first column background color", null, { tags: ["Basic"], optional: true });
    
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
                this.tableDiv
                    .style("width", this._size.width + "px")
                    .style("height", this._size.height + "px")
                ;
                this.headerDiv
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
        this.thead = this.table.append("thead").append("tr");
        this.tbody = this.table.append("tbody");
        this.tfoot = this.table.append("tfoot").append("tr");
        this.headerDiv = element;
        this.tableDiv
            .style("overflow", "auto")
            .style("width", this.width() + "px")
            .style("height", this.height() + "px")
        ;
        this.headerDiv
            .style("width", this.width() + "px")
            .style("height", this.height() + "px")
        ;
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

        var thHeight = this.thead.selectAll("th").node().clientHeight;
        var tfootHeight = this.tfoot.selectAll("td").node().clientHeight;
        var tmpRow = this._generateTempRow();
        var tcellHeight = tmpRow.node().clientHeight;
        tmpRow.remove();
        var paginatorHeight = this.calcHeight(this._paginator.element());
        var ipp = Math.floor((this.height() - thHeight - tfootHeight- paginatorHeight - (this.hasHScroll(this.tableDiv) ? this.getScrollbarWidth() : 0) - this._paginatorTableSpacing * 2) / tcellHeight) || 1;
        return ipp;
    };

    Table.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        var context = this;
        var box = d3.select(".tableDiv > table").node().getBoundingClientRect();
        if(this.fixedSize() && box.width !== 0 && box.height !== 0){
            element.attr({width: box.width + "px",height: box.height + "px"});
        } else {
            element.attr({width: "100%",height: "100%"});
        }
        
        if (!this.showHeader()) {
            this.fixedHeader(false);
        } 

        var th = this.thead.selectAll("th").data(this.showHeader() ? this.columns() : [], function (d) { return d; });
        th.enter()
            .append("th")
                .each(function (d) {
                    var element = d3.select(this);
                    element.append("span").classed("thText",true);
                    element.append("span").classed("thIcon",true);
                })
            .on("click", function (column, idx) {
                context.headerClick(column, idx);
            })
        ;
        th.style({
                "color":this.theadFontColor(),
                "font-size":this.theadFontSize(),
                "border-color":this.theadCellBorderColor(),
                "background-color":this.theadRowBackgroundColor()
            })
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
        if (context.totalledColumns() !== []) {
            var totArr = context.totalledColumns();
            // var x = this.totalledLabel() ? 1 : 0;1
            for (var i = 1; i < context.columns().length; i++) {
                var sum = 0;
                if (totArr.indexOf(i) !== -1) {                  
                    for (var k = 0; k < tData.length; k++) {
                        sum = sum + tData[k][i];
                    }
                    totalRow.push(sum);
                } else {
                    totalRow.push("");
                }
            }
            this.tfoot.selectAll("td").remove();
            var tf = this.tfoot.selectAll("td").data(totalRow)
                .enter()
                .append("td")
                .text(function(d) {
                    return d;
                })
            ;
            tf
                .style("background-color",this.tfootRowBackgroundColor())
                .style("border-color",this.tfootCellBorderColor())
                .style("color",this.tfootFontColor())
                .style("font-size",this.tfootFontSize())
            ;
        }

        var rows = this.tbody.selectAll("tr").data(tData);
        
        this.setRowEvents(rows);

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
        
        rows.each(function() {
            var d = d3.select(this);
            context.applyStyleToRows(d);
        });
        var cells = rows.selectAll("td").data(function (row) {
            return row;
        });
        cells.enter()
            .append("td")
        ;
        cells[this.renderHtmlDataCells() ? "html" : "text"](function (d, idx) { 
            var retVal = context.getColumnFormatting(d, idx);
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
        });
        this._paginator.render();
        if (this.data().length) {
            this.fixedLabelsUpdate(domNode, element);
        }
        
        context.applyStyleToRows(this.tbody.selectAll("tr"));
        this._paginator
            .right((this.hasVScroll(this.tableDiv) ? this.getScrollbarWidth() : 0 ) + this._paginatorTableSpacing)
            .bottom((this.hasHScroll(this.tableDiv) ? this.getScrollbarWidth() : 0) + this._paginatorTableSpacing)
            .render()
        ;
    };

    Table.prototype.fixedLabelsUpdate = function (domNode, element) {
        var context = this;
        var rows = this.tbody.selectAll("tr");
        rows.selectAll("td")
            .style({
                "color":this.tbodyFontColor(),
                "font-size":this.tbodyFontSize(),
                "font-family":this.tbodyFontFamily(),
                "border-color":this.tbodyCellBorderColor()
            })
        ;
        var colsWrapper = this.headerDiv.selectAll(".cols-wrapper").data(this.fixedHeader() ? [0] : []);
        colsWrapper.enter()
            .insert("div", ".rows-wrapper")
            .classed("cols-wrapper",true)
            .each(function () {
                d3.select(this)
                    .append("table")
                    .classed("labels-wrapper", true)
                    .append("thead")
                ;
            })
        ;
        colsWrapper.exit()
            .remove()
        ;
        var colLabelsWrapper = colsWrapper.select(".labels-wrapper");

        var rowsWrapper = this.headerDiv.selectAll(".rows-wrapper").data(this.fixedColumn() ? [0] : []);
        rowsWrapper.enter()
            .append("div")
            .attr("class", "rows-wrapper")
            .each(function (d) {
                var element = d3.select(this);
                element
                    .append("table")
                    .classed("labels-wrapper", true)
                ;
            })
        ;
        rowsWrapper.exit()
            .remove()
        ;
        var rowLabelsWrapper = rowsWrapper.select(".labels-wrapper");

        var theadSelection = this.table.select("thead");
        var colWrapperHeight = this.fixedHeader() || !this.showHeader() ? theadSelection.node().offsetHeight : 0;
        var tableMarginHeight = colWrapperHeight;
        _copyLabelContents();
        _setOnScrollEvents(this.tableDiv.node());
        
        colsWrapper.selectAll(".labels-wrapper tr").style("background-color",this.theadRowBackgroundColor());
        rowsWrapper.selectAll(".labels-wrapper thead > tr").style("background-color",this.theadRowBackgroundColor());
        
        var fixedColumnRows = rowsWrapper.selectAll(".labels-wrapper tbody > tr");
        context.applyRowStyles(fixedColumnRows,true);
        
        setTimeout(function(){
            context.applyStyleToRows(context.tbody.selectAll("tr"));
        },0);

        function _copyLabelContents() {
            var origThead = element.selectAll("th");
            origThead
                .style("border-color",context.theadCellBorderColor())
            ;
            if (context.fixedHeader()) {
                colsWrapper.select(".labels-wrapper > thead").html(theadSelection.html());
                colLabelsWrapper
                    .style("width", context.table.style("width"))
                ;
                var newThead = context._parentElement.selectAll(".cols-wrapper th");
                origThead.each(function(d, i){
                    var el = newThead.filter(function (d, idx) { return idx === i;});
                    var elWidth = d3.select(this).style("width");
                    el
                        .style("width", elWidth)
                    ;
                });                
                newThead.on("click", function(d, idx){
                    context.headerClick(d, idx);
                });
                rowLabelsWrapper.html("");
            }
            
            var rowWrapperWidth;
            var newTableHeight;
            if (context.fixedColumn()) {
                rowLabelsWrapper.html("");

                var borderWidth = parseInt(context.table.select("td").style("border-width"));
                var rowSelection = context.table.selectAll("tbody > tr > td:first-child");
                rowWrapperWidth = context.fixedColumn() ? rowSelection.node().offsetWidth : 0;
                var theadWidth = parseInt(rowWrapperWidth) + parseInt(2 * borderWidth);

                var tHead = rowLabelsWrapper.selectAll("thead").data([0]);
                if (context.showHeader()) {
                    var tHead_tr = tHead.enter()
                        .insert("thead", "tbody")
                        .append("tr")
                        .style("background-color", context.theadRowBackgroundColor())
                    ;
                    tHead.exit()
                        .remove()
                    ;

                    var ths =  tHead_tr.selectAll("th").data(origThead.filter(function (d, idx) { return idx === 0; }));
                    ths.attr("class", "update");
                    ths.enter()
                        .append("th")
                        .html(function(d, i) {
                            return d[i].innerHTML;
                        })
                    ;
                    ths.style({
                        "width":theadWidth + "px",
                        "color":context.theadFontColor(),
                        "font-size":context.theadFontSize(),
                        "font-family":context.theadFontFamily(),
                        "border-color":context.theadCellBorderColor()
                    });
                    ths.exit()
                        .remove()
                    ;
                } 

                var tBody = rowLabelsWrapper.selectAll("tbody").data([0]);
                tBody.enter()
                    .append("tbody")
                ;
                tBody.exit()
                    .remove()
                ;

                var tds = tBody.selectAll("tr").data(rowSelection[0]);
                tds
                    .enter() 
                    .append("tr")
                    .html(function(d) {
                        return d.outerHTML || "<td>&nbsp;</td>";  
                    })
                ;  
                if (context.totalledColumns() && context.totalledLabel()) {
                    tBody
                        .append("tr").append("td")
                        .text(context.totalledLabel())
                    ;
                }
                tds
                    .style({
                        "color":context.tbodyFontColor(),
                        "font-size":context.tbodyFontSize(),
                        "font-family":context.tbodyFontFamily(),
                        "border-color":context.tbodyCellBorderColor(),
                    })
                ;

                rowLabelsWrapper
                    .style("width", rowWrapperWidth)
                ;

                if (context.fixedHeader()){
                    tHead.style({
                        "position": "absolute",
                        "width": theadWidth + "px"
                    });
                    rowLabelsWrapper
                        .style("margin-top", -domNode.scrollTop + colWrapperHeight + "px")
                    ;
                    element
                        .style("top", colWrapperHeight + "px")
                    ;
                } else {
                    if (context.showHeader()) {
                        tHead
                            .style("margin-top", "0px")
                            .style("position", "relative")
                        ;
                        rowLabelsWrapper
                            .style("margin-top", -domNode.scrollTop + "px")
                        ;
                        element
                            .style("top", "0px")
                        ;
                    } else {
                        tHead.remove();
                    }
                }

                var fixedRows = rowLabelsWrapper.selectAll("tr");
                fixedRows
                    .on("click", function (d, i) {
                        d3.select(rows[0][i]).on("click.selectionBag")(rows.data()[i - 1], i - 1)
                        ;
                    })
                    .on("mouseover", function (d, i) {
                        d3.select(rows[0][i]).on("mouseover")(rows.data()[i - 1], i - 1)
                        ;
                    })
                    .on("mouseout", function (d, i) {
                        d3.select(rows[0][i]).on("mouseout")(rows.data()[i - 1], i - 1)
                        ;
                    })
                    .attr("class", function (d, i) {
                        var offSet = context.showHeader() ? 1 : 0;
                        if (rows[0][i - offSet] && (d3.select(rows[0][i - offSet]).classed("selected")) === true) {
                            return rows[0][i - offSet].parentElement.querySelector(":hover") === rows[0][i - offSet] ? "selected hover" : "selected";
                        }
                    })
                ;
            } else {
                rowWrapperWidth = 0; 
            }

            if (!context.showHeader()) {
                tableMarginHeight = 0;
            }

            newTableHeight = parseInt(context.headerDiv.node().style.height) - parseInt(tableMarginHeight);
            var newTableWidth = parseInt(context.headerDiv.node().style.width) - parseInt(rowWrapperWidth);
            var maxWidth = context.table.node().offsetWidth - rowWrapperWidth + context.getScrollbarWidth();
            var finalWidth = newTableWidth > maxWidth ? maxWidth : newTableWidth;
            context.tableDiv
                .style({
                    "width":finalWidth + "px",
                    "height":newTableHeight + "px",
                    "top":tableMarginHeight + "px",
                    "left":rowWrapperWidth + "px",
                    "overflow":"auto"
                })
            ;
            context.table
                .style({
                    "margin-left":"-" + rowWrapperWidth + "px",
                    "margin-top":"-" + colWrapperHeight + "px"
                })
            ;
            rowsWrapper
                .style("width", rowWrapperWidth + "px")
            ;
            rowLabelsWrapper
                .style("margin-top", -context.tableDiv.node().scrollTop + tableMarginHeight + "px")
            ;
            rowLabelsWrapper.select("thead")
                .style("margin-top", context.tableDiv.node().scrollTop - tableMarginHeight + "px")
                .on("click", function (d, idx) {
                    context.headerClick(d, idx);
                })
            ;
        }

        function _setOnScrollEvents(domNode) {
            domNode.onscroll = function (e) {
                var leftDelta = e.target.scrollLeft;
                var topDelta = e.target.scrollTop;
                colLabelsWrapper
                    .style("margin-left", -leftDelta + "px")
                ;
                rowLabelsWrapper
                    .style("margin-top", -topDelta + tableMarginHeight + "px")
                ;
                rowLabelsWrapper.select("thead")
                    .style("margin-top", topDelta - tableMarginHeight + "px")
                ;
            };
        }
    };

    Table.prototype.exit = function (domNode, element) {
        this._paginator.target(null);
        HTMLWidget.prototype.exit.apply(this, arguments);
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

    Table.prototype.applyStyleToRows = function(rows,isFixedCol){
        var context = this;
        rows.each(function () {
                var tr = d3.select(this);
                if (tr.classed("hover")) {
                    context.applyHoverRowStyles(tr);
                } else if (tr.classed("selected")) {
                    context.applySelectedRowStyles(tr);
                } else {
                    context.applyRowStyles(tr,isFixedCol);
                }
            })
        ;
    };
    Table.prototype.applyRowStyles = function(row, isFixedCol){
        row.style({
            "color":isFixedCol ? this.tbodyFixedColFontColor() : this.tbodyFontColor(),
            "background-color":isFixedCol ? this.tbodyFixedColBackgroundColor() : this.tableZebraColor_exists() && this.data().indexOf(row.datum()) % 2 ? this.tbodyRowBackgroundColor() : this.tableZebraColor()
        });
    };
    Table.prototype.applyHoverRowStyles = function(row){
        row.style({
            "color":this.tbodyHoverRowFontColor(),
            "background-color":this.tbodyHoverRowBackgroundColor()
        });
    };
    Table.prototype.applySelectedRowStyles = function(row){
        row.style({
            "color":this.tbodySelectedRowFontColor(),
            "background-color":this.tbodySelectedRowBackgroundColor()
        });
    };
    
    Table.prototype.setRowEvents = function(rows){
        var context = this;
        rows.enter()
            .append("tr")
            .on("click.selectionBag", function (d, i) {
                context.selectionBagClick(d);
                context.render();
                var fixedLeftRows = context.headerDiv.selectAll(".rows-wrapper tbody tr")
                    .filter(function (d, idx) {
                        return idx === i;
                    })
                ;
                var tbodyRows = context.table.selectAll("tbody tr")
                    .filter(function (d, idx) {
                        return idx === i;
                    })
                ;
                tbodyRows.classed("hover",true);
                context.applyRowStyles(tbodyRows);
                context.applyRowStyles(fixedLeftRows,true);
            })
            .on("click", function (d) {
                context.click(context.rowToObj(d), null, context._selectionBag.isSelected(context._createSelectionObject(d)));
                context.applyRowStyles(d3.select(this));
            })
            .on("mouseover", function (d, i) {
                var fixedLeftRows = context.headerDiv.selectAll(".rows-wrapper tbody tr")
                    .filter(function (d, idx) {
                        return idx === i;
                    })
                ;
                if (fixedLeftRows.empty()) { return; }
                fixedLeftRows.classed("hover", true);
                var tbodyRows = context.table.selectAll("tbody tr")
                    .filter(function (d, idx) {
                        return idx === i;
                    })
                ;
                tbodyRows.classed("hover", true);
                if (tbodyRows.classed("selected")) {
                    fixedLeftRows.classed("selected", true);
                }
                context.applyStyleToRows(tbodyRows);
                context.applyStyleToRows(fixedLeftRows,true);
            })
            .on("mouseout", function (d, i) {
                var fixedLeftRows = context.headerDiv.selectAll(".rows-wrapper tbody tr")
                    .filter(function (d, idx) {
                        return idx === i;
                    })
                ;
                fixedLeftRows.classed("hover", false);
                var tbodyRows = context.table.selectAll("tbody tr")
                    .filter(function (d, idx) {
                        return idx === i;
                    })
                    .classed("hover", false)
                ;
                context.applyStyleToRows(tbodyRows);
                context.applyStyleToRows(fixedLeftRows,true);
            })
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
        if (d3.event.shiftKey) {
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
            this._selectionBag.click(this._createSelectionObject(d), d3.event);
            this._selectionPrevClick = d;
        }
    };

    Table.prototype.getColumnFormatting = function(cellData,colIdx){
        var context = this;
        if(typeof(cellData) === "string"){
            var timeFormat = d3.time.format(context.columnPatterns()[colIdx]);
            return timeFormat(new Date(cellData)) || cellData.trim();
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
