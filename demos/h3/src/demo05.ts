import { Leaflet } from "@hpcc-js/map";
import { geoToH3, h3ToGeoBoundary } from "h3-js";
import { zoomToResolution } from "./h3lib";
import { H3Polygons as BaseH3Polygons } from "./h3Polygons";

export class H3Polygons extends Leaflet.Leaflet {

    private _hexMap = new Leaflet.Polygons()
        .columns(["h3Idx", "polys", "weight"])
        .polygonColumn("polys")
        .weightColumn("weight")
        ;

    private _circleMap = new Leaflet.Circles()
        .columns(["latitude", "longitude"])
        .data([
            [32.69, -117.192040]
        ])
        .latitudeColumn("latitude")
        .longitudeColumn("longitude")
        .radius(.2)
        .on("moveEnd", () => {
            this.refreshHex();
        })
        ;

    constructor() {
        super();
        this
            .layers([new BaseH3Polygons().paletteID("Greys").opacity(0.1), this._hexMap, this._circleMap])
            .mapType("Google")
            .autoZoomToFit(false)
            .defaultLat(32.69)
            .defaultLong(-117.192040)
            .defaultZoom(21)
            ;
    }

    refreshHex() {
        const res = zoomToResolution(this.zoom());
        console.log(res);
        const boundaries = this._circleMap.data().map(row => {
            const h3Idx = geoToH3(row[0], row[1], res);
            return [h3Idx, h3ToGeoBoundary(h3Idx, false).map(point => [point[1], point[0]]), 1];
        });
        this._hexMap.data(boundaries);
        this.lazyRender();
    }
}
