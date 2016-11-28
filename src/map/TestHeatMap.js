import { Layered } from '../layout/Layered';

export function TestHeatMap(target) {
    Layered.call(this);
}
TestHeatMap.prototype = Object.create(Layered.prototype);
TestHeatMap.prototype.constructor = TestHeatMap;
TestHeatMap.prototype._class += " map_TestHeatMap";

