import { Widget } from "@hpcc-js/common";
import { AbsoluteSurface } from "@hpcc-js/layout";
import { GMap, google } from "./GMap";
import { Layered } from "./Layered";

// tslint:disable-next-line:no-bitwise
const zoomFactor = 1 / (1 << 4);

class OverlayLayered extends Layered {
    gmap: GMap;
    surface: AbsoluteSurface;

    constructor(gmap: GMap, surface: AbsoluteSurface) {
        super();
        this.gmap = gmap;
        this.surface = surface;
        this.autoScaleMode("none");
        this
            .zoomable(false)
            .zoomDuration(10)
            ;

    }

    getProjection() {
        return this.gmap._overlay.getProjection();
    }

    render(callback?: any): this {
        super.render((w) => {
            const projection = this.getProjection();
            if (projection) {
                // TODO - global usage should not be used - see GMap.ts
                const center = new (window as any).google.maps.LatLng(0, 0);
                const pos = projection.fromLatLngToDivPixel(center);
                const widgetX = this.surface.widgetX();
                const widgetY = this.surface.widgetY();
                const translate = [(pos.x - widgetX), (pos.y - widgetY)];
                const zoom = this.gmap._googleMap.getZoom();
                // tslint:disable-next-line:no-bitwise
                this.zoomTo(translate, zoomFactor * (1 << zoom), 0);
            }
            if (callback) {
                callback(w);
            }
        });
        return this;
    }
}

export class GMapLayered extends GMap {
    private layered: OverlayLayered;

    constructor() {
        super();
        this.layered = new OverlayLayered(this, this._viewportSurface);
        this._viewportSurface.widget(this.layered);
    }

    invert(x: number, y: number): { lat: number, lng: number } | undefined {
        return this.layered.invert(x, y);
    }

    rproject(x: number, y: number): { lat: number, lng: number } | undefined {
        const projection = this.layered.getProjection();
        const latLng = projection.fromDivPixelToLatLng(new google.maps.Point(x, y));
        return {
            lat: latLng.lat(),
            lng: latLng.lng()
        };
    }

    updateCircles() { }
    updatePins() { }

    layers(): Widget[];
    layers(_: Widget[]): this;
    layers(_?: Widget[]): Widget[] | this {
        if (!arguments.length) return this.layered.layers();
        this.layered.layers(_);
        return this;
    }

    render(callback?) {
        return super.render(w => {
            this.layered.preRender().then(() => {
                this.layered.render(w => {
                    if (callback) {
                        callback(w);
                    }
                });
            });
        });
    }
}
GMapLayered.prototype._class += " map_GMapLayered";
