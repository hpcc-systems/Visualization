import { Leaflet } from "@hpcc-js/map";
import { h3ToGeoBoundary } from "h3-js";
import { polyfill, tidyLat, tidyLon, zoomToResolution } from "./h3lib";

export class H3Polygons extends Leaflet.Polygons {

    constructor() {
        super();
        this
            .columns(["h3Idx", "polys", "weight"])
            .mapType("Google")
            .polygonColumn("polys")
            .weightColumn("weight")
            .opacity(0.05)
            .autoZoomToFit(false)
            ;
    }

    zoomEnd(e) {
        super.zoomEnd(e);
        this.refresh();
    }

    moveEnd(e) {
        super.moveEnd(e);
        this.refresh();
    }

    private _prevBounds;
    refresh() {
        const bounds = this.visibleBounds();
        if (!this._prevBounds || !bounds.equals(this._prevBounds)) {
            this._prevBounds = bounds;
            console.log(bounds);
            const regions = polyfill([
                [tidyLat(bounds.getNorth()), tidyLon(bounds.getWest())],
                [tidyLat(bounds.getNorth()), tidyLon(bounds.getEast())],
                [tidyLat(bounds.getSouth()), tidyLon(bounds.getEast())],
                [tidyLat(bounds.getSouth()), tidyLon(bounds.getWest())],
                [tidyLat(bounds.getNorth()), tidyLon(bounds.getWest())]
            ], zoomToResolution(this.zoom()));
            const boundaries = regions.map(h3Idx => [h3Idx, h3ToGeoBoundary(h3Idx, false).map(point => [point[1], point[0]]), 1]);
            this.data(boundaries);
            this.lazyRender();
        }
    }

    render() {
        return super.render(() => {
            if (this.renderCount() === 1) {
                this.refresh();
            }
        });
    }
}
