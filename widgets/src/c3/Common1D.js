"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./Common", "../chart/I1DChart"], factory);
    } else {
        root.Common1D = factory(root.Common, root.I1DChart);
    }
}(this, function (Common, I1DChart) {
    function Common1D(target) {
        Common.call(this);
        I1DChart.call(this);
        this._class = "c3_Common1D";

        var context = this;
        this._config.color = {
            pattern: this._palette.colors()
        };

        this._config.data.onclick = function (d, element) {
            context.click(context.rowToObj(context._data[d.i1Dex]), d.id);
        };
        this._config.data.color = function (color, d) {
            return context._palette(d.id ? d.id : d);
        };
    };
    Common1D.prototype = Object.create(Common.prototype);
    Common1D.prototype.implements(I1DChart.prototype);

    return Common1D;
}));
