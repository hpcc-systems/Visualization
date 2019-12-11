import { Button, HTMLWidget, IconBar, publish, Spacer, Widget } from "@hpcc-js/common";
import { LatLngBounds, Map } from "@hpcc-js/leaflet-shim";
import { AlbersLayer } from "./AlbersPR";
import { BlankLayer } from "./Blank";
import { GMapLayer } from "./GMap";
import { MapBoxLayer } from "./MapBox";
import { OpenStreetLayer } from "./OpenStreet";
import { ILayer, TileLayer } from "./TileLayer";

import "../../src/leaflet/Leaflet.css";

export class Leaflet extends HTMLWidget {

    protected _leafletElement;
    private _leafletMap: Map;

    protected _iconBar = new IconBar()
        .buttons([
            new Button().faChar("fa-plus").tooltip("Zoom in")
                .on("click", () => {
                    this.zoomPlus();
                }),
            new Button().faChar("fa-minus").tooltip("Zoom out")
                .on("click", () => {
                    this.zoomMinus();
                }),
            new Spacer(),
            new Button().faChar("fa-arrows-alt").tooltip("Zoom to fit")
                .on("click", () => {
                    this.zoomToFit();
                })
        ])
        ;

    _blankLayer = new BlankLayer();
    _albersLayer = new AlbersLayer();
    _mapBoxLayer = new MapBoxLayer();
    _openStreetLayer = new OpenStreetLayer();
    _gmapLayer = new GMapLayer();

    constructor() {
        super();
        this.baseLayer();
    }

    zoom() {
        return this._leafletMap.getZoom();
    }

    zoomPlus() {
        this._leafletMap.zoomIn();
    }

    zoomMinus() {
        this._leafletMap.zoomOut();
    }

    zoomToDefault() {
        this._leafletMap.flyTo({ lat: this.defaultLat(), lng: this.defaultLong() }, this.defaultZoom(), { animate: false });
    }

    zoomToFit() {
        let bounds: LatLngBounds;
        if (this.mapType() === "AlbersPR") {
            bounds = this._albersLayer.getBounds();
        } else {
            this.layers().filter(l => l.hasBounds()).forEach(layer => {
                if (!bounds) {
                    bounds = layer.getBounds();
                } else {
                    bounds.extend(layer.getBounds());
                }
            });
        }
        if (bounds && bounds.isValid()) {
            this._leafletMap.fitBounds(bounds, { maxZoom: 14 });
        } else {
            this.zoomToDefault();
        }
    }

    syncLayers(sLayers: ILayer[], domNode, element) {
        const added: ILayer[] = [...sLayers];
        const updated: ILayer[] = [];
        const removed: ILayer[] = [];
        this._leafletMap.eachLayer(layer => {
            const idx = added.indexOf((layer as any).__hpcc_layer);
            if (idx >= 0) {
                updated.push((layer as any).__hpcc_layer);
                added.splice(idx, 1);
            } else if ((layer as any).__hpcc_layer) {
                removed.push((layer as any).__hpcc_layer);
            }
        });
        added.forEach(sl => {
            sl.layerEnter(this._leafletMap);
            sl.layerUpdate(this._leafletMap);
        });
        updated.forEach(sl => {
            sl.layerUpdate(this._leafletMap);
        });
        removed.forEach(sl => {
            sl.layerExit(this._leafletMap);
        });
    }

    protected _owner: HTMLWidget;
    isLayer(): boolean {
        return this._owner !== undefined && this._owner !== this;
    }

    baseLayer(): BlankLayer | AlbersLayer | MapBoxLayer | OpenStreetLayer | GMapLayer {
        switch (this.mapType()) {
            case "AlbersPR":
                this.map(this._albersLayer);
                break;
            case "MapBox":
                this.map(this._mapBoxLayer);
                break;
            case "OpenStreet":
                this.map(this._openStreetLayer);
                break;
            case "Google":
                this.map(this._gmapLayer);
                break;
            case "None":
            default:
                this.map(this._blankLayer);
                break;
        }
        return this.map();
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        element.style("position", "relative");
        this._leafletElement = element.append("div")
            .style("position", "absolute")
            .style("width", `${this.width()}px`)
            .style("height", `${this.height()}px`)
            ;

        this._iconBar.target(domNode);
    }

