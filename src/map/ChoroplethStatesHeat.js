import { Layered } from '../layout/Layered';

export function ChoroplethStatesHeat(target) {
    Layered.call(this);
}
ChoroplethStatesHeat.prototype = Object.create(Layered.prototype);
ChoroplethStatesHeat.prototype.constructor = ChoroplethStatesHeat;
ChoroplethStatesHeat.prototype._class += " map_ChoroplethStatesHeat";
