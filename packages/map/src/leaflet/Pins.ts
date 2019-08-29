import { BeautifyIcon, Map } from "@hpcc-js/leaflet-shim";
import { Markers } from "./Markers";

export class Pins extends Markers {

    constructor(cluster = false) {
        super(cluster);
    }

    layerUpdate(map: Map) {
        const columns = this.columns();
        const faCharIdx = columns.indexOf(this.faCharColumn());
        const faCharColorIdx = columns.indexOf(this.faCharColorColumn());
        const strokeColorIdx = columns.indexOf(this.strokeColorColumn());
        const fillColorIdx = columns.indexOf(this.fillColorColumn());
        super.layerUpdate(map, (row) => {
            return {
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
            };
        });
    }
}
Pins.prototype._class += " map_Pins";

export interface Pins {
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
}

Pins.prototype.publish("faChar", "fa-circle", "string", "Default font awesome character");
Pins.prototype.publish("faCharColumn", null, "set", "Font awesome column", function () { return this.columns(); }, { optional: true });
Pins.prototype.publish("faCharColor", "#ffffff", "html-color", "Default  font awesome Color");
Pins.prototype.publish("faCharColorColumn", null, "set", "Font awesome color column", function () { return this.columns(); }, { optional: true });
Pins.prototype.publish("strokeColor", "transparent", "html-color", "Default stroke Color", null, { optional: true });
Pins.prototype.publish("strokeColorColumn", null, "set", "Stroke color column", function () { return this.columns(); }, { optional: true });
Pins.prototype.publish("fillColor", "#376cea", "html-color", "Default fill Color", null, { optional: true });
Pins.prototype.publish("fillColorColumn", null, "set", "Fill color column", function () { return this.columns(); }, { optional: true });

export class ClusterPins extends Pins {
    constructor() {
        super(true);
    }
}
ClusterPins.prototype._class += " map_ClusterPins";
