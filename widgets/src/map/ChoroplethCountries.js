"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "./Choropleth", "topojson/topojson", "./countries"], factory);
    } else {
        root.ChoroplethCountries = factory(root.d3, root.Choropleth, root.topojson, root.countries);
    }
}(this, function (d3, Choropleth, topojson, countries) {
    function ChoroplethCountries() {
        Choropleth.call(this);
        this._class = "map_ChoroplethCountries";

        this._dataMap = {};
        this._dataMaxWeight = 0;
        this._dataMinWeight = 0;
        this.projection(this._world_projection);
    };
    ChoroplethCountries.prototype = Object.create(Choropleth.prototype);

    ChoroplethCountries.prototype.publish("world_projection", "mercator", "set", "Map Projection", ["mercator", "orthographic"]);

    ChoroplethCountries.prototype.testData = function () {
        return this;
    },

    ChoroplethCountries.prototype.data = function (_) {
            var retVal = Choropleth.prototype.data.apply(this, arguments);
        if (arguments.length) {
            this._dataMap = {};
            this._dataMinWeight = null;
            this._dataMaxWeight = null;

            var context = this;
            this._data.forEach(function (item) {
                context._dataMap[item.county] = item.weight;
                if (!context._dataMinWeight || item.weight < context._dataMinWeight) {
                    context._dataMinWeight = item.weight;
                }
                if (!context._dataMaxWeight || item.weight > context._dataMaxWeight) {
                    context._dataMaxWeight = item.weight;
                }
            });
        }
        return retVal;
    };

    ChoroplethCountries.prototype.enter = function (domNode, element) {
        Choropleth.prototype.enter.apply(this, arguments);
        element.classed("map_Choropleth", true);    

        this.projection(this._world_projection);

        var context = this
        this.lookup = {};
        var countryArray = topojson.feature(countries.topology, countries.topology.objects.countries).features.map(function (item) {
            item.category = "Country";
            if (countries.countryNames[item.id]) {
                item.name = countries.countryNames[item.id].name;
                context.lookup[item.name] = item;
            }
            return item;
        });
        var choroPaths = this._svg.selectAll("path").data(countryArray);

        //  Enter  ---
        this.choroPaths = choroPaths.enter().append("path")
            .attr("d", this.d3Path)
            .on("click", function (d) {
                var code = countries.countryNames[d.id];
                if (context._dataMap[code]) {
                    context.click(context.rowToObj(context._dataMap[code]), "weight");
                }
            })
            .on("dblclick", function (d) {
                d3.event.stopPropagation();
                context.zoomToFit(context.active === this ? null : this, 750);
                context.active = this;
            })
            .attr("id", function (d) {
                return d.id;
            })
        ;
        this.choroPaths
            .append("title")
        ;
    };

    ChoroplethCountries.prototype.update = function (domNode, element) {
        Choropleth.prototype.update.apply(this, arguments);
        this.projection(this._world_projection);

        var context = this;

        //  Update  ---
        this.transition.apply(this.choroPaths)
            .style("fill", function (d) {
                var code = d.id;
                var weight = context._dataMap[code];
                if (weight === undefined) {
                    return "url(#hash)";
                }
                return context._palette(weight, context._dataMinWeight, context._dataMaxWeight);
            })
        ;

        this.choroPaths.select("title")
            .text(function (d) {
                var code = countries.countryNames[d.id];
                if (countries.countryNames[d.id]) {
                    return countries.countryNames[d.id].name + " (" + context._dataMap[code] + ")";
                }
                return "";
            })
        ;
    };

    return ChoroplethCountries;
}));
