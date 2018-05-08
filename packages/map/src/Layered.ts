import { SVGZoomWidget } from "@hpcc-js/common";
import { geoPath as d3GeoPath } from "d3-geo";
import { select as d3Select } from "d3-selection";
import { resolve, types as projectionTypes } from "./Projection";
import "./Utility"; // For albersUsaPr

import "../src/Layered.css";

// const zoomFactor = 1 / 4;
// tslint:disable-next-line:no-bitwise
const projectionFactor = (1 << 12) / 2 / Math.PI;

export class Layered extends SVGZoomWidget {
    _autoScaleOnNextRender;
    _layersTarget;
    _prevAutoScaleMode;
    _d3GeoProjection;

    constructor() {
        super();

        this._drawStartPos = "origin";
        this.projection("Mercator");
    }

    data(_?) {
        const retVal = super.data.apply(this, arguments);
        if (arguments.length) {
            this._autoScaleOnNextRender = true;
        }
        return retVal;
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        this._layersTarget = this._renderElement.append("g")
            .attr("class", "layersTarget")
            ;
    }

    update(domNode, element) {
        super.update(domNode, element);

        const layers = this._layersTarget.selectAll(".layerContainer").data(this.layers().filter(function (d) { return d.visible(); }), function (d) { return d.id(); });
        const context = this;
        layers.enter().append("g")
            .attr("id", function (d) { return d.id(); })
            .attr("class", "layerContainer")
            .each(function (d) {
                d._svgElement = d3Select(this);
                d._domElement = context._parentOverlay.append("div");
                d.layerEnter(context, d._svgElement, d._domElement);
            }).merge(layers)
            .each(function (d) {
                d.layerUpdate(context);
            })
            ;
        layers.exit()
            .each(function (d) {
                d.layerExit(context);
                d._domElement.remove();
            })
            .remove()
            ;
        layers.order();
        this.onZoomed();
    }

    exit(domNode, element) {
        super.exit(domNode, element);
    }

    onZoomed() {
        super.onZoomed();
        const layers = this._layersTarget.selectAll(".layerContainer");
        const context = this;
        layers
            .each(function (d) {
                d.layerZoomed(context);
            })
            ;
    }

    preRender(callback?) {
        return Promise.all(this.layers().filter(function (layer) {
            return layer.visible();
        }).map(function (layer) {
            return layer.layerPreRender();
        }));
    }

    render(callback?) {
        const context = this;
        this.preRender().then(function () {
            SVGZoomWidget.prototype.render.call(context, function (w) {
                if (context._layersTarget && ((context._renderCount && context._autoScaleOnNextRender) || context._prevAutoScaleMode !== context.autoScaleMode())) {
                    context._prevAutoScaleMode = context.autoScaleMode();
                    context._autoScaleOnNextRender = false;
                    context.autoScale();
                    if (callback) {
                        callback(w);
                    }
                } else {
                    if (callback) {
                        callback(w);
                    }
                }
            });
        });
        return this;
    }

    project(lat, long) {
        if (lat >= 90)
            lat = 89;
        else if (lat <= -90)
            lat = -89;
        const pos = this._d3GeoProjection([long, lat]);
        if (pos) {
            // pos[0] *= this._zoom.scale();
            // pos[1] *= this._zoom.scale();
            // pos[0] += this._zoom.translate()[0];
            // os[1] += this._zoom.translate()[1];
        }
        return pos;
    }

    invert(x, y) {
        // x -= this._zoom.translate()[0];
        // y -= this._zoom.translate()[1];
        // x /= this._zoom.scale();
        // y /= this._zoom.scale();
        return this._d3GeoProjection.invert([x, y]);
    }

    getBounds() {
        const bbox = this._layersTarget.node().getBBox();
        return {
            x: bbox.x,
            y: bbox.y,
            width: bbox.width,
            height: bbox.height
        };
    }

    autoScale() {
        switch (this.autoScaleMode()) {
            case "none":
                return;
            case "all":
                this.zoomToBBox(this.getBounds());
                break;
        }
    }
}
Layered.prototype._class += " map_Layered";

export interface Layered {
    projection(): string;
    projection(_: string): this;
    projection_exists(): boolean;
    centerLat(): number;
    centerLat(_: number): this;
    centerLat_exists(): boolean;
    centerLong(): number;
    centerLong(_: number): this;
    centerLong_exists(): boolean;
    zoom(): number;
    zoom(_: number): this;
    zoom_exists(): boolean;
    autoScaleMode(): string;
    autoScaleMode(_: string): this;
    autoScaleMode_exists(): boolean;
    layers(): any[];
    layers(_: any[]): this;
    layers_exists(): boolean;
}

Layered.prototype.publish("projection", null, "set", "Map projection type", projectionTypes);
Layered.prototype.publish("centerLat", 0, "number", "Center Latitude", null, { tags: ["Basic"] });
Layered.prototype.publish("centerLong", 0, "number", "Center Longtitude", null, { tags: ["Basic"] });
Layered.prototype.publish("zoom", 1, "number", "Zoom Level", null, { tags: ["Basic"] });
Layered.prototype.publish("autoScaleMode", "all", "set", "Auto Scale", ["none", "all"], { tags: ["Basic"] });
Layered.prototype.publish("layers", [], "widgetArray", "Layers", null, { render: false });

const projection_orig = Layered.prototype.projection;
Layered.prototype.projection = function (_?) {
    const retVal = projection_orig.apply(this, arguments);
    if (arguments.length) {
        this._d3GeoProjection = resolve(_)
            .scale(projectionFactor)
            .translate([0, 0])
            ;
        switch (_) {
            case "orthographic":
                this._d3GeoProjection
                    .clipAngle(90)
                    .rotate([0, 0])
                    ;
        }
        this._d3GeoPath = d3GeoPath()
            .projection(this._d3GeoProjection)
            ;
        this._autoScaleOnNextRender = true;
    }
    return retVal;
};
