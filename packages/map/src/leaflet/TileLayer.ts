import { Widget } from "@hpcc-js/common";
import { CRS, FeatureGroup, LatLngBounds, Map } from "leaflet";

export interface ILayer {

    init(): Promise<void>;
    hasBounds(): boolean;
    getBounds(): LatLngBounds;

    layerEnter(map: Map);
    layerUpdate(map: Map);
    layerExit(map: Map);
}

export class TileLayer extends Widget implements ILayer {
    private _layer = new FeatureGroup();
    protected _crs: any = CRS.EPSG3857;

    constructor(cluster = false) {
        super();
        (this._layer as any).__hpcc_layer = this;
    }

    crs() {
        return this._crs;
    }

    attribution(): string {
        return "";
    }

    clear() {
        this._layer.clearLayers();
    }

    add(layer) {
        this._layer.addLayer(layer);
    }

    //  ILayer  ---
    protected _initPromise;
    init(): Promise<void> {
        if (!this._initPromise) {
            this._initPromise = Promise.resolve();
        }
        return this._initPromise;
    }

    hasBounds(): boolean {
        return false;
    }

    getBounds(): LatLngBounds {
        return this._layer.getBounds();
    }

    layerEnter(map: Map) {
        map.addLayer(this._layer);
    }

    layerUpdate(map: Map) {
    }

    layerExit(map: Map) {
        this._layer.clearLayers();
        map.removeLayer(this._layer);
    }
}
