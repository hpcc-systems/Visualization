"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "topojson", "./Choropleth", "require"], factory);
    } else {
        root.map_TopoJSONChoropleth = factory(root.d3, root.topojson, root.map_Choropleth, root.require);
    }
}(this, function (d3, topojson, Choropleth, require) {
    function TopoJSONChoropleth() {
        Choropleth.call(this);

        this.projection("mercator");
    }
    TopoJSONChoropleth.prototype = Object.create(Choropleth.prototype);
    TopoJSONChoropleth.prototype.constructor = TopoJSONChoropleth;
    TopoJSONChoropleth.prototype._class += " map_TopoJSONChoropleth";

    TopoJSONChoropleth.prototype.publish("region", "GB", "set", "Region Data", ["AT", "BE", "BG", "BR", "CHLI", "CY", "CZ", "DE", "DK", "EE", "ES", "FI", "FR", "GB", "GE", "GR", "HR", "HU", "IE", "IS", "IT", "KS", "LT", "LU", "LV", "MD", "MK", "MT", "ND", "NL", "NO", "PL", "PT", "RO", "RS", "SE", "SI", "SK", "UA"]);

    TopoJSONChoropleth.prototype.layerEnter = function (base, svgElement, domElement) {
        Choropleth.prototype.layerEnter.apply(this, arguments);

        this._selection.widgetElement(this._choroplethData);
        this.choroPaths = d3.select(null);

        var context = this;
        this
            .tooltipHTML(function (d) {
                var columns = context.columns();
                var series = columns && columns.length ? columns[0] : "Location";
                var origData = d && d.length ? d[d.length - 1] : [""];
                return context.tooltipFormat({ label: origData[0], series: series, value: d[1] });
            })
        ;
    };

    TopoJSONChoropleth.prototype.layerUpdate = function (base) {
        Choropleth.prototype.layerUpdate.apply(this, arguments);
        var data = [];
        var context = this;
        this.data().forEach(function (row) {
            if (isNaN(row[0])) {
                for (var key in context._choroTopologyIndex) {
                    for (var key2 in context._choroTopologyIndex[key]) {
                        if (key2 === row[0]) {
                            context._choroTopologyIndex[key][key2].forEach(function (idx) {
                                data.push([idx].concat(row.filter(function (d, i) { return i > 0; })).concat([row]));
                            });
                        }
                    }
                }
            } else {
                data.push(row.concat([row]));
            }
        });
        this.choroPaths = this._choroplethData.selectAll(".data").data(this.visible() ? data : [], function (d) { return d[0]; });
        this.choroPaths.enter().append("path")
            .attr("class", "data")
            .call(this._selection.enter.bind(this._selection))
            .on("click", function (d) {
                if (context._dataMap[d[0]]) {
                    context.click(context.rowToObj(context._dataMap[d[0]]), "weight", context._selection.selected(context));
                }
            })
            .on("dblclick", function (d) {
                if (context._dataMap[d[0]]) {
                    context.dblclick(context.rowToObj(context._dataMap[d[0]]), "weight", context._selection.selected(context));
                }
            })
            .on("mouseout.tooltip", this.tooltip.hide)
            .on("mousemove.tooltip", this.tooltip.show)
        ;
        this.choroPaths
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
        this.choroPaths.exit().remove();
    };

    TopoJSONChoropleth.prototype.layerPreRender = function () {
        if (this._prevRegion !== this.region()) {
            this._prevRegion = this.region();
            delete this._topoJsonPromise;
        }

        if (!this._topoJsonPromise) {
            var context = this;
            this._topoJsonPromise = new Promise(function (resolve, reject) {
                    require(["json!src/map/TopoJSON/" + context.region() + ".json"], function (region) {
                        context._choroTopology = region;
                        context._choroTopologyObjects = region.objects.PolbndA;
                        context._choroTopologyFeatures = topojson.feature(context._choroTopology, context._choroTopologyObjects).features;

                        require(["json!src/map/TopoJSON/" + context.region() + "_idx.json"], indexLoad, function (err) {
                            indexLoad({});
                        });

                        function indexLoad(index) {
                            context._choroTopologyIndex = index;
                            resolve();
                        }
                    });
            });
        }
        return this._topoJsonPromise;
    };

    return TopoJSONChoropleth;
}));