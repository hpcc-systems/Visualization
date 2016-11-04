"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./GMapLayered"], factory);
    } else {
        root.map_GMapDrawing = factory(root.d3, root.mapLayered);
    }
}(this, function (d3, mapLayered) {
    
    var _mapOverlays = [];
    
    /**
     * Constructor.
     */
    function GMapDrawing() {
        mapLayered.call(this);
    }
    
    GMapDrawing.prototype = Object.create(mapLayered.prototype);
    GMapDrawing.prototype.constructor = GMapDrawing;
    GMapDrawing.prototype._class += " map_GMapDrawing";
    
    /**
     * Add the map overlay just drawn to the internal array of overlays.
     * 
     * @param Google Maps Drawing Event event
     */
    GMapDrawing.prototype.handleDrawingComplete = function(event) {
        
        // Add the overlay to the array to allow for managing the overlays.
        _mapOverlays.push(event.overlay);
        
        // Publish the overlays on the prototype if it has not previously been
        // published.
        if (typeof GMapDrawing.prototype.overlays_exists === 'undefined') {
            GMapDrawing.prototype.publish("overlays",
                _mapOverlays,
                "array",
                "Map Overlays",
                null,
                { tags: ['Drawing'] });
        }
    };
    
    /**
     * Clears all overlays drawn on the map.
     */
    GMapDrawing.prototype.clearAllOverlays = function() {
        _mapOverlays.forEach(function(item) {
            item.setMap(null);
        });
        _mapOverlays.length = 0;
    };
    
    /**
     * Clears the last drawn overlay.
     */
    GMapDrawing.prototype.clearLastDrawnOverlay = function() {
        var overlay = _mapOverlays.pop();
        overlay.setMap(null);
    };

    /**
     * Initialize drawing tools.
     * 
     * @param Object drawingOptionsObj
     */
    GMapDrawing.prototype.initDrawingTools = function(drawingOptionsObj) {
        var drawingToolManager = 
                new google.maps.drawing.DrawingManager(drawingOptionsObj);
        drawingToolManager.setMap(this._googleMap);
        
        // Add drawing tools to prototype in case
        // further changes to config are needed.
        GMapDrawing.prototype.publish("drawingManager",
            drawingToolManager,
            "object",
            "Drawing Tools Manager",
            null,
            { tags: ['Drawing'] });
        
        // Add event listener for when drawings are completed
        // to maintain the running array of all overlays.
        google.maps.event.addListener(
            drawingToolManager,
            'overlaycomplete',
            this.handleDrawingComplete);
    };
    
    return GMapDrawing;
}));
