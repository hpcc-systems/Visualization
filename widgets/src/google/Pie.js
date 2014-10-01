(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "../common/HTMLWidget", "../common/Palette", "../chart/IPie", "goog!visualization,1,packages:[corechart]", "css!./Pie"], factory);
    } else {
        root.Pie = factory(root.d3, root.HTMLWidget, root.Palette, root.IPie);
    }
}(this, function (d3, HTMLWidget, Palette, IPie) {

    function Pie(tget) {
        HTMLWidget.call(this);
        IPie.call(this);

        this._tag = "div";
        this._class = "google_pie";

        this._is3D = true;
    };
    Pie.prototype = Object.create(HTMLWidget.prototype);
    Pie.prototype.implements(IPie.prototype);

    Pie.prototype.d3Color = Palette.ordinal("category20");

    Pie.prototype.is3D = function (_) {
        if (!arguments.length) return this._is3D;
        this._is3D = _;
        return this;
    }

    Pie.prototype.data = function (_) {
        var retVal = HTMLWidget.prototype.data.apply(this, arguments);
        if (arguments.length) {
            var data = [["", ""]];
            this._data.forEach(function (row) {
                data.push([row.label, row.weight]);
            }, this);
            this._data_google = google.visualization.arrayToDataTable(data);
        }
        return retVal;
    };

    Pie.prototype.enter = function (domNode, element) {
        element.style("overflow", "hidden");
        this.pieChart = new google.visualization.PieChart(element.node());

        var context = this;
        google.visualization.events.addListener(this.pieChart, "select", function () {
            var selectedItem = context.pieChart.getSelection()[0];
            if (selectedItem) {
                context.click(context._data[selectedItem.row]);
            }
        });
    };

    Pie.prototype.update = function (domNode, element) {
        var context = this;

        var colors = this._data.map(function (row) {
            return this.d3Color(row.label);
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
