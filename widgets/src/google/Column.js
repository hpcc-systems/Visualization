"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "./Common"], factory);
    } else {
        root.Column = factory(root.d3, root.Common);
    }
}(this, function (d3, Common) {

    function Column() {
        Common.call(this);
        this._class = "google_Column";
    };
    Column.prototype = Object.create(Common.prototype);
    
    Column.prototype.enter = function (domNode, element) {
        var context = this;

        element.style("overflow", "hidden");
        this.columnChart = new google.visualization.ColumnChart(element.node());
        google.visualization.events.addListener(this.columnChart, "select", function () {
            var selectedItem = context.columnChart.getSelection()[0];
            if (selectedItem) {
                context.click(context.rowToObj(context._data[selectedItem.row]), context._columns[selectedItem.column]);
            }
        });
    };

    Column.prototype.update = function (domNode, element) {
        var context = this;

        var colors = this._columns.filter(function (d, i) { return i > 0; }).map(function (row) {
            return this._palette(row);
        }, this);

        var chartOptions = {
            backgroundColor: "none",
            width: this.width(),
            height: this.height(),
            //chartArea: { width: "100%", height: "100%" },
            colors: colors,
            ///is3D: this._is3D,
            legend: { alignment: "center" }
        };

        this.columnChart.draw(this._data_google, chartOptions);
    };

    return Column;
}));
