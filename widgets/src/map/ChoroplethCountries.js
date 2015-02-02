(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "./Choropleth", "topojson/topojson", "./countries", "./us-states"], factory);
    } else {
        root.ChoroplethCounties = factory(root.d3, root.Choropleth, root.topojson, root.countries, root.usStates);
    }
}(this, function (d3, Choropleth, topojson, countries, usStates) {
    function ChoroplethCounties() {
        Choropleth.call(this);
        this._class = "map_ChoroplethCountries";

        this._dataMap = {};
        this._dataMaxWeight = 0;
        this._dataMinWeight = 0;
        this.projection("orthographic");
    };
    ChoroplethCounties.prototype = Object.create(Choropleth.prototype);

    ChoroplethCounties.prototype.testData = function () {
        return this;
    },

    ChoroplethCounties.prototype.data = function (_) {
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

    ChoroplethCounties.prototype.enter = function (domNode, element) {
        Choropleth.prototype.enter.apply(this, arguments);
        element.classed("map_Choropleth", true);    

        this.lookup = {};
        var stateArray = topojson.feature(usStates.topology, usStates.topology.objects.states).features.map(function (item) {
            item.category = "State";
            item.name = usStates.stateNames[item.id].code;
            context.lookup[item.name] = item;
            return item;
        });
        var countryArray = topojson.feature(countries.topology, countries.topology.objects.countries).features.filter(function (item) {
            return (item.id !== 840);
        }).map(function (item) {
            item.category = "Country";
            if (countries.countryNames[item.id]) {
                item.name = countries.countryNames[item.id].name;
                context.lookup[item.name] = item;
            }
            return item;
        });
        this.ContriesStates = countryArray.concat(stateArray);

        var choroPaths = element.selectAll("path").data(this.ContriesStates);

        //  Enter  ---
        this.choroPaths = choroPaths.enter().append("path")
            .attr("d", this.d3Path)
            .on("click", function (d) {
                var code = countries.countryNames[d.id];
                context.click(context.rowToObj(context._dataMap[code]));
            })
            .attr("id", function (d) {
                return d.id;
            })
        ;
        this.choroPaths
            .append("title")
        ;
    };

    ChoroplethCounties.prototype.update = function (domNode, element) {
        Choropleth.prototype.update.apply(this, arguments);

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

    return ChoroplethCounties;
}));
