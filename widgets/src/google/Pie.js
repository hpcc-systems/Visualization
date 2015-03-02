"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "./Common2D"], factory);
    } else {
        root.Pie = factory(root.d3, root.Common2D);
    }
}(this, function (d3, Common2D) {

    function Pie() {
        Common2D.call(this);
        this._class = "google_Pie";

        this._chartType = "PieChart";
    };
    Pie.prototype = Object.create(Common2D.prototype);
    
    Pie.prototype.publish("is3D", true, "boolean", "Enable 3D");
    Pie.prototype.publish("pieHole", 0, "number", "Pie Hole Size");
    Pie.prototype.publish("pieStartAngle", 0, "number", "Pie Start Angle");

    Pie.prototype.getChartOptions = function () {
        var retVal = Common2D.prototype.getChartOptions.apply(this, arguments);

        retVal.colors = this._data.map(function (row) {
            return this._palette(row[0]);
        }, this);
        retVal.is3D = this._is3D;
        retVal.pieHole = this._pieHole;
        retVal.pieStartAngle = this._pieStartAngle;
        return retVal;
    };
    
    Pie.prototype.enter = function (domNode, element) {
        Common2D.prototype.enter.apply(this, arguments);
    };

    Pie.prototype.update = function (domNode, element) {
        Common2D.prototype.update.apply(this, arguments);
    };

    return Pie;
}));
