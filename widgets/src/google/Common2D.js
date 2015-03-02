"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "../google/Common", "../chart/I2DChart", "goog!visualization,1,packages:[corechart]"], factory);
    } else {
        root.Common2D = factory(root.d3, root.Common, root.I2DChart);
    }
}(this, function (d3, Common, I2DChart) {

    function Common2D() {
        Common.call(this);
        I2DChart.call(this);
        this._class = "google_Common2D";
    };

    Common2D.prototype = Object.create(Common.prototype);
    Common2D.prototype.implements(I2DChart.prototype);

    Common2D.prototype.publish("paletteID", "default", "set", "Palette ID", Common2D.prototype._palette.switch());

    Common2D.prototype.update = function(domNode, element) {
        this._palette = this._palette.switch(this._paletteID);
        
        this._colors = this._data.map(function (row) {
            return this._palette(row[0]);
        }, this);

        Common.prototype.update.apply(this, arguments);
    }

    return Common2D;
}));
