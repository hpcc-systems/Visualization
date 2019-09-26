import * as _GoogleMapsLoader from "google-maps";

import { GoogleMutant, Map } from "@hpcc-js/leaflet-shim";
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

    getMaxZoom(): number {
        return 23;
    }

    layerEnter(map: Map) {
        super.layerEnter(map);
        this.add(new GoogleMutant({
            type: "roadmap",
            styles: this.googleMapStyles()
        }));
    }
}
GMapLayer.prototype._class += " map_GMapLayer";
export interface GMapLayer {
    googleMapStyles(): object;
    googleMapStyles(_: object): this;
}

GMapLayer.prototype.publish("googleMapStyles", {}, "object", "Styling for map colors etc", null, { tags: ["Basic"] });
