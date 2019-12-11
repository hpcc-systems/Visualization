import { format as d3Format } from "@hpcc-js/common";
import { Query } from "@hpcc-js/comms";
import { Leaflet } from "@hpcc-js/map";
import { debounce, hashSum } from "@hpcc-js/util";
import { zoomToResolution } from "./h3lib";
import { connect } from "./util";

const format = d3Format(".0s");

declare const espUrl: string;
const connection = connect(espUrl);
const reqionQuery = connection instanceof Query ? connection : undefined;

type Lat = number;
type Lon = number;
type Point = [Lon, Lat];

function area(points: Point[]) {
    let area = 0;
    let point1;
    let point2;

    for (let i = 0, j = points.length - 1; i < points.length; j = i, i++) {
        point1 = points[i];
        point2 = points[j];
        area += point1[0] * point2[1];
        area -= point1[1] * point2[0];
    }
    return area / 2;
}

function centroid(points: Point[]): Point {
    let x = 0;
    let y = 0;
    for (let i = 0, j = points.length - 1; i < points.length; j = i, i++) {
        const point1 = points[i];
        const point2 = points[j];
        const f = point1[0] * point2[1] - point2[0] * point1[1];
        x += (point1[0] + point2[0]) * f;
        y += (point1[1] + point2[1]) * f;
    }
    const f = area(points) * 6;

    return [x / f, y / f];
}

export class RoxieRegion extends Leaflet.Leaflet {

    protected _clusterMap = new Leaflet.ClusterCircles()
        .columns(["latitude", "longitude", "weight"])
        .latitudeColumn("latitude")
        .longitudeColumn("longitude")
        .weightColumn("weight")
        .weightFormat("")
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
            .layers([this._clusterMap, this._pinsMap, this._drawMap])
            .mapType("Google")
            .autoZoomToFit(false)
            ;
    }

    protected _drawMap = new Leaflet.DrawLayer()
        .enableCircle(false)
        .enableRectangle(false)
        .enablePolyline(false)
        .on("changed", (what, b) => {
            this.changed();
        })
        ;

    _cache = {};
    changed = debounce(async () => {
        const polygons = this._drawMap.save().polygons;
        const promises = Promise.all(polygons.map(polygon => {
            const points = (polygon[0] as any[]).map(p => ({ lat: p.lat, lon: p.lng }));
            const centerPt = centroid((polygon[0] as any[]).map(p => [p.lng, p.lat]));
            const request = {
                polygon: {
                    Row: points
                }
            };
            const requestHash = hashSum(request);
            if (!this._cache[requestHash] && reqionQuery) {
                this._cache[requestHash] = reqionQuery.submit({
                    ...request,
                    resolution: zoomToResolution(this._drawMap.zoom(), 3)
                }).then((response: any) => {
                    return {
                        centerPt,
                        count: response.count[0].count,
                        data: response.data
                    };
                });
            }
            return this._cache[requestHash];
        }));
        return promises.then((responses) => {
            this._clusterMap.data([]);
            this._pinsMap.data([]);
            const clusterMapData = [];
            const pinsMapData = [];
            responses.forEach((response: any) => {
                if (response.data.length === 0) {
                    clusterMapData.push([response.centerPt[1], response.centerPt[0], `${response.count > 0 ? " > " : ""}${format(response.count)}`]);
                } else {
                    response.data.forEach(row => {
                        pinsMapData.push([row.latitude, row.longitude, JSON.stringify(row.payload, undefined, 2)]);
                    });
                }
            });
            this._clusterMap.data(clusterMapData);
            this._pinsMap.data(pinsMapData);
            this.lazyRender();
        });
    });
}
