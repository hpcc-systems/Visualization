import { Map, Marker, point } from "leaflet";
import { ClusterLayer } from "./FeatureLayer";
import { BeautifyIcon } from "./plugins/BeautifyIcon";

export class Pins extends ClusterLayer {

    constructor(cluster = false) {
        super(cluster);
    }

    hasBounds(): boolean {
        return true;
    }

    private propValue(colIdx, row, defaultValue) {
        return (colIdx < 0 ? defaultValue : row[colIdx]) || defaultValue;
    }

    private _hashSum;
    layerUpdate(map: Map) {
        super.layerUpdate(map);

        const columns = this.columns();
        const latIdx = columns.indexOf(this.latitudeColumn());
        const longIdx = columns.indexOf(this.longtitudeColumn());
        const faCharIdx = columns.indexOf(this.faCharColumn());
        const faCharColorIdx = columns.indexOf(this.faCharColorColumn());
        const strokeColorIdx = columns.indexOf(this.strokeColorColumn());
        const fillColorIdx = columns.indexOf(this.fillColorColumn());
        const tooltipIdx = columns.indexOf(this.tooltipColumn());
        const dbChecksum = this._db.checksum();
        const hashSum = this.hashSum([], {
            dbChecksum
        });

        if (this._hashSum !== hashSum) {
            this._hashSum = hashSum;
            this.clear();
            this.data().filter(row => !this.omitNullLatLong() || (!!row[latIdx] && !!row[longIdx])).forEach(row => {
                const marker = new Marker([row[latIdx], row[longIdx]], {
                    icon: BeautifyIcon({
                        iconShape: "marker",
                        icon: this.propValue(faCharIdx, row, this.faChar()),
                        textColor: this.propValue(faCharColorIdx, row, this.faCharColor()),
                        borderColor: this.propValue(strokeColorIdx, row, this.strokeColor()),
                        backgroundColor: this.propValue(fillColorIdx, row, this.fillColor()),
                        props: {
                            owner: this,
                            row
                        }
                    }),
                    draggable: false
                } as any)
                    .on("click", e => this.clickHandler(e, marker, row))
                    ;
                if (tooltipIdx >= 0) {
                    marker.bindTooltip(this.propValue(tooltipIdx, row, ""), {
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
Pins.prototype._class += " map_Pins";

export interface Pins {
    latitudeColumn(): string;
    latitudeColumn(_: string);
    longtitudeColumn(): string;
    longtitudeColumn(_: string);
    omitNullLatLong(): boolean;
    omitNullLatLong(_: boolean);
    faChar(): string;
    faChar(_: string);
    faCharColumn(): string;
    faCharColumn(_: string);
    faCharColumn_exists(): boolean;
    faCharColor(): string;
    faCharColor(_: string);
    faCharColorColumn(): string;
    faCharColorColumn(_: string);
    faCharColorColumn_exists(): boolean;
    strokeColor(): string;
    strokeColor(_: string);
    strokeColorColumn(): string;
    strokeColorColumn(_: string);
    strokColorColumn_exists(): boolean;
    fillColor(): string;
    fillColor(_: string);
    fillColorColumn(): string;
    fillColorColumn(_: string);
    fillColorColumn_exists(): boolean;
    tooltipColumn(): string;
    tooltipColumn(_: string);
    tooltipColumn_exists(): boolean;
}

Pins.prototype.publish("latitudeColumn", null, "set", "Latitude column", function () { return this.columns(); }, { optional: true });
Pins.prototype.publish("longtitudeColumn", null, "set", "Longtitude column", function () { return this.columns(); }, { optional: true });
Pins.prototype.publish("omitNullLatLong", true, "boolean", "Remove lat=0,lng=0 from pinsData", null, { tags: ["Basic"] });
Pins.prototype.publish("faChar", "fa-circle", "string", "Default font awesome character");
Pins.prototype.publish("faCharColumn", null, "set", "Font awesome column", function () { return this.columns(); }, { optional: true });
Pins.prototype.publish("faCharColor", "#ffffff", "html-color", "Default  font awesome Color");
Pins.prototype.publish("faCharColorColumn", null, "set", "Font awesome color column", function () { return this.columns(); }, { optional: true });
Pins.prototype.publish("strokeColor", "transparent", "html-color", "Default stroke Color", null, { optional: true });
Pins.prototype.publish("strokeColorColumn", null, "set", "Stroke color column", function () { return this.columns(); }, { optional: true });
Pins.prototype.publish("fillColor", "#376cea", "html-color", "Default fill Color", null, { optional: true });
Pins.prototype.publish("fillColorColumn", null, "set", "Fill color column", function () { return this.columns(); }, { optional: true });
Pins.prototype.publish("tooltipColumn", null, "set", "Tooltip column", function () { return this.columns(); }, { optional: true });

export class ClusterPins extends Pins {
    constructor() {
        super(true);
    }
}
ClusterPins.prototype._class += " map_ClusterPins";
