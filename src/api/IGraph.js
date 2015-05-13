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
    IGraph.prototype.vertex_click = function (d) {
        console.log("Vertex Click: " + d.id());
    };

    IGraph.prototype.edge_click = function (d) {
        console.log("Edge Click: " + d.id());
    };

    return IGraph;
}));
