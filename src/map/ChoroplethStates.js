"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./Choropleth", "topojson", "./us-states"], factory);
    } else {
        root.map_ChoroplethStates = factory(root.d3, root.map_Choropleth, root.topojson, root.map_usStates);
    }
}(this, function (d3, Choropleth, topojson, usStates) {
    function ChoroplethStates() {
        Choropleth.call(this);

        this.projection("albersUsaPr");
    }
    ChoroplethStates.prototype = Object.create(Choropleth.prototype);
    ChoroplethStates.prototype.constructor = ChoroplethStates;
    ChoroplethStates.prototype._class += " map_ChoroplethStates";

    ChoroplethStates.prototype.enter = function (domNode, element) {
        Choropleth.prototype.enter.apply(this, arguments);
        element.classed("map_Choropleth", true);

        var choroPaths = this._svg.selectAll("path").data(topojson.feature(usStates.topology, usStates.topology.objects.states).features);

        //  Enter  ---
        var context = this;
        this.choroPaths = choroPaths.enter().append("path")
            .call(this._selection.enter.bind(this._selection))
            .on("click", function (d) {
                var code = usStates.stateNames[d.id].code;
                if (context._dataMap[code]) {
                    context.click(context.rowToObj(context._dataMap[code]), "weight", context._selection.selected(this));
                }
            })
            .on("dblclick", function (d) {
                d3.event.stopPropagation();
                context.zoomToFit(context.active === this ? null : this, 750);
                context.active = this;
            })
            .on("mouseover.tooltip", function (d) {
                var code = usStates.stateNames[d.id].code;
                context.tooltipShow([usStates.stateNames[d.id].name, context._dataMap[code] ? context._dataMap[code][1] : "N/A"], context.columns(), 1);
            })
            .on("mouseout.tooltip", function (d) {
                context.tooltipShow();
            })
            .on("mousemove.tooltip", function (d) {
                var code = usStates.stateNames[d.id].code;
                context.tooltipShow([usStates.stateNames[d.id].name, context._dataMap[code] ? context._dataMap[code][1] : "N/A"], context.columns(), 1);
            })
        ;
    };

    ChoroplethStates.prototype.update = function (domNode, element) {
        Choropleth.prototype.update.apply(this, arguments);
        //console.time("ChoroplethStates.prototype.update");
        var context = this;
        //  Update  ---
        this.choroPaths
            .attr("d", this.d3Path)
            .style("fill", function (d) {
                var code = usStates.stateNames[d.id].code;
                var weight = context._dataMap[code] ? context._dataMap[code][1] : undefined;
                return weight === undefined ? "url(#hash)" : context._palette(weight, context._dataMinWeight, context._dataMaxWeight);
            })
        ;
        //console.timeEnd("ChoroplethStates.prototype.update");
    };

    return ChoroplethStates;
}));