    private _prevCRS;
    update(domNode, element) {
        super.update(domNode, element);
        this._leafletElement
            .style("width", `${this.width()}px`)
            .style("height", `${this.height()}px`)
            ;

        const baseLayer = this.baseLayer();
        if (this._prevCRS !== baseLayer.crs()) {
            this._prevCRS = baseLayer.crs();
            if (this._leafletMap) {
                this.syncLayers([], domNode, element);
                this._leafletMap.remove();
                this._leafletElement.html("");
            }
            this._leafletMap = new Map(this._leafletElement.node(), {
                trackResize: false,
                zoomControl: false,
                zoomSnap: this.mapType() === "AlbersPR" ? 0.1 : 1,
                crs: baseLayer.crs(),
                maxZoom: (baseLayer as any).getMaxZoom ? (baseLayer as any).getMaxZoom() : 18
            });
            this._leafletMap.setView([this.defaultLat(), this.defaultLong()], this.defaultZoom());
            this._leafletMap["attributionControl"].setPrefix(baseLayer.attribution());
            this._leafletMap.on("zoomend", e => this.layers().forEach(layer => layer.zoomEnd(e)));
            this._leafletMap.on("moveend", e => this.layers().forEach(layer => layer.moveEnd(e)));
            this._leafletMap.on("viewreset", e => this.layers().forEach(layer => layer.viewReset(e)));

            this._renderCount = 0;
        }
        this.syncLayers([baseLayer, ...this.layers()], domNode, element);
        this._leafletMap.invalidateSize();
        if (this.autoZoomToFit()) {
            this._leafletMap.whenReady(function () {
                this.zoomToFit();
            }, this);
        }
        this._iconBar
            .visible(this.showToolbar())
            .render((w: IconBar) => {
                const bbox = w.getBBox();
                w.element()
                    .style("z-index", 5000)
                    .style("left", `${this.width() - bbox.width - 4}px`)
                    ;
            })
            ;
    }

    exit(domNode, element) {
        this._iconBar.target(null);
        super.exit(domNode, element);
    }

    render(callback?: (w: Widget) => void): this {
        const promises = [this.baseLayer().init(), ...this.layers().map(l => l.init())];
        Promise.all(promises).then(() => {
            super.render(callback);
        });
        return this;
    }
}
Leaflet.prototype._class += " map_Leaflet";

export interface Leaflet {
    showToolbar(): boolean;
    showToolbar(_: boolean): this;
    mapType(): "None" | "AlbersPR" | "MapBox" | "OpenStreet" | "Google";
    mapType(_: "None" | "AlbersPR" | "MapBox" | "OpenStreet" | "Google"): this;
    mapType_default(_: "None" | "AlbersPR" | "MapBox" | "OpenStreet" | "Google"): this;
    map(): TileLayer;
    map(_: TileLayer): this;
    layers(): ILayer[];
    layers(_: ILayer[]): this;
    layers_default(_: ILayer[]): this;
    defaultLat(): number;
    defaultLat(_: number): this;
    defaultLong(): number;
    defaultLong(_: number): this;
    defaultZoom(): number;
    defaultZoom(_: number): this;
    autoZoomToFit: publish<this, boolean>;
}

Leaflet.prototype.publish("showToolbar", true, "boolean", "Show toolbar", undefined, { hidden: (w: Leaflet) => w.isLayer() });
Leaflet.prototype.publish("mapType", "Google", "set", "Base Layer Type", ["None", "AlbersPR", "MapBox", "OpenStreet", "Google"], { hidden: (w: Leaflet) => w.isLayer() });
Leaflet.prototype.publish("map", null, "widget", "Base Layer", undefined, { internal: true });
Leaflet.prototype.publish("layers", [], "propertyArray", "Layers", undefined, { hidden: (w: Leaflet) => w.isLayer() });
Leaflet.prototype.publish("defaultLat", 42.877742, "number", "Center Latitude", undefined, { hidden: (w: Leaflet) => w.isLayer() });
Leaflet.prototype.publish("defaultLong", -97.380979, "number", "Center Longitude", undefined, { hidden: (w: Leaflet) => w.isLayer() });
Leaflet.prototype.publish("defaultZoom", 4, "number", "Zoom Level", undefined, { hidden: (w: Leaflet) => w.isLayer() });
Leaflet.prototype.publish("autoZoomToFit", true, "boolean", "Auto zoom to fit Data", undefined, { hidden: (w: Leaflet) => w.isLayer() });
