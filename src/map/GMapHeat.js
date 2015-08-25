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

    GMapHeat.prototype.testData = function () {
        this.data([
            [37.665074, -122.384375, null, null, 0.234],
            [32.690680, -117.178540, null, null, 0.234],
            [39.709455, -104.969859, null, null, 0.234],
            [41.244123, -95.961610, { fillColor: "green" }, null, 0.234],
            [32.688980, -117.192040, null, null, 0.234],
            [45.786490, -108.526600, null, null, 0.234],
            [45.796180, -108.535652, { fillColor: "red" }, null, 0.234],
            [45.774320, -108.494370, null, null, 0.234],
            [45.777062, -108.549835, null, null, 0.234]
        ]);
        return this;
    };

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
