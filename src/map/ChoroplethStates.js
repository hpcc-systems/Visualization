"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "topojson", "./Choropleth", "require"], factory);
    } else {
        root.map_ChoroplethStates = factory(root.d3, root.topojson, root.map_Choropleth, root.require);
    }
} (this, function (d3, topojson, Choropleth, require) {
    var usStates = null;
    var features = null;
    var rFeatures = null;

    function ChoroplethStates() {
        Choropleth.call(this);

        this.projection("albersUsaPr");
    }
    ChoroplethStates.prototype = Object.create(Choropleth.prototype);
    ChoroplethStates.prototype.constructor = ChoroplethStates;
    ChoroplethStates.prototype._class += " map_ChoroplethStates";

    ChoroplethStates.prototype.layerEnter = function (base, svgElement, domElement) {
        Choropleth.prototype.layerEnter.apply(this, arguments);
        this._choroTopology = usStates.topology;
        this._choroTopologyObjects = usStates.topology.objects.states;

        this._selection.widgetElement(this._choroplethData);
        this.choroPaths = d3.select(null);
        var context = this;
        this
            .tooltipHTML(function (d) {
                var code = rFeatures[d[0]].id;
                return context.tooltipFormat({ label: usStates.stateNames[code].name, value: d[1] });
            })
            ;
    };

    ChoroplethStates.prototype.layerUpdate = function (base) {
        Choropleth.prototype.layerUpdate.apply(this, arguments);

        this.choroPaths = this._choroplethData.selectAll(".data").data(this.visible() ? this.data() : [], function (d) { return d[0]; });
        var context = this;
        this.choroPaths.enter().append("path")
            .attr("class", "data")
            .call(this._selection.enter.bind(this._selection))
            .on("click", function (d) {
                context.click(context.rowToObj(d), "weight", context._selection.selected(this));
            })
            .on("dblclick", function (d) {
                context.dblclick(context.rowToObj(d), "weight", context._selection.selected(this));
            })
            .on("mouseout.tooltip", this.tooltip.hide)
            .on("mousemove.tooltip", this.tooltip.show)
            ;
        this.choroPaths
            .attr("d", function (d) {
                var retVal = base._d3GeoPath(rFeatures[d[0]]);
                if (!retVal) {
                    console.log("Unknown US State:  " + d);
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

    ChoroplethStates.prototype.layerPreRender = function () {
        if (!this._topoJsonPromise) {
            this._topoJsonPromise = new Promise(function (resolve, reject) {
                if (usStates) {
                    resolve();
                }
                require(["json!src/map/TopoJSON/us-states.json"], function (_usStates) {
                    usStates = _usStates;
                    features = topojson.feature(usStates.topology, usStates.topology.objects.states).features;
                    rFeatures = {};
                    for (var key in features) {
                        if (features[key].id) {
                            rFeatures[usStates.stateNames[features[key].id].code] = features[key];
                        }
                    }
                    resolve();
                });
            });
        }
        return this._topoJsonPromise;
    };

    return ChoroplethStates;
}));