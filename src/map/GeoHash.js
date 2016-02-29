"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "topojson", "./Layer", "./Utility", "../common/Palette", "../common/Utility", "css!./GeoHash.css"], factory);
    } else {
        root.map_GeoHash = factory(root.d3, root.topojson, root.map_Layer, root.map_Utility, root.common_Palette, root.common_Utility);
    }
}(this, function (d3, topojson, Layer, Utility, Palette, CommonUtility) {
    function GeoHash() {
        Layer.call(this);
    }
    GeoHash.prototype = Object.create(Layer.prototype);
    GeoHash.prototype.constructor = GeoHash;
    GeoHash.prototype._class += " map_GeoHash";

    GeoHash.prototype._palette = Palette.rainbow("default");

    GeoHash.prototype.publish("paletteID", "YlOrRd", "set", "Palette ID", GeoHash.prototype._palette.switch(), { tags: ["Basic", "Shared"] });
    GeoHash.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette", null, { tags: ["Intermediate", "Shared"] });

    GeoHash.prototype.publish("opacity", 1.0, "number", "Opacity", null, { tags: ["Advanced"] });

    GeoHash.prototype.publish("meshVisible", true, "boolean", "Mesh Visibility");
    GeoHash.prototype.publish("meshColor", null, "html-color", "Stroke Color", null, { optional: true });
    GeoHash.prototype.publish("meshStrokeWidth", 0.25, "number", "Stroke Width");

    GeoHash.prototype.data = function (_) {
        var retVal = Layer.prototype.data.apply(this, arguments);
        if (arguments.length) {
            this._dataMinWeight = null;
            this._dataMaxWeight = null;

            this.data().forEach(function (item) {
                if (!this._dataMinWeight || item[1] < this._dataMinWeight) {
                    this._dataMinWeight = item[1];
                }
                if (!this._dataMaxWeight || item[1] > this._dataMaxWeight) {
                    this._dataMaxWeight = item[1];
                }
            }, this);
        }
        return retVal;
    };

    GeoHash.prototype.layerEnter = function (base, svgElement, domElement) {
        Layer.prototype.layerEnter.apply(this, arguments);

        this.geohash = new Utility.Geohash();
        this._geoHashTransform = svgElement.append("g");
        this._selection = new CommonUtility.SimpleSelection(this._geoHashTransform);
        this.geoHashPaths = d3.select(null);
    };

    GeoHash.prototype.layerUpdate = function (base) {
        Layer.prototype.layerUpdate.apply(this, arguments);

        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }

        this._geoHashTransform.style("opacity", this.opacity());

        this.geoHashPaths = this._geoHashTransform.selectAll(".data").data(this.visible() ? this.data() : [], function (d) { return d[0]; });
        var context = this;
        this.geoHashPaths.enter().append("path")
            .attr("class", "data")
            .call(this._selection.enter.bind(this._selection))
            .on("click", function (d) {
                context.click(context.rowToObj(d), "weight", context._selection.selected(this));
            })
        ;
        this.geoHashPaths
            .attr("d", function (d) {
                var pos = context.geohash.bounds(d[0]);
                var route = {
                    type: "LineString",
                    coordinates: [
                        [pos.sw.lon, pos.ne.lat],
                        [pos.ne.lon, pos.ne.lat],
                        [pos.ne.lon, pos.sw.lat],
                        [pos.sw.lon, pos.sw.lat]
                    ]
                };
                return base._d3GeoPath(route);
            })
            .style("fill", function (d) {
                var retVal = context._palette(d[1], context._dataMinWeight, context._dataMaxWeight);
                return retVal;
            })
        ;
        this.geoHashPaths.exit().remove();
    };

    GeoHash.prototype.layerZoomed = function (base) {
        Layer.prototype.layerZoomed.apply(this, arguments);
        this._geoHashTransform
            .attr("transform", "translate(" + base._zoom.translate() + ")scale(" + base._zoom.scale() + ")")
            .attr("stroke-width", 1.5 / base._zoom.scale() + "px")
        ;
    };

    //  Events  ---
    GeoHash.prototype.click = function (row, column, selected) {
        console.log("Click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
    };

    return GeoHash;
}));