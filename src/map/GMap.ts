import * as d3 from "d3";
import { HTMLWidget } from "../common/HTMLWidget";
import { AbsoluteSurface } from "../layout/AbsoluteSurface";

import "./GMap.css;

function createOverlay(map, worldSurface, viewportSurface) {
    function Overlay(map, worldSurface, viewportSurface) {
        google.maps.OverlayView.call(this);
        this._div = null;

        this._worldSurface = worldSurface;
        this._viewportSurface = viewportSurface;

        this._map = map;
        this.setMap(map);

        var context = this;
        google.maps.event.addListener(map, "bounds_changed", function () {
            context.draw();
        });
        google.maps.event.addListener(map, "projection_changed", function () {
            context.draw();
        });

        this._prevWorldMin = { x: 0, y: 0 };
        this._prevWorldMax = { x: 0, y: 0 };
        this._prevMin = { x: 0, y: 0 };
        this._prevMax = { x: 0, y: 0 };
    }
    Overlay.prototype = google.maps.OverlayView.prototype;

    Overlay.prototype.onAdd = function () {
        this.div = document.createElement("div");

        this._viewportSurface
            .target(this.div)
            .units("pixels");

        var panes = this.getPanes();
        panes.overlayMouseTarget.appendChild(this.div);
    };

    Overlay.prototype.draw = function () {
        var projection = this.getProjection();
        if (!projection)
            return;

        var bounds = this._map.getBounds();
        var center = projection.fromLatLngToDivPixel(bounds.getCenter());
        var sw = projection.fromLatLngToDivPixel(bounds.getSouthWest());
        var ne = projection.fromLatLngToDivPixel(bounds.getNorthEast());

        var min = {
            x: sw.x,
            y: ne.y
        };
        var max = {
            x: ne.x,
            y: sw.y
        };

        var worldWidth = projection.getWorldWidth();
        while (max.x < min.x + 100) {  //  Ignoe dateline from being the rect.
            max.x += worldWidth;
        }
        while (min.x > center.x) {
            min.x -= worldWidth;
            max.x -= worldWidth;
        }

        if (min.x !== this._prevMin.x || min.y !== this._prevMin.y || max.x !== this._prevMax.x || max.y !== this._prevMax.y) {
            this._viewportSurface
                .widgetX(min.x)
                .widgetY(min.y)
                .widgetWidth(max.x - min.x)
                .widgetHeight(max.y - min.y)
                ;
            //  FF Issue on initial render (GH-1855) ---
            if (this._viewportSurface._renderCount) {
                this._viewportSurface.render();
                this._prevMin = min;
                this._prevMax = max;
            } else {
                this._viewportSurface.lazyRender();
            }
        }

        var worldMin = projection.fromLatLngToDivPixel(new google.maps.LatLng(85, -179.9));
        var worldMax = projection.fromLatLngToDivPixel(new google.maps.LatLng(-85, 179.9));
        while (worldMax.x < worldMin.x + 100) {  //  Ignoe dateline from being the rect.
            worldMax.x += worldWidth;
        }
        while (worldMin.x > center.x) {
            worldMin.x -= worldWidth;
            worldMax.x -= worldWidth;
        }
        if (worldMin.x !== this._prevWorldMin.x || worldMin.y !== this._prevWorldMin.y || worldMax.x !== this._prevWorldMax.x || worldMax.y !== this._prevWorldMax.y) {
            this._worldSurface
                .widgetX(worldMin.x)
                .widgetY(worldMin.y)
                .widgetWidth(worldMax.x - worldMin.x)
                .widgetHeight(worldMax.y - worldMin.y)
                .render()
                ;
            this._prevWorldMin = worldMax;
            this._prevWorldMax = worldMax;
        }
    };

    Overlay.prototype.onRemove = function () {
        this._viewportSurface.target(null);
        this._div.parentNode.removeChild(this._div);
        this._div = null;
    };

    return new Overlay(map, worldSurface, viewportSurface);
}

function UserShapeSelectionBag(mapObj) {
    this._userShapes = [];
    this.mapContext = mapObj;
}

UserShapeSelectionBag.prototype.add = function (_) {
    var idx = this._userShapes.indexOf(_);
    if (idx >= 0) {
        return;
    }
    this._userShapes.push(_);
};

