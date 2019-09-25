import { Map, Marker, point } from "@hpcc-js/leaflet-shim";
import { ClusterLayer } from "./FeatureLayer";

export class Markers extends ClusterLayer {

    constructor(cluster = false) {
        super(cluster);
    }

    hasBounds(): boolean {
        return true;
    }

    tooltipText(row: object, tooltip: string): string {
        return tooltip;
    }

    popupText(row: object, popup: string): string {
        return popup;
    }

    private _hashSum;
    layerUpdate(map: Map, markerOptions?: (row) => object) {
        super.layerUpdate(map);
        if (!markerOptions) return;

        const columns = this.columns();
        const latIdx = columns.indexOf(this.latitudeColumn());
        const longIdx = columns.indexOf(this.longtitudeColumn());
        const tooltipIdx = columns.indexOf(this.tooltipColumn());
        const popupIdx = columns.indexOf(this.popupColumn());
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
                        direction: this.tooltipDirection(),
                        offset: point(this.tooltipOffsetX(), this.tooltipOffsetY())
                    });
                }
                const popupText = this.popupText(this.rowToObj(row), this.propValue(popupIdx, row, ""));
                if (popupText) {
                    marker.bindPopup(popupText, {
                        offset: point(this.popupOffsetX(), this.popupOffsetY())
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
    tooltipDirection(): string;
    tooltipDirection(_: string);
    tooltipOffsetX(): number;
    tooltipOffsetX(_: number);
    tooltipOffsetY(): number;
    tooltipOffsetY(_: number);
    popupColumn(): string;
    popupColumn(_: string);
    popupColumn_exists(): boolean;
    popupOffsetX(): number;
    popupOffsetX(_: number);
    popupOffsetY(): number;
    popupOffsetY(_: number);
}

Markers.prototype.publish("latitudeColumn", null, "set", "Latitude column", function () { return this.columns(); }, { optional: true });
Markers.prototype.publish("longtitudeColumn", null, "set", "Longtitude column", function () { return this.columns(); }, { optional: true });
Markers.prototype.publish("omitNullLatLong", true, "boolean", "Remove lat=0,lng=0 from IconsData", null, { tags: ["Basic"] });
Markers.prototype.publish("tooltipColumn", null, "set", "Tooltip column", function () { return this.columns(); }, { optional: true });
Markers.prototype.publish("tooltipDirection", "auto", "set", "Tooltip direction", ["auto", "left", "top", "right", "bottom", "center"]);
Markers.prototype.publish("tooltipOffsetX", 0, "number", "Tooltip offset X");
Markers.prototype.publish("tooltipOffsetY", 0, "number", "Tooltip offset Y");
Markers.prototype.publish("popupColumn", null, "set", "Popup column", function () { return this.columns(); }, { optional: true });
Markers.prototype.publish("popupOffsetX", 0, "number", "Tooltip offset X");
Markers.prototype.publish("popupOffsetY", 0, "number", "Tooltip offset Y");
