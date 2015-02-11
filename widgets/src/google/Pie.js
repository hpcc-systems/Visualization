(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "./Common"], factory);
    } else {
        root.Pie = factory(root.d3, root.Common);
    }
}(this, function (d3, Common) {

    function Pie(tget) {
        Common.call(this);
        this._class = "google_Pie";

        this._is3D = true;
    };
    Pie.prototype = Object.create(Common.prototype);

    Pie.prototype.is3D = function (_) {
        if (!arguments.length) return this._is3D;
        this._is3D = _;
        return this;
    }

    Pie.prototype.enter = function (domNode, element) {
        var context = this;

        element.style("overflow", "hidden");
        this.pieChart = new google.visualization.PieChart(element.node());

        google.visualization.events.addListener(this.pieChart, "select", function () {
            var selectedItem = context.pieChart.getSelection()[0];
            if (selectedItem) {
                context.click(context.rowToObj(context._data[selectedItem.row]), context._columns[1]);
            }
        });
    };

    Pie.prototype.update = function (domNode, element) {
        var context = this;

        var colors = this._data.map(function (row) {
            return this._palette(row[0]);
        }, this);

        var chartOptions = {
            backgroundColor: "none",
            width: this.width(),
            height: this.height(),
            chartArea: { width: "100%", height: "100%" },
            colors: colors,
            is3D: this._is3D,
            legend: { alignment: "center" }
        };

        this.pieChart.draw(this._data_google, chartOptions);
    };

    return Pie;
}));