UserShapeSelectionBag.prototype.remove = function (_) {
    var idx = this._userShapes.indexOf(_);
    if (idx >= 0) {
        this._userShapes.splice(idx, 1);
    }
    _.setMap(null);
};

UserShapeSelectionBag.prototype.save = function () {
    return this._userShapes.map(function (shape) {
        return UserShapeSelectionBag.prototype._saveShape(shape);
    });
};

UserShapeSelectionBag.prototype.load = function (_) {
    this._deserializeShapes(_);
};

UserShapeSelectionBag.prototype._saveShape = function (_) {
    var retVal: any = {};

    var createShapes = {
        "circle": function (_) {
            retVal.type = "circle";
            retVal.pos = {
                lat: _.center.lat(),
                lng: _.center.lng()
            };
            retVal.radius = _.radius;
        },
        "rectangle": function (_) {
            retVal.type = "rectangle";
            retVal.bounds = {
                ne: _.bounds.getNorthEast(),
                sw: _.bounds.getSouthWest()
            };
        },
        "polygon": function (_) {
            retVal.type = _.__hpcc_type;

            var vertices = _.getPath();

            retVal.vertices = [];

            for (var i = 0; i < vertices.length; i++) {
                retVal.vertices.push(vertices.getAt(i));
            }
        },
        "polyline": function (_) {
            createShapes.polygon(_);
        }
    };

    createShapes[_.__hpcc_type](_);
    retVal.strokeWeight = _.strokeWeight;
    retVal.fillColor = _.fillColor;
    retVal.fillOpacity = _.fillOpacity;
    retVal.editable = _.editable;
    retVal.clickable = _.clickable || true;

    return retVal;
};

UserShapeSelectionBag.prototype._deserializeShapes = function (_) {

    var shapes = JSON.parse(_);

    var defOptions = {
        strokeWeight: 0,
        fillOpacity: 0.45,
        fillColor: "#1f77b4",
        editable: true,
        clickable: true
    };

    var createShapes = {
        "circle": function (_, map) {
            var shape = new google.maps.Circle({
                strokeWeight: _.strokeWeight || defOptions.strokeWeight,
                fillColor: _.fillColor || defOptions.fillColor,
                fillOpacity: _.fillOpacity || defOptions.fillOpacity,
                editable: _.editable || defOptions.editable,
                clickable: _.clickable || defOptions.clickable,
                map: map,
                center: _.pos,
                radius: _.radius
            });
            return shape;
        },
        "rectangle": function (_, map) {
            var shape = new google.maps.Rectangle({
                strokeWeight: _.strokeWeight || defOptions.strokeWeight,
                fillColor: _.fillColor || defOptions.fillColor,
                fillOpacity: _.fillOpacity || defOptions.fillOpacity,
                editable: _.editable || defOptions.editable,
                clickable: _.clickable || defOptions.clickable,
                map: map,
                bounds: {
                    north: _.bounds.ne.lat,
                    west: _.bounds.sw.lng,
                    south: _.bounds.sw.lat,
                    east: _.bounds.ne.lng
                }
            });
            return shape;
        },
        "polygon": function (_, map) {
            var shape = new google.maps.Polygon({
                strokeWeight: _.strokeWeight || defOptions.strokeWeight,
                fillColor: _.fillColor || defOptions.fillColor,
                fillOpacity: _.fillOpacity || defOptions.fillOpacity,
                editable: _.editable || defOptions.editable,
                clickable: _.clickable || defOptions.clickable,
                map: map,
                paths: _.vertices
            });
            return shape;
        },
        "polyline": function (_, map) {
            var shape = new google.maps.Polyline({
                strokeWeight: _.strokeWeight || defOptions.strokeWeight,
                fillColor: _.fillColor || defOptions.fillColor,
                fillOpacity: _.fillOpacity || defOptions.fillOpacity,
                editable: _.editable || defOptions.editable,
                clickable: _.clickable || defOptions.clickable,
                map: map,
                path: _.vertices
            });
            return shape;
        }
    };

    for (var i = 0; i < shapes.length; i++) {
        var shape = createShapes[shapes[i].type](shapes[i], this.mapContext._googleMap);
        this.mapContext.onDrawingComplete({ type: shapes[i].type, overlay: shape });
    }
};

