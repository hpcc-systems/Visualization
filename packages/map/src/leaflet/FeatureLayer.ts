import { HTMLWidget, select as d3Select, Utility } from "@hpcc-js/common";
import { FeatureGroup, LatLngBounds, Map } from "leaflet";
import { MarkerClusterGroup } from "leaflet.markercluster";
import { Leaflet } from "./Leaflet";
import { D3SvgOverlay } from "./plugins/D3SvgOverlay";
import { ILayer } from "./TileLayer";

import "leaflet.markercluster.css";
import "leaflet.markercluster.default.css";

export class FeatureLayer extends Leaflet implements ILayer {
    private _layer: FeatureGroup | MarkerClusterGroup;
    protected _selection: Utility.SimpleSelection;

    constructor(cluster = false) {
        super();
        this._layer = cluster ? new MarkerClusterGroup() : new FeatureGroup();
        (this._layer as any).__hpcc_layer = this;
        Utility.SimpleSelectionMixin.call(this);
        this.layers([this]);
    }

    //  Enable propertyArray support  ---
    owner(_: HTMLWidget) {
        this._owner = _;
    }

    valid() {
        return true;
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
        const elem = d3Select(map.getContainer()).select(".leaflet-pane.leaflet-marker-pane");
        this._selection.widgetElement(elem);
    }

    layerUpdate(map: Map) {
    }

    layerExit(map: Map) {
        this._layer.clearLayers();
        map.removeLayer(this._layer);
    }
}
FeatureLayer.prototype._class += " map_FeatureLayer";
FeatureLayer.prototype.mixin(Utility.SimpleSelectionMixin);
FeatureLayer.prototype.publishReset(["layers"]);

//  ---------------------------------------------------------------------------
export class ClusterLayer extends FeatureLayer {

    constructor(cluster = true) {
        super(cluster);
    }
}
ClusterLayer.prototype._class += " map_ClusterLayer";

//  ---------------------------------------------------------------------------
export class D3SurfaceLayer extends FeatureLayer {

    protected _lfd3 = new D3SvgOverlay()
        .drawCallback((selection, projection) => this.layerUpdate(undefined, projection));

    hasBounds(): boolean {
        return true;
    }

    getBounds() {
        return this._lfd3.getBounds();
    }

    layerEnter(map: Map) {
        super.layerEnter(map);
        this.add(this._lfd3);
    }

    layerUpdate(map: Map, projection?) {
        super.layerUpdate(map);
    }

    //  Events  ---
    clickHandler(e, row) {
    }
}
