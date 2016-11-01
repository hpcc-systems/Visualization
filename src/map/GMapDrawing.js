"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./GMapLayered"], factory);
    } else {
        root.map_GMapDrawing = factory(root.d3, root.mapLayered);
    }
}(this, function (d3, mapLayered) {
    
    function GMapDrawing() {
        mapLayered.call(this);
    }
    
    GMapDrawing.prototype = Object.create(mapLayered.prototype);
    GMapDrawing.prototype.constructor = GMapDrawing;
    GMapDrawing.prototype._class += " map_GMapDrawing";

    GMapDrawing.prototype.getDrawingTools = function(drawingOptionsObj) {
        var drawingToolManager = new google.maps.drawing.DrawingManager(drawingOptionsObj);
        drawingToolManager.setMap(this._googleMap);
        return drawingToolManager;
    };
    
    return GMapDrawing;
}));
