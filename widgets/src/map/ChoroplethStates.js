(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "./Choropleth", "topojson/topojson", "./us-states"], factory);
    } else {
        root.ChoroplethStates = factory(root.d3, root.Choropleth, root.topojson, root.usStates);
    }
}(this, function (d3, Choropleth, topojson, usStates) {
    function ChoroplethStates() {
        Choropleth.call(this);
        this._class = "map_ChoroplethStates";

        this.projection("albersUsaPr");
    };
    ChoroplethStates.prototype = Object.create(Choropleth.prototype);

    ChoroplethStates.prototype.enter = function (domNode, element) {
        Choropleth.prototype.enter.apply(this, arguments);
        element.classed("map_Choropleth", true);

        var choroPaths = this._svg.selectAll("path").data(topojson.feature(usStates.topology, usStates.topology.objects.states).features)

        //  Enter  ---
        var context = this;
        this.choroPaths = choroPaths.enter().append("path")
            .on("click", function (d) {
                var code = usStates.stateNames[d.id].code;
                if (context._dataMap[code]) {
                    context.click(context.rowToObj(context._dataMap[code]), "weight");
                }
            })
            .on("dblclick", function (d) {
                context.zoomToPath(this, d);
            })
        ;
        this.choroPaths
            .append("title")
        ;
    };

    ChoroplethStates.prototype.update = function (domNode, element) {
        Choropleth.prototype.update.apply(this, arguments);
        //console.time("ChoroplethStates.prototype.update");
        var context = this;
        //  Update  ---
        this.transition.apply(this.choroPaths)
            .attr("d", this.d3Path)
            .each(function (d) {
                var code = usStates.stateNames[d.id].code;
                var weight = context._dataMap[code] ? context._dataMap[code][1] : undefined;
                d3.select(this)
                    .style("fill", weight === undefined ? "url(#hash)" : context._palette(weight, context._dataMinWeight, context._dataMaxWeight))
                    .select("title")
                    .text(usStates.stateNames[d.id].name + (weight === undefined ? "" : " (" + weight + ")"))
                ;
            })
        ;
        //console.timeEnd("ChoroplethStates.prototype.update");
    };

    return ChoroplethStates;
}));
