import { Layer } from "./Layer";

import "../src/Lines.css";

export class Lines extends Layer {
    dataEdges;
    _edgesTransform;

    constructor() {
        super();
    }

    data(_) {
        const retVal = Layer.prototype.data.apply(this, arguments);
        if (arguments.length) {
            this.dataEdges = [];
            _.forEach(function (row) {
                this.dataEdges.push({
                    type: "LineString",
                    coordinates: [[row[1], row[0]], [row[3], row[2]]]
                });
            }, this);
        }
        return retVal;
    }

    layerEnter(base, svgElement, domElement) {
        Layer.prototype.layerEnter.apply(this, arguments);

        svgElement.append("defs").append("marker")
            .attr("class", "marker")
            .attr("id", this._id + "_arrowHead")
            .attr("viewBox", "0 0 10 10")
            .attr("refX", 10)
            .attr("refY", 5)
            .attr("markerWidth", 16)
            .attr("markerHeight", 16)
            .attr("markerUnits", "strokeWidth")
            .attr("orient", "auto")
            .append("polyline")
            .attr("points", "0,0 10,5 0,10 1,5")
            ;
        this._edgesTransform = svgElement.append("g");
    }

    _edgesPaths;
    layerUpdate(base) {
        Layer.prototype.layerUpdate.apply(this, arguments);

        this._edgesTransform
            .style("opacity", this.opacity())
            ;

        const edgesPaths = this._edgesTransform.selectAll(".dataEdge").data(this.visible() ? this.dataEdges : []);
        this._edgesPaths = edgesPaths.enter().append("path")
            .attr("class", "dataEdge")
            .attr("marker-end", "url(#" + this._id + "_arrowHead)")
            .merge(edgesPaths)
            .attr("d", base._d3GeoPath)
            ;
        edgesPaths.exit().remove();
    }

    layerZoomed(base) {
        Layer.prototype.layerZoomed.apply(this, arguments);
        this._edgesPaths
            .attr("stroke-width", `${0.5 / base.zoomScale()}px`)
            ;
    }

    opacity: { (): number; (_: number): Lines };
}
Lines.prototype._class += " map_Lines";

Lines.prototype.publish("opacity", 1.0, "number", "Opacity", null, { tags: ["Advanced"] });
