import { geoPath as d3GeoPath } from "d3-geo";
import { Map } from "leaflet";
import { resolve } from "../Projection";
import { D3SurfaceLayer } from "./FeatureLayer";

// tslint:disable-next-line:no-bitwise
const projectionFactor = (1 << 12) / 2 / Math.PI;

export type Coordinate = [number, number];
export type Coordinates = [Coordinate, Coordinate];

export class Path extends D3SurfaceLayer {

    lineData(): Array<{ type: string, coordinates: Coordinates }> {
        const columns = this.columns();
        const latIdx = columns.indexOf(this.latitudeColumn());
        const longIdx = columns.indexOf(this.longtitudeColumn());
        const retVal = [];
        let prevLatLng;
        this.data().forEach(row => {
            const currLatLng: Coordinate = [row[longIdx], row[latIdx]];
            if (prevLatLng) {
                retVal.push({
                    type: "LineString",
                    coordinates: [currLatLng, prevLatLng]
                });
            }
            prevLatLng = currLatLng;
        });
        return retVal;
    }

    isNull(coord: Coordinate) {
        return !coord[0] && !coord[1];
    }

    isNull2(coords: Coordinates) {
        if (!this.omitNullLatLong()) return false;
        return this.isNull(coords[0]) || this.isNull(coords[1]);
    }

    layerUpdate(map: Map, projection?) {
        super.layerUpdate(map, projection);
        const element = this._lfd3._rootGroup;
        projection = projection || this._lfd3.projection;

        const updateDefs = this._lfd3.svg().selectAll("defs").data([undefined]);
        updateDefs.enter().append("defs").append("marker")
            .attr("class", "marker")
            .attr("id", this._id + "_arrowHead")
            .attr("viewBox", "0 0 10 10")
            .attr("refX", 10)
            .attr("refY", 5)
            .attr("markerWidth", 12)
            .attr("markerHeight", 12)
            .attr("markerUnits", "strokeWidth")
            .attr("orient", "auto")
            .append("polyline")
            .attr("points", "0,0 10,5 0,10 1,5")
            ;
        this._lfd3.svg().select("defs > marker")
            .style("fill", this.strokeColor())
            .style("stroke", null)
            ;

        const center = projection.latLngToLayerPoint({ lat: 0, lng: 0 });
        const geoTransform = resolve("Mercator")
            .scale(projectionFactor)
            .translate([center.x, center.y])
            ;
        const geoPath = d3GeoPath().projection(geoTransform);

        const updateSelection = element.selectAll(".dataEdge").data(this.lineData().filter(row => !this.isNull2(row.coordinates)));
        updateSelection.enter().append("path")
            .attr("class", "dataEdge")
            .attr("marker-end", "url(#" + this._id + "_arrowHead)")
            .merge(updateSelection)
            .attr("d", geoPath)
            .style("stroke", this.strokeColor())
            .style("fill", "none")
            .attr("stroke-width", 1 / projection.scale)
            ;
        updateSelection.exit().remove();
    }

    //  Events  ---
    clickHandler(e, row) {
    }

}
Path.prototype._class += " map_Path";

export interface Path {
    latitudeColumn(): string;
    latitudeColumn(_: string): this;
    longtitudeColumn(): string;
    longtitudeColumn(_: string): this;
    strokeColor(): string;
    strokeColor(_: string): this;
    omitNullLatLong(): boolean;
    omitNullLatLong(_: boolean): this;
}

Path.prototype.publish("latitudeColumn", null, "set", "Latitude column", function () { return this.columns(); }, { optional: true });
Path.prototype.publish("longtitudeColumn", null, "set", "Longtitude column", function () { return this.columns(); }, { optional: true });
Path.prototype.publish("strokeColor", " #666666", "html-color", "Stroke Color", null, { optional: true });
Path.prototype.publish("omitNullLatLong", true, "boolean", "Remove lat=0,lng=0 from pinsData", null, { tags: ["Basic"] });

//  ---------------------------------------------------------------------------
export class Lines extends Path {

    lineData(): Array<{ type: string, coordinates: Coordinates }> {
        const columns = this.columns();
        const latIdx = columns.indexOf(this.latitudeColumn());
        const longIdx = columns.indexOf(this.longtitudeColumn());
        const lat2Idx = columns.indexOf(this.latitude2Column());
        const long2Idx = columns.indexOf(this.longtitude2Column());
        const retVal = [];
        this.data().forEach(row => {
            const currLatLng: Coordinate = [row[longIdx], row[latIdx]];
            const currLatLng2: Coordinate = [row[long2Idx], row[lat2Idx]];
            retVal.push({
                type: "LineString",
                coordinates: [currLatLng, currLatLng2]
            });
        });
        return retVal;
    }
}
Lines.prototype._class += " map_Lines";

export interface Lines {
    latitude2Column(): string;
    latitude2Column(_: string): this;
    longtitude2Column(): string;
    longtitude2Column(_: string): this;
}
Lines.prototype.publish("latitude2Column", null, "set", "Latitude column", function () { return this.columns(); }, { optional: true });
Lines.prototype.publish("longtitude2Column", null, "set", "Longtitude column", function () { return this.columns(); }, { optional: true });
