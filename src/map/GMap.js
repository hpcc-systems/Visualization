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
    };
    GMap.prototype = Object.create(Graph.prototype);
    GMap.prototype._class += " map_GMap";
    GMap.prototype.implements(IGMap.prototype);

    GMap.prototype.enter = function (domNode, element, d) {
        Graph.prototype.enter.apply(this, arguments);

        this._googleMap = new google.maps.Map(d3.select(this._target).node(), {
            zoom: 3,
            center: new google.maps.LatLng(41.850033, -87.6500523),
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

    GMap.prototype.calcLatLong = function (dx, dy) {
        dx += this.width() / 2;
        dy += this.height() / 2;
        var projection = this._gmOverlay.getProjection();

        var context = this;
        this.graphData.nodeValues().forEach(function (item) {
            var pos = new google.maps.LatLng(item._data.geo_lat, item._data.geo_long);
            if (item._data.__viz_markerIcon && !item._marker) {
                item._marker = new google.maps.Marker({
                    position: pos,
                    animation: google.maps.Animation.DROP,
                    icon: "http://maps.google.com/mapfiles/ms/icons/" + item._data.__viz_markerIcon,
                    map: context._googleMap,
                });
            }
            pos = projection.fromLatLngToDivPixel(pos);
            pos.x -= dx;
            pos.y -= dy;
            item.move(pos);
        });
        this.graphData.edgeValues().forEach(function (item) {
            item.points([]);
        })
    };

    GMap.prototype.zoomToFit = function () {
        var latlngbounds = new google.maps.LatLngBounds();
        this.graphData.nodeValues().forEach(function (item) {
            var gLatLong = new google.maps.LatLng(item._data.geo_lat, item._data.geo_long);
            latlngbounds.extend(gLatLong);
        });
        this._googleMap.setCenter(latlngbounds.getCenter());
        this._googleMap.fitBounds(latlngbounds);
        return this;
    };

    return GMap;
}));
