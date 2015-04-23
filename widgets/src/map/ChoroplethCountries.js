"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "./Choropleth", "topojson/topojson", "./countries"], factory);
    } else {
        root.map_ChoroplethCountries = factory(root.d3, root.map_Choropleth, root.topojson, root.countries);
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
        
        var nameCodeMap = {};
        for (var key in countries.countryNames) {
            var item = countries.countryNames[key];
            nameCodeMap[item.name] = key;
        }

        var rawData = [
            { "country": 840, "name": "United States", "weight": 29.946185501741 },{ "country": 156, "name": "China", "weight": 229.946185501741 }
        ];
        
        var rawData = [
            { "name": "United States", "data": 29.946185501741 },{ "name": "China", "data": 229.946185501741 }
        ];
        
        this.columns(["Country", "Weight", "Data", "Label"]);
        
        var countryData = rawData.map(function (item) {
            return { "country": nameCodeMap[item.name], "weight": item.weight, "data": item.data, "label":item.name };
        });
        
        this.data(countryData);
        
        return this;
    };

    ChoroplethCountries.prototype.data = function (_) {
        var retVal = Choropleth.prototype.data.apply(this, arguments);
        if (arguments.length) {
            this._dataMap = {};
            this._dataMinData = null;
            this._dataMaxData = null;

            var context = this;
            this._data.forEach(function (item) {
               
                context._dataMap[item.country] = item.data;
                if (!context._dataMinData || item.data < context._dataMinData) {
                    context._dataMinData = item.data;
                }
                if (!context._dataMaxData || item.data > context._dataMaxData) {
                    context._dataMaxData = item.data;
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
                if (context._dataMap[d.id]) {
                    var obj = [d.id, d.name, context._dataMap[d.id]];
                    context.click(context.rowToObj(obj), "data");
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
                return context._palette(weight, context._dataMinData, context._dataMaxData);
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
