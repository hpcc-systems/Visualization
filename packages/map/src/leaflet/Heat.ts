import * as L from "leaflet";
import { FeatureLayer } from "./FeatureLayer";
import { Heat as LHeat } from "./plugins/Heat";

export class Heat extends FeatureLayer {

    hasBounds(): boolean {
        return true;
    }

    layerUpdate(map: L.Map) {
        super.layerUpdate(map);
        this.style("opacity", this.opacity());
        const columns = this.columns();
        const latIdx = this.latitudeColumn_exists() ? columns.indexOf(this.latitudeColumn()) : 0;
        const longIdx = this.longtitudeColumn_exists() ? columns.indexOf(this.longtitudeColumn()) : 1;
        const weightIdx = columns.indexOf(this.weightColumn());
        this.clear();
        let bounds: L.LatLngBounds;
        const data = this.data().filter(row => !this.omitNullLatLong() || (!!row[latIdx] && !!row[longIdx])).map(row => {
            if (!bounds) {
                bounds = new L.LatLngBounds([row[latIdx], row[longIdx]]);
            } else {
                bounds.extend([row[latIdx], row[longIdx]]);
            }
            return [row[latIdx], row[longIdx], this.weightColumn_exists() ? row[weightIdx] : 0.5];
        });
        const heat = new LHeat(data, {
            minOpacity: this.minOpacity(),
            max: this.max(),
            radius: this.radius(),
            blur: this.blur(),
            gradient: this.gradient()
        });
        (heat as any).getBounds = () => bounds;
        this.add(heat);
    }
}
Heat.prototype._class += " map_Heat";

export interface Heat {
    latitudeColumn(): string;
    latitudeColumn(_: string);
    latitudeColumn_exists(): boolean;
    longtitudeColumn(): string;
    longtitudeColumn(_: string);
    longtitudeColumn_exists(): boolean;
    weightColumn(): string;
    weightColumn(_: string);
    weightColumn_exists(): boolean;
    omitNullLatLong(): boolean;
    omitNullLatLong(_: boolean);
    opacity(): number;
    opacity(_: number);
    minOpacity(): number;
    minOpacity(_: number);
    max(): number;
    max(_: number);
    radius(): number;
    radius(_: number);
    blur(): number;
    blur(_: number);
    gradient(): object;
    gradient(_: object);
}

Heat.prototype.publish("latitudeColumn", null, "set", "Latitude column", function () { return this.columns(); }, { optional: true });
Heat.prototype.publish("longtitudeColumn", null, "set", "Longtitude column", function () { return this.columns(); }, { optional: true });
Heat.prototype.publish("weightColumn", null, "set", "Optional normalized intensity (0 -> 1) ", function () { return this.columns(); }, { optional: true });
Heat.prototype.publish("omitNullLatLong", true, "boolean", "Remove lat=0,lng=0 from IconsData", null, { tags: ["Basic"] });
Heat.prototype.publish("opacity", 0.5, "number", "Layer Opacity");
Heat.prototype.publish("minOpacity", 0.5, "number", "The minimum opacity the heat will start at", null, { tags: ["Basic"] });
Heat.prototype.publish("max", 1, "number", "maximum point intensity, 1.0 by default", null, { tags: ["Basic"] });
Heat.prototype.publish("radius", 25, "number", "radius of each point of the heatmap, 25 by default", null, { tags: ["Basic"] });
Heat.prototype.publish("blur", 15, "number", "amount of blur, 15 by default", null, { tags: ["Basic"] });
Heat.prototype.publish("gradient", null, "object", "color gradient config", null, { tags: ["Basic"], optional: true });
