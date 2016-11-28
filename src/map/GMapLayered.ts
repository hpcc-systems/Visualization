import * as d3 from "d3";
import { GMap } from "./GMap";
import { SVGWidget } from "../common/SVGWidget";

var zoomFactor = 1 / (1 << 4);
var projectionFactor = 1 << 12;
function Layered() {
    SVGWidget.call(this);
    this._drawStartPos = "origin";
}
Layered.prototype = Object.create(SVGWidget.prototype);
Layered.prototype.constructor = Layered;
Layered.prototype._class += " map_Layered map_GMapLayered";

Layered.prototype.enter = function (domNode, element) {
    SVGWidget.prototype.enter.apply(this, arguments);
    this._zoom = d3.behavior.zoom()
        .translate([0, 0])
        .scale(1)
        ;
    this._d3GeoProjection = d3.geo.mercator()
        .scale(projectionFactor / 2 / Math.PI)
        .translate([0, 0])
        ;
    this._d3GeoPath = d3.geo.path()
        .projection(this._d3GeoProjection)
        ;
};

Layered.prototype.update = function (domNode, element) {
    SVGWidget.prototype.update.apply(this, arguments);
    this._hasZoomed = true;
    if (!this._hasRendered) {
        this.fullRender();
    } else {
        this.zoomed();
    }
};

Layered.prototype.preRender = function (callback) {
    return Promise.all(this.gmap.layers().filter(function (layer) {
        return layer.visible();
    }).map(function (layer) {
        return layer.layerPreRender();
    }));
};

Layered.prototype.fullRender = function () {
    if (!this._hasZoomed) return;
    this._hasRendered = true;

    this.size(this.gmap.size());
    var layers = this._element.selectAll(".layerContainer").data(this.gmap.layers().filter(function (layer) { return layer.visible(); }), function (d) { return d.id(); });
    var context = this;
    layers.enter().append("g")
        .attr("class", "layerContainer")
        .each(function (d) {
            var svgElement = d3.select(this);
            var domElement = context._parentOverlay.append("div");
            d.layerEnter(context, svgElement, domElement);
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
        })
        .remove()
        ;
    this.zoomed();
};

Layered.prototype.zoomed = function () {
    var projection = this.gmap._overlay.getProjection();
    if (projection) {
        var center = new google.maps.LatLng(0, 0);
        var pos = projection.fromLatLngToDivPixel(center);
        var widgetX = parseFloat(this.surface.widgetX());
        var widgetY = parseFloat(this.surface.widgetY());
        var translate = [(pos.x - widgetX), (pos.y - widgetY)];

        var zoom = this.gmap._googleMap.getZoom();
        this._zoom
            .scale(zoomFactor * (1 << zoom))
            .translate(translate)
            ;

        var layers = this._element.selectAll(".layerContainer");
        var context = this;
        layers
            .each(function (d) {
                d.layerZoomed(context);
            })
            ;
    }
};

Layered.prototype.projection = function () {
    return "mercator";
};

Layered.prototype.project = function (lat, long) {
    var retVal = this.surface.project(lat, long);
    return [retVal.x, retVal.y];
};

export function GMapLayered() {
    GMap.call(this);

    this._layers = [];
}
GMapLayered.prototype = Object.create(GMap.prototype);
GMapLayered.prototype.constructor = GMapLayered;
GMapLayered.prototype._class += " map_GMapLayered";

GMapLayered.prototype.updateCircles = function () { };
GMapLayered.prototype.updatePins = function () { };

GMapLayered.prototype.layers = function (_) {
    if (!arguments.length) return this._layers;
    this._layers = _;
    return this;
};

GMapLayered.prototype.enter = function () {
    GMap.prototype.enter.apply(this, arguments);

    this.layered = new Layered();
    this.layered.gmap = this;
    this.layered.surface = this._viewportSurface;

    this.layered.surface.widget(this.layered).render();
};

GMapLayered.prototype.render = function (callback) {
    var context = this;
    var retVal = GMap.prototype.render.call(this, function (w) {
        context.layered.preRender().then(function () {
            context.layered.fullRender();
            if (callback) {
                callback(w);
            }
        });
    });
    return retVal;
};
