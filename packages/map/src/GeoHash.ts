import { Palette, Utility as CommonUtility } from "@hpcc-js/common";
import { select as d3Select } from "d3-selection";
import { Layer } from "./Layer";
import * as Utility from "./Utility";

import "../src/GeoHash.css";

export class GeoHash extends Layer {
    _palette;
    _dataMinWeight;
    _dataMaxWeight;
    geohash;
    _geoHashTransform;
    _selection;
    geoHashPaths;

    constructor() {
        super();
    }

    data(_?) {
        const retVal = Layer.prototype.data.apply(this, arguments);
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
    }

    layerEnter(base, svgElement, domElement) {
        Layer.prototype.layerEnter.apply(this, arguments);

        this.geohash = new Utility.Geohash();
        this._geoHashTransform = svgElement.append("g");
        this._selection = new CommonUtility.SimpleSelection(this._geoHashTransform);
        this.geoHashPaths = d3Select(null);
    }

    layerUpdate(base) {
        Layer.prototype.layerUpdate.apply(this, arguments);

        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }

        this._geoHashTransform.style("opacity", this.opacity());

        this.geoHashPaths = this._geoHashTransform.selectAll(".data").data(this.visible() ? this.data() : [], function (d) { return d[0]; });
        const context = this;
        this.geoHashPaths.enter().append("path")
            .attr("class", "data")
            .call(this._selection.enter.bind(this._selection))
            .on("click", function (d) {
                context.click(context.rowToObj(d), "weight", context._selection.selected(this));
            })
            .on("dblclick", function (d) {
                context.dblclick(context.rowToObj(d), "weight", context._selection.selected(this));
            })
            .merge(this.geoHashPaths)
            .attr("d", function (d) {
                const pos = context.geohash.bounds(d[0]);
                const route = {
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
                const retVal = context._palette(d[1], context._dataMinWeight, context._dataMaxWeight);
                return retVal;
            })
            ;
        this.geoHashPaths.exit().remove();
    }

    //  Events  ---
    click(row, column, selected) {
        console.log("Click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
    }

    dblclick(row, column, selected) {
        console.log("Double click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
    }

    paletteID_exists: () => boolean;
    useClonedPalette_exists: () => boolean;
    opacity_exists: () => boolean;
    meshVisible_exists: () => boolean;
    meshColor_exists: () => boolean;
    meshStrokeWidth_exists: () => boolean;
}
GeoHash.prototype._class += " map_GeoHash";

GeoHash.prototype._palette = Palette.rainbow("default");

export interface GeoHash {
    paletteID(): string;
    paletteID(_: string): this;
    useClonedPalette(): boolean;
    useClonedPalette(_: boolean): this;
    opacity(): number;
    opacity(_: number): this;
    meshVisible(): boolean;
    meshVisible(_: boolean): this;
    meshColor(): string;
    meshColor(_: string): this;
    meshStrokeWidth(): number;
    meshStrokeWidth(_: number): this;
}
GeoHash.prototype.publish("paletteID", "YlOrRd", "set", "Palette ID", GeoHash.prototype._palette.switch(), { tags: ["Basic", "Shared"] });
GeoHash.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette", null, { tags: ["Intermediate", "Shared"] });
GeoHash.prototype.publish("opacity", 1.0, "number", "Opacity", null, { tags: ["Advanced"] });
GeoHash.prototype.publish("meshVisible", true, "boolean", "Mesh Visibility");
GeoHash.prototype.publish("meshColor", null, "html-color", "Stroke Color", null, { optional: true });
GeoHash.prototype.publish("meshStrokeWidth", 0.25, "number", "Stroke Width");
