import * as d3 from "d3";
import { Layer } from './Layer';
import "./Graticule.css";

export function Graticule() {
    Layer.call(this);

    this._dataMap = {};
    this._path = d3.select(null);
}
Graticule.prototype = Object.create(Layer.prototype);
Graticule.prototype.constructor = Graticule;
Graticule.prototype._class += " map_Graticule";

Graticule.prototype.publish("opacity", 1.0, "number", "Opacity", null, { tags: ["Advanced"] });

Graticule.prototype.publish("meshColor", null, "html-color", "Stroke Color", null, { optional: true });
Graticule.prototype.publish("meshStrokeWidth", 0.25, "number", "Stroke Width");

Graticule.prototype.layerEnter = function (base, svgElement, domElement) {
    Layer.prototype.layerEnter.apply(this, arguments);

    this._graticule = d3.geo.graticule();
    this._graticulePath = svgElement.append("path")
        .datum(this._graticule)
        .attr("class", "graticule")
        ;
    this._graticuleOutlinePath = svgElement.append("path")
        .datum(this._graticule.outline)
        .attr("class", "graticuleOutline")
        ;
};

Graticule.prototype.layerUpdate = function (base) {
    if (!this.visible()) {
        this._graticulePath.attr("d", "");
        this._graticuleOutlinePath.attr("d", "");
        delete this._prevProjection;
        return;
    }

    if (this._prevProjection !== base.projection()) {
        this._graticulePath
            .attr("d", base._d3GeoPath)
            ;
        this._graticuleOutlinePath
            .attr("d", base._d3GeoPath)
            ;
        this._prevProjection = base.projection();
    }
    this._graticulePath
        .style("stroke", this.meshColor())
        ;
    this._graticuleOutlinePath
        .style("stroke", this.meshColor())
        ;
};

Graticule.prototype.layerExit = function (base) {
    delete this._prevProjection;
};

Graticule.prototype.layerZoomed = function (base) {
    this._graticulePath
        .style("opacity", this.opacity())
        .attr("transform", "translate(" + base._zoom.translate() + ")scale(" + base._zoom.scale() + ")")
        .style("stroke-width", this.meshStrokeWidth() / base._zoom.scale() + "px")
        ;
    this._graticuleOutlinePath
        .style("opacity", this.opacity())
        .attr("transform", "translate(" + base._zoom.translate() + ")scale(" + base._zoom.scale() + ")")
        .style("stroke-width", this.meshStrokeWidth() / base._zoom.scale() + "px")
        ;
};
