import { Icon, Map } from "@hpcc-js/leaflet-shim";
import { Markers } from "./Markers";

export class Icons extends Markers {

    constructor(cluster = false) {
        super(cluster);
    }

    layerUpdate(map: Map) {
        const columns = this.columns();
        const iconUrlIdx = columns.indexOf(this.iconUrlColumn());
        super.layerUpdate(map, (row) => {
            return {
                icon: new Icon({
                    iconUrl: this.propValue(iconUrlIdx, row, this.iconUrl()),
                    iconSize: [this.iconWidth(), this.iconHeight()],
                    iconAnchor: [this.iconAnchorX(), this.iconAnchorY()],
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
Icons.prototype._class += " map_Icons";

export interface Icons {
    iconUrl(): string;
    iconUrl(_: string);
    iconUrl_exists(): boolean;
    iconUrlColumn(): string;
    iconUrlColumn(_: string);
    iconUrlColumn_exists(): boolean;
    iconWidth(): number;
    iconWidth(_: number);
    iconHeight(): number;
    iconHeight(_: number);
    iconAnchorX(): number;
    iconAnchorX(_: number);
    iconAnchorY(): number;
    iconAnchorY(_: number);
}

Icons.prototype.publish("iconUrl", "", "string", "Icon URL", null);
Icons.prototype.publish("iconUrlColumn", null, "set", "Icon URL column", function () { return this.columns(); }, { optional: true });
Icons.prototype.publish("iconWidth", 32, "number", "Icon width");
Icons.prototype.publish("iconHeight", 32, "number", "Icon height");
Icons.prototype.publish("iconAnchorX", 16, "number", "Icon Anchor X");
Icons.prototype.publish("iconAnchorY", 32, "number", "Icon Anchor Y");

export class ClusterIcons extends Icons {
    constructor() {
        super(true);
    }
}
ClusterIcons.prototype._class += " map_ClusterIcons";
