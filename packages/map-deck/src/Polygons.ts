import { Palette } from "@hpcc-js/common";
import { PolygonLayer } from "@hpcc-js/deck-shim";
import { extent as d3Extent } from "d3-array";
import { rgb as d3Rgb } from "d3-color";
import { Common } from "./Common";

export class Polygons extends Common {

    constructor() {
        super();
    }

    _palette;
    layers(): any[] {
        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }

        const polyCol = this.polygonColumn();
        const weightCol = this.weightColumn();
        const polyFunc = this.cellFunc(polyCol, []);
        const weightFunc = this.cellFunc(weightCol, 0);

        const extent = d3Extent(this.data(), weightFunc);

        return [
            ...super.layers(),
            new PolygonLayer({
                id: this.id() + "_polygon",
                data: this.data(),
                updateTriggers: {
                    getPolygon: [polyCol],
                    getElevation: [weightCol],
                    getFillColor: [weightCol, this.paletteID(), this.opacity()],
                    getLineColor: [this.paletteID(), this.opacity()]
                },
                pickable: false,
                stroked: true,
                filled: true,
                wireframe: true,
                lineWidthMinPixels: 1,
                extruded: true,
                getPolygon: row => {
                    const points = polyFunc(row);
                    return points;
                },
                getElevation: row => weightFunc(row) * 1000,
                getFillColor: row => {
                    const color = this._palette(weightFunc(row), extent[0], extent[1]);
                    const c = d3Rgb(color);
                    return [c.r, c.g, c.b, 255 * this.opacity()];
                },
                getLineColor: () => {
                    const color = this._palette(extent[1], extent[0], extent[1]);
                    const c = d3Rgb(color);
                    return [c.r, c.g, c.b, 255 * this.opacity()];
                },
                getLineWidth: 1,
                onHover: ({ object, x, y }) => {
                }
            })
        ];
    }

    enter(domNode, element) {
        super.enter(domNode, element);
    }

    update(domNode, element) {
        super.update(domNode, element);
    }
}
Polygons.prototype._class += " map-deck_Polygons";
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
Polygons.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette");
Polygons.prototype.publish("polygonColumn", null, "set", "Polygon column", function () { return this.columns(); }, { optional: true });
Polygons.prototype.publish("weightColumn", null, "set", "Weight column", function () { return this.columns(); }, { optional: true });
Polygons.prototype.publish("opacity", 0.5, "number", "Opacity");
