import { HTMLWidget, select as d3Select, Utility } from "@hpcc-js/common";
import { D3SvgOverlay, FeatureGroup, LatLngBounds, LeafletEvent, Map, MarkerClusterGroup } from "@hpcc-js/leaflet-shim";
import { Leaflet } from "./Leaflet";
import { ILayer } from "./TileLayer";

export class FeatureLayer extends Leaflet implements ILayer {
    protected _layer: FeatureGroup | MarkerClusterGroup;
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

    maxZoom() {
        return (this._owner as any)._leafletMap.getMaxZoom() || 24;
    }

    zoom() {
        return (this._owner as any)._leafletMap.getZoom();
    }

    visibleBounds() {
        return (this._owner as any)._leafletMap.getBounds();
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

    style(id: string, _?: number | string | boolean): this | number | string | boolean {
        if (_ === void 0) return d3Select(this._layer.getPane()).style(id);
        d3Select(this._layer.getPane()).style(id, _);
        return this;
    }

    protected propValue(colIdx, row, defaultValue) {
        return (colIdx < 0 ? defaultValue : row[colIdx]) || defaultValue;
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

    //  Events  ---
    zoomEnd(e: LeafletEvent) {
    }

    moveEnd(e: LeafletEvent) {
    }

    viewReset(e: LeafletEvent) {
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
