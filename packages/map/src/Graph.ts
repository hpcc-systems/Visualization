import { Pins } from "./Pins";

import "../src/Graph.css";

export class Graph extends Pins {
    dataEdges = [];
    _edgesTransform;

    constructor() {
        super();
    }

    importJSON(_) {
        const retVal = Pins.prototype.importJSON.apply(this, arguments);
        if (arguments.length) {
            this.dataEdges = [];
            let prevPin = null;
            _.forEach(function (row) {
                if (prevPin) {
                    this.dataEdges.push({
                        type: "LineString",
                        coordinates: [[prevPin.long, prevPin.lat], [row.long, row.lat]]
                    });
                }
                if (row.eol) {
                    prevPin = null;
                } else {
                    prevPin = row;
                }
            }, this);
        }
        return retVal;
    }

    data(_) {
        const retVal = Pins.prototype.data.apply(this, arguments);
        if (arguments.length) {
            this.dataEdges = [];
            let prevPin = null;
            _.forEach(function (row) {
                if (prevPin) {
                    this.dataEdges.push({
                        type: "LineString",
                        coordinates: [[prevPin[1], prevPin[0]], [row[1], row[0]]]
                    });
                }
                prevPin = row;
            }, this);
        }
        return retVal;
    }

    layerEnter(base, svgElement, domElement) {
        Pins.prototype.layerEnter.apply(this, arguments);

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
        Pins.prototype.layerUpdate.apply(this, arguments);

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
        Pins.prototype.layerZoomed.apply(this, arguments);
        this._edgesPaths
            .attr("stroke-width", `${0.5 / base.zoomScale()}px`)
            ;
    }

}
Graph.prototype._class += " map_Graph";