export function GMap() {
    HTMLWidget.call(this);

    this._tag = "div";

    var context = this;
    function calcProjection(surface, lat, long) {
        var projection = context._overlay.getProjection();
        var retVal = projection.fromLatLngToDivPixel(new google.maps.LatLng(lat, long));
        var worldWidth = projection.getWorldWidth();
        var widgetX = parseFloat(surface.widgetX());
        var widgetY = parseFloat(surface.widgetY());
        var widgetWidth = parseFloat(surface.widgetWidth());
        retVal.x -= widgetX;
        retVal.y -= widgetY;
        while (retVal.x < 0) {
            retVal.x += worldWidth;
        }
        while (retVal.x > widgetWidth) {
            retVal.x -= worldWidth;
        }
        return retVal;
    }

    this._userShapes = new UserShapeSelectionBag(this);

    this._worldSurface = new AbsoluteSurface();
    this._worldSurface.project = function (lat, long) {
        return calcProjection(this, lat, long);
    };

    this._viewportSurface = new AbsoluteSurface();
    this._viewportSurface.project = function (lat, long) {
        return calcProjection(this, lat, long);
    };
}
GMap.prototype = Object.create(HTMLWidget.prototype);
GMap.prototype.constructor = GMap;
GMap.prototype._class += " map_GMap";

GMap.prototype.publish("type", "road", "set", "Map Type", ["terrain", "road", "satellite", "hybrid"], { tags: ["Basic"] });
GMap.prototype.publish("centerLat", 42.877742, "number", "Center Latitude", null, { tags: ["Basic"] });
GMap.prototype.publish("centerLong", -97.380979, "number", "Center Longtitude", null, { tags: ["Basic"] });
GMap.prototype.publish("centerAddress", null, "string", "Address to center map on", null, { tags: ["Basic"], optional: true });
GMap.prototype.publish("zoom", 4, "number", "Zoom Level", null, { tags: ["Basic"] });
    GMap.prototype.publish("singleZoomToMaxZoom", 14, "number", "Max zoomTo level with single item");
GMap.prototype.publish("panControl", true, "boolean", "Pan Controls", null, { tags: ["Basic"] });
GMap.prototype.publish("zoomControl", true, "boolean", "Zoom Controls", null, { tags: ["Basic"] });
GMap.prototype.publish("scaleControl", true, "boolean", "Scale Controls", null, { tags: ["Basic"] });
GMap.prototype.publish("mapTypeControl", false, "boolean", "Map Type Controls", null, { tags: ["Basic"] });
GMap.prototype.publish("fullscreenControl", false, "boolean", "Fullscreen Controls", null, { tags: ["Basic"] });
GMap.prototype.publish("streetViewControl", false, "boolean", "StreetView Controls", null, { tags: ["Basic"] });
GMap.prototype.publish("overviewMapControl", false, "boolean", "OverviewMap Controls", null, { tags: ["Basic"] });
GMap.prototype.publish("streetView", false, "boolean", "Streetview", null, { tags: ["Basic"] });
GMap.prototype.publish("drawingTools", false, "boolean", "Drawing Tools", null, { tags: ["Basic"] });
GMap.prototype.publish("drawingState", "", "string", "Map Drawings", null, { disabel: function (w) { return w.drawingTools() === false; } });

GMap.prototype.publish("googleMapStyles", {}, "object", "Styling for map colors etc", null, { tags: ["Basic"] });

GMap.prototype.data = function (_) {
    var retVal = HTMLWidget.prototype.data.apply(this, arguments);
    return retVal;
};

GMap.prototype.getMapType = function () {
    switch (this.type()) {
        case "terrain":
            return google.maps.MapTypeId.TERRAIN;
        case "road":
            return google.maps.MapTypeId.ROADMAP;
        case "satellite":
            return google.maps.MapTypeId.SATELLITE;
        case "hybrid":
            return google.maps.MapTypeId.HYBRID;
        default:
            return google.maps.MapTypeId.ROADMAP;
    }
};

GMap.prototype.getMapOptions = function () {
    return {
        panControl: this.panControl(),
        zoomControl: this.zoomControl(),
        fullscreenControl: this.fullscreenControl(),
        mapTypeControl: this.mapTypeControl(),
        scaleControl: this.scaleControl(),
        streetViewControl: this.streetViewControl(),
        overviewMapControl: this.overviewMapControl(),
        overviewMapControlOptions: { opened: true },
        styles: this.googleMapStyles()
    };
};

