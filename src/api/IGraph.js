/**
 * @file Graph Interface
 * @author HPCC Systems
 */

"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        root.api_IGraph = factory();
    }
}(this, function () {
    /**
     * @interface api_IGraph
     * @class api_IGraph
     */
    function IGraph() {
    }

    /**
     * (event) Overridable click callback function for Graph Vertex (Icon)
     * @method vertex_click
     * @memberof api_IGraph
     * @param {type} row
     * @param {type} column
     */
    IGraph.prototype.vertex_click = function (d) {
        console.log("Vertex Click: " + d.id());
    };

    /**
     * (event) Overridable click callback function for Graph Edge (Line/Arrow).
     * @method edge_click
     * @memberof api_IGraph
     * @param {type} row
     * @param {type} column
     */
    IGraph.prototype.edge_click = function (d) {
        console.log("Edge Click: " + d.id());
    };

    return IGraph;
}));
