import * as d3 from "d3";
import { SVGWidget } from '../common/SVGWidget';
import "./Utility"; // For albersUsaPr
import "css!./Layered";

var zoomFactor = 1 / 4;
var projectionFactor = (1 << 12) / 2 / Math.PI;

export function Layered() {
    SVGWidget.call(this);

    this._drawStartPos = "origin";
    this.projection("mercator");

        var context = this;
        this._zoom = d3.behavior.zoom()
            .scaleExtent([0.25 * zoomFactor, 131072 * zoomFactor])
            .on("zoomstart", function (ev) {
                context._zoomstart_translate = context._zoom.translate();
                context._zoomstart_scale = context._zoom.scale();
            })
            .on("zoom", function () {
                if (d3.event && d3.event.sourceEvent && d3.event.sourceEvent.ctrlKey && d3.event.sourceEvent.type === "mousemove") {
                    context.render();
                    return;
                }
                context.zoomed();

                var x = context.width() / 2;
                var y = context.height() / 2;
                var mapCenterLongLat = context.invert(x, y);
                context.centerLong(mapCenterLongLat[0]);
                context.centerLat(mapCenterLongLat[1]);
                context.zoom(context._zoom.scale() / zoomFactor);

                context._prevCenterLong = context.centerLong();
                context._prevCenterLat = context.centerLat();
                context._prevZoom = context.zoom();
            })
            .on("zoomend", function () {
            })
        ;
    }
Layered.prototype = Object.create(SVGWidget.prototype);
Layered.prototype.constructor = Layered;
Layered.prototype._class += " map_Layered";

Layered.prototype.publish("projection", null, "set", "Map projection type", ["albersUsa", "albersUsaPr", "azimuthalEqualArea", "azimuthalEquidistant", "conicEqualArea", "conicConformal", "conicEquidistant", "equirectangular", "gnomonic", "mercator", "orthographic", "stereographic", "transverseMercator"]);
Layered.prototype.publish("centerLat", 0, "number", "Center Latitude", null, { tags: ["Basic"] });
Layered.prototype.publish("centerLong", 0, "number", "Center Longtitude", null, { tags: ["Basic"] });
Layered.prototype.publish("zoom", 1, "number", "Zoom Level", null, { tags: ["Basic"] });
Layered.prototype.publish("autoScaleMode", "all", "set", "Auto Scale", ["none", "all"], { tags: ["Basic"] });
Layered.prototype.publish("layers", [], "widgetArray", "Layers", null, { render: false });

Layered.prototype.data = function (_) {
    var retVal = SVGWidget.prototype.data.apply(this, arguments);
    if (arguments.length) {
        this._autoScaleOnNextRender = true;
    }
    return retVal;
};

Layered.prototype.projection_orig = Layered.prototype.projection;
Layered.prototype.projection = function (_) {
    var retVal = Layered.prototype.projection_orig.apply(this, arguments);
    if (arguments.length) {
        this._d3GeoProjection = d3.geo[_]()
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
        this._d3GeoPath = d3.geo.path()
            .projection(this._d3GeoProjection)
            ;
        this._autoScaleOnNextRender = true;
    }
    return retVal;
};

Layered.prototype.size = function (_) {
    var retVal = SVGWidget.prototype.size.apply(this, arguments);
    if (arguments.length) {
        delete this._prevCenterLat;
        delete this._prevCenterLong;
    }
    return retVal;
};

Layered.prototype.enter = function (domNode, element) {
    SVGWidget.prototype.enter.apply(this, arguments);

    this._zoomGrab = element.append("rect")
        .attr("class", "background")
        ;

    this._layersTarget = element.append("g")
        .attr("class", "layersTarget")
        ;

    element.call(this._zoom);
};

