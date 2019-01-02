import { select as d3Select } from "@hpcc-js/common";
import { geoPath as d3GeoPath, geoTransform as d3GeoTransform } from "d3-geo";
import * as L from "leaflet";

import "../../../src/leaflet/plugins/D3SvgOverlay.css";

/*  Ported from https://github.com/teralytics/Leaflet.D3SvgOverlay
    Changes:
        * Ported to TypeScript
        * Updated to work with d3 v4
        * Updated to work with Leaflet > 1.0
        * Fixed issue with metresPerPixel calculation
        * Update metresPerPixel on each draw call
*/

export class LeafletLayer extends L.Layer {
    options;
    _rootGroup;
}

export type DrawCallback = (element, projection, zoom) => void;

export class D3SvgOverlay extends LeafletLayer {
    private _svg;
    map;
    selection;
    projection;
    private _pixelOrigin;
    private _zoomDiff;
    private _zoom;
    private _scale;
    private _shift;
    private _wgsOrigin;
    private _wgsInitialShift;

    constructor(options = {}) {
        super();
        this._options(options);
    }

    svg() {
        return this._rootGroup;
    }

    private _drawCallback: DrawCallback;
    drawCallback(): DrawCallback;
    drawCallback(_: DrawCallback): this;
    drawCallback(_?: DrawCallback): DrawCallback | this {
        if (!arguments.length) return this._drawCallback;
        this._drawCallback = _;
        return this;
    }

    getBounds(): L.LatLngBounds {
        if (!this.selection || !this.projection) {
            return new L.LatLngBounds([-90, -180], [90, 180]);
        }
        const bbox = this.selection.node().getBBox();
        let sw;
        try {
            sw = this.projection.layerPointToLatLng(new L.Point(bbox.x, bbox.y + bbox.height));
        } catch (e) {
            sw = [-90, -180];
        }
        let ne;
        try {
            ne = this.projection.layerPointToLatLng(new L.Point(bbox.x + bbox.width, bbox.y));
        } catch (e) {
            ne = [90, 180];
        }
        return new L.LatLngBounds(sw, ne);
    }

    _undef(a) {
        return typeof a === "undefined";
    }

    _options(options) {
        if (this._undef(options)) {
            return this.options;
        }
        options.zoomHide = this._undef(options.zoomHide) ? false : options.zoomHide;
        options.zoomDraw = this._undef(options.zoomDraw) ? true : options.zoomDraw;

        return this.options = options;
    }

    draw() {
        if (!this.map || !this._drawCallback) return;
        this.projection.metresPerPixel = (40075016.686 * Math.abs(Math.cos(this.map.getCenter().lat * Math.PI / 180)) / Math.pow(2, this.map.getZoom() + 8)) * this.projection.scale;
        this._drawCallback(this.selection, this.projection, this.map.getZoom());
    }

    // Handler for "viewreset"-like events, updates scale and shift after the animation
    _zoomChange(evt) {
        const newZoom = this._undef(evt.zoom) ? this.map._zoom : evt.zoom; // "viewreset" event in Leaflet has not zoom/center parameters like zoomanim
        this._zoomDiff = newZoom - this._zoom;
        this._scale = Math.pow(2, this._zoomDiff);
        this.projection.scale = this._scale;
        this._shift = this.map.latLngToLayerPoint(this._wgsOrigin)._subtract(this._wgsInitialShift.multiplyBy(this._scale));
        const shift = ["translate(", this._shift.x, ",", this._shift.y, ") "];
        const scale = ["scale(", this._scale, ",", this._scale, ") "];
        this._rootGroup.attr("transform", shift.concat(scale).join(""));

        if (this.options.zoomDraw) { this.draw(); }
    }

    onAdd(map): this {
        this.map = map;
        const _layer = this;

        // SVG element
        this._svg = L.svg();
        map.addLayer(this._svg);
        this._rootGroup = d3Select(this._svg._rootGroup).classed("d3-overlay", true);
        this._rootGroup.classed("leaflet-zoom-hide", this.options.zoomHide);
        this.selection = this._rootGroup;

        // Init shift/scale invariance helper values
        this._pixelOrigin = map.getPixelOrigin();
        this._wgsOrigin = L.latLng([0, 0]);
        this._wgsInitialShift = this.map.latLngToLayerPoint(this._wgsOrigin);
        this._zoom = this.map.getZoom();
        this._shift = L.point(0, 0);
        this._scale = 1;

        // Create projection object
        this.projection = {
            latLngToLayerPoint(latLng, zoom) {
                zoom = _layer._undef(zoom) ? _layer._zoom : zoom;
                const projectedPoint = _layer.map.project(L.latLng(latLng), zoom);
                return projectedPoint._subtract(_layer._pixelOrigin);
            },
            layerPointToLatLng(point, zoom) {
                zoom = _layer._undef(zoom) ? _layer._zoom : zoom;
                const projectedPoint = L.point(point).add(_layer._pixelOrigin);
                return _layer.map.unproject(projectedPoint, zoom);
            },
            unitsPerMeter: 256 * Math.pow(2, _layer._zoom) / 40075017,
            metresPerPixel: 40075016.686 * Math.abs(Math.cos(map.getCenter().lat * Math.PI / 180)) / Math.pow(2, map.getZoom() + 8),
            map: _layer.map,
            layer: _layer,
            scale: 1
        };
        this.projection._projectPoint = function (x, y) {
            const point = _layer.projection.latLngToLayerPoint(new L.LatLng(y, x));
            this.stream.point(point.x, point.y);
        };
        this.projection.pathFromGeojson = (d3GeoPath().projection(d3GeoTransform({ point: this.projection._projectPoint })));

        // Compatibility with v.1
        this.projection.latLngToLayerFloatPoint = this.projection.latLngToLayerPoint;
        this.projection.getZoom = this.map.getZoom.bind(this.map);
        this.projection.getBounds = this.map.getBounds.bind(this.map);
        this.selection = this._rootGroup;

        // Initial draw
        this.draw();
        return this;
    }

    // Leaflet 1.0
    getEvents() {
        return { zoomend: this._zoomChange, viewreset: this._zoomChange };
    }

    onRemove(map) {
        this._svg.remove();
        return this;
    }

    addTo(map) {
        map.addLayer(this);
        return this;
    }
}
