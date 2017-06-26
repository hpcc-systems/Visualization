import { geoGraticule as d3GeoGraticule } from "d3-geo";
import { select as d3Select } from "d3-selection";
import { Layer } from "./Layer";

import "../src/Graticule.css";

export class Graticule extends Layer {
    _dataMap = {};
    _path: any = d3Select(null);
    _graticule;
    _graticulePath;
    _graticuleOutlinePath;
    _prevProjection;

    constructor() {
        super();
    }

    layerEnter(base, svgElement, domElement) {
        Layer.prototype.layerEnter.apply(this, arguments);

        this._graticule = d3GeoGraticule();
        this._graticulePath = svgElement.append("path")
            .datum(this._graticule)
            .attr("class", "graticule")
            .attr("vector-effect", "non-scaling-stroke")
            ;
        this._graticuleOutlinePath = svgElement.append("path")
            .datum(this._graticule.outline)
            .attr("class", "graticuleOutline")
            .attr("vector-effect", "non-scaling-stroke")
            ;
    }

    layerUpdate(base) {
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
    }

    layerExit(base) {
        delete this._prevProjection;
    }

    /*
        layerZoomed(base) {
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
        }
    */
    opacity: { (): number; (_: number): Graticule };
    opacity_exists: () => boolean;
    meshColor: { (): string; (_: string): Graticule };
    meshColor_exists: () => boolean;
    meshStrokeWidth: { (): number; (_: number): Graticule };
    meshStrokeWidth_exists: () => boolean;
}
Graticule.prototype._class += " map_Graticule";

Graticule.prototype.publish("opacity", 1.0, "number", "Opacity", null, { tags: ["Advanced"] });

Graticule.prototype.publish("meshColor", null, "html-color", "Stroke Color", null, { optional: true });
Graticule.prototype.publish("meshStrokeWidth", 0.25, "number", "Stroke Width");
