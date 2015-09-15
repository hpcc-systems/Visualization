"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./Choropleth", "topojson", "./countries"], factory);
    } else {
        root.map_ChoroplethCountries = factory(root.d3, root.map_Choropleth, root.topojson, root.map_countries);
    }
}(this, function (d3, Choropleth, topojson, countries) {
    function ChoroplethCountries() {
        Choropleth.call(this);

        this._dataMap = {};
        this._dataMaxWeight = 0;
        this._dataMinWeight = 0;
        this.projection(this.worldProjection());
    }
    ChoroplethCountries.prototype = Object.create(Choropleth.prototype);
    ChoroplethCountries.prototype.constructor = ChoroplethCountries;
    ChoroplethCountries.prototype._class += " map_ChoroplethCountries";

    ChoroplethCountries.prototype.publish("worldProjection", "mercator", "set", "Map Projection", ["mercator", "orthographic"],{tags:["Private"]});

    ChoroplethCountries.prototype.data = function (_) {
        var retVal = Choropleth.prototype.data.apply(this, arguments);
        if (arguments.length) {
            this._dataMap = {};
            this._dataMinWeight = null;
            this._dataMaxWeight = null;

            var context = this;
            this.data().forEach(function (item) {
                context._dataMap[item.country] = item.weight;
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

        this.projection(this.worldProjection());

        var context = this;
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
            .call(this._selection.enter.bind(this._selection))
            .on("click", function (d) {
                if (context._dataMap[d.id]) {
                    var obj = [d.id, context._dataMap[d.id], d.name];
                    context.click(context.rowToObj(obj), "weight", context._selection.selected(this));
                }
            })
            .on("dblclick", function (d) {
                d3.event.stopPropagation();
                context.zoomToFit(context.active === this ? null : this, 750);
                context.active = this;
            })
            .on("mouseover.tooltip", function (d) {
                if (context._dataMap[d.id]) {
                    context.tooltipShow([d.name, context._dataMap[d.id]], context.columns(), 1);
                }
            })
            .on("mouseout.tooltip", function (d) {
                context.tooltipShow();
            })
            .on("mousemove.tooltip", function (d) {
                if (context._dataMap[d.id]) {
                    context.tooltipShow([d.name, context._dataMap[d.id]], context.columns(), 1);
                }
            })
            .attr("id", function (d) {
                return d.id;
            })
        ;
    };

    ChoroplethCountries.prototype.update = function (domNode, element) {
        Choropleth.prototype.update.apply(this, arguments);
        this.projection(this.worldProjection());

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
    };

    return ChoroplethCountries;
}));
