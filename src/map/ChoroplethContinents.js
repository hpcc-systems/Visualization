"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "topojson", "./Choropleth", "./countries"], factory);
    } else {
        root.map_ChoroplethContinents = factory(root.d3, root.topojson, root.map_Choropleth, root.map_countries);
    }
}(this, function (d3, topojson, Choropleth, Countries) {
    function ChoroplethContinents() {
        Choropleth.call(this);

        this._choroTopology = Countries.topology;
        this._choroTopologyObjects = Countries.topology.objects.land;
    }
    ChoroplethContinents.prototype = Object.create(Choropleth.prototype);
    ChoroplethContinents.prototype.constructor = ChoroplethContinents;
    ChoroplethContinents.prototype._class += " map_ChoroplethContinents";

    return ChoroplethContinents;
}));