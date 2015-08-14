"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["../layout/Layered", "../layout/AbsoluteSurface", "./ChoroplethStates", "../other/HeatMap"], factory);
    } else {
        root.map_TestHeatMap = factory(root.layout_Layered, root.layout_AbsoluteSurface, root.map_ChoroplethStates, root.other_HeatMap);
    }
}(this, function (Layered, AbsoluteSurface, ChoroplethStates, HeatMap) {
    function TestHeatMap(target) {
        Layered.call(this);
    }
    TestHeatMap.prototype = Object.create(Layered.prototype);
    TestHeatMap.prototype.constructor = TestHeatMap;
    TestHeatMap.prototype._class += " map_TestHeatMap";

    TestHeatMap.prototype.testData = function () {
        var testData = [
            [37.665074, -122.384375, 0.234],
            [32.690680, -117.178540, 0.234],
            [39.709455, -104.969859, 0.234],
            [41.244123, -95.961610, 0.234],
            [32.688980, -117.192040, 0.234],
            [45.786490, -108.526600, 0.234],
            [45.796180, -108.535652, 0.234],
            [45.774320, -108.494370, 0.234],
            [45.777062, -108.549835, 0.234]
        ];

        var map = new ChoroplethStates().testData();
        var heat = new HeatMap();

        var origRender = heat.render;
        heat.render = function () {
            this.data(testData.map(function (row) {
                var pos = map.project(row[0], row[1]);
                return [pos[0], pos[1], row[2]];
            }));
            origRender.apply(this, arguments);
        };

        this
            .addLayer(new AbsoluteSurface().widget(map))
            .addLayer(new AbsoluteSurface().widget(heat))
        ;
        return this;
    };
    return TestHeatMap;
}));
