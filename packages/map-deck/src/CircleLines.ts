import { ArcLayer, ScatterplotLayer } from "@hpcc-js/deck-shim";
import { Common } from "./Common";

export class CircleLines extends Common {

    constructor() {
        super();
    }

    enter(domNode, element) {
        super.enter(domNode, element);
    }

    update(domNode, element) {
        super.update(domNode, element);

        const columns = this.columns();

        const latIdx = columns.indexOf(this.latitudeColumn());
        const longIdx = columns.indexOf(this.longtitudeColumn());
        const lat2Idx = columns.indexOf(this.latitude2Column());
        const long2Idx = columns.indexOf(this.longtitude2Column());

        this._deckgl.setProps({
            layers: [
                new ScatterplotLayer({
                    id: this.id() + "_points_from",
                    data: this.data(),
                    updateTriggers: {
                        getPosition: [latIdx, longIdx]
                    },
                    pickable: true,
                    opacity: 0.8,
                    stroked: true,
                    filled: true,
                    radiusScale: 6,
                    radiusMinPixels: 1,
                    radiusMaxPixels: 100,
                    lineWidthMinPixels: 1,
                    getPosition: f => [+f[longIdx], +f[latIdx]],
                    getRadius: d => 100,
                    getFillColor: d => [255, 140, 0],
                    getLineColor: d => [0, 0, 0],
                    onHover: ({ object, x, y }) => {
                    }
                }),
                new ScatterplotLayer({
                    id: this.id() + "_points_to",
                    data: this.data(),
                    updateTriggers: {
                        getPosition: [lat2Idx, long2Idx]
                    },
                    pickable: true,
                    opacity: 0.8,
                    stroked: true,
                    filled: true,
                    radiusScale: 6,
                    radiusMinPixels: 1,
                    radiusMaxPixels: 100,
                    lineWidthMinPixels: 1,
                    getPosition: f => [+f[long2Idx], +f[lat2Idx]],
                    getRadius: d => 100,
                    getFillColor: d => [255, 140, 0],
                    getLineColor: d => [0, 0, 0],
                    onHover: ({ object, x, y }) => {
                    }
                }),
                new ArcLayer({
                    id: this.id() + "_arcs",
                    data: this.data(),
                    updateTriggers: {
                        getSourcePosition: [latIdx, longIdx],
                        getTargetPosition: [lat2Idx, long2Idx]
                    },
                    getSourcePosition: f => [+f[longIdx], +f[latIdx]],
                    getTargetPosition: f => [+f[long2Idx], +f[lat2Idx]],
                    getSourceColor: [0, 128, 200],
                    getTargetColor: [200, 0, 80],
                    getWidth: 1
                })
            ]
        });
    }
}
CircleLines.prototype._class += " map-deck_CircleLines";

export interface CircleLines {
    latitudeColumn(): string;
    latitudeColumn(_: string): this;
    longtitudeColumn(): string;
    longtitudeColumn(_: string): this;
    latitude2Column(): string;
    latitude2Column(_: string): this;
    longtitude2Column(): string;
    longtitude2Column(_: string): this;
}

CircleLines.prototype.publish("latitudeColumn", null, "set", "Latitude column", function () { return this.columns(); }, { optional: true });
CircleLines.prototype.publish("longtitudeColumn", null, "set", "Longtitude column", function () { return this.columns(); }, { optional: true });
CircleLines.prototype.publish("latitude2Column", null, "set", "Latitude column", function () { return this.columns(); }, { optional: true });
CircleLines.prototype.publish("longtitude2Column", null, "set", "Longtitude column", function () { return this.columns(); }, { optional: true });
