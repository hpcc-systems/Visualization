(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "../common/HTMLWidget", "../common/Palette", "../chart/IBar", "goog!visualization,1,packages:[corechart]", "css!./Bar"], factory);
    } else {
        root.Bar = factory(root.d3, root.HTMLWidget, root.Palette, root.IBar);
    }
}(this, function (d3, HTMLWidget, Palette, IBar) {

    function Bar(tget) {
        HTMLWidget.call(this);
        IBar.call(this);

        this._tag = "div";
        this._class = "google_bar";

        this.data([]);
    };
    Bar.prototype = Object.create(HTMLWidget.prototype);
    Bar.prototype.implements(IBar.prototype);

    Bar.prototype.d3Color = Palette.ordinal("category20");

    Bar.prototype.data = function (_) {
        var retVal = HTMLWidget.prototype.data.apply(this, arguments);
        if (arguments.length) {
            var data = [["Label", "Weight"]];
            this._data.forEach(function (row) {
                data.push(["" + row.label, row.weight]);
            }, this);
            this._data_google = google.visualization.arrayToDataTable(data);
        }
        return retVal;
    };

    Bar.prototype.enter = function (domNode, element) {
        element.style("overflow", "hidden");
        this.barChart = new google.visualization.BarChart(element.node());

        var context = this;
        google.visualization.events.addListener(this.barChart, "select", function () {
            var selectedItem = context.barChart.getSelection()[0];
            if (selectedItem) {
                context.click(context._data[selectedItem.row]);
            }
        });
    };

    Bar.prototype.update = function (domNode, element) {
        var context = this;

        var colors = this._data.map(function (row) {
            return this.d3Color(row.label);
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
