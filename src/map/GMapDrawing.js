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
        
        // Optionally, a listener can be added to the overlay
        // to respond to click or other events.
        google.maps.event.addListener(
            event.overlay,
            'click',
            GMapDrawing.prototype.clearAllDrawings);
        
        // Add the overlay to the array to allow for managing the overlays.
        _mapOverlays.push(event.overlay);
    };
    
    /**
     * Clears all overlays drawn on the map.
     */
    GMapDrawing.prototype.clearAllDrawings = function() {
        _mapOverlays.forEach(function(item) {
            item.setMap(null);
        });
        _mapOverlays.length = 0;
    };
    
    /**
     * Clears the last drawn overlay.
     */
    GMapDrawing.prototype.clearLastDrawn = function() {
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
        GMapDrawing.prototype.publish("drawingManager", drawingToolManager, "object", "Drawing Tools Manager", null, { tags: ['Drawing'] });
        
        // Add event listener for when drawings are completed.
        google.maps.event.addListener(
            drawingToolManager,
            'overlaycomplete',
            this.handleDrawingComplete);
    };
    
    /**
     * Get the drawing overlays.
     * 
     * @returns Array | _mapOverlays | overlayArray
     */
    GMapDrawing.prototype.getMapOverlays = function() {
        return _mapOverlays;
    };
    
    /**
     * Set the drawing overlays.
     * 
     * @param Array overlayArray
     */
    GMapDrawing.prototype.setMapOverlays = function(overlayArray) {
        _mapOverlays  = overlayArray;
    };
    
    return GMapDrawing;
}));
