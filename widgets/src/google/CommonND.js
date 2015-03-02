"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "../google/Common", "../chart/I2DChart", "goog!visualization,1,packages:[corechart]"], factory);
    } else {
        root.CommonND = factory(root.d3, root.Common, root.INDChart);
    }
}(this, function (d3, Common, INDChart) {

    function CommonND() {
        Common.call(this);
        INDChart.call(this);
        this._class = "google_CommonND";
    };

    CommonND.prototype = Object.create(Common.prototype);
    CommonND.prototype.implements(INDChart.prototype);

    CommonND.prototype.publish("paletteID", "default", "set", "Palette ID", CommonND.prototype._palette.switch());

    CommonND.prototype.update = function(domNode, element) {   
        this._palette = this._palette.switch(this._paletteID);

        this._colors = this._columns.filter(function (d, i) { return i > 0;}).map(function (row) {
            return this._palette(row);
        }, this);

        Common.prototype.update.apply(this, arguments);
    }

    return CommonND;
}));