GMap.prototype.size = function (_) {
    var retVal = HTMLWidget.prototype.size.apply(this, arguments);
    if (arguments.length && this._googleMapNode) {
        this._googleMapNode.style({
            width: _.width + "px",
            height: _.height + "px",
        });
        google.maps.event.trigger(this._googleMap, "resize");
    }
    return retVal;
};

GMap.prototype.enter = function (domNode, element) {
    HTMLWidget.prototype.enter.apply(this, arguments);
    var context = this;
    this._googleGeocoder = new google.maps.Geocoder();
    this._googleMapNode = element.append("div")
        .style({
            width: this.width() + "px",
            height: this.height() + "px"
        })
        ;
    this._googleMap = new google.maps.Map(this._googleMapNode.node(), {
        zoom: this.zoom(),
        center: new google.maps.LatLng(this.centerLat(), this.centerLong()),
        mapTypeId: this.getMapType(),
        disableDefaultUI: true
    });
    this._overlay = createOverlay(this._googleMap, this._worldSurface, this._viewportSurface);
    this._googleMap.addListener("center_changed", function () {
        context.centerLat(context._googleMap.center.lat());
        context._prevCenterLat = context.centerLat();
        context.centerLong(context._googleMap.center.lng());
        context._prevCenterLong = context.centerLong();
        context._googleMapPanorama.setPosition({ lat: context.centerLat(), lng: context.centerLong() });
        context.zoom(context._googleMap.getZoom());
        context._prevZoom = context.zoom();
    });
    this._googleMap.addListener("zoom_changed", function () {
        context.zoom(context._googleMap.zoom);
        context._prevZoom = context.zoom();
    });
        this._googleStreetViewService = new google.maps.StreetViewService();
    this._googleMapPanorama = this._googleMap.getStreetView();
    this._googleMapPanorama.addListener("visible_changed", function () {
        context.streetView(context._googleMapPanorama.getVisible());
        context._prevStreetView = context.streetView();
    });

    this._circleMap = d3.map([]);
    this._pinMap = d3.map([]);

    this._prevCenterLat = this.centerLat();
    this._prevCenterLong = this.centerLong();
    this._prevZoom = this.zoom();

    // Init drawing tools with default options.
    var defOptions = {
        strokeWeight: 0,
        fillOpacity: 0.45,
        fillColor: "#1f77b4",
        editable: true,
        clickable: true
    };
    this._drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.MARKER,
        drawingControl: true,
        drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: ["polygon", "rectangle", "circle"]
        },
        rectangleOptions: defOptions,
        circleOptions: defOptions,
        polygonOptions: defOptions
    });

    if (this.drawingState()) {
        this._userShapes.load(this.drawingState());
    }
};

GMap.prototype.update = function (domNode, element) {
    var context = this;
    this._googleMap.setMapTypeId(this.getMapType());
    this._googleMap.setOptions(this.getMapOptions());

    if (this.centerAddress_exists() && this._prevCenterAddress !== this.centerAddress()) {
        this._prevCenterAddress = this.centerAddress();
        this._googleGeocoder.geocode({ "address": this.centerAddress() }, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                context._googleMap.fitBounds(results[0].geometry.bounds);
            } else {
                console.error("Geocode was not successful for the following reason: " + status);
            }
        });
    }
    if (this._prevCenterLat !== this.centerLat() || this._prevCenterLong !== this.centerLong()) {
        this._googleMap.setCenter(new google.maps.LatLng(this.centerLat(), this.centerLong()));

        this._prevCenterLat = this.centerLat();
        this._prevCenterLong = this.centerLong();
    }
    if (this._prevZoom !== this.zoom()) {
        this._googleMap.setZoom(this.zoom());

        this._prevZoom = this.zoom();
    }
    this.updateCircles();
    this.updatePins();
    if (this._prevStreetView !== this.streetView()) {
        if (this.streetView()) {
            this._googleMapPanorama.setPosition({ lat: this.centerLat(), lng: this.centerLong() });
            this._googleMapPanorama.setPov({
                heading: 0,
                pitch: 0
            });
            this._googleMapPanorama.setVisible(true);
        } else {
            this._googleMapPanorama.setVisible(false);
        }
        this._prevStreetView = this.streetView();
    }

    // Enable or disable drawing tools.
    if (this.drawingTools()) {
        this._drawingManager.setMap(this._googleMap);

        // Add drawing complete listener to maintain array of drawingState.
        google.maps.event.addListener(
            this._drawingManager,
            "overlaycomplete",
            function () {
                GMap.prototype.onDrawingComplete.apply(context, arguments);
            });
    } else {
        this._drawingManager.setMap(null);
        google.maps.event.clearInstanceListeners(this._drawingManager);
    }
};

