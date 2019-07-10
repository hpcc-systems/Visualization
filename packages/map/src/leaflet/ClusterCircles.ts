import { extent as d3Extent, Palette } from "@hpcc-js/common";
import { hsl as d3Hsl } from "d3-color";
import { format as d3Format } from "d3-format";
import { DivIcon, Map, Marker, Point } from "leaflet";
import { FeatureLayer } from "./FeatureLayer";

import "../../src/leaflet/ClusterCircles.css";

const format = d3Format(".2s");

export class ClusterCircles extends FeatureLayer {

    _palette;

    protected createIcon(childCount: number, backColor: string) {
        const borderColor = d3Hsl(backColor);
        borderColor.opacity = 0.5;
        return new DivIcon({
            className: "cluster-circle",
            iconSize: new Point(40, 40),
            html: `<div style='opacity:${this.opacity()};background-color:${borderColor.toString()}'><div style='background-color:${backColor}'><span style='color:${Palette.textColor(backColor)}'>${format(childCount)}</span></div></div>`
        });
    }

    layerUpdate(map: Map) {
        super.layerUpdate(map);
        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }

        const latFunc = this.cellFunc(this.latitudeColumn(), 0);
        const longFunc = this.cellFunc(this.longtitudeColumn(), 0);
        const latLongFunc = (row): [number, number] => [+latFunc(row), +longFunc(row)];
        const weightFunc = this.cellFunc(this.weightColumn(), 0);

        const data: any[][] = this.data();

        const extent = d3Extent(data, weightFunc);

        this.clear();
        data.forEach(row => {
            const circle = new Marker(latLongFunc(row), {
                icon: this.createIcon(weightFunc(row), this._palette(weightFunc(row), extent[0], extent[1])),
                origRow: row
            } as any).on("click", e => this.clickHandler(e, row));
            circle.bindTooltip("Weight:  " + weightFunc(row));
            this.add(circle);
        });
    }

    //  Events  ---
    clickHandler(e, row) {
    }
}
ClusterCircles.prototype._class += " map_ClusterCircles";
ClusterCircles.prototype._palette = Palette.rainbow("default");

export interface ClusterCircles {
    paletteID(): string;
    paletteID(_: string): this;
    paletteID_exists(): boolean;
    useClonedPalette(): boolean;
    useClonedPalette(_: boolean): this;
    useClonedPalette_exists(): boolean;

    latitudeColumn(): string;
    latitudeColumn(_: string): this;
    longtitudeColumn(): string;
    longtitudeColumn(_: string): this;
    weightColumn(): string;
    weightColumn(_: string): this;

    opacity(): number;
    opacity(_: number): this;
    opacity_default(_: number): this;
    opacity_exists(): boolean;
}

ClusterCircles.prototype.publish("paletteID", "YlOrRd", "set", "Color palette for this widget", ClusterCircles.prototype._palette.switch());
ClusterCircles.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette");
ClusterCircles.prototype.publish("latitudeColumn", null, "set", "Latitude column", function () { return this.columns(); }, { optional: true });
ClusterCircles.prototype.publish("longtitudeColumn", null, "set", "Longtitude column", function () { return this.columns(); }, { optional: true });
ClusterCircles.prototype.publish("weightColumn", null, "set", "Weight column", function () { return this.columns(); }, { optional: true });
ClusterCircles.prototype.publish("opacity", 0.66, "number", "Opacity", null, { tags: ["Advanced"] });
