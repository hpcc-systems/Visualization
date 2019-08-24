import * as L from "leaflet";
import * as _simpleheat from "simpleheat";

const simpleheat = (window as any).simpleheat || (_simpleheat && _simpleheat.default) || _simpleheat;

/*  Ported from https://github.com/Leaflet/Leaflet.heat
    Changes:
        * Ported to TypeScript
*/

export class LeafletLayer2 extends L.Layer {
    _map: any;
}

export class HeatLayer extends LeafletLayer2 {
    _latlngs: any;
    _heat: any;
    _frame: any;
    _canvas: any;
    options: any;

    // options: {
    //     minOpacity: 0.05,
    //     maxZoom: 18,
    //     radius: 25,
    //     blur: 15,
    //     max: 1.0
    // }

    constructor(latlngs, options = {}) {
        super(options);
        this._latlngs = latlngs;
    }

    initialize(options) {
        this.setOptions(options);
    }

    setLatLngs(latlngs) {
        this._latlngs = latlngs;
        return this.redraw();
    }

    addLatLng(latlng) {
        this._latlngs.push(latlng);
        return this.redraw();
    }

    setOptions(options) {
        this.options = options;
        if (this._heat) {
            this._updateOptions();
        }
        return this.redraw();
    }

    redraw() {
        if (this._heat && !this._frame && !this._map._animating) {
            this._frame = L.Util.requestAnimFrame(this._redraw, this);
        }
        return this;
    }

    onAdd(map): this {
        this._map = map;

        if (!this._canvas) {
            this._initCanvas();
        }

        map._panes.overlayPane.appendChild(this._canvas);

        map.on("moveend", this._reset, this);

        if (map.options.zoomAnimation && L.Browser.any3d) {
            map.on("zoomanim", this._animateZoom, this);
        }

        this._reset();
        return this;
    }

    onRemove(map): this {
        map.getPanes().overlayPane.removeChild(this._canvas);

        map.off("moveend", this._reset, this);

        if (map.options.zoomAnimation) {
            map.off("zoomanim", this._animateZoom, this);
        }
        return this;
    }

    addTo(map) {
        map.addLayer(this);
        return this;
    }

    _initCanvas() {
        const canvas: any = this._canvas = L.DomUtil.create("canvas", "leaflet-heatmap-layer leaflet-layer");

        const originProp = L.DomUtil.testProp(["transformOrigin", "WebkitTransformOrigin", "msTransformOrigin"]);
        canvas.style[originProp as string] = "50% 50%";

        const size = this._map.getSize();
        canvas.width = size.x;
        canvas.height = size.y;

        const animated = this._map.options.zoomAnimation && L.Browser.any3d;
        L.DomUtil.addClass(canvas, "leaflet-zoom-" + (animated ? "animated" : "hide"));

        this._heat = simpleheat(canvas);
        this._updateOptions();
    }

    _updateOptions() {
        this._heat.radius(this.options.radius || this._heat.defaultRadius, this.options.blur);

        if (this.options.gradient) {
            this._heat.gradient(this.options.gradient);
        }
        if (this.options.max) {
            this._heat.max(this.options.max);
        }
    }

    _reset() {
        const topLeft = this._map.containerPointToLayerPoint([0, 0]);
        L.DomUtil.setPosition(this._canvas, topLeft);

        const size = this._map.getSize();

        if (this._heat._width !== size.x) {
            this._canvas.width = this._heat._width = size.x;
        }
        if (this._heat._height !== size.y) {
            this._canvas.height = this._heat._height = size.y;
        }

        this._redraw();
    }

    _redraw() {
        const data = [];
        const r = this._heat._r;
        const size = this._map.getSize();
        const bounds = new L.Bounds(L.point([-r, -r]), size.add([r, r]));
        const max = this.options.max === undefined ? 1 : this.options.max;
        const maxZoom = this.options.maxZoom === undefined ? this._map.getMaxZoom() : this.options.maxZoom;
        const v = 1 / Math.pow(2, Math.max(0, Math.min(maxZoom - this._map.getZoom(), 12)));
        const cellSize = r / 2;
        const grid = [];
        const panePos = this._map._getMapPanePos();
        const offsetX = panePos.x % cellSize;
        const offsetY = panePos.y % cellSize;
        let i;
        let len;
        let p;
        let cell;
        let x;
        let y;
        let j;
        let len2;
        let k;

        // console.time('process');
        for (i = 0, len = this._latlngs.length; i < len; i++) {
            p = this._map.latLngToContainerPoint(this._latlngs[i]);
            if (bounds.contains(p)) {
                x = Math.floor((p.x - offsetX) / cellSize) + 2;
                y = Math.floor((p.y - offsetY) / cellSize) + 2;

                const alt =
                    this._latlngs[i].alt !== undefined ? this._latlngs[i].alt :
                        this._latlngs[i][2] !== undefined ? +this._latlngs[i][2] : 1;
                k = alt * v;

                grid[y] = grid[y] || [];
                cell = grid[y][x];

                if (!cell) {
                    grid[y][x] = [p.x, p.y, k];

                } else {
                    cell[0] = (cell[0] * cell[2] + p.x * k) / (cell[2] + k); // x
                    cell[1] = (cell[1] * cell[2] + p.y * k) / (cell[2] + k); // y
                    cell[2] += k; // cumulated intensity value
                }
            }
        }

        for (i = 0, len = grid.length; i < len; i++) {
            if (grid[i]) {
                for (j = 0, len2 = grid[i].length; j < len2; j++) {
                    cell = grid[i][j];
                    if (cell) {
                        data.push([
                            Math.round(cell[0]),
                            Math.round(cell[1]),
                            Math.min(cell[2], max)
                        ]);
                    }
                }
            }
        }
        // console.timeEnd('process');

        // console.time('draw ' + data.length);
        this._heat.data(data).draw(this.options.minOpacity);
        // console.timeEnd('draw ' + data.length);

        this._frame = null;
    }

    _animateZoom(e) {
        const scale = this._map.getZoomScale(e.zoom);
        const offset = this._map._getCenterOffset(e.center)._multiplyBy(-scale).subtract(this._map._getMapPanePos());

        if (L.DomUtil.setTransform) {
            L.DomUtil.setTransform(this._canvas, offset, scale);

        } else {
            this._canvas.style[L.DomUtil.TRANSFORM] = (L.DomUtil as any).getTranslateString(offset) + " scale(" + scale + ")";
        }
    }
}
