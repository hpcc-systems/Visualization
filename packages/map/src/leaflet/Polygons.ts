import { extent as d3Extent, Palette } from "@hpcc-js/common";
import { LeafletEvent, Map, Polygon } from "@hpcc-js/leaflet-shim";
import { FeatureLayer } from "./FeatureLayer.ts";

function lngLat2LatLng(d: [number, number]): [number, number] {
    return [d[1], d[0]];
}

type Lat = number;
type Lon = number;
type Point = [Lon, Lat];

type Spread = [number, number];
const calcSpread = (prev: Spread, p: Point): Spread => {
    if (p[0] < -90) prev[0]++;
    else if (p[0] > 90) prev[1]++;
    return prev;
};

const shiftLeft = (lng: number): number => lng > 90 ? lng - 360 : lng;
const shiftRight = (lng: number): number => lng < -90 ? lng + 360 : lng;
const shiftPoint = (left: boolean): (p: Point) => Point => {
    const shiftFunc = left ? shiftLeft : shiftRight;
    return (p: Point) => [shiftFunc(p[0]), p[1]];
};

export class Polygons extends FeatureLayer {

    _palette;

    protected fixDateLine(points: Point[]): Point[] {
        const [lhsCount, rhsCount] = points.reduce(calcSpread, [0, 0]);
        if (lhsCount && rhsCount) {
            return points.map(shiftPoint(lhsCount > rhsCount));
        }
        return points;
    }

    hasBounds(): boolean {
        return true;
    }

    updateHexagons() {
        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }

        const polyFunc = this.cellFunc(this.polygonColumn(), []);
        const weightFunc = this.cellFunc(this.weightColumn(), 0);

        const data = this.data();

        const extent = d3Extent(data, weightFunc);

        this.clear();
        data.forEach(row => {
            this.add(new Polygon(this.fixDateLine(polyFunc(row)).map(lngLat2LatLng), {
                color: this._palette(extent[1], extent[0], extent[1]),
                fillColor: this._palette(weightFunc(row), extent[0], extent[1]),
                fillOpacity: this.opacity(),
                weight: 1,
                origRow: row
            } as any).on("click", e => this.clickHandler(e, row)));
        });
    }

    layerUpdate(map: Map) {
        super.layerUpdate(map);
        this.updateHexagons();
    }

    //  Events  ---
    zoomEnd(e: LeafletEvent) {
        super.zoomEnd(e);
        // this.updateHexagons();
    }

    moveEnd(e: LeafletEvent) {
        super.moveEnd(e);
        this.updateHexagons();
    }

    clickHandler(e, row) {
    }
}
Polygons.prototype._class += " map_Polygons";
Polygons.prototype._palette = Palette.rainbow("default");

export interface Polygons {
    paletteID(): string;
    paletteID(_: string): this;
    paletteID_exists(): boolean;
    useClonedPalette(): boolean;
    useClonedPalette(_: boolean): this;
    useClonedPalette_exists(): boolean;

    polygonColumn(): string;
    polygonColumn(_: string): this;
    weightColumn(): string;
    weightColumn(_: string): this;

    opacity(): number;
    opacity(_: number): this;
    opacity_default(_: number): this;
    opacity_exists(): boolean;
}

Polygons.prototype.publish("paletteID", "YlOrRd", "set", "Color palette for this widget", Polygons.prototype._palette.switch(), { tags: ["Basic", "Shared"] });
Polygons.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette", null, { tags: ["Intermediate", "Shared"] });
Polygons.prototype.publish("polygonColumn", null, "set", "Polygon column", function () { return this.columns(); }, { optional: true });
Polygons.prototype.publish("weightColumn", null, "set", "Weight column", function () { return this.columns(); }, { optional: true });
Polygons.prototype.publish("opacity", 0.5, "number", "Opacity", null, { tags: ["Advanced"] });
