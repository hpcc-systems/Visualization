"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./GMap", "../other/HeatMap"], factory);
    } else {
        root.map_GMapHeat = factory(root.map_GMap, root.other_HeatMap);
    }
}(this, function (GMap, HeatMap) {
    function GMapHeat() {
        GMap.call(this);
    }
    GMapHeat.prototype = Object.create(GMap.prototype);
    GMapHeat.prototype.constructor = GMapHeat;
    GMapHeat.prototype._class += " map_GMapHeat";

    GMapHeat.prototype.enter = function () {
        GMap.prototype.enter.apply(this, arguments);
        var heat = new HeatMap();

        var origRender = heat.render;
        var context = this;
        heat.render = function () {
            this.data(context.data().map(function (row) {
                var pos = context._viewportSurface.project(row[0], row[1]);
                return [pos.x, pos.y, row[4]];
            }));
            origRender.apply(this, arguments);
        };

        this._viewportSurface.widget(heat);
    };

    return GMapHeat;
}));
