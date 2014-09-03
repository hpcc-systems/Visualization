(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["../common/HTMLWidget", "css!./Table"], factory);
    } else {
        root.Entity = factory(root.HTMLWidget);
    }
}(this, function (HTMLWidget) {
    function Table() {
        HTMLWidget.call(this);

        this._tag = "table";
        this._class = "table";

        this._columns = [];
    };
    Table.prototype = Object.create(HTMLWidget.prototype);

    Table.prototype.enter = function (domNode, element) {
        this.thead = element.append("thead").append("tr");
        this.tbody = element.append("tbody");
    };

    Table.prototype.update = function (domNode, element) {
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

        var rows = this.tbody.selectAll("tr").data(this._data, function (d) {
            var id = "";
            for (var key in d) {
                id += d[key];
            }
            return id;
        });
        rows
            .enter()
            .append("tr")
            .on("click", function (d) { context.click(d); })
        ;

        rows.exit()
            .remove()
        ;

        var cells = rows.selectAll("td")
            .data(function (row) {
                return context._columns.map(function (column) {
                    return { column: column, value: "" + (row[column] ? row[column] : "") };
                });
            });
        cells
            .enter().append("td")
                .text(function (d) {
                    return d.value.trim();
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

    Table.prototype.data = function (_) {
        var retVal = HTMLWidget.prototype.data.apply(this, arguments);
        if (arguments.length) {
            this._columns = [];
            this._columnsIdx = {};
            if (_.length > 0) {
                for (var key in _[0]) {
                    if (!this._columnsIdx[key]) {
                        this._columns.push(key);
                        this._columnsIdx[key] = this._columns.length - 1;
                    }
                }
            }
        }
        return retVal;
    };

    return Table;
}));
