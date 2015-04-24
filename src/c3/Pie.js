"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./Common2D"], factory);
    } else {
        root.c3_Pie = factory(root.c3_Common2D);
    }
}(this, function (Common2D) {
    function Pie(target) {
        Common2D.call(this);
        this._class = "c3_Pie";

        this._type = "pie";
    };
    Pie.prototype = Object.create(Common2D.prototype);

    Pie.prototype.update = function (domNode, element) {
        Common2D.prototype.update.apply(this, arguments);

        var data = this._data.map(function (row, idx) {
            return [row[0], row[1]];
        }, this);
        this.c3Chart.load({
            columns: data
        });
    };

    return Pie;
}));
