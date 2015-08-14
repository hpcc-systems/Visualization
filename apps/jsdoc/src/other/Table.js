/**
* @file HPCC VIZ Table Widget
* @author HPCC Systems
*/

"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget","../other/Paginator", "../other/Bag", "css!./Table"], factory);
    } else {
        root.other_Table = factory(root.d3, root.common_HTMLWidget, root.other_Paginator, root.other_Bag);
    }
}(this, function (d3, HTMLWidget, Paginator, Bag) {
    /**
     * @class other_Table
     * @extends common_HTMLWidget
     */
    function Table() {
        HTMLWidget.call(this);
        /**
         * Specifies the HTML tag type of the container.
         * @member {string} _tag
         * @memberof google_Common
         * @private
         */
        this._tag = "div";
        this._currentSort = "";
        this._currentSortOrder = 1;
        this._columns = [];
        /**
         * Paginator widget/object instance.
         * @member {Object} _paginator
         * @memberof other_Table
         * @private
         */
        this._paginator = new Paginator();
        /**
         * Selection Bag widget/object instance.
         * @member {Object} _selectionBag
         * @memberof other_Table
         * @private
         */
        this._selectionBag = new Bag.Selection();
        this._selectionPrevClick = null;
    }
    Table.prototype = Object.create(HTMLWidget.prototype);
    Table.prototype.constructor = Table;
    /**
     * Specifies the class name of the container.
     * @member {string} _class
     * @memberof other_Table
     * @private
     */
    Table.prototype._class += " other_Table";

    /**
     * Populates Data and Columns with test data.
     * @method testData
     * @memberof other_Table
     * @instance
     * @public
     * @returns {Widget}
     */
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

    /**
     * The function that is called when this widget "enters" the web page.
     * @method enter
     * @memberof other_Table
     * @instance
     * @protected
     * @param {HTMLElement} domeNode HTML DOMNode of widget container.
     * @param {D3Selection} element d3 selection object of widget.
     */
    Table.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        this._parentElement.style("overflow", "auto");

        this.table = element.append("table");
        this.thead = this.table.append("thead").append("tr");
        this.tbody = this.table.append("tbody");
    };

    /**
     * Returns a temporary cell.
     * @method _generateTempCell
     * @memberof other_Table
     * @instance
     * @private
     */
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

    /**
     * Returns a d3 selection of selected cell.
     * @method _generateTempCell
     * @memberof other_Table
     * @instance
     * @param {String} Selected cell text.
     * @private
     */
    Table.prototype._createSelectionObject = function (d) {
        var context = this;
        return {
            _id: d,
            element: function () {
                return context.tbody.selectAll("tr").filter(function (d2) { return d2 === d; });
            }
        };
    };

    /**
     * Returns the maximum items per page for given widget dimensions.
     * @method _calcRowsPerPage
     * @memberof other_Table
     * @instance
     * @private
     * @param {D3Selection} d3 selection of header row.
     * @returns {Number}
     */
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

    /**
     * The function that is called when this widget "enters" the web page. after enter() and everytime the widget is updated with subsequent render calls.
     * @method update
     * @memberof other_Table
     * @instance
     * @protected
     * @param {HTMLElement} domeNode HTML/SVG DOMNode of widget container.
     * @param {D3Selection} element d3 selection object of widget.
     */
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
                context.click(context.rowToObj(d));
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

    /**
     * The function that is executed after render. It is used for doing destroying/cleanup.
     * @method exit
     * @memberof common_Widget
     * @instance
     * @protected
     * @param {HTMLElement} domeNode HTML DOMNode of widget container.
     * @param {D3Selection} element d3 selection object of widget.
     */
    Table.prototype.exit = function (domNode, element) {
        this._paginator.target(null);
        HTMLWidget.prototype.exit.apply(this, arguments);
    };

    /**
     * TODO
     * @method headerClick
     * @memberof other_Table
     * @instance
     * @private
     * @param {type} column TODO
     */
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

    /**
     * TODO
     * @method selection
     * @memberof other_Table
     * @instance
     * @private
     * @param {type} _ TODO
     * @returns {Widget}
     */
    Table.prototype.selection = function (_) {
        if (!arguments.length) return this._selectionBag.get().map(function (d) { return d._id; });
        this._selectionBag.set(_.map(function (row) {
            return this._createSelectionObject(row);
        }, this));
        return this;
    };
    /**
     * TODO
     * @method selectionBagClick
     * @memberof other_Table
     * @instance
     * @private
     * @param {type} d TODO
     */
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

    /**
     * (event) Overridable click callback function.
     * @method click
     * @memberof other_Table
     * @param {type} row
     * @param {type} column
     */
    Table.prototype.click = function (row, column) {
        console.log("Click:  " + JSON.stringify(row) + ", " + column);
    };

    return Table;
}));
