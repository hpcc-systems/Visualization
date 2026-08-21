import { Map, TileLayer as LeafletTileLayer } from "./leaflet-shim.ts";
import { TileLayer } from "./TileLayer.ts";

declare const window: any;

export class MapBoxLayer extends TileLayer {

    constructor() {
        super();
    }

    attribution(): string {
        return !window.__hpcc_mapbox_apikey ? "DEVELOPER USE ONLY (@hpcc-js)" : "";
    }

    getMaxZoom(): number {
        return 18;
    }

    layerEnter(map: Map) {
        super.layerEnter(map);
        if (!window.__hpcc_mapbox_apikey) {
            console.warn("__hpcc_mapbox_apikey does not contain a valid API key, reverting to developers key (expect limited performance)");
        }
        const hpcc_mapbox_apikey = window.__hpcc_mapbox_apikey || "";
        this.add(new LeafletTileLayer(`https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token=${hpcc_mapbox_apikey}`, {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: "streets-v11",
            accessToken: hpcc_mapbox_apikey
        } as any));
    }
}
MapBoxLayer.prototype._class += " map_MapBoxLayer";