Layered.prototype.update = function (domNode, element) {
    SVGWidget.prototype.update.apply(this, arguments);
    if (this._prevCenterLat !== this.centerLat() || this._prevCenterLong !== this.centerLong() || this._prevZoom !== this.zoom()) {
        var projection = d3.geo[this.projection()]()
            .scale(this.zoom() * zoomFactor * projectionFactor)
            .translate([this.width() / 2, this.height() / 2])
            ;
        var center = projection([this.centerLong(), this.centerLat()]) || [this.width() / 2, this.height() / 2];

        this._zoom
            .scale(this.zoom() * zoomFactor)
            .translate([this.width() - center[0], this.height() - center[1]])
            ;
        this._prevCenterLat = this.centerLat();
        this._prevCenterLong = this.centerLong();
        this._prevZoom = this.zoom();
    }

    this._zoomGrab
        .attr("width", this.width())
        .attr("height", this.height())
        ;

    var layers = this._layersTarget.selectAll(".layerContainer").data(this.layers().filter(function (d) { return d.visible(); }), function (d) { return d.id(); });
    var context = this;
    layers.enter().append("g")
        .attr("id", function (d) { return d.id(); })
        .attr("class", "layerContainer")
        .each(function (d) {
            d._svgElement = d3.select(this);
            d._domElement = context._parentOverlay.append("div");
            d.layerEnter(context, d._svgElement, d._domElement);
        })
        ;
    layers
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
    this.zoomed();
};

Layered.prototype.exit = function (domNode, element) {
    SVGWidget.prototype.exit.apply(this, arguments);
};

Layered.prototype.zoomed = function () {
    var layers = this._layersTarget.selectAll(".layerContainer");
    var context = this;
    layers
        .each(function (d) {
            d.layerZoomed(context);
        })
        ;
};

    Layered.prototype.preRender = function (callback) {
        return Promise.all(this.layers().filter(function (layer) {
            return layer.visible();
        }).map(function (layer) {
            return layer.layerPreRender();
        }));
    };

Layered.prototype.render = function (callback) {
    var context = this;
        this.preRender().then(function () {
            SVGWidget.prototype.render.call(context, function (w) {
                if (context._layersTarget && ((context._renderCount && context._autoScaleOnNextRender) || context._prevAutoScaleMode !== context.autoScaleMode())) {
                    context._prevAutoScaleMode = context.autoScaleMode();
                    context._autoScaleOnNextRender = false;
                    setTimeout(function () {
                        context.autoScale();
                        context.autoScale();  //TODO Fix math in autoScale 
                        if (callback) {
                            callback(w);
                        }
                    }, 0);
                } else {
                    if (callback) {
                        callback(w);
                    }
                }
            });
        });
        return this;
};

Layered.prototype.project = function (lat, long) {
    if (lat >= 90)
        lat = 89;
    else if (lat <= -90)
        lat = -89;
    var pos = this._d3GeoProjection([long, lat]);
    if (pos) {
        pos[0] *= this._zoom.scale();
        pos[1] *= this._zoom.scale();
        pos[0] += this._zoom.translate()[0];
        pos[1] += this._zoom.translate()[1];
    }
    return pos;
};

Layered.prototype.invert = function (x, y) {
    x -= this._zoom.translate()[0];
    y -= this._zoom.translate()[1];
    x /= this._zoom.scale();
    y /= this._zoom.scale();
    return this._d3GeoProjection.invert([x, y]);
};

Layered.prototype.getBounds = function () {
    var bbox = this._layersTarget.node().getBBox();
    return {
        x: bbox.x,
        y: bbox.y,
        width: bbox.width,
        height: bbox.height
    };
};

Layered.prototype.autoScale = function () {
    switch (this.autoScaleMode()) {
        case "none":
            return;
        case "all":
            this.shrinkToFit(this.getBounds());
            break;
    }
};

Layered.prototype.shrinkToFit = function (rect) {
    if (rect.width && rect.height) {
        var width = this.width();
        var height = this.height();
        var translate = this._zoom.translate();
        var scale = this._zoom.scale();

        rect.x += rect.width / 2;
        rect.y += rect.height / 2;
        translate[0] -= (rect.x - width / 2);
        translate[1] -= (rect.y - height / 2);

        var newScale = scale * Math.min(width / rect.width, height / rect.height);
        this._zoom
            .translate(translate)
            .scale(newScale)
            .event(this._layersTarget)
            ;
    } else {
        console.log("Layered.prototype.shrinkToFit - invalid rect:  " + rect);
    }
};
