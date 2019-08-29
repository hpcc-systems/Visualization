import { Map, TileLayer as LeafletTileLayer } from "@hpcc-js/leaflet-shim";
import { TileLayer } from "./TileLayer";

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
        //  Default key should be in sync with packages/map-deck/src/Common.ts
        if (!window.__hpcc_mapbox_apikey) {
            console.warn("__hpcc_mapbox_apikey does not contain a valid API key, reverting to developers key (expect limited performance)");
        }
        const hpcc_mapbox_apikey = window.__hpcc_mapbox_apikey || "pk.eyJ1IjoibGVzY2htb28iLCJhIjoiY2psY2FqY3l3MDhqNDN3cDl1MzFmZnkwcCJ9.HRoFwmz1j80gyz18ruggqw";
        this.add(new LeafletTileLayer(`https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${hpcc_mapbox_apikey}`, {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: "mapbox.streets",
            accessToken: hpcc_mapbox_apikey
        } as any));
    }
}
MapBoxLayer.prototype._class += " map_MapBoxLayer";
