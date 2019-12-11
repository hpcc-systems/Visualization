import { ArcLayer, ScatterplotLayer } from "@hpcc-js/deck-shim";
import { Common } from "./Common";

export class CircleLines extends Common {

    constructor() {
        super();
    }

    layers(): any[] {
        const latCol = this.latitudeColumn();
        const longCol = this.longitudeColumn();
        const lat2Col = this.latitude2Column();
        const long2Col = this.longitude2Column();

        const latFunc = this.cellFunc(latCol, 0);
        const longFunc = this.cellFunc(longCol, 0);
        const longLatFunc = row => [+longFunc(row), +latFunc(row)];
        const lat2Func = this.cellFunc(lat2Col, 0);
        const long2Func = this.cellFunc(long2Col, 0);
        const longLat2Func = row => [+long2Func(row), +lat2Func(row)];

        return [
            ...super.layers(),
            new ScatterplotLayer({
                id: this.id() + "_points_from",
                data: this.data(),
                updateTriggers: {
                    getPosition: [latCol, longCol]
                },
                pickable: true,
                opacity: 0.8,
                stroked: true,
                filled: true,
                radiusScale: 6,
                radiusMinPixels: 1,
                radiusMaxPixels: 100,
                lineWidthMinPixels: 1,
                getPosition: longLatFunc,
                getRadius: row => 100,
                getFillColor: row => [255, 140, 0],
                getLineColor: row => [0, 0, 0],
                onHover: ({ object, x, y }) => {
                }
            }),
            new ScatterplotLayer({
                id: this.id() + "_points_to",
                data: this.data(),
                updateTriggers: {
                    getPosition: [lat2Col, long2Col]
                },
                pickable: true,
                opacity: 0.8,
                stroked: true,
                filled: true,
                radiusScale: 6,
                radiusMinPixels: 1,
                radiusMaxPixels: 100,
                lineWidthMinPixels: 1,
                getPosition: longLat2Func,
                getRadius: row => 100,
                getFillColor: row => [255, 140, 0],
                getLineColor: row => [0, 0, 0],
                onHover: ({ object, x, y }) => {
                }
            }),
            new ArcLayer({
                id: this.id() + "_arcs",
                data: this.data(),
                updateTriggers: {
                    getSourcePosition: [latCol, longCol],
                    getTargetPosition: [lat2Col, long2Col]
                },
                getSourcePosition: longLatFunc,
                getTargetPosition: longLat2Func,
                getSourceColor: [0, 128, 200],
                getTargetColor: [200, 0, 80],
                getWidth: 1
            })
        ];
    }

    enter(domNode, element) {
        super.enter(domNode, element);
    }

    update(domNode, element) {
        super.update(domNode, element);
    }
}
CircleLines.prototype._class += " map-deck_CircleLines";

export interface CircleLines {
    latitudeColumn(): string;
    latitudeColumn(_: string): this;
    longitudeColumn(): string;
    longitudeColumn(_: string): this;
    latitude2Column(): string;
    latitude2Column(_: string): this;
    longitude2Column(): string;
    longitude2Column(_: string): this;
}

CircleLines.prototype.publish("latitudeColumn", null, "set", "Latitude column", function () { return this.columns(); }, { optional: true });
CircleLines.prototype.publish("longitudeColumn", null, "set", "Longitude column", function () { return this.columns(); }, { optional: true });
CircleLines.prototype.publish("latitude2Column", null, "set", "Latitude column", function () { return this.columns(); }, { optional: true });
CircleLines.prototype.publish("longitude2Column", null, "set", "Longitude column", function () { return this.columns(); }, { optional: true });
