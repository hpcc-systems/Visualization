"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "topojson", "./Choropleth", "../common/Utility", "require"], factory);
    } else {
        root.map_TopoJSONChoropleth = factory(root.d3, root.topojson, root.map_Choropleth, root.common_Utility, root.require);
    }
}(this, function (d3, topojson, Choropleth, Utility, require) {
    function TopoJSONChoropleth() {
        Choropleth.call(this);

        this.projection("mercator");
    }
    TopoJSONChoropleth.prototype = Object.create(Choropleth.prototype);
    TopoJSONChoropleth.prototype.constructor = TopoJSONChoropleth;
    TopoJSONChoropleth.prototype._class += " map_TopoJSONChoropleth";

    TopoJSONChoropleth.prototype.publish("region", "GB", "set", "Region Data", ["AT", "BE", "BG", "CHLI", "CY", "CZ", "DE", "DK", "EE", "ES", "FI", "FR", "GB", "GE", "GR", "HR", "HU", "IE", "IS", "IT", "KS", "LT", "LU", "LV", "MD", "MK", "MT", "ND", "NL", "NO", "PL", "PT", "RO", "RS", "SE", "SI", "SK", "UA"]);

    TopoJSONChoropleth.prototype.layerEnter = function (base, svgElement, domElement) {
        Choropleth.prototype.layerEnter.apply(this, arguments);

        this._topoJSONChoropleth = this._choroplethTransform.insert("g", ".mesh");
        this._selection = new Utility.SimpleSelection(this._topoJSONChoropleth);
        this.choroPaths = d3.select(null);
    };

    TopoJSONChoropleth.prototype.layerUpdate = function (base) {
        var context = this;
        return new Promise(function (resolve, reject) {
            if (context._prevRegion !== context.region()) {
                context._prevRegion = context.region();
                require(["json!src/map/TopoJSON/" + context.region() + ".json"], function (region) {
                    context._choroTopology = region;
                    context._choroTopologyObjects = region.objects.PolbndA;
                    context._choroTopologyFeatures = topojson.feature(context._choroTopology, context._choroTopologyObjects).features;

                    require(["json!src/map/TopoJSON/" + context.region() + "_idx.json"], indexLoad, function (err) {
                        indexLoad({});
                    });
                    function indexLoad(index) {
                        context._choroTopologyIndex = index;
                        Choropleth.prototype.layerUpdate.call(context, base, true);
                        resolve();
                    }
                });
            } else {
                Choropleth.prototype.layerUpdate.call(context, base);
                resolve();
            }
        }).then(function () {
            var data = [];
            context.data().forEach(function (row) {
                if (isNaN(row[0])) {
                    for (var key in context._choroTopologyIndex) {
                        for (var key2 in context._choroTopologyIndex[key]) {
                            if (key2 === row[0]) {
                                context._choroTopologyIndex[key][key2].forEach(function (idx) {
                                    data.push([idx].concat(row.filter(function (d, i) { return i > 0; })));
                                });
                            }
                        }
                    }
                } else {
                    data.push(row);
                }
            });
            context.choroPaths = context._topoJSONChoropleth.selectAll(".data").data(context.visible() ? data : [], function (d) { return d[0]; });
            context.choroPaths.enter().append("path")
                .attr("class", "data")
                .call(context._selection.enter.bind(context._selection))
                .on("click", function (d) {
                    if (context._dataMap[d[0]]) {
                        context.click(context.rowToObj(context._dataMap[d[0]]), "weight", context._selection.selected(context));
                    }
                })
                .on("mouseover.tooltip", function (d) {
                    context.tooltipShow([d[0], d[1]], context.columns(), 1);
                })
                .on("mouseout.tooltip", function (d) {
                    context.tooltipShow();
                })
                .on("mousemove.tooltip", function (d) {
                    context.tooltipShow([d[0], d[1]], context.columns(), 1);
                })
            ;
            context.choroPaths
                .attr("d", function (d) {
                    var retVal = base._d3GeoPath(context._choroTopologyFeatures[d[0]]);
                    if (!retVal) {
                        console.log("Unknown Country:  " + d);
                    }
                    return retVal;
                })
                .style("fill", function (d) {
                    var retVal = context._palette(d[1], context._dataMinWeight, context._dataMaxWeight);
                    return retVal;
                })
            ;
            context.choroPaths.exit().remove();
        });
    };

    return TopoJSONChoropleth;
}));