(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "./Common", "../common/Palette"], factory);
    } else {
        root.Bar = factory(root.d3, root.Common, root.Palette);
    }
}(this, function (d3, Common, Palette) {

    function Bar(tget) {
        Common.call(this);
        this._class = "google_bar";
    };
    Bar.prototype = Object.create(Common.prototype);

    Bar.prototype.d3Color = Palette.ordinal("category20");

    Bar.prototype.enter = function (domNode, element) {
        var context = this;

        element.style("overflow", "hidden");
        this.barChart = new google.visualization.BarChart(element.node());
        google.visualization.events.addListener(this.barChart, "select", function () {
            var selectedItem = context.barChart.getSelection()[0];
            if (selectedItem) {
                context.click(context.rowToObj(context._data[selectedItem.row]));
            }
        });
    };

    Bar.prototype.update = function (domNode, element) {
        var context = this;

        var colors = this._columns.filter(function (d, i) { return i > 0;}).map(function (row) {
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

        this.barChart.draw(this._data_google, chartOptions);
    };

    return Bar;
}));
