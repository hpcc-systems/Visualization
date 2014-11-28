(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "../common/HTMLWidget", "../common/Palette", "../chart/IBar", "goog!visualization,1,packages:[corechart]", "css!./Pie"], factory);
    } else {
        root.Line = factory(root.d3, root.HTMLWidget, root.Palette, root.IPie);
    }
}(this, function (d3, HTMLWidget, Palette, IBar) {

    function Line(tget) {
        HTMLWidget.call(this);
        IBar.call(this);

        this._tag = "div";
        this._class = "google_line";

        this.data([]);
    };
    Line.prototype = Object.create(HTMLWidget.prototype);
    Line.prototype.implements(IBar.prototype);

    Line.prototype.d3Color = Palette.ordinal("category20");

    Line.prototype.is3D = function (_) {
        if (!arguments.length) return this._is3D;
        this._is3D = _;
        return this;
    }

    Line.prototype.data = function (_) {
        var retVal = HTMLWidget.prototype.data.apply(this, arguments);
        if (arguments.length) {
            this._xyData = [];
            this._xyData[0] = [];
            _.map(function (row) {
                if (row instanceof Array) {
                    row.forEach(function (item, idx) {
                        if (!this._xyData[idx]) {
                            this._xyData[idx] = [];
                        }
                        this._xyData[idx].push(item);
                    }, this);
                } else {
                    if (!this._xyData[0]) {
                        this._xyData[0] = [];
                    }
                    this._xyData[0].push(row);
                }
            }, this);


            var data = [];
            if (this._xyData.length && this._xyData[0].length) {
                data[0] = ["Subject", "Score"];
                this._xyData[0].forEach(function (item, row) {
                    data[row + 1] = [];
                    this._xyData.forEach(function (item, col) {
                        if (col === 0) {
                            data[row + 1].push(this._xyData[col][row].label);
                        }
                        data[row + 1].push(this._xyData[col][row].weight);
                    }, this);
                }, this);
            }
            this._data_google = google.visualization.arrayToDataTable(data);
        }
        return retVal;
    };

    Line.prototype.enter = function (domNode, element) {
        element.style("overflow", "hidden");
        this.lineChart = new google.visualization.LineChart(element.node());

        var context = this;
        google.visualization.events.addListener(this.lineChart, "select", function () {
            var selectedItem = context.lineChart.getSelection()[0];
            if (selectedItem) {
                context.click(context._data[selectedItem.row]);
            }
        });
    };

    Line.prototype.update = function (domNode, element) {
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
            legend: { alignment: "center" }
        };

        this.lineChart.draw(this._data_google, chartOptions);
    };

    return Line;
}));
