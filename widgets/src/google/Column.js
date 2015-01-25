(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "./Common", "../common/Palette"], factory);
    } else {
        root.Column = factory(root.d3, root.Common, root.Palette);
    }
}(this, function (d3, Common, Palette) {

    function Column() {
        Common.call(this);
        this._class = "google_Column";
    };
    Column.prototype = Object.create(Common.prototype);

    Column.prototype.d3Color = Palette.ordinal("category20");

    Column.prototype.enter = function (domNode, element) {
        var context = this;

        element.style("overflow", "hidden");
        this.columnChart = new google.visualization.ColumnChart(element.node());
        google.visualization.events.addListener(this.columnChart, "select", function () {
            var selectedItem = context.columnChart.getSelection()[0];
            if (selectedItem) {
                context.click(context.rowToObj(context._data[selectedItem.row]));
            }
        });
    };

    Column.prototype.update = function (domNode, element) {
        var context = this;

        var colors = this._columns.filter(function (d, i) { return i > 0; }).map(function (row) {
            return this.d3Color(row);
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
