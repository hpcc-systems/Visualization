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
        this._order = -1;
        this._currentSort = "";
        this._columns = [];
        this._paginator = new Paginator();
        this._selection = new Bag.Selection();
    }
    Table.prototype = Object.create(HTMLWidget.prototype);
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

    Table.prototype.publish("pagination", false, "boolean", "enable or disable pagination",null,{tags:['Private']});
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

    Table.prototype._calcRowsPerPage = function(th) {
        if (this._paginator.numItems() === 0) { // only run on first render
            this._paginator.numItems(1);
            this.itemsPerPage(1);
            this._paginator.render();
        }

        var thHeight = this.calcHeight(th);
        var tcellHeight = this.calcHeight(this._generateTempCell());
        var paginatorHeight = this.calcHeight(this._paginator.element());
        var ipp = Math.ceil((this.height() - thHeight - paginatorHeight) / tcellHeight) || 1;
        return ipp;
    };

    Table.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        var context = this;

        var th = this.thead.selectAll("th").data(this._columns, function (d) { return d;});
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
                if (context._currentSort === column) {
                    if(context._order !== -1) {
                        context._order = 1;
                    }
                } else {
                    context._order = -1;
                }
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
                if (context._order === -1) {
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
                console.log('page: ' + p);
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
            .on("click", function (d) {
                context.click(context.rowToObj(d));
            })
            .on("click.selectionBag", function (d) {
                var domNode = this;
                var newObj = {
                  "_id": d,
                  element: function() {
                        return d3.select(domNode);
                    }
                };
                context._selection.click(newObj, d3.event);
            })
        ;

        rows
            .attr("class", function (d) {
                var domNode = this;
                var newObj = {
                  "_id": d,
                  element: function() {
                        return d3.select(domNode);
                    }
                };
                if (context._selection.isSelected(newObj)) {
                    return "selected";
                }
            });


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
        var idx = this._columns.indexOf(column);

        this._data.sort(function(l, r) {
            if (typeof(l[idx]) !== "undefined" && typeof(r[idx]) !== "undefined") {
                if (l[idx] > r[idx]) {
                    return -1 * (context._order);
                } else if (l[idx] < r[idx]) {
                    return 1 * (context._order);
                } else {
                    return 0;
                }
            } else if (typeof(l[idx]) !== "undefined" && typeof(r[idx]) === "undefined") {
                return 1 * (context._order);
            } else if (typeof(l[idx]) === "undefined" && typeof(r[idx]) !== "undefined") {
                return -1 * (context._order);
            } else {
                return 1;
            }
        });

        if(this._order === 1) {
            this._order = -1;
        } else {
            this._order = 1;
        }
        this._currentSort = column;
        this.render();
    };

    Table.prototype.Selection = function (_) {
        if (!arguments.length) {
            var tg = [];
            for (var i = 0; i < this._selection.get().length; i++) {
                tg[i] = this._selection.get()[i]._id;
            }
            return tg;
        } else {
            var ts = [];
            for (var j = 0; j < _.length; j++) {
                ts[j] = {
                    "_id": _[j],
                    element: function() {
                      return d3.select(null);
                    }
                };
            }
            return this._selection.set(ts);
        }
        return this;
    };
    return Table;
}));