GMap.prototype.requireGoogleMap = function () {
    if (!this._googleMapPromise) {
        this._googleMapPromise = new Promise(function (resolve, reject) {
            if ((window as any).google && (window as any).google.maps) {
                resolve();
            }
            var protocol = window.location.protocol === "https:" ? "https:" : "http:";  //  Could be "file:"
            var __hpcc_gmap_apikey = __hpcc_gmap_apikey || "AIzaSyDwGn2i1i_pMZvnqYJN1BksD_tjYaCOWKg";
            require(["async!" + protocol + "//maps.google.com/maps/api/js?key=" + __hpcc_gmap_apikey + "&libraries=drawing,geometry"], function () {
                resolve();
            });
        });
    }
    return this._googleMapPromise;
};

GMap.prototype.render = function (callback) {
    var context = this;
    var args = arguments;
    this.requireGoogleMap().then(function () {
        HTMLWidget.prototype.render.apply(context, args);
    });
    return this;
};
    
    GMap.prototype.streetViewAt = function (pos, radius) {
        radius = radius || 1000;
        var context = this;
        this._googleStreetViewService.getPanorama({ location: pos, radius: radius }, function (data, status) {
            if (status === 'OK') {
                var marker = new google.maps.Marker({
                    position: pos,
                    map: context._googleMap
                });
                var heading = google.maps.geometry.spherical.computeHeading(data.location.latLng, new google.maps.LatLng(pos.lat, pos.lng));
                context._googleMapPanorama.setPano(data.location.pano);
                context._googleMapPanorama.setPov({
                    heading: heading,
                    pitch: 0
                });
                context._googleMapPanorama.setVisible(true);
                var listener = google.maps.event.addListener(context._googleMap.getStreetView(), 'visible_changed', function () {
                    if (!this.getVisible()) {
                        marker.setMap(null);
                        google.maps.event.removeListener(listener);
                    }
                });
            } else {
                console.error('Street View data not found for this location.');
            }
        });
    };

GMap.prototype.updateCircles = function () {
    function rowID(row) {
        return row[0] + "_" + row[1];
    }

    var circle_enter = [];
    var circle_update = [];
    var circle_exit = d3.map(this._circleMap.keys(), function (d) { return d; });
    this.data().forEach(function (row) {
        circle_exit.remove(rowID(row));
        if (row[3] && !this._circleMap.has(rowID(row))) {
            circle_enter.push(row);
        } else if (row[3] && this._circleMap.has(rowID(row))) {
            circle_update.push(row);
        } else if (!row[3] && this._circleMap.has(rowID(row))) {
            circle_exit.set(rowID(row), true);
        }
    }, this);

    circle_enter.forEach(function (row) {
        var marker = this.createCircle(row[0], row[1], row[3], "");
        this._circleMap.set(rowID(row), marker);
    }, this);

    circle_update.forEach(function (row) {
        //this._pinMap.get(rowID(row)).setIcon(this.createIcon(row[3]));
    }, this);

    var context = this;
    circle_exit.forEach(function (row) {
        context._circleMap.get(row).setMap(null);
        context._circleMap.remove(row);
    });
};

