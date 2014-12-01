(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "./Common", "../common/Palette"], factory);
    } else {
        root.Line = factory(root.d3, root.Common, root.Palette);
    }
}(this, function (d3, Common, Palette) {

    function Line(tget) {
        Common.call(this);
        this._class = "google_line";

        this.data([]);
    };
    Line.prototype = Object.create(Common.prototype);

    Line.prototype.d3Color = Palette.ordinal("category20");

    Line.prototype.enter = function (domNode, element) {
        var context = this;

        element.style("overflow", "hidden");
        this.lineChart = new google.visualization.LineChart(element.node());
        google.visualization.events.addListener(this.lineChart, "select", function () {
            var selectedItem = context.lineChart.getSelection()[0];
            if (selectedItem) {
                context.click(context.rowToObj(context._data[selectedItem.row]));
            }
        });
    };

    Line.prototype.update = function (domNode, element) {
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
            legend: { alignment: "center" }
        };

        this.lineChart.draw(this._data_google, chartOptions);
    };

    return Line;
}));
