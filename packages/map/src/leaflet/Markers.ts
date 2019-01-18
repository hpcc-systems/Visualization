import { Map, Marker, point } from "leaflet";
import { ClusterLayer } from "./FeatureLayer";

export class Markers extends ClusterLayer {

    constructor(cluster = false) {
        super(cluster);
    }

    hasBounds(): boolean {
        return true;
    }

    protected propValue(colIdx, row, defaultValue) {
        return (colIdx < 0 ? defaultValue : row[colIdx]) || defaultValue;
    }

    tooltipText(row: object, tooltip: string): string {
        return tooltip;
    }

    private _hashSum;
    layerUpdate(map: Map, markerOptions?: (row) => object) {
        super.layerUpdate(map);
        if (!markerOptions) return;

        const columns = this.columns();
        const latIdx = columns.indexOf(this.latitudeColumn());
        const longIdx = columns.indexOf(this.longtitudeColumn());
        const tooltipIdx = columns.indexOf(this.tooltipColumn());
        const dbChecksum = this._db.checksum();
        const hashSum = this.hashSum([], {
            dbChecksum
        });

        if (this._hashSum !== hashSum) {
            this._hashSum = hashSum;
            this.clear();
            this.data().filter(row => !this.omitNullLatLong() || (!!row[latIdx] && !!row[longIdx])).forEach(row => {
                const marker = new Marker([row[latIdx], row[longIdx]], markerOptions(row))
                    .on("click", e => this.clickHandler(e, marker, row))
                    ;
                const tooltipText = this.tooltipText(this.rowToObj(row), this.propValue(tooltipIdx, row, ""));
                if (tooltipText) {
                    marker.bindTooltip(tooltipText, {
                        direction: "top",
                        offset: point(0, -34)
                    });
                }
                this.add(marker);
            });
        }
    }

    _currSelRow;
    clickHandler(e, marker, row) {
        const sel = this._selection.click(marker._icon);
        this._currSelRow = sel ? row : undefined;
        this.click(this.rowToObj(row), "", sel);
    }

    //  Events  ---
    click(row, col, sel) {
    }
}
Markers.prototype._class += " map_Markers";

export interface Markers {
    latitudeColumn(): string;
    latitudeColumn(_: string);
    longtitudeColumn(): string;
    longtitudeColumn(_: string);
    omitNullLatLong(): boolean;
    omitNullLatLong(_: boolean);
    tooltipColumn(): string;
    tooltipColumn(_: string);
    tooltipColumn_exists(): boolean;
}

Markers.prototype.publish("latitudeColumn", null, "set", "Latitude column", function () { return this.columns(); }, { optional: true });
Markers.prototype.publish("longtitudeColumn", null, "set", "Longtitude column", function () { return this.columns(); }, { optional: true });
Markers.prototype.publish("omitNullLatLong", true, "boolean", "Remove lat=0,lng=0 from IconsData", null, { tags: ["Basic"] });
Markers.prototype.publish("tooltipColumn", null, "set", "Tooltip column", function () { return this.columns(); }, { optional: true });
