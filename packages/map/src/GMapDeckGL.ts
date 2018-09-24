import { DeckGL } from "./DeckGL";
import { GMap } from "./GMap";

export class GMapDeckGL extends GMap {
    constructor() {
        super();
    }
    createCircle(lat, lng, circleObj: { radius?: number; fillColor?: string; strokeColor?: string }) {

    }
    enter() {
        GMap.prototype.enter.apply(this, arguments);
        const dgl = new DeckGL();

        const origRender = dgl.render;
        const context = this;
        dgl.render = function (callback?): DeckGL {
            this.data(context.data().map(function (row) {
                return row;
                // const pos1 = context._viewportSurface.project(row[0], row[1]);
                // const pos2 = context._viewportSurface.project(row[2], row[3]);
                // return [pos1.x, pos1.y, pos2.x, pos2.y, row[4]];
            }));
            origRender.apply(this, arguments);
            return this;
        };

        this._viewportSurface.widget(dgl);
    }
}
GMapDeckGL.prototype._class += " map_GMapDeckGL";
