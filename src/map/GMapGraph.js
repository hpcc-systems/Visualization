"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./GMap", "../graph/Graph", "../graph/Edge", "../common/Shape"], factory);
    } else {
        root.map_GMapGraph = factory(root.map_GMap, root.graph_Graph, root.graph_Edge, root.common_Shape);
    }
}(this, function (GMap, Graph, Edge, Shape) {
    function GMapGraph() {
        GMap.call(this);
    }
    GMapGraph.prototype = Object.create(GMap.prototype);
    GMapGraph.prototype.constructor = GMapGraph;
    GMapGraph.prototype._class += " map_GMapGraph";

    GMapGraph.prototype.testData = function () {
        this.data([
            [37.665074, -122.384375, { fillColor: "green" }, null, 0.234],
            [32.690680, -117.178540, null, null, 0.234],
            [39.709455, -104.969859, null, null, 0.234],
            [41.244123, -95.961610, null, null, 0.234],
            [32.688980, -117.192040, null, null, 0.234],
            [45.786490, -108.526600, null, null, 0.234],
            [45.796180, -108.535652, null, null, 0.234],
            [45.774320, -108.494370, null, null, 0.234],
            [45.777062, -108.549835, { fillColor: "red" }, null, 0.234]
        ]);
        return this;
    };

    GMapGraph.prototype.enter = function () {
        GMap.prototype.enter.apply(this, arguments);
        var graph = new Graph()
            .layout("None")
        ;

        var origRender = graph.render;
        var context = this;
        graph.render = function () {
            var vertices = [];
            var edges = [];
            var prevAddr = null;
            context.data().forEach(function (row) {
                var pos2 = context._viewportSurface.project(row[0], row[1]);
                var newAddr = new Shape()
                    .shape("circle")
                    .radius(3)
                    .data(row)
                    .pos(pos2)
                ;
                vertices.push(newAddr);
                if (prevAddr) {
                    edges.push(new Edge()
                        .sourceVertex(prevAddr)
                        .targetVertex(newAddr)
                        .targetMarker("arrowHead")
                    );
                }
                prevAddr = newAddr;
            });
            this.data({ vertices: vertices, edges: edges });
            origRender.apply(this, arguments);
            this.graphData.nodeValues().forEach(function (vertex) {
                var pos = context._viewportSurface.project(vertex.data()[0], vertex.data()[1]);
                pos.x -= context.width() / 2;
                pos.y -= context.height() / 2;
                vertex.move(pos);
            });
            this.graphData.edgeValues().forEach(function (edge) {
                edge.points([]);
            });
        };

        this._viewportSurface.widget(graph);
    };

    return GMapGraph;
}));
