import { Query } from "@hpcc-js/comms";
import { Polygons } from "@hpcc-js/map-deck";
import { debounce, hashSum } from "@hpcc-js/util";
import { tidyLat, tidyLon, zoomToResolution2 } from "./h3lib";
import { connect } from "./util";

declare const espUrl: string;
const connection = connect(espUrl);
const summaryQuery = connection instanceof Query ? connection : undefined;

export class RoxieSummaryDeck extends Polygons {

    constructor() {
        super();
        this.columns(["polys", "weight"])
            .polygonColumn("polys")
            .weightColumn("weight")
            .opacity(0.75)
            .style("satellite-v9")
            .showBuildings(false)
            ;
    }

    syncMapbox(viewState) {
        super.syncMapbox(viewState);
        this.refresh();
    }

    private _prevBounds;
    private _prevResolution;
    refresh = debounce(async () => {
        const bounds = this.getBounds();
        const resolution = zoomToResolution2(this.zoom(), 1);
        console.log(resolution, this.zoom());
        const points = [
            { lat: tidyLat(bounds.getNorth()), lon: tidyLon(bounds.getWest()) },
            { lat: tidyLat(bounds.getNorth()), lon: tidyLon(bounds.getEast()) },
            { lat: tidyLat(bounds.getSouth()), lon: tidyLon(bounds.getEast()) },
            { lat: tidyLat(bounds.getSouth()), lon: tidyLon(bounds.getWest()) },
            { lat: tidyLat(bounds.getNorth()), lon: tidyLon(bounds.getWest()) }
        ];
        const boundsHash = hashSum(points);
        if (summaryQuery && !this._prevBounds || this._prevBounds !== boundsHash || this._prevResolution !== resolution) {
            this._prevBounds = bounds;
            this._prevResolution = resolution;
            summaryQuery.submit({
                polygon: {
                    Row: points
                },
                resolution
            }).then((response: any) => {
                const data = response.data.map(row => {
                    return [row.boundary.Row.map(b => [b.lon, b.lat]), +row.rowcount / 10000];
                });
                this.data(data);
                this.lazyRender();
            });
        }
    }, 1000);
}
