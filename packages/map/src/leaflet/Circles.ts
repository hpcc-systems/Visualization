import { Circle, Map } from "@hpcc-js/leaflet-shim";
import { ClusterLayer, D3SurfaceLayer } from "./FeatureLayer";

export class Circles extends ClusterLayer {

    hasBounds(): boolean {
        return true;
    }

    layerUpdate(map: Map) {
        super.layerUpdate(map);
        const columns = this.columns();
        const latIdx = columns.indexOf(this.latitudeColumn());
        const longIdx = columns.indexOf(this.longtitudeColumn());
        this.clear();
        this.data().filter(row => !this.omitNullLatLong() || (!!row[latIdx] && !!row[longIdx])).forEach(row => {
            this.add(new Circle([row[latIdx], row[longIdx]], {
                color: this.strokeColor(),
                fillColor: this.fillColor(),
                fillOpacity: this.fillOpacity(),
                radius: this.radius(),
                origRow: row
            } as any).on("click", e => this.clickHandler(e, row)));
        });
    }

    //  Events  ---
    clickHandler(e, row) {
    }
}
Circles.prototype._class += " map_Circles";

export interface Circles {
    latitudeColumn(): string;
    latitudeColumn(_: string);
    longtitudeColumn(): string;
    longtitudeColumn(_: string);
    radius(): number;
    radius(_: number);
    strokeColor(): string;
    strokeColor(_: string);
    fillColor(): string;
    fillColor(_: string);
    fillOpacity(): number;
    fillOpacity(_: number);
    omitNullLatLong(): boolean;
    omitNullLatLong(_: boolean);
}

Circles.prototype.publish("latitudeColumn", null, "set", "Latitude column", function () { return this.columns(); }, { optional: true });
Circles.prototype.publish("longtitudeColumn", null, "set", "Longtitude column", function () { return this.columns(); }, { optional: true });
Circles.prototype.publish("radius", 50, "number", "Radius (meters)");
Circles.prototype.publish("strokeColor", "#376cea", "html-color", "Stroke Color", null, { optional: true });
Circles.prototype.publish("fillColor", "#376cea", "html-color", "Fill Color", null, { optional: true });
Circles.prototype.publish("fillOpacity", 0.5, "number", "Opacity", null, { tags: ["Advanced"] });
Circles.prototype.publish("omitNullLatLong", true, "boolean", "Remove lat=0,lng=0 from pinsData", null, { tags: ["Basic"] });

//  ---------------------------------------------------------------------------
export class D3Circles extends D3SurfaceLayer {

    layerUpdate(map: Map, projection?) {
        super.layerUpdate(map, projection);
        const element = this._lfd3._rootGroup;
        projection = projection || this._lfd3.projection;
        const columns = this.columns();
        const latIdx = columns.indexOf(this.latitudeColumn());
        const longIdx = columns.indexOf(this.longtitudeColumn());
        function toLatLng(d) {
            return {
                lat: +d[latIdx],
                lng: +d[longIdx]
            };
        }
        const updateSelection = element.selectAll("circle").data(this.data().filter(row => !this.omitNullLatLong() || (!!row[latIdx] && !!row[longIdx])));
        updateSelection.enter()
            .append("circle")
            .merge(updateSelection)
            .attr("cx", d => projection.latLngToLayerPoint(toLatLng(d)).x)
            .attr("cy", d => projection.latLngToLayerPoint(toLatLng(d)).y)
            .attr("r", Math.max(3 / projection.scale, this.radius() / projection.metresPerPixel)) // d => projection.metersToPixels(toLatLng(d), this.radius()))
            .style("fill-opacity", this.fillOpacity())
            .style("stroke", this.strokeColor())
            .attr("stroke-width", Math.max(1 / projection.scale, 1 / projection.metresPerPixel))
            .style("fill", this.fillColor())
            ;
        updateSelection.exit().remove();
    }

    //  Events  ---
    clickHandler(e, row) {
    }
}
D3Circles.prototype._class += " map_D3Circles";

export interface D3Circles {
    latitudeColumn(): string;
    latitudeColumn(_: string);
    longtitudeColumn(): string;
    longtitudeColumn(_: string);
    radius(): number;
    radius(_: number);
    strokeColor(): string;
    strokeColor(_: string);
    fillColor(): string;
    fillColor(_: string);
    fillOpacity(): number;
    fillOpacity(_: number);
    omitNullLatLong(): boolean;
    omitNullLatLong(_: boolean);
}

D3Circles.prototype.publish("latitudeColumn", null, "set", "Latitude column", function () { return this.columns(); }, { optional: true });
D3Circles.prototype.publish("longtitudeColumn", null, "set", "Longtitude column", function () { return this.columns(); }, { optional: true });
D3Circles.prototype.publish("radius", 50, "number", "Radius (meters)");
D3Circles.prototype.publish("strokeColor", "#376cea", "html-color", "Stroke Color", null, { optional: true });
D3Circles.prototype.publish("fillColor", "#376cea", "html-color", "Fill Color", null, { optional: true });
D3Circles.prototype.publish("fillOpacity", 0.5, "number", "Opacity", null, { tags: ["Advanced"] });
D3Circles.prototype.publish("omitNullLatLong", true, "boolean", "Remove lat=0,lng=0 from pinsData", null, { tags: ["Basic"] });
