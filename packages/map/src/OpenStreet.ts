import { select as d3Select } from "d3-selection";
import { tile as d3Tile } from "d3-tile";
import { Layer } from "./Layer";

// import * as Utility from "./Utility";

// tslint:disable-next-line:no-bitwise
const constScale = 1 << 12;

import "../src/OpenStreet.css";

export class OpenStreet extends Layer {
    static _copyrightText = "© OpenStreetMap contributors";

    _tile;
    _openStreet;
    _copyright;
    _copyrightBBox;
    _prevTileProvider;
    _zoomLayerID: number = 0;
    _prevZoomLevel;

    constructor() {
        super();
        this.autoScaleMode("none");
    }

    layerEnter(base, svgElement, domElement) {
        Layer.prototype.layerEnter.apply(this, arguments);
        base.zoomExtent([0.1, constScale * 4]);

        this._openStreet = svgElement.append("g");
        this._copyright = svgElement.append("text")
            .attr("x", -100)
            .attr("y", -100)
            .style("opacity", 0.5)
            .text(OpenStreet._copyrightText)
            ;
        this._copyrightBBox = this._copyright.node().getBBox();
    }

    layerUpdate(base) {
        this._tile = d3Tile()
            .size([base.width(), base.height()])
            .wrap(false);
        if (!this.visible()) {
            this._copyright.text("");
        } else {
            this._copyright
                .attr("x", base.width() - this._copyrightBBox.width - this._copyrightBBox.height / 2)
                .attr("y", base.height() - this._copyrightBBox.height / 2)
                .text(OpenStreet._copyrightText)
                ;
        }
        this.layerZoomed(base);
    }

    layerZoomed(base) {
        const scale = base.zoomScale();
        const transform = base.zoomTranslate();
        const tiles = this._tile
            .scale(scale * constScale)
            .translate(transform)
            ();

        const tilesScale = tiles.scale / scale;
        const tilesTranslate = [
            tiles.translate[0] / tiles.scale,
            tiles.translate[1] / tiles.scale
        ];

        const zoomLevel = Math.round(tilesScale * 1000);
        if (this._prevZoomLevel !== zoomLevel) {
            this._prevZoomLevel = zoomLevel;
            this._zoomLayerID++;
        }
        const scaleG = this._openStreet.selectAll(".scaleG").data([this._zoomLayerID], d => d);
        const scaleGUpdate = scaleG.enter().append("g")
            .attr("class", "scaleG")
            .attr("transform", stringify(tilesScale, tilesTranslate))
            .each(function (d) {
                console.log(d);
            })
            .merge(scaleG)
            ;
        scaleG.exit()
            .style("opacity", 1)
            .transition().duration(1000)
            .style("opacity", 0)
            .on("end", function (d) {
                d3Select(this).selectAll(".image")
                    .attr("xlink:href", null)
                    ;
            })
            .remove();

        const image = scaleGUpdate
            .selectAll(".image")
            .data(tiles, function (d) {
                return "" + d.x + "," + d.y;
            })
            ;

        image.enter().append("image")
            .attr("class", "image")
            .style("opacity", 0)
            .attr("x", function (d) { return d.tx; })
            .attr("y", function (d) { return d.ty; })
            .attr("width", 256)
            .attr("height", 256)
            .attr("xlink:href", function (d) { return "http://" + "abc"[d.y % 3] + ".tile.openstreetmap.org/" + d.z + "/" + d.x + "/" + d.y + ".png"; })
            .each(function (d) {
                console.log("http://" + "abc"[d.y % 3] + ".tile.openstreetmap.org/" + d.z + "/" + d.x + "/" + d.y + ".png");
            })
            .transition().duration(500)
            .style("opacity", 1)
            ;
    }

    tileProvider: { (): string; (_: string): OpenStreet };
    tileProvider_exists: () => boolean;
}
OpenStreet.prototype._class += " map_OpenStreet";

OpenStreet.prototype.publish("tileProvider", "OpenStreetMap", "set", "Tile Provider", ["OpenStreetMap", "OpenStreetMap Hot", "MapQuest", "MapQuest Sat", "Stamen Watercolor", "OpenCycleMap"], { tags: ["Basic", "Shared"] });

function stringify(scale, translate) {
    const k = scale / 256;
    return "translate(" + -constScale / 2 + "," + -constScale / 2 + ") scale(" + k + ")";
}
