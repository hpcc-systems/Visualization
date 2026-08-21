import { select as d3Select, zoomTransform as d3ZoomTransform } from "@hpcc-js/common";
import { geoMercator as d3GeoMercator } from "d3-geo";
import { tile as d3Tile, tileWrap as d3TileWrap } from "d3-tile";
import { LiteSVGZoomWidget } from "./liteSVGZooom.ts";

// @ts-expect-error
if (!window.__hpcc_mapbox_apikey) {
    console.warn("__hpcc_mapbox_apikey does not contain a valid API key, reverting to developers key (expect limited performance)");
}
// @ts-expect-error
const hpcc_mapbox_apikey = window.__hpcc_mapbox_apikey || "";

function url(x, y, z) {
    return `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/${z}/${x}/${y}${devicePixelRatio > 1 ? "@2x" : ""}?access_token=${hpcc_mapbox_apikey}`;
}

export class LiteMapWidget extends LiteSVGZoomWidget {

    protected _mapVisible = false;
    private _mapScale = 1 << 15;

    protected _levels: any;

    protected _projection = d3GeoMercator()
        .scale(this._mapScale / (2 * Math.PI))
        ;

    protected _tile = d3Tile()
        .tileSize(512)
        .clampX(false)
        ;

    project(lat: number, lng: number): [number, number] {
        return this._projection([lng, lat]);
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        this._zoom.scaleExtent([0.0078125, 4096]);
        const deltas = [-100, -4, -1, 0];
        this._levels = this._svgElement.insert("g", "g")
            .attr("pointer-events", "none")
            .selectAll("g").data(deltas)
            .join("g")
            ;

        this.mapZoomed(d3ZoomTransform(this._svgElement.node()));
    }

    mapZoomed(transform) {
        const { width, height } = this.size();

        const context = this;
        const mapTransform = transform.translate(width >> 1, height >> 1).scale(this._mapScale);
        this._levels.each(function (delta) {
            const tiles = context._mapVisible ? context._tile.zoomDelta(delta)(mapTransform) : [];
            d3Select(this).selectAll("image").data(tiles, d => d as any)
                .join("image")
                .attr("xlink:href", d => {
                    const tmp = d3TileWrap(d) as [number, number, number];
                    return url(...tmp);
                })
                .attr("x", ([x]) => (x + tiles.translate[0]) * tiles.scale)
                .attr("y", ([, y]) => (y + tiles.translate[1]) * tiles.scale)
                .attr("width", tiles.scale)
                .attr("height", tiles.scale)
                ;
        });

        this._projection
            .translate([width >> 1, height >> 1])
            ;
    }

    zoomed(transform) {
        super.zoomed(transform);
        this.mapZoomed(transform);
    }
}
