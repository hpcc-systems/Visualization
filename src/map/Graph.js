"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "topojson", "./Pins", "../graph/Graph", "../graph/Edge", "../common/Shape", "css!./Graph.css"], factory);
    } else {
        root.map_Graph = factory(root.d3, root.topojson, root.map_Pins, root.graph_Graph, root.graph_Edge, root.common_Shape);
    }
}(this, function (d3, topojson, Pins, GraphGraph, Edge, Shape) {
    function Graph() {
        Pins.call(this);
    }
    Graph.prototype = Object.create(Pins.prototype);
    Graph.prototype.constructor = Graph;
    Graph.prototype._class += " map_Graph";

    Graph.prototype.data = function (_) {
        var retVal = Pins.prototype.data.apply(this, arguments);
        if (arguments.length) {
            this.dataEdges = [];
            var prevPin = null;
            _.forEach(function (row) {
                if (prevPin) {
                    this.dataEdges.push({
                        type: "LineString",
                        coordinates: [[prevPin[1], prevPin[0]],[row[1], row[0]]]
                    });
                }
                prevPin = row;
            }, this);
        }
        return retVal;
    };

    Graph.prototype.layerEnter = function (base, svgElement, domElement) {
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
        this.edgesPaths = d3.select(null);
    };

    Graph.prototype.layerUpdate = function (base) {
        Pins.prototype.layerUpdate.apply(this, arguments);

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

    Graph.prototype.layerZoomed = function (base) {
        Pins.prototype.layerZoomed.apply(this, arguments);
        this._edgesTransform
            .attr("transform", "translate(" + base._zoom.translate() + ")scale(" + base._zoom.scale() + ")")
            .style("stroke-width", 0.5 / base._zoom.scale() + "px")
        ;
    };

    return Graph;
}));