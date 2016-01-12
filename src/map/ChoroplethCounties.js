"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "topojson", "./Choropleth", "./us-counties", "../common/Utility"], factory);
    } else {
        root.map_ChoroplethCounties = factory(root.d3, root.topojson, root.map_Choropleth, root.map_usCounties, root.common_Utility);
    }
}(this, function (d3, topojson, Choropleth, usCounties, Utility) {
    var features = topojson.feature(usCounties.topology, usCounties.topology.objects.counties).features;
    var rFeatures = {};
    for (var key in features) {
        if (features[key].id) {
            rFeatures[features[key].id] = features[key];
        }
    }
    function ChoroplethCounties() {
        Choropleth.call(this);

        this.projection("albersUsaPr");

        this._choroTopology = usCounties.topology;
        this._choroTopologyObjects = usCounties.topology.objects.counties;
    }
    ChoroplethCounties.prototype = Object.create(Choropleth.prototype);
    ChoroplethCounties.prototype.constructor = ChoroplethCounties;
    ChoroplethCounties.prototype._class += " map_ChoroplethCounties";

    ChoroplethCounties.prototype.layerEnter = function (base, svgElement, domElement) {
        Choropleth.prototype.layerEnter.apply(this, arguments);

        this._choroplethCounties = this._choroplethTransform.insert("g", ".mesh");
        this._selection = new Utility.SimpleSelection(this._choroplethCounties);
        this.choroPaths = d3.select(null);
    };

    ChoroplethCounties.prototype.layerUpdate = function (base) {
        Choropleth.prototype.layerUpdate.apply(this, arguments);
        this.choroPaths = this._choroplethCounties.selectAll(".data").data(this.visible() ? this.data() : [], function (d) { return d[0]; });
        var context = this;
        this.choroPaths.enter().append("path")
            .attr("class", "data")
            .call(this._selection.enter.bind(this._selection))
            .on("click", function (d) {
                if (context._dataMap[d[0]]) {
                    context.click(context.rowToObj(context._dataMap[d[0]]), "weight", context._selection.selected(this));
                }
            })
            .on("mouseover.tooltip", function (d) {
                context.tooltipShow([usCounties.countyNames[d[0]], context._dataMap[d[0]] ? context._dataMap[d[0]][1] : "N/A"], context.columns(), 1);
            })
            .on("mouseout.tooltip", function (d) {
                context.tooltipShow();
            })
            .on("mousemove.tooltip", function (d) {
                context.tooltipShow([usCounties.countyNames[d[0]], context._dataMap[d[0]] ? context._dataMap[d[0]][1] : "N/A"], context.columns(), 1);
            })
        ;
        this.choroPaths
            .attr("d", function (d) {
                var retVal = base._d3GeoPath(rFeatures[d[0]]);
                if (!retVal) {
                    console.log("Unknown US County:  " + d);
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

    return ChoroplethCounties;
}));