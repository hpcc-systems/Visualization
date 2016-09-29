"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        root.api_IGraph = factory();
    }
}(this, function () {
    function IGraph() {
    }

    //  Events  ---
    IGraph.prototype.vertex_click = function (row, col, sel, more) {
        if (more && more.vertex) {
            console.log("Vertex Click: " + more.vertex.id());
        }
    };

    IGraph.prototype.edge_click = function (row, col, sel, more) {
        if (more && more.edge) {
            console.log("Edge Click: " + more.edge.id());
        }
    };

    return IGraph;
}));
