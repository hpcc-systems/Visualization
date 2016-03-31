"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "topojson", "./Choropleth", "./countries", "../common/Utility"], factory);
    } else {
        root.map_ChoroplethCountries = factory(root.d3, root.topojson, root.map_Choropleth, root.map_countries, root.common_Utility);
    }
}(this, function (d3, topojson, Choropleth, countries, Utility) {
    var features = topojson.feature(countries.topology, countries.topology.objects.countries).features;
    var rFeatures = {};
    for (var key in features) {
        if (features[key].id && countries.countryNames[features[key].id]) {
            rFeatures[countries.countryNames[features[key].id].name] = features[key];
        }
    }
    function ChoroplethCountries() {
        Choropleth.call(this);

        this._choroTopology = countries.topology;
        this._choroTopologyObjects = countries.topology.objects.countries;
    }
    ChoroplethCountries.prototype = Object.create(Choropleth.prototype);
    ChoroplethCountries.prototype.constructor = ChoroplethCountries;
    ChoroplethCountries.prototype._class += " map_ChoroplethCountries";

    ChoroplethCountries.prototype.layerEnter = function (base, svgElement, domElement) {
        Choropleth.prototype.layerEnter.apply(this, arguments);

        this._ChoroplethCountries = this._choroplethTransform.insert("g", ".mesh");
        this._selection = new Utility.SimpleSelection(this._ChoroplethCountries);
        this.choroPaths = d3.select(null);
        var context = this;
        this
            .tooltipHTML(function (d) {
                return context.tooltipFormat({ label: d[0], value: d[1] });
            })
        ;
    };

    ChoroplethCountries.prototype.layerUpdate = function (base) {
        Choropleth.prototype.layerUpdate.apply(this, arguments);

        this.choroPaths = this._ChoroplethCountries.selectAll(".data").data(this.visible() ? this.data() : [], function (d) { return d[0]; });
        var context = this;
        this.choroPaths.enter().append("path")
            .attr("class", "data")
            .call(this._selection.enter.bind(this._selection))
            .on("click", function (d) {
                if (context._dataMap[d[0]]) {
                    context.click(context.rowToObj(context._dataMap[d[0]]), "weight", context._selection.selected(this));
                }
            })
            .on("mouseout.tooltip", this.tooltip.hide)
            .on("mousemove.tooltip", this.tooltip.show)
        ;
        this.choroPaths
            .attr("d", function (d) {
                var retVal = base._d3GeoPath(rFeatures[d[0]]);
                if (!retVal) {
                    console.log("Unknown Country:  " + d);
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

    return ChoroplethCountries;
}));