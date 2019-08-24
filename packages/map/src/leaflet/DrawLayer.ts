import { Circle, Control, Draw, LatLng, LatLngBounds, LatLngExpression, Map, Polygon, Polyline, Rectangle } from "@hpcc-js/leaflet-shim";
import { hashSum } from "@hpcc-js/util";
import { FeatureLayer } from "./FeatureLayer";

function del(arr: any[], item: object) {
    const idx = arr.indexOf(item);
    if (idx >= 0) {
        arr.splice(idx, 1);
    }
}

export interface DrawState {
    polylines: LatLngExpression[][];
    polygons: Array<LatLng[] | LatLng[][] | LatLng[][][]>;
    rectangles: LatLngBounds[];
    circles: Array<{ center: LatLng, radius: number }>;
}

export class DrawLayer extends FeatureLayer {

    protected _polylines: Polyline[] = [];
    protected _polygons: Polygon[] = [];
    protected _rectangles: Rectangle[] = [];
    protected _circles: Circle[] = [];

    private _drawControl: Control.Draw;

    hasBounds(): boolean {
        return true;
    }

    drawOptions(): Control.DrawOptions {
        const retVal: Control.DrawOptions = {
            marker: false,
            circlemarker: false
        };
        if (!this.enableCircle()) {
            retVal.circle = false;
        }
        if (!this.enablePolyline()) {
            retVal.polyline = false;
        }
        if (!this.enableRectangle()) {
            retVal.rectangle = false;
        }
        if (!this.enablePolygon()) {
            retVal.polygon = false;
        }
        return retVal;
    }

    save(): DrawState {
        return {
            polylines: this._polylines.map(p => p.getLatLngs() as LatLngExpression[]),
            polygons: this._polygons.map(p => p.getLatLngs()),
            rectangles: this._rectangles.map(r => r.getBounds()),
            circles: this._circles.map(c => ({ center: c.getLatLng(), radius: c.getRadius() }))
        };
    }

    restore(_: DrawState) {
        this.clear();
        this._polylines = (_.polylines || []).map(p => new Polyline(p));
        this._polygons = (_.polygons || []).map(p => new Polygon(p));
        this._rectangles = (_.rectangles || []).map(r => new Rectangle(r));
        this._circles = (_.circles || []).map(c => new Circle(c.center, { radius: c.radius }));
        this._polylines.forEach(_ => this.add(_));
        this._polygons.forEach(_ => this.add(_));
        this._rectangles.forEach(_ => this.add(_));
        this._circles.forEach(_ => this.add(_));
    }

    private _drawOptionsHash;
    layerEnter(map: Map) {
        super.layerEnter(map);

        map.on(Draw.Event.CREATED, (e: any) => {
            const type = e.layerType;
            const layer = e.layer;
            switch (type) {
                case "polyline":
                    this._polylines.push(layer);
                    break;
                case "polygon":
                    this._polygons.push(layer);
                    break;
                case "rectangle":
                    this._rectangles.push(layer);
                    break;
                case "circle":
                    this._circles.push(layer);
                    break;
                default:
                    alert(type);
            }
            this.add(layer);
            this.changed("ADD", layer);
        });

        map.on(Draw.Event.EDITED, (e: any) => {
            const layers = e.layers;
            layers.eachLayer(layer => {
                this.changed("UPDATE", layer);
            });
        });

        map.on(Draw.Event.DELETED, (e: any) => {
            const layers = e.layers;
            layers.eachLayer(layer => {
                del(this._polylines, layer);
                del(this._polygons, layer);
                del(this._rectangles, layer);
                del(this._circles, layer);
                this.changed("DELETE", layer);
            });
        });
    }

    layerUpdate(map: Map) {
        super.layerUpdate(map);
        this.style("opacity", this.opacity());
        const drawOptions = this.drawOptions();
        const drawOptionsHash = hashSum(drawOptions);
        if (this._drawOptionsHash !== drawOptionsHash) {
            this._drawOptionsHash = drawOptionsHash;
            if (this._drawControl) {
                map.removeControl(this._drawControl);
            }
            this._drawControl = new Control.Draw({
                position: "topleft",
                draw: drawOptions,
                edit: {
                    featureGroup: this._layer
                }
            });
            map.addControl(this._drawControl);
        }
    }

    layerExit(map: Map) {
        super.layerExit(map);
    }

    //  Events  ---
    changed(type: "ADD" | "UPDATE" | "DELETE", items) {
    }
}
DrawLayer.prototype._class += " map_DrawLayer";

export interface DrawLayer {
    opacity(): number;
    opacity(_: number): this;
    enablePolyline(): boolean;
    enablePolyline(_: boolean): this;
    enablePolygon(): boolean;
    enablePolygon(_: boolean): this;
    enableRectangle(): boolean;
    enableRectangle(_: boolean): this;
    enableCircle(): boolean;
    enableCircle(_: boolean): this;
}

DrawLayer.prototype.publish("opacity", 1, "number", "Layer Opacity");
DrawLayer.prototype.publish("enablePolyline", true, "boolean", "Enable Polyline Creation");
DrawLayer.prototype.publish("enablePolygon", true, "boolean", "Enable Polygon Creation");
DrawLayer.prototype.publish("enableRectangle", true, "boolean", "Enable Rectangle Creation");
DrawLayer.prototype.publish("enableCircle", true, "boolean", "Enable Circle Creation");
