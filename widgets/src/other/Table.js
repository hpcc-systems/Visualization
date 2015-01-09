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
            var retVal = [];
            for (var key in row) {
                retVal.push("" + row[key]);
            }
            return retVal;
        });
        cells.enter()
            .append("td")
        ;
        cells
            .text(function (d) {
                return d.trim();
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
