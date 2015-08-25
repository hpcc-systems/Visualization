"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget","./Paginator", "./Bag", "css!./Table"], factory);
    } else {
        root.other_Table = factory(root.d3, root.common_HTMLWidget, root.other_Paginator, root.other_Bag);
    }
}(this, function (d3, HTMLWidget, Paginator, Bag) {
    function Table() {
        HTMLWidget.call(this);
        this._tag = "div";
        this._currentSort = "";
        this._currentSortOrder = 1;
        this._columns = [];
        this._paginator = new Paginator();
        this._selectionBag = new Bag.Selection();
        this._selectionPrevClick = null;
    }
    Table.prototype = Object.create(HTMLWidget.prototype);
    Table.prototype.constructor = Table;
    Table.prototype._class += " other_Table";

    Table.prototype.testData = function () {
        var data = [
                ["Label1", 37.665074, -122.384375, "green-dot.png", 4525, 4243545, 24354, 54, 2552345, 2455, 245435],
                ["Label2", 32.690680, -117.178540, "", 4525, 423545, 24354, 354, 2552345, 2455, 245435],
                ["Label3", 39.709455, -104.969859, "", 4525, 423545, 24354, 524, 2552345, 2455, 245435],
                ["Label4", 41.244123, -95.961610, "", 4525, 423545, 24354, 564, 2552345, 2455, 245435],
                ["Label5", 32.688980, -117.192040, "", 4525, 423545, 24354, 454, 2552345, 2455, 245435],
                ["Label6", 45.786490, -108.526600, "", 4525, 423545, 24354, 534, 2552345, 2455, 245435],
                ["Label7", 45.796180, -108.535652, "", 4525, 423545, 24354, 254, 2552345, 2455, 245435],
                ["Label8", 45.774320, -108.494370, "", 4525, 423545, 24354, 51, 2552345, 2455, 245435],
                ["Label9", 37.665074, -122.384375, "green-dot.png", 4525, 423545, 24354, 504, 2552345, 2455, 245435],
                ["Label0", 32.690680, -117.178540, "", 4525, 423545, 24304, 54, 2552345, 2455, 245435],
                ["Label0", 39.709455, -104.969859, "", 4525, 423545, 249354, 54, 2552345, 2455, 245435],
                ["Label9", 41.244123, -95.961610, "", 4525, 423545, 247354, 54, 2552345, 2455, 245435],
                ["Label8", 32.688980, -117.192040, "", 4525, 423545, 243654, 54, 2552345, 2455, 245435],
                ["Label7", 45.786490, -108.526600, "", 4525, 423545, 245354, 54, 2552345, 2455, 245435],
                ["Label6", 45.796180, -108.535652, "", 4525, 423545, 243354, 54, 2552345, 2455, 245435],
                ["Label5", 45.774320, -108.494370, "", 4525, 423545, 243454, 54, 2552345, 2455, 245435],
                ["Label4", 37.665074, -122.384375, "green-dot.png", 4525, 423545, 243254, 54, 2552345, 2455, 245435],
                ["Label3", 32.690680, -117.178540, "", 4525, 4243545, 24354, 54, 2552345, 2455, 245435],
                ["Label2", 39.709455, -104.969859, "", 4525, 4233545, 24354, 54, 2552345, 2455, 245435],
                ["Label1", 41.244123, -95.961610, "", 4525, 4235145, 24354, 54, 2552345, 2455, 245435],
                ["Label1", 32.688980, -117.192040, "", 4525, 4523545, 24354, 54, 2552345, 2455, 245435],
                ["Label2", 45.786490, -108.526600, "", 4525, 4263545, 24354, 54, 2552345, 2455, 245435],
                ["Label3", 45.796180, -108.535652, "", 4525, 4235745, 24354, 54, 2552345, 2455, 245435],
                ["Label4", 45.774320, -108.494370, "", 4525, 4235845, 24354, 54, 2552345, 2455, 245435],
                ["Label5", 37.665074, -122.384375, "green-dot.png", 4525, 423545, 24354, 54, 2552345, 2455, 245435],
                ["Label6", 32.690680, -117.178540, "", 4525, 423545, 24354, 54, 2552345, 20455, 245435],
                ["Label7", 39.709455, -104.969859, "", 4525, 423545, 24354, 54, 2552345, 24955, 245435],
                ["Label8", 41.244123, -95.961610, "", 4525, 423545, 24354, 54, 2552345, 24855, 245435],
                ["Label9", 32.688980, -117.192040, "", 4525, 423545, 24354, 54, 2552345, 27455, 245435],
                ["Label0", 45.786490, -108.526600, "", 4525, 423545, 24354, 54, 2552345, 24655, 245435],
                ["Label0", 45.796180, -108.535652, "", 4525, 423545, 24354, 54, 2552345, 24555, 245435],
                ["Label9", 45.774320, -108.494370, "", 4525, 423545, 24354, 54, 2552345, 24455, 245435],
                ["Label8", 37.665074, -122.384375, "green-dot.png", 4525, 423545, 24354, 54, 23552345, 2455, 245435],
                ["Label7", 32.690680, -117.178540, "", 4525, 423545, 24354, 54, 2552345, 2455, 2405435],
                ["Label6", 39.709455, -104.969859, "", 4525, 423545, 24354, 54, 2552345, 2455, 2495435],
                ["Label5", 41.244123, -95.961610, "", 4525, 423545, 24354, 54, 2552345, 2455, 2454835],
                ["Label4", 32.688980, -117.192040, "", 4525, 423545, 24354, 54, 2552345, 2455, 2475435],
                ["Label3", 45.786490, -108.526600, "", 4525, 423545, 24354, 54, 2552345, 2455, 2456435],
                ["Label2", 45.796180, -108.535652, "", 4525, 423545, 24354, 54, 2552345, 2455, 2455435],
                ["Label1", 45.774320, -108.494370, "", 4525, 423545, 24354, 54, 2552345, 2455, 2445435],
                ["Label1", 45.777062, -108.549835, "red-dot.png", 4525, 423545, 24354, 54, 25523345, 2455, 245435]
        ];
        this
            .columns(["Label", "Lat", "Long", "Pin", "Forth Column", "Fifth Column", "sixth Column", "Seventh Column", "eighth Column", "Nineth Column", "Tenth Column"])
            .data(data.concat(data).concat(data).concat(data).concat(data).concat(data).concat(data).concat(data).concat(data).concat(data).concat(data))
            .fixedHeader(true)
        ;
        return this;
    };

    Table.prototype.publish("pagination", false, "boolean", "Enable or disable pagination",null,{tags:["Private"]});
    Table.prototype.publish("fixedHeader", false, "boolean", "Enable or disable fixed table header and first column",null,{tags:["Private"]});
    Table.prototype.publishProxy("itemsPerPage", "_paginator");
    Table.prototype.publishProxy("pageNumber", "_paginator", "pageNumber",1);

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
        this.headerDiv = element;
        this.tableDiv
            .style("overflow", "auto")
        ;
        this.headerDiv
            .style("width", this.width() + "px")
            .style("height", this.height() + "px")
        ;
    };

    Table.prototype._generateTempCell = function() {
        var trow = this.tbody.selectAll("tr").data([[0]]);
        trow
            .enter()
            .append("tr")
        ;
        var tcell = trow.selectAll("td").data(function (row, i) {
            return row;
        });
        tcell.enter()
            .append("td")
            .text(function (d) {
                return d;
            })
        ;
        tcell.exit()
            .remove()
        ;
        return tcell;
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

        var thHeight = this.calcHeight(th);
        var tcellHeight = this.calcHeight(this._generateTempCell());
        var paginatorHeight = this.calcHeight(this._paginator.element());
        var ipp = Math.ceil((this.height() - thHeight - paginatorHeight) / tcellHeight) || 1;
        return ipp;
    };

    Table.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        var context = this;

        var th = this.thead.selectAll("th").data(this._columns, function (d) { return d; });
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
        th.select(".thText")
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

        if (this.pagination()) {
            if (this._paginator.target() === null) {
                this._paginator.target(this.tableDiv.node());
            }

            var ipp = this._calcRowsPerPage(th);
            this.itemsPerPage(ipp);

            this._paginator.numItems(this._data.length);
            this._tNumPages = Math.ceil(this._paginator.numItems() / this.itemsPerPage()) || 1;
            if (this.pageNumber() > this._tNumPages) { this.pageNumber(1); } // resets if current pagenum selected out of range

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
            tData = this._data.slice(start, end);
        } else {
            tData = this._data;
        }

        var rows = this.tbody.selectAll("tr").data(tData);
        rows
            .enter()
            .append("tr")
            .on("click.selectionBag", function (d) {
                context.selectionBagClick(d);
                context.render();
            })
            .on("click", function (d) {
                context.click(context.rowToObj(d), null, context._selectionBag.isSelected(context._createSelectionObject(d)));
            })
            .on("mouseover", function (d, i) {
                var el = context.headerDiv.selectAll(".rows-wrapper tbody tr")
                    .filter(function (d, idx) {
                        return idx === i;
                    })
                ;
                if (el.empty()) { return; }
                el.classed("hover", true);
                var that = context.table.selectAll("tbody tr")
                    .filter(function (d, idx) {
                        return idx === i;
                    })
                ;
                that.classed("hover", true);
                if (that.classed("selected")) {
                    el.classed("selected", true);
                }
            })
            .on("mouseout", function (d, i) {
                var el = context.headerDiv.selectAll(".rows-wrapper tbody tr")
                    .filter(function (d, idx) {
                        return idx === i;
                    })
                ;
                el.classed("hover", false);
                context.table.selectAll("tbody tr")
                    .filter(function (d, idx) {
                        return idx === i;
                    })
                    .classed("hover", false)
                ;
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
        cells
            .text(function (d) {
                if (d instanceof String) {
                    return d.trim();
                } else if (d instanceof Object) {
                    return "";
                }
                return d;
            })
        ;
        cells.exit()
            .remove()
        ;
        this._paginator.render();
        if (this.data().length) {
            this.fixedLabelsUpdate(domNode, element);
        }
    };

    Table.prototype.fixedLabelsUpdate = function (domNode, element) {
        var rows = this.tbody.selectAll("tr");
        var colsWrapper = this.headerDiv.selectAll(".cols-wrapper").data(this.fixedHeader() ? [0] : []);
        colsWrapper.enter()
            .append("div")
            .attr("class", "cols-wrapper")
            .each(function (d) {
                var element = d3.select(this);
                element
                    .append("table")
                    .classed("labels-wrapper", true)
                ;
            })
        ;
        colsWrapper.exit()
            .remove()
        ;
        var colLabelsWrapper = colsWrapper.select(".labels-wrapper");

        var rowsWrapper = this.headerDiv.selectAll(".rows-wrapper").data(this.fixedHeader() ? [0] : []);
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
        var colWrapperHeight = this.fixedHeader() ? theadSelection.node().offsetHeight : 0;

        var context = this;
        _copyLabelContents(this._id);
        _setOnScrollEvents(this.tableDiv.node());

        if (!this.fixedHeader() && this._prevFixedHeader !== this.fixedHeader()) {
            this.tableDiv
                .style("top", "0")
                .style("left", "0")
            ;
            context.table
                .style("margin-top", "0px")
                .style("margin-left", "0px")
            ;
        }
        this._prevFixedHeader = this.fixedHeader();

        function _copyLabelContents() {
            colLabelsWrapper.html(theadSelection.html());
            colLabelsWrapper
                .style("width", context.table.style("width"))
            ;

            var origThead = element.selectAll("th");
            var newThead = context.headerDiv.selectAll(".cols-wrapper th");
            origThead.each(function (d, i) {
                var el = newThead.filter(function (d, idx) { return idx === i; });
                var elWidth = d3.select(this).style("width");
                el.style("width", elWidth);
            });
            newThead.on("click", function (d, idx) {
                context.headerClick(d, idx);
            });

            var borderWidth = parseInt(context.table.select("td").style("border-width"));
            var rowSelection = context.table.selectAll("tbody > tr > td:first-child");
            var rowWrapperWidth = context.fixedHeader() ? rowSelection.node().offsetWidth : 0;
            var theadWidth = parseInt(rowWrapperWidth) + parseInt(2 * borderWidth);
            var rowContents = "<thead><tr>";
            rowContents += "<th style='width:" + theadWidth + "px'>";
            rowContents += origThead.filter(function (d, idx) { return idx === 0; }).html();
            rowContents += "</th></tr></thead>";

            rowSelection.each(function () {
                rowContents += "<tr><td class='row-label'>" + (this.innerHTML ? this.innerHTML : "&nbsp;") + "</td></tr>";
            });
            rowLabelsWrapper.html(rowContents)
                .style("width", rowWrapperWidth)
            ;

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
                    if (rows[0][i - 1] && (d3.select(rows[0][i - 1]).classed("selected")) === true) {
                        return rows[0][i - 1].parentElement.querySelector(":hover") === rows[0][i - 1] ? "selected hover" : "selected";
                    }
                })
            ;
            var newTableHeight = parseInt(context.headerDiv.node().style.height) - parseInt(colWrapperHeight);
            var newTableWidth = parseInt(context.headerDiv.node().style.width) - parseInt(rowWrapperWidth);
            var maxWidth = context.table.node().offsetWidth - rowWrapperWidth + context.getScrollbarWidth();
            var finalWidth = newTableWidth > maxWidth ? maxWidth : newTableWidth;
            context.tableDiv
                .style("width", finalWidth + "px")
                .style("height", newTableHeight + "px")
                .style("position", "absolute")
                .style("top", colWrapperHeight + "px")
                .style("left", rowWrapperWidth + "px")
                .style("overflow", "auto")
            ;
            context.table
                .style("margin-top", "-" + colWrapperHeight + "px")
                .style("margin-left", "-" + rowWrapperWidth + "px")
            ;
            colsWrapper
                .style("position", "absolute")
            ;
            rowsWrapper
                .style("width", rowWrapperWidth + "px")
                .style("height", newTableHeight + "px")
                .style("position", "absolute")
            ;
            rowLabelsWrapper
                .style("margin-top", -context.tableDiv.node().scrollTop + colWrapperHeight + "px")
            ;
            rowLabelsWrapper.select("thead")
                .style("margin-top", context.tableDiv.node().scrollTop - colWrapperHeight + "px")
                .style("position", "absolute")
                .style("width", theadWidth + "px")
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
                    .style("margin-top", -topDelta + colWrapperHeight + "px")
                ;
                rowLabelsWrapper.select("thead")
                    .style("margin-top", topDelta - colWrapperHeight + "px")
                ;
            };
        }
    };

    Table.prototype.exit = function (domNode, element) {
        this._paginator.target(null);
        HTMLWidget.prototype.exit.apply(this, arguments);
    };

    Table.prototype.headerClick = function (column, idx) {
        if (this._currentSort !== idx) {
            this._currentSort = idx;
            this._currentSortOrder = 1;
        } else {
            this._currentSortOrder *= -1;
        }
        var context = this;
        this._data.sort(function (l, r) {
            if (l[idx] === r[idx]) {
                return 0;
            } else if (typeof (r[idx]) === "undefined" || l[idx] > r[idx]) {
                return context._currentSortOrder;
            }
            return context._currentSortOrder * -1;
        });
        this.render();
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
            var selection = this._data.filter(function (row, i) {
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

    Table.prototype.click = function (row, column) {
        console.log("Click:  " + JSON.stringify(row) + ", " + column);
    };

    return Table;
}));
