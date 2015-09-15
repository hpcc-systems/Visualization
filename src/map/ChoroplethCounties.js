"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./Choropleth", "topojson", "./us-counties"], factory);
    } else {
        root.map_ChoroplethCounties = factory(root.d3, root.map_Choropleth, root.topojson, root.map_usCounties);
    }
}(this, function (d3, Choropleth, topojson, usCounties) {
    function ChoroplethCounties() {
        Choropleth.call(this);

        this.projection("albersUsaPr");
    }
    ChoroplethCounties.prototype = Object.create(Choropleth.prototype);
    ChoroplethCounties.prototype.constructor = ChoroplethCounties;
    ChoroplethCounties.prototype._class += " map_ChoroplethCounties";

    ChoroplethCounties.prototype.enter = function (domNode, element) {
        Choropleth.prototype.enter.apply(this, arguments);
        element.classed("map_Choropleth", true);

        var choroPaths = this._svg.selectAll("path").data(topojson.feature(usCounties.topology, usCounties.topology.objects.counties).features);

        //  Enter  ---
        var context = this;
        this.choroPaths = choroPaths.enter().append("path")
            .call(this._selection.enter.bind(this._selection))
            .on("click", function (d) {
                if (context._dataMap[d.id]) {
                    context.click(context.rowToObj(context._dataMap[d.id]), "weight", context._selection.selected(this));
                }
            })
            .on("dblclick", function (d) {
                d3.event.stopPropagation();
                context.zoomToFit(context.active === this ? null : this, 750);
                context.active = this;
            })
            .on("mouseover.tooltip", function (d) {
                context.tooltipShow([usCounties.countyNames[d.id], context._dataMap[d.id] ? context._dataMap[d.id][1] : "N/A"], context.columns(), 1);
            })
            .on("mouseout.tooltip", function (d) {
                context.tooltipShow();
            })
            .on("mousemove.tooltip", function (d) {
                context.tooltipShow([usCounties.countyNames[d.id], context._dataMap[d.id] ? context._dataMap[d.id][1] : "N/A"], context.columns(), 1);
            })
        ;
    };

    ChoroplethCounties.prototype.update = function (domNode, element) {
        Choropleth.prototype.update.apply(this, arguments);

        //console.time("ChoroplethCounties.prototype.update");
        var context = this;
        //  Update  ---
        this.choroPaths
            .attr("d", this.d3Path)
            .style("fill", function (d) {
                var weight = context._dataMap[d.id] ? context._dataMap[d.id][1] : undefined;
                return weight === undefined ? "url(#hash)" : context._palette(weight, context._dataMinWeight, context._dataMaxWeight);
            })
        ;
        //console.timeEnd("ChoroplethCounties.prototype.update");
    };

    return ChoroplethCounties;
}));
