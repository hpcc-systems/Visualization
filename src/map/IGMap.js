"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["../common/Shape", "../graph/Edge"], factory);
    } else {
        root.map_IGMap = factory(root.common_Shape, root.graph_Edge);
    }
}(this, function (Shape, Edge) {
    function IGMap() {
    }

    //  Data ---
    IGMap.prototype.testData = function () {
        var addresses = [
            { "geo_lat": "37.665074", "geo_long": "-122.384375", __viz_markerIcon: "green-dot.png" },
            { "geo_lat": "32.690680", "geo_long": "-117.178540" },
            { "geo_lat": "39.709455", "geo_long": "-104.969859" },
            { "geo_lat": "41.244123", "geo_long": "-95.961610" },
            { "geo_lat": "32.688980", "geo_long": "-117.192040" },
            { "geo_lat": "45.786490", "geo_long": "-108.526600" },
            { "geo_lat": "45.796180", "geo_long": "-108.535652" },
            { "geo_lat": "45.774320", "geo_long": "-108.494370" },
            { "geo_lat": "45.777062", "geo_long": "-108.549835", __viz_markerIcon: "red-dot.png" }
        ];
        var vertices = [];
        var edges = [];
        var prevAddr = null;
        addresses.forEach(function (item) {
            var newAddr = new Shape()
                .shape("circle")
                .radius(3)
                .data(item)
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
        return this;
    };

    //  Properties  ---

    //  Events  ---
    IGMap.prototype.click = function (d) {
        console.log("Click:  " + d.label);
    };

    return IGMap;
}));
