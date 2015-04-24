"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["../common/HTMLWidget", "css!./Table"], factory);
    } else {
        root.other_Table = factory(root.common_HTMLWidget);
    }
}(this, function (HTMLWidget) {
    function Table() {
        HTMLWidget.call(this);
        this._class = "other_Table";

        this._tag = "table";

        this._columns = [];
    };
    Table.prototype = Object.create(HTMLWidget.prototype);

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

    Table.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        this._parentElement.style("overflow", "auto");
        this.thead = element.append("thead").append("tr");
        this.tbody = element.append("tbody");
    };

    Table.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        var context = this;

        var th = this.thead.selectAll("th").data(this._columns, function (d) { return d;});
        th
            .enter()
            .append("th")
                .text(function (column) {
                    return column;
                })
        ;
        th.exit()
            .remove()
        ;

        var rows = this.tbody.selectAll("tr").data(this._data);
        rows
            .enter()
            .append("tr")
            .on("click", function (d) {
                context.click(context.rowToObj(d));
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
                }
                return d;
            })
        ;
        cells.exit()
            .remove()
        ;
    };

    Table.prototype.exit = function (domNode, element) {
        this.thead.remove();
        this.tbody.remove();
    };

    Table.prototype.click = function (d) {
    };

    return Table;
}));
