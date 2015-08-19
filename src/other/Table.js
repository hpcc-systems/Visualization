"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget","../other/Paginator", "../other/Bag", "css!./Table"], factory);
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
        this
            .columns(["Lat", "Long", "Pin"])
            .data([
                [37.665074, -122.384375, "green-dot.png"],
                [32.690680, -117.178540],
                [39.709455, -104.969859],
                [41.244123, -95.961610],
                [32.688980, -117.192040],
                [45.786490, -108.526600],
                [45.796180, -108.535652],
                [45.774320, -108.494370],
                [45.777062, -108.549835, "red-dot.png"]
            ])
        ;
        return this;
    };

    Table.prototype.publish("pagination", false, "boolean", "enable or disable pagination",null,{tags:["Private"]});
    Table.prototype.publishProxy("itemsPerPage", "_paginator");
    Table.prototype.publishProxy("pageNumber", "_paginator", "pageNumber",1);

    Table.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        this._parentElement.style("overflow", "auto");

        this.table = element.append("table");
        this.thead = this.table.append("thead").append("tr");
        this.tbody = this.table.append("tbody");
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

        var th = this.thead.selectAll("th").data(this._columns);
        th
            .enter()
            .append("th")
                .each(function(d) {
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
            .on("click", function (column) {
                context.headerClick(column);
            })
        ;
        th.select(".thText")
            .text(function (column) {
                return column;
            })
        ;
        th.select(".thIcon")
            .text(function (column) {
                if (context._currentSortOrder === -1) {
                    return context._currentSort === column ? "\uf078" : "";
                } else {
                    return context._currentSort === column ? "\uf077" : "";
                }
            })
        ;
        th.exit()
            .remove()
        ;

        if (this.pagination()) {
            if (this._paginator.target() === null) {
                this._paginator.target(domNode);
            }

            var ipp = this._calcRowsPerPage(th);
            this.itemsPerPage(ipp);

            this._paginator.numItems(this._data.length);
            this._tNumPages = Math.ceil(this._paginator.numItems() / this.itemsPerPage()) || 1;
            if (this.pageNumber() > this._tNumPages) { this.pageNumber(1); } // resets if current pagenum selected out of range

            this._paginator._onSelect = function(p, d) {
                console.log("page: " + p);
                context.pageNumber(p);
                context.render();
                return;
            };

        } else {
            this._paginator.numItems(0); // remove widget
        }

        // pageNumber starts at index 1
        var startIndex = this.pageNumber()-1;
        var itemsOnPage = this.itemsPerPage();

        var start = startIndex * itemsOnPage;
        var end = parseInt(startIndex * itemsOnPage) + parseInt(itemsOnPage);

        var tData = null;
        if (this.pagination()) {
            tData = this._data.slice(start,end);
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
    };

    Table.prototype.exit = function (domNode, element) {
        this._paginator.target(null);
        HTMLWidget.prototype.exit.apply(this, arguments);
    };

    Table.prototype.headerClick = function (column) {
        var context = this;
        if (this._currentSort !== column) {
            this._currentSort = column;
            this._currentSortOrder = 1;
        } else {
            this._currentSortOrder *= -1;
        }
        var idx = this._columns.indexOf(column);

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
            var selection = this._data.filter(function (row) {
                var lastInRangeRow = false;
                if (row === d || row === this._selectionPrevClick) {
                    if (inRange) {
                        lastInRangeRow = true;
                    }
                    inRange = !inRange;
                }
                return inRange || lastInRangeRow;
            }, this);
            this.selection(selection);
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
