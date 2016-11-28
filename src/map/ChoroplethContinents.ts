import { ChoroplethCountries } from './ChoroplethCountries';

export function ChoroplethContinents() {
    ChoroplethCountries.call(this);

}
ChoroplethContinents.prototype = Object.create(ChoroplethCountries.prototype);
ChoroplethContinents.prototype.constructor = ChoroplethContinents;
ChoroplethContinents.prototype._class += " map_ChoroplethContinents";

ChoroplethContinents.prototype.layerEnter = function (base, svgElement, domElement) {
    ChoroplethCountries.prototype.layerEnter.apply(this, arguments);
    this._choroTopologyObjects = this._choroTopologyObjectsLand;
};
