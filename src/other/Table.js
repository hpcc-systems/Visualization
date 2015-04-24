"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["../common/HTMLWidget","../other/Paginator", "css!./Table"], factory);
    } else {
        root.other_Table = factory(root.common_HTMLWidget, root.other_Paginator);
    }
}(this, function (HTMLWidget, Paginator) {
    function Table() {
        HTMLWidget.call(this);
        this._class = "other_Table";
        this._tag = "div";

        this._columns = [];
        this._paginator = new Paginator();
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
    
    Table.prototype.publish("pagination", true, "boolean", "enable or disable pagination");
    Table.prototype.publishProxy("itemsPerPage", "_paginator");
    //Table.prototype.publishProxy("numItems", "_paginator", "numItems");
    Table.prototype.publishProxy("pageNumber", "_paginator", "pageNumber",1);

    Table.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        this._parentElement.style("overflow", "auto");

        this.table = element.append("table");
        this.thead = this.table.append("thead").append("tr");
        this.tbody = this.table.append("tbody");
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

        if (this.pagination()) {
            if (this._paginator.target() == null) {
                //var pnode = document.getElementById(this.id()).parentNode.id 
                var pnode = document.getElementById(this.id());
                this._paginator.target(pnode); 
            }

            this._paginator.numItems(this._data.length);
            this._tNumPages = Math.ceil(this._paginator.numItems() / this.itemsPerPage()) || 1; 
            if (this.pageNumber() > this._tNumPages ) { this.pageNumber(1); } // resets if current pagenum selected out of range

            this._paginator._onSelect = function(p, d) {
                console.log('page: '+p);
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

        if (this.pagination()) {
            var tData = this._data.slice(start,end);
        } else {
            var tData = this._data;
        }

        var rows = this.tbody.selectAll("tr").data(tData);
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
        console.log('here');
        this._paginator.render();
        console.log(this._paginator);
    };

    Table.prototype.exit = function (domNode, element) {
        this.thead.remove();
        this.tbody.remove();
    };

    Table.prototype.click = function (d) {
    };

    return Table;
}));
