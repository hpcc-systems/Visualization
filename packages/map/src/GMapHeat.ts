import { HeatMap } from "@hpcc-js/other";
import { GMap } from "./GMap";

export class GMapHeat extends GMap {
    constructor() {
        super();
    }

    enter() {
        super.enter.apply(this, arguments);
        const heat = new HeatMap();

        const origRender = heat.render;
        const context = this;
        heat.render = function (callback?): HeatMap {
            this.data(context.data().map(function (row) {
                const pos = context._viewportSurface.project(row[0], row[1]);
                return [pos.x, pos.y, row[4]];
            }));
            origRender.apply(this, arguments);
            return this;
        };

        this._viewportSurface.widget(heat);
    }
}
GMapHeat.prototype._class += " map_GMapHeat";
