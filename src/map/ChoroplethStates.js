"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "topojson", "./Choropleth", "./us-states", "../common/Utility"], factory);
    } else {
        root.map_ChoroplethStates = factory(root.d3, root.topojson, root.map_Choropleth, root.map_usStates, root.common_Utility);
    }
}(this, function (d3, topojson, Choropleth, usStates, Utility) {
    var features = topojson.feature(usStates.topology, usStates.topology.objects.states).features;
    var rFeatures = {};
    for (var key in features) {
        if (features[key].id) {
            rFeatures[usStates.stateNames[features[key].id].code] = features[key];
        }
    }
    function ChoroplethStates() {
        Choropleth.call(this);

        this.projection("albersUsaPr");

        this._choroTopology = usStates.topology;
        this._choroTopologyObjects = usStates.topology.objects.states;
    }
    ChoroplethStates.prototype = Object.create(Choropleth.prototype);
    ChoroplethStates.prototype.constructor = ChoroplethStates;
    ChoroplethStates.prototype._class += " map_ChoroplethStates";

    ChoroplethStates.prototype.layerEnter = function (base, svgElement, domElement) {
        Choropleth.prototype.layerEnter.apply(this, arguments);

        this._choroplethStates = this._choroplethTransform.insert("g", ".mesh");
        this._selection = new Utility.SimpleSelection(this._choroplethStates);
        this.choroPaths = d3.select(null);
    };

    ChoroplethStates.prototype.layerUpdate = function (base) {
        Choropleth.prototype.layerUpdate.apply(this, arguments);

        this.choroPaths = this._choroplethStates.selectAll(".data").data(this.visible() ? this.data() : [], function (d) { return d[0]; });
        var context = this;
        this.choroPaths.enter().append("path")
            .attr("class", "data")
            .call(this._selection.enter.bind(this._selection))
            .on("click", function (d) {
                context.click(context.rowToObj(d), "weight", context._selection.selected(this));
            })
            .on("mouseover.tooltip", function (d) {
                var code = rFeatures[d[0]].id;
                context.tooltipShow([usStates.stateNames[code].name, d[1]], context.columns(), 1);
            })
            .on("mouseout.tooltip", function (d) {
                context.tooltipShow();
            })
            .on("mousemove.tooltip", function (d) {
                var code = rFeatures[d[0]].id;
                context.tooltipShow([usStates.stateNames[code].name, d[1]], context.columns(), 1);
            })
        ;
        this.choroPaths
            .attr("d", function (d) {
                var retVal = base._d3GeoPath(rFeatures[d[0]]);
                if (!retVal) {
                    console.log("Unknown US State:  " + d);
                }
                return retVal;
            })
            .style("fill", function (d) {
                var retVal = context._palette(d[1], context._dataMinWeight, context._dataMaxWeight);
                return retVal;
            })
        ;
        this.choroPaths.exit().remove();
    };

    return ChoroplethStates;
}));