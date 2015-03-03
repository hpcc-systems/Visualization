"use strict";
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

    };
    Pie.prototype = Object.create(Common.prototype);
    
    Pie.prototype.publish("is3D", true, "boolean", "Enable 3D");
    Pie.prototype.publish("fontSize", 12, "number", "Font Size");
    Pie.prototype.publish("fontName", "Calibri", "string", "Font Name");
    Pie.prototype.publish("pieHole", 0, "number", "Pie Hole Size");
    
    Pie.prototype.publish("pieStartAngle", 0, "number", "Pie Start Angle");
    
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
        Common.prototype.update.apply(this, arguments);

        var context = this;

        var colors = this._data.map(function (row) {
            return this._palette(row[0]);
        }, this);


        var colors = this._data.map(function (row) {
            return this._palette(row[0]);
        }, this);
            
        this._chartOptions.colors = colors;
        this._chartOptions.fontSize = this._fontSize;
        this._chartOptions.fontName = this._fontName;
        this._chartOptions.is3D = this._is3D;
        this._chartOptions.pieStartAngle = this._pieStartAngle;
        this._chartOptions.pieHole = this._pieHole;

        this.pieChart.draw(this._data_google, this._chartOptions);
    };

    return Pie;
}));
