import { CRS, LatLng, LatLngBounds, Point, Transformation, Util } from "@hpcc-js/leaflet-shim";
import { resolve } from "../Projection";
import { TileLayer } from "./TileLayer";

const projAlbers = resolve("Albers").scale(.5);
const projAlbersUsaPr = resolve("AlbersUsaPr").scale(.5);

const AlbersProjection = {
    project(latLng) {
        let point = projAlbersUsaPr([latLng.lng, latLng.lat]);
        if (!point) {
            point = projAlbers([latLng.lng, latLng.lat]);
        }
        return new Point(point[0], point[1]);
    },
    unproject(point) {
        if (!isNaN(point.x) && !isNaN(point.y)) {
            const latLng = projAlbers.invert([point.x, point.y]);
            return new LatLng(latLng[1], latLng[0]);
        } else {
            return new LatLng(0, 0);
        }
    }
};

const AlbersCRS = Util.extend({}, CRS, {
    projection: AlbersProjection,
    transformation: new Transformation(1, 0, 1, 0),
    infinite: true
});

export class AlbersLayer extends TileLayer {

    _crs = AlbersCRS;

    constructor() {
        super();
    }

    hasBounds() {
        return true;
    }

    getBounds() {
        return new LatLngBounds([20, -123], [49, -64]);
    }
}
AlbersLayer.prototype._class += " map_AlbersLayer";
