(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "./Choropleth", "topojson/topojson", "./us-counties"], factory);
    } else {
        root.ChoroplethCounties = factory(root.d3, root.Choropleth, root.topojson, root.usCounties);
    }
}(this, function (d3, Choropleth, topojson, usCounties) {
    function ChoroplethCounties() {
        Choropleth.call(this);

        this._dataMap = {};
        this._dataMaxWeight = 0;
        this._dataMinWeight = 0;
    };
    ChoroplethCounties.prototype = Object.create(Choropleth.prototype);

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

    ChoroplethCounties.prototype.update = function (domNode, element) {
        Choropleth.prototype.update.apply(this, arguments);

        var context = this;

        var choroPaths = element.selectAll("path").data(topojson.feature(usCounties.topology, usCounties.topology.objects.counties).features)

        //  Enter  ---
        choroPaths.enter().append("path")
            .attr("d", this.d3Path)
            .on("click", function (d) {
                context.click({ county: d.id});
            })
            .attr("id", function (d) {
                return d.id;
            })
            .append("title")
        ;

        //  Update  ---
        this.transition.apply(choroPaths)
            .style("fill", function (d) {
                var code = d.id;
                var weight = context._dataMap[code];
                if (weight === undefined) {
                    return "url(#hash)";
                }
                return context.d3Color(context._dataMap[code]);
            })
        ;

        choroPaths.select("title")
            .text(function (d) {
                var code = usCounties.countyNames[d.id];
                return usCounties.countyNames[d.id].name + " (" + context._dataMap[code] + ")";
            })
        ;
    };

    return ChoroplethCounties;
}));
