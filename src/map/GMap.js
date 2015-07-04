"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/SVGWidget", "../graph/Graph", "./IGMap", "async!http://maps.google.com/maps/api/js?sensor=false", "css!./GMap"], factory);
    } else {
        root.map_GMap = factory(root.d3, root.common_SVGWidget, root.graph_Graph, root.map_IGMap);
    }
}(this, function (d3, SVGWidget, Graph, IGMap) {
    function GMap(target) {
        Graph.call(this);
        IGMap.call(this);

        this.layout("none");

        this._markers = [];
    }
    GMap.prototype = Object.create(Graph.prototype);
    GMap.prototype._class += " map_GMap";
    GMap.prototype.implements(IGMap.prototype);

    GMap.prototype.data = function (_) {
        if (arguments.length) {
            this.graphData.nodeValues().forEach(function (item) {
                if (item._marker) {
                    item._marker.setMap(null);
                }
            });
        }
        var retVal = Graph.prototype.data.apply(this, arguments);
        return retVal;
    };

    GMap.prototype.enter = function (domNode, element, d) {
        Graph.prototype.enter.apply(this, arguments);

        this._googleMap = new google.maps.Map(d3.select(this._target).node(), {
            zoom: 4,
            center: new google.maps.LatLng(42.877742, -97.380979),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        this._gmOverlay = new google.maps.OverlayView();

        var context = this;
        this._gmOverlay.onAdd = function () {
            context.layer = d3.select(this.getPanes().overlayLayer).append("div")
                .style("position", "absolute")
                .attr("class", "gmapLayer")
            ;
            //  Move SVG into Google Map Layer  ---
            context.layer.node().appendChild(context._parentElement.node());

            context._gmOverlay.draw = function () {
                var overlayProjection = context._gmOverlay.getProjection();

                var bounds_ = context._googleMap.getBounds();
                var sw = overlayProjection.fromLatLngToDivPixel(bounds_.getSouthWest());
                var ne = overlayProjection.fromLatLngToDivPixel(bounds_.getNorthEast());

                var div = context.layer.node();
                div.style.left = sw.x + "px";
                div.style.top = ne.y + "px";
                div.style.width = (ne.x - sw.x) + "px";
                div.style.height = (sw.y - ne.y) + "px";

                if (!context.firstRun) {
                    context.firstRun = true;
                    setTimeout(function () {
                        context.calcLatLong(sw.x, ne.y);
                        context.zoomToFit();
                    }, 100);
                } else {
                    context.calcLatLong(sw.x, ne.y);
                }
            };
            google.maps.event.addListener(context._googleMap, "center_changed", function () {
                context._gmOverlay.draw();
            });
        };
        this._gmOverlay.setMap(this._googleMap);
    };

    GMap.prototype.createMarker = function (lat, lng, icon, title) {
        return new google.maps.Marker({
            position: new google.maps.LatLng(lat, lng),
            animation: google.maps.Animation.DROP,
            title: title,
            icon: "http://maps.google.com/mapfiles/ms/icons/" + icon,
            map: this._googleMap,
        });
    };

    GMap.prototype.createCircle = function (marker, radius, color) {
        var circle = new google.maps.Circle({
            radius: 16093 * radius / 10,    // 16093 === 10 miles in metres
            fillColor: color,
            strokeColor: color,
            map: this._googleMap
        });
        circle.bindTo('center', marker, 'position');
        return circle;
    };

    GMap.prototype.calcLatLong = function (dx, dy) {
        dx += this.width() / 2;
        dy += this.height() / 2;
        var projection = this._gmOverlay.getProjection();

        var context = this;
        this.graphData.nodeValues().forEach(function (item) {
            var pos = new google.maps.LatLng(item._data.geo_lat, item._data.geo_long);
            if (item._data.__viz_markerIcon && !item._marker) {
                item._marker = context.createMarker(item._data.geo_lat, item._data.geo_long, item._data.__viz_markerIcon, "");
            }
            pos = projection.fromLatLngToDivPixel(pos);
            pos.x -= dx;
            pos.y -= dy;
            item.move(pos);
        });
        this.graphData.edgeValues().forEach(function (item) {
            item.points([]);
        });
    };

    GMap.prototype.zoomTo = function (selection) {
        var foundCount = 0;
        var latlngbounds = new google.maps.LatLngBounds();
        selection.forEach(function (item) {
            var gLatLong = new google.maps.LatLng(item.geo_lat, item.geo_long);
            latlngbounds.extend(gLatLong);
            ++foundCount;
        });
        if (foundCount) {
            this._googleMap.setCenter(latlngbounds.getCenter());
            this._googleMap.fitBounds(latlngbounds);
            if (this._googleMap.getZoom() > 12) {
                this._googleMap.setZoom(12);
            }
        }
        return this;
    };

    GMap.prototype.zoomToFit = function () {
        return this.zoomTo(this.graphData.nodeValues().map(function(row) {return row._data;}));
    };

    return GMap;
}));