GMap.prototype.updatePins = function () {
    function rowID(row) {
        return row[0] + "_" + row[1];
    }

    var pin_enter = [];
    var pin_update = [];
    var pin_exit = d3.map(this._pinMap.keys(), function (d) { return d; });
    this.data().forEach(function (row) {
        pin_exit.remove(rowID(row));
        if (row[2] && !this._pinMap.has(rowID(row))) {
            pin_enter.push(row);
        } else if (row[2] && this._pinMap.has(rowID(row))) {
            pin_update.push(row);
        } else if (!row[2] && this._pinMap.has(rowID(row))) {
            pin_exit.set(rowID(row), true);
        }
    }, this);

    pin_enter.forEach(function (row) {
        var marker = this.createMarker(row[0], row[1], row[2], "");
        this._pinMap.set(rowID(row), marker);
    }, this);

    pin_update.forEach(function (row) {
        this._pinMap.get(rowID(row)).setIcon(this.createIcon(row[2]));
    }, this);

    var context = this;
    pin_exit.forEach(function (row) {
        context._pinMap.get(row).setMap(null);
        context._pinMap.remove(row);
    });
};

GMap.prototype.createIcon = function (pinObj) {
    return {
        path: "M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30", // a 2,2 0 1,1 4,0 2,2 0 1,1",
        fillColor: pinObj.fillColor,
        fillOpacity: pinObj.fillOpacity || 0.8,
        scale: 0.5,
        strokeColor: pinObj.strokeColor || "black",
        strokeWeight: 0.25
    };
};

GMap.prototype.createMarker = function (lat, lng, pinObj) {
    return new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng),
        animation: google.maps.Animation.DROP,
        title: pinObj.title || "",
        icon: this.createIcon(pinObj),
        map: this._googleMap,
    });
};

GMap.prototype.createCircle = function (lat, lng, circleObj) {
    return new google.maps.Circle({
        center: new google.maps.LatLng(lat, lng),
        radius: 16093 * circleObj.radius / 10,    // 16093 === 10 miles in metres
        fillColor: circleObj.fillColor || "red",
        strokeColor: circleObj.strokeColor || circleObj.fillColor || "black",
        strokeWeight: 0.5,
        map: this._googleMap
    });
};

    GMap.prototype.zoomTo = function (selection, singleMaxZoom) {
        singleMaxZoom = singleMaxZoom || this.singleZoomToMaxZoom();
    var foundCount = 0;
    var latlngbounds = new google.maps.LatLngBounds();
    selection.forEach(function (item) {
        var gLatLong = new google.maps.LatLng(item[0], item[1]);
        latlngbounds.extend(gLatLong);
        ++foundCount;
    });
        switch (foundCount) {
            case 0:
                break;
            case 1:
                this._googleMap.setCenter(latlngbounds.getCenter());
                this._googleMap.setZoom(singleMaxZoom);
                break;
            default:
                this._googleMap.fitBounds(latlngbounds);
        }
    return this;
};

GMap.prototype.zoomToFit = function () {
    return this.zoomTo(this.data());
};

GMap.prototype.drawingOptions = function (_) {
    if (!arguments.length) {
        return this._drawingManager;
    }
    this._drawingManager.setOptions(_);
    return this;
};

GMap.prototype.userShapeSelection = function (_) {
    if (!arguments.length) return this._userShapeSelection;
    if (this._userShapeSelection) {
        this._userShapeSelection.setEditable(false);
    }
    this._userShapeSelection = _;
    if (this._userShapeSelection) {
        this._userShapeSelection.setEditable(true);
    }
    return this;
};

GMap.prototype.deleteUserShape = function (_) {
    if (this._userShapeSelection === _) {
        this.userShapeSelection(null);
    }
    this._userShapes.remove(_);
};

GMap.prototype.onDrawingComplete = function (event) {
    if (event.type !== google.maps.drawing.OverlayType.MARKER) {
        this._drawingManager.setDrawingMode(null);
        var newShape = event.overlay;
        newShape.__hpcc_type = event.type;
        this._userShapes.add(newShape);
        var context = this;
        var ctrl = false;
        window.addEventListener("keydown", function (e: any) {
            if (e.keyIdentifier === "Control" || e.ctrlKey === true) {
                ctrl = true;
            }
        });
        window.addEventListener("keyup", function (e) {
            if (e.ctrlKey === false) {
                ctrl = false;
            }
        });
        google.maps.event.addListener(newShape, "click", function (ev) {
            context.userShapeSelection(newShape);
            if (ev && ctrl === true) {
                context.deleteUserShape(newShape);
                context.drawingState(
                    JSON.stringify(context._userShapes.save()));
            }
            return false;
        });
        this.userShapeSelection(newShape);
        this.drawingState(
            JSON.stringify(this._userShapes.save()));
    }
};
