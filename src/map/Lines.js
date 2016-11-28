import * as d3 from "d3";
import { Layer } from './Layer';
import "css!./Lines";

export function Lines() {
    Layer.call(this);
}
Lines.prototype = Object.create(Layer.prototype);
Lines.prototype.constructor = Lines;
Lines.prototype._class += " map_Lines";

Lines.prototype.publish("opacity", 1.0, "number", "Opacity", null, { tags: ["Advanced"] });

Lines.prototype.data = function (_) {
    var retVal = Layer.prototype.data.apply(this, arguments);
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
};

Lines.prototype.layerEnter = function (base, svgElement, domElement) {
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
    this.edgesPaths = d3.select(null);
};

Lines.prototype.layerUpdate = function (base) {
    Layer.prototype.layerUpdate.apply(this, arguments);

    this._edgesTransform
        .style("opacity", this.opacity())
        ;

    this.edgesPaths = this._edgesTransform.selectAll(".dataEdge").data(this.visible() ? this.dataEdges : []);
    this.edgesPaths.enter().append("path")
        .attr("class", "dataEdge")
        .attr("marker-end", "url(#" + this._id + "_arrowHead)")
        ;
    this.edgesPaths
        .attr("d", base._d3GeoPath)
        ;
    this.edgesPaths.exit().remove();
};

Lines.prototype.layerZoomed = function (base) {
    Layer.prototype.layerZoomed.apply(this, arguments);
    this._edgesTransform
        .attr("transform", "translate(" + base._zoom.translate() + ")scale(" + base._zoom.scale() + ")")
        .style("stroke-width", 0.5 / base._zoom.scale() + "px")
        ;
};
