import { Query } from "@hpcc-js/comms";
import { Leaflet } from "@hpcc-js/map";
import { debounce } from "@hpcc-js/util";
import { tidyLat, tidyLon, zoomToResolution } from "./h3lib";
import { connect } from "./util";

declare const espUrl: string;
const connection = connect(espUrl);
const summaryQuery = connection instanceof Query ? connection : undefined;

export class RoxieSummaryRegion extends Leaflet.Leaflet {

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

    protected _pinsMap = new Leaflet.ClusterPins()
        .columns(["latitude", "longitude", "payload"])
        .latitudeColumn("latitude")
        .longitudeColumn("longitude")
        .tooltipColumn("payload")
        .popupColumn("payload")
        ;

    constructor() {
        super();
        this
            .layers([this._polyMap, this._clusterMap, this._pinsMap])
            .mapType("Google")
            .autoZoomToFit(false)
            ;
    }

    private _prevBounds;
    private _prevResolution;
    private _prevHasPoints;
    refresh = debounce(async () => {
        const bounds = this._polyMap.visibleBounds();
        const resolution = zoomToResolution(this.zoom());
        if (!this._prevBounds || !bounds.equals(this._prevBounds) || this._prevResolution !== resolution) {
            if (this._prevHasPoints && this._prevBounds.contains(bounds)) {
                //  Skip  ---
            } else {
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
                        let summary = [];
                        const points = [];
                        if (response.data.length) {
                            response.data.forEach(row => {
                                points.push([row.latitude, row.longitude, JSON.stringify(row.payload, undefined, 2)]);
                            });
                            this._prevHasPoints = true;
                        } else {
                            summary = response.summary.map(row => {
                                clusterData.push([row.center.lat, row.center.lon, +row.rowcount]);
                                return [row.boundary.Row.map(b => [b.lon, b.lat]), +row.rowcount];
                            });
                            this._prevHasPoints = false;
                        }
                        this._polyMap.data(summary);
                        this._clusterMap.data(clusterData);
                        this._pinsMap.data(points);
                        this.lazyRender();
                    });
                }
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
