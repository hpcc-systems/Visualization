import { Spacer, ToggleButton } from "@hpcc-js/common";
import { Leaflet } from "@hpcc-js/map";
import { compact, h3ToGeoBoundary } from "h3-js";
import { polyfill, zoomToResolution } from "./h3lib";

export class H3Region extends Leaflet.Leaflet {

    protected _hexMap = new Leaflet.Polygons()
        .columns(["h3Idx", "polys", "weight"])
        .polygonColumn("polys")
        .weightColumn("weight")
        ;

    protected _drawMap = new Leaflet.DrawLayer()
        .enableCircle(false)
        .enableRectangle(false)
        .enablePolyline(false)
        .on("changed", () => {
            this.changed();
        })
        ;

    protected _compactButton = new ToggleButton()
        .faChar("fa-compress")
        .tooltip("Compact")
        .on("click", () => {
            this.changed();
        })
        ;

    constructor() {
        super();
        this
            .layers([this._hexMap, this._drawMap])
            .mapType("Google")
            .autoZoomToFit(false)
            ;
        this._iconBar.buttons([this._compactButton, new Spacer(), ...this._iconBar.buttons()]);
    }

    fillPolygon(polygons: any[], doCompact: boolean = false) {
        this._hexMap.data([]);
        let boundaries = [];
        polygons.forEach(polys => {
            const h3Polys = (polys as any).map(poly => poly.map(p => [p.lat, p.lng]));
            let regions = polyfill(h3Polys[0], zoomToResolution(this._drawMap.zoom(), doCompact ? 2 : 1));
            if (doCompact) {
                regions = compact(regions);
            }
            boundaries = boundaries.concat(regions.map(h3Idx => [h3Idx, h3ToGeoBoundary(h3Idx, false).map(point => [point[1], point[0]]), 1]));
        });
        this._hexMap.data(boundaries);
        this.lazyRender();
    }

    changed() {
        this.fillPolygon(this._drawMap.save().polygons, this._compactButton.selected());
    }
}
