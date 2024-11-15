import { LatLngBounds } from "./leaflet-shim.ts";
import { World } from "./World.ts";

export class US extends World {

    constructor() {
        super();
    }

    getBounds() {
        const retVal = super.getBounds();
        return new LatLngBounds([retVal.getNorth(), retVal.getWest()], [17.755278, -64.565]);
    }

}
