import { LatLngBounds } from "@hpcc-js/leaflet-shim";
import { World } from "./World";

export class US extends World {

    constructor() {
        super();
    }

    getBounds() {
        const retVal = super.getBounds();
        return new LatLngBounds([retVal.getNorth(), retVal.getWest()], [17.755278, -64.565]);
    }

}
