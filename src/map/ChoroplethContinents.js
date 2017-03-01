"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "topojson", "./ChoroplethCountries"], factory);
    } else {
        root.map_ChoroplethContinents = factory(root.d3, root.topojson, root.map_ChoroplethCountries);
    }
}(this, function (d3, topojson, ChoroplethCountries) {
    function ChoroplethContinents() {
        ChoroplethCountries.call(this);
    }
    ChoroplethContinents.prototype = Object.create(ChoroplethCountries.prototype);
    ChoroplethContinents.prototype.constructor = ChoroplethContinents;
    ChoroplethContinents.prototype._class += " map_ChoroplethContinents";

    ChoroplethContinents.prototype.layerEnter = function (base, svgElement, domElement) {
        ChoroplethCountries.prototype.layerEnter.apply(this, arguments);
        this._choroTopologyObjects = this._choroTopologyObjectsLand;
    };

    return ChoroplethContinents;
}));