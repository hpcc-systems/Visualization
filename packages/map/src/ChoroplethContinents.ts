import { ChoroplethCountries } from "./ChoroplethCountries";

export class ChoroplethContinents extends ChoroplethCountries {
    constructor() {
        super();
    }

    layerEnter(base, svgElement, domElement) {
        ChoroplethCountries.prototype.layerEnter.apply(this, arguments);
        this._choroTopologyObjects = this._choroTopologyObjectsLand;
    }
}
ChoroplethContinents.prototype._class += " map_ChoroplethContinents";
