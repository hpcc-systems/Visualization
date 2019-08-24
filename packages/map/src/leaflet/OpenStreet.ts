import { Map, TileLayer as LeafletTileLayer } from "leaflet";
import { TileLayer } from "./TileLayer";

export class OpenStreetLayer extends TileLayer {

    constructor() {
        super();
    }

    attribution(): string {
        return "";
    }

    getMaxZoom(): number {
        return 18;
    }

    layerEnter(map: Map) {
        super.layerEnter(map);
        this.add(new LeafletTileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
            maxZoom: 18,
            id: "open.streets"
        } as any));
    }
}
OpenStreetLayer.prototype._class += " map_MapBoxLayer";
