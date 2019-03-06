import * as _GoogleMapsLoader from "google-maps";
import { Map } from "leaflet";
import { GoogleMutant } from "leaflet.gridlayer.googlemutant";
import { requireGoogleMap } from "../GMap";
import { TileLayer } from "./TileLayer";

declare const window: any;

export class GMapLayer extends TileLayer {

    constructor() {
        super();
    }

    init(): Promise<void> {
        if (!this._initPromise) {
            this._initPromise = requireGoogleMap();
        }
        return this._initPromise;
    }

    attribution(): string {
        return !window.__hpcc_mapbox_apikey ? "DEVELOPER USE ONLY (@hpcc-js)" : "";
    }

    layerEnter(map: Map) {
        super.layerEnter(map);
        this.add(new (GoogleMutant as any)({
            type: "roadmap",
            styles: this.googleMapStyles()
        }));
    }
}
GMapLayer.prototype._class += " map_MapBoxLayer";
export interface GMapLayer {
    googleMapStyles(): object;
    googleMapStyles(_: object): this;
}

GMapLayer.prototype.publish("googleMapStyles", {}, "object", "Styling for map colors etc", null, { tags: ["Basic"] });
