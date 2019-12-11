import { Query } from "@hpcc-js/comms";
import { Leaflet } from "@hpcc-js/map";
import { debounce } from "@hpcc-js/util";
import { tidyLat, tidyLon, zoomToResolution } from "./h3lib";
import { connect } from "./util";

declare const espUrl: string;
const connection = connect(espUrl);
const summaryQuery = connection instanceof Query ? connection : undefined;

export class RoxieSummary extends Leaflet.Leaflet {

    _polyMap = new Leaflet.Polygons()
        .columns(["polys", "weight"])
        .polygonColumn("polys")
        .weightColumn("weight")
        .on("moveEnd", () => {
            this.refresh();
        })
        ;

    protected _clusterMap = new Leaflet.ClusterCircles()
        .columns(["latitude", "longitude", "weight"])
        .latitudeColumn("latitude")
        .longitudeColumn("longitude")
        .weightColumn("weight")
        .weightFormat(".0s")
        ;

    constructor() {
        super();
        this
            .layers([this._polyMap, this._clusterMap])
            .mapType("Google")
            .autoZoomToFit(false)
            ;
    }

    private _prevBounds;
    private _prevResolution;
    refresh = debounce(async () => {
        const bounds = this._polyMap.visibleBounds();
        const resolution = zoomToResolution(this.zoom());
        if (!this._prevBounds || !bounds.equals(this._prevBounds) || this._prevResolution !== resolution) {
            this._prevBounds = bounds;
            this._prevResolution = resolution;
            const points = [
                { lat: tidyLat(bounds.getNorth()), lon: tidyLon(bounds.getWest()) },
                { lat: tidyLat(bounds.getNorth()), lon: tidyLon(bounds.getEast()) },
                { lat: tidyLat(bounds.getSouth()), lon: tidyLon(bounds.getEast()) },
                { lat: tidyLat(bounds.getSouth()), lon: tidyLon(bounds.getWest()) },
                { lat: tidyLat(bounds.getNorth()), lon: tidyLon(bounds.getWest()) }
            ];
            if (summaryQuery) {
                summaryQuery.submit({
                    polygon: {
                        Row: points
                    },
                    resolution
                }).then((response: any) => {
                    const clusterData = [];
                    const data = response.data.map(row => {
                        clusterData.push([row.center.lat, row.center.lon, +row.rowcount]);
                        return [row.boundary.Row.map(b => [b.lon, b.lat]), +row.rowcount];
                    });
                    this._polyMap.data(data);
                    this._clusterMap.data(clusterData);
                    this.lazyRender();
                });
            }
        }
    });

    render() {
        return super.render(() => {
            if (this.renderCount() === 1) {
                this.refresh();
            }
        });
    }

}
