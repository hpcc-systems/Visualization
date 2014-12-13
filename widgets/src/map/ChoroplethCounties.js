(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "./Choropleth", "topojson/topojson", "./us-counties"], factory);
    } else {
        root.ChoroplethCounties = factory(root.d3, root.Choropleth, root.topojson, root.usCounties);
    }
}(this, function (d3, Choropleth, topojson, usCounties) {
    function ChoroplethCounties() {
        Choropleth.call(this);

        this.projection("albersUsaPr");
    };
    ChoroplethCounties.prototype = Object.create(Choropleth.prototype);

    ChoroplethCounties.prototype.enter = function (domNode, element) {
        Choropleth.prototype.enter.apply(this, arguments);
        var choroPaths = this._svg.selectAll("path").data(topojson.feature(usCounties.topology, usCounties.topology.objects.counties).features)

        //  Enter  ---
        var context = this;
        this.choroPaths = choroPaths.enter().append("path")
            .on("click", function (d) {
                if (context._dataMap[d.id]) {
                    context.click(context.rowToObj(context._dataMap[d.id]));
                }
            })
            .on("dblclick", function (d) {
                context.zoomToPath(this, d, 0.1);
            })
        ;
        this.choroPaths
            .append("title")
        ;
    };

    ChoroplethCounties.prototype.update = function (domNode, element) {
        Choropleth.prototype.update.apply(this, arguments);
        //console.time("ChoroplethCounties.prototype.update");
        var context = this;
        //  Update  ---
        this.choroPaths
            .attr("d", this.d3Path)
            .each(function (d) {
                var weight = context._dataMap[d.id] ? context._dataMap[d.id][1] : undefined;
                d3.select(this)
                    .style("fill", weight === undefined ? "url(#hash)" : context.d3Color(weight))
                    .select("title")
                    .text(usCounties.countyNames[d.id] + (weight === undefined ? "" : " (" + weight + ")"))
                ;
            })
        ;
        //console.timeEnd("ChoroplethCounties.prototype.update");
    };

    return ChoroplethCounties;
}));
