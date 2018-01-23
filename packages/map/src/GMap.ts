import { HTMLWidget } from "@hpcc-js/common";
import { AbsoluteSurface } from "@hpcc-js/layout";
import { map as d3Map } from "d3-collection";
import * as _GoogleMapsLoader from "google-maps";

const GoogleMapsLoader = _GoogleMapsLoader.default || _GoogleMapsLoader;

import "../src/GMap.css";

GoogleMapsLoader.KEY = (window as any).__hpcc_gmap_apikey || "AIzaSyDwGn2i1i_pMZvnqYJN1BksD_tjYaCOWKg";
GoogleMapsLoader.LIBRARIES = ["geometry", "drawing"];
let google: any = null;

function createOverlay(map, worldSurface, viewportSurface) {
    function Overlay(map2, worldSurface2, viewportSurface2) {
        google.maps.OverlayView.call(this);
        this._div = null;

        this._worldSurface = worldSurface2;
        this._viewportSurface = viewportSurface2;

        this._map = map2;
        this.setMap(map2);

        const context = this;
        google.maps.event.addListener(map2, "bounds_changed", function () {
            context.draw();
        });
        google.maps.event.addListener(map2, "projection_changed", function () {
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

        const panes = this.getPanes();
        panes.overlayMouseTarget.appendChild(this.div);
    };

    Overlay.prototype.draw = function () {
        const projection = this.getProjection();
        if (!projection)
            return;

        const bounds = this._map.getBounds();
        const center = projection.fromLatLngToDivPixel(bounds.getCenter());
        const sw = projection.fromLatLngToDivPixel(bounds.getSouthWest());
        const ne = projection.fromLatLngToDivPixel(bounds.getNorthEast());

        const min = {
            x: sw.x,
            y: ne.y
        };
        const max = {
            x: ne.x,
            y: sw.y
        };

        const worldWidth = projection.getWorldWidth();
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

        const worldMin = projection.fromLatLngToDivPixel(new google.maps.LatLng(85, -179.9));
        const worldMax = projection.fromLatLngToDivPixel(new google.maps.LatLng(-85, 179.9));
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

class UserShapeSelectionBag {
    _userShapes: any[];
    mapContext;

    constructor(mapObj) {
        this._userShapes = [];
        this.mapContext = mapObj;
    }

    add(_) {
        const idx = this._userShapes.indexOf(_);
        if (idx >= 0) {
            return;
        }
        this._userShapes.push(_);
    }

    remove(_) {
        const idx = this._userShapes.indexOf(_);
        if (idx >= 0) {
            this._userShapes.splice(idx, 1);
        }
        _.setMap(null);
    }

    save() {
        return this._userShapes.map(shape => this._saveShape(shape));
    }

    load(_) {
        this._deserializeShapes(_);
    }

    _saveShape(shape) {
        const retVal: any = {};

        const createShapes = {
            circle: (_) => {
                retVal.type = "circle";
                retVal.pos = {
                    lat: _.center.lat(),
                    lng: _.center.lng()
                };
                retVal.radius = _.radius;
            },
            rectangle: (_) => {
                retVal.type = "rectangle";
                retVal.bounds = {
                    ne: _.bounds.getNorthEast(),
                    sw: _.bounds.getSouthWest()
                };
            },
            polygon: (_) => {
                retVal.type = _.__hpcc_type;

                const vertices = _.getPath();

                retVal.vertices = [];

                for (let i = 0; i < vertices.length; i++) {
                    retVal.vertices.push(vertices.getAt(i));
                }
            },
            polyline: (_) => {
                createShapes.polygon(_);
            }
        };

        createShapes[shape.__hpcc_type](shape);
        retVal.strokeWeight = shape.strokeWeight;
        retVal.fillColor = shape.fillColor;
        retVal.fillOpacity = shape.fillOpacity;
        retVal.editable = shape.editable;
        retVal.clickable = shape.clickable || true;

        return retVal;
    }

    _deserializeShapes(_shapes) {

        const shapes = JSON.parse(_shapes);

        const defOptions = {
            strokeWeight: 0,
            fillOpacity: 0.45,
            fillColor: "#1f77b4",
            editable: true,
            clickable: true
        };

        const createShapes = {
            circle: (_, map) => {
                const shape = new google.maps.Circle({
                    strokeWeight: _.strokeWeight || defOptions.strokeWeight,
                    fillColor: _.fillColor || defOptions.fillColor,
                    fillOpacity: _.fillOpacity || defOptions.fillOpacity,
                    editable: _.editable || defOptions.editable,
                    clickable: _.clickable || defOptions.clickable,
                    map,
                    center: _.pos,
                    radius: _.radius
                });
                return shape;
            },
            rectangle: (_, map) => {
                const shape = new google.maps.Rectangle({
                    strokeWeight: _.strokeWeight || defOptions.strokeWeight,
                    fillColor: _.fillColor || defOptions.fillColor,
                    fillOpacity: _.fillOpacity || defOptions.fillOpacity,
                    editable: _.editable || defOptions.editable,
                    clickable: _.clickable || defOptions.clickable,
                    map,
                    bounds: {
                        north: _.bounds.ne.lat,
                        west: _.bounds.sw.lng,
                        south: _.bounds.sw.lat,
                        east: _.bounds.ne.lng
                    }
                });
                return shape;
            },
            polygon: (_, map) => {
                const shape = new google.maps.Polygon({
                    strokeWeight: _.strokeWeight || defOptions.strokeWeight,
                    fillColor: _.fillColor || defOptions.fillColor,
                    fillOpacity: _.fillOpacity || defOptions.fillOpacity,
                    editable: _.editable || defOptions.editable,
                    clickable: _.clickable || defOptions.clickable,
                    map,
                    paths: _.vertices
                });
                return shape;
            },
            polyline: (_, map) => {
                const shape = new google.maps.Polyline({
                    strokeWeight: _.strokeWeight || defOptions.strokeWeight,
                    fillColor: _.fillColor || defOptions.fillColor,
                    fillOpacity: _.fillOpacity || defOptions.fillOpacity,
                    editable: _.editable || defOptions.editable,
                    clickable: _.clickable || defOptions.clickable,
                    map,
                    path: _.vertices
                });
                return shape;
            }
        };

        for (let i = 0; i < shapes.length; i++) {
            const shape = createShapes[shapes[i].type](shapes[i], this.mapContext._googleMap);
            this.mapContext.onDrawingComplete({ type: shapes[i].type, overlay: shape });
        }
    }
}

export class GMap extends HTMLWidget {
    _overlay;
    _userShapes;
    _worldSurface;
    _viewportSurface;
    _googleMapNode;
    _googleMap;
    _googleGeocoder;
    _prevCenterLat;
    _prevCenterLong;
    _googleStreetViewService;
    _googleMapPanorama;
    _prevZoom;
    _prevStreetView;
    _circleMap;
    _pinMap;
    _drawingManager;
    _prevCenterAddress;
    _googleMapPromise;
    _userShapeSelection;

    constructor() {
        super();

        this._tag = "div";

        const context = this;
        function calcProjection(surface, lat, long) {
            const projection = context._overlay.getProjection();
            const retVal = projection.fromLatLngToDivPixel(new google.maps.LatLng(lat, long));
            const worldWidth = projection.getWorldWidth();
            const widgetX = parseFloat(surface.widgetX());
            const widgetY = parseFloat(surface.widgetY());
            const widgetWidth = parseFloat(surface.widgetWidth());
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

    data(_?) {
        const retVal = HTMLWidget.prototype.data.apply(this, arguments);
        return retVal;
    }

    getMapType() {
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
    }

    getMapOptions() {
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
    }

    size(_?) {
        const retVal = HTMLWidget.prototype.size.apply(this, arguments);
        if (arguments.length && this._googleMapNode) {
            this._googleMapNode.style({
                width: _.width + "px",
                height: _.height + "px",
            });
            google.maps.event.trigger(this._googleMap, "resize");
        }
        return retVal;
    }

    enter(domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        const context = this;
        this._googleGeocoder = new google.maps.Geocoder();
        this._googleMapNode = element.append("div")
            .style("width", this.width() + "px")
            .style("height", this.height() + "px")
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

        this._circleMap = d3Map([]);
        this._pinMap = d3Map([]);

        this._prevCenterLat = this.centerLat();
        this._prevCenterLong = this.centerLong();
        this._prevZoom = this.zoom();

        // Init drawing tools with default options.
        const defOptions = {
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
    }

    update(domNode, element) {
        const context = this;
        this._googleMapNode
            .style("width", this.width() + "px")
            .style("height", this.height() + "px")
            ;

        this._googleMap.setMapTypeId(this.getMapType());
        this._googleMap.setOptions(this.getMapOptions());

        if (this.centerAddress_exists() && this._prevCenterAddress !== this.centerAddress()) {
            this._prevCenterAddress = this.centerAddress();
            this._googleGeocoder.geocode({ address: this.centerAddress() }, function (results, status) {
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
    }

    requireGoogleMap() {
        if (!this._googleMapPromise) {
            this._googleMapPromise = new Promise(function (resolve, reject) {
                if (google) {
                    resolve();
                }
                GoogleMapsLoader.load(function (_google) {
                    google = _google;
                    resolve();
                });
            });
        }
        return this._googleMapPromise;
    }

    render(callback?) {
        const context = this;
        const args = arguments;
        this.requireGoogleMap().then(function () {
            HTMLWidget.prototype.render.apply(context, args);
        });
        return this;
    }

    streetViewAt(pos, radius = 1000) {
        const context = this;
        this._googleStreetViewService.getPanorama({ location: pos, radius }, function (data, status) {
            if (status === "OK") {
                const marker = new google.maps.Marker({
                    position: pos,
                    map: context._googleMap
                });
                const heading = google.maps.geometry.spherical.computeHeading(data.location.latLng, new google.maps.LatLng(pos.lat, pos.lng));
                context._googleMapPanorama.setPano(data.location.pano);
                context._googleMapPanorama.setPov({
                    heading,
                    pitch: 0
                });
                context._googleMapPanorama.setVisible(true);
                const listener = google.maps.event.addListener(context._googleMap.getStreetView(), "visible_changed", function () {
                    if (!this.getVisible()) {
                        marker.setMap(null);
                        google.maps.event.removeListener(listener);
                    }
                });
            } else {
                console.error("Street View data not found for this location.");
            }
        });
    }

    updateCircles() {
        function rowID(row) {
            return row[0] + "_" + row[1];
        }

        const circle_enter = [];
        const circle_update = [];
        const circle_exit = d3Map(this._circleMap.keys(), function (d: any) { return d; });
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
            const marker = this.createCircle(row[0], row[1], row[3]);
            this._circleMap.set(rowID(row), marker);
        }, this);

        circle_update.forEach(function (row) {
            // this._pinMap.get(rowID(row)).setIcon(this.createIcon(row[3]));
        }, this);

        const context = this;
        circle_exit.each(function (row) {
            context._circleMap.get(row).setMap(null);
            context._circleMap.remove(row);
        });
    }

    updatePins() {
        function rowID(row) {
            return row[0] + "_" + row[1];
        }

        const pin_enter = [];
        const pin_update = [];
        const pin_exit = d3Map(this._pinMap.keys(), function (d: any) { return d; });
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
            const marker = this.createMarker(row[0], row[1], row[2]);
            this._pinMap.set(rowID(row), marker);
        }, this);

        pin_update.forEach(function (row) {
            this._pinMap.get(rowID(row)).setIcon(this.createIcon(row[2]));
        }, this);

        const context = this;
        pin_exit.each(function (row) {
            context._pinMap.get(row).setMap(null);
            context._pinMap.remove(row);
        });
    }

    createIcon(pinObj: { fillColor: string; fillOpacity?: number; strokeColor?: string }) {
        return {
            path: "M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30", // a 2,2 0 1,1 4,0 2,2 0 1,1",
            fillColor: pinObj.fillColor,
            fillOpacity: pinObj.fillOpacity || 0.8,
            scale: 0.5,
            strokeColor: pinObj.strokeColor || "black",
            strokeWeight: 0.25
        };
    }

    createMarker(lat, lng, pinObj: { fillColor: string; fillOpacity?: number; strokeColor?: string; title?: string }) {
        return new google.maps.Marker({
            position: new google.maps.LatLng(lat, lng),
            animation: google.maps.Animation.DROP,
            title: pinObj.title || "",
            icon: this.createIcon(pinObj),
            map: this._googleMap,
        });
    }

    createCircle(lat, lng, circleObj: { radius?: number; fillColor?: string; strokeColor?: string }) {
        circleObj.radius = circleObj.radius || 1;
        return new google.maps.Circle({
            center: new google.maps.LatLng(lat, lng),
            radius: 16093 * circleObj.radius / 10,    // 16093 === 10 miles in metres
            fillColor: circleObj.fillColor || "red",
            strokeColor: circleObj.strokeColor || circleObj.fillColor || "black",
            strokeWeight: 0.5,
            map: this._googleMap
        });
    }

    zoomTo(selection, singleMaxZoom?) {
        if (!this._renderCount) return this;
        singleMaxZoom = singleMaxZoom || this.singleZoomToMaxZoom();
        let foundCount = 0;
        const latlngbounds = new google.maps.LatLngBounds();
        selection.forEach(function (item) {
            const gLatLong = new google.maps.LatLng(item[0], item[1]);
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
    }

    zoomToFit() {
        return this.zoomTo(this.data());
    }

    drawingOptions(_) {
        if (!arguments.length) {
            return this._drawingManager;
        }
        this._drawingManager.setOptions(_);
        return this;
    }

    userShapeSelection(_) {
        if (!arguments.length) return this._userShapeSelection;
        if (this._userShapeSelection) {
            this._userShapeSelection.setEditable(false);
        }
        this._userShapeSelection = _;
        if (this._userShapeSelection) {
            this._userShapeSelection.setEditable(true);
        }
        return this;
    }

    deleteUserShape(_) {
        if (this._userShapeSelection === _) {
            this.userShapeSelection(null);
        }
        this._userShapes.remove(_);
    }

    onDrawingComplete(event) {
        if (event.type !== google.maps.drawing.OverlayType.MARKER) {
            this._drawingManager.setDrawingMode(null);
            const newShape = event.overlay;
            newShape.__hpcc_type = event.type;
            this._userShapes.add(newShape);
            const context = this;
            let ctrl = false;
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
    }

    type_exists: () => boolean;
    centerLat_exists: () => boolean;
    centerLong_exists: () => boolean;
    centerAddress_exists: () => boolean;
    zoom_exists: () => boolean;
    panControl_exists: () => boolean;
    zoomControl_exists: () => boolean;
    scaleControl_exists: () => boolean;
    mapTypeControl_exists: () => boolean;
    fullscreenControl_exists: () => boolean;
    streetViewControl_exists: () => boolean;
    overviewMapControl_exists: () => boolean;
    streetView_exists: () => boolean;
    drawingTools_exists: () => boolean;
    drawingState_exists: () => boolean;
    googleMapStyles_exists: () => boolean;
}
GMap.prototype._class += " map_GMap";

export interface GMap {
    type(): string;
    type(_: string): this;
    centerLat(): number;
    centerLat(_: number): this;
    centerLong(): number;
    centerLong(_: number): this;
    centerAddress(): string;
    centerAddress(_: string): this;
    zoom(): number;
    zoom(_: number): this;
    singleZoomToMaxZoom(): number;
    singleZoomToMaxZoom(_: number): this;
    panControl(): boolean;
    panControl(_: boolean): this;
    zoomControl(): boolean;
    zoomControl(_: boolean): this;
    scaleControl(): boolean;
    scaleControl(_: boolean): this;
    mapTypeControl(): boolean;
    mapTypeControl(_: boolean): this;
    fullscreenControl(): boolean;
    fullscreenControl(_: boolean): this;
    streetViewControl(): boolean;
    streetViewControl(_: boolean): this;
    overviewMapControl(): boolean;
    overviewMapControl(_: boolean): this;
    streetView(): boolean;
    streetView(_: boolean): this;
    drawingTools(): boolean;
    drawingTools(_: boolean): this;
    drawingState(): string;
    drawingState(_: string): this;
    googleMapStyles(): object;
    googleMapStyles(_: object): this;
}
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
GMap.prototype.publish("drawingState", "", "string", "Map Drawings", null, { disable: w => w.drawingTools() === false });
GMap.prototype.publish("googleMapStyles", {}, "object", "Styling for map colors etc", null, { tags: ["Basic"] });
