
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('map/Utility.js',["d3"], factory);
    } else {
        root.map_Utility = factory(root.d3);
    }
}(this, function (d3) {
    // Origonally ased on geohash.js
    // Geohash library for Javascript
    // (c) 2008 David Troy
    // Distributed under the MIT License

    function Geohash() {
    }
    Geohash.prototype.constructor = Geohash;
    Geohash.prototype._class += " map_Geohash";

    /* (Geohash-specific) Base32 map */
    Geohash.prototype.base32 = "0123456789bcdefghjkmnpqrstuvwxyz";

    /**
     * Encodes latitude/longitude to geohash, either to specified precision or to automatically
     * evaluated precision.
     *
     * @param   {number} lat - Latitude in degrees.
     * @param   {number} lon - Longitude in degrees.
     * @param   {number} [precision] - Number of characters in resulting geohash.
     * @returns {string} Geohash of supplied latitude/longitude.
     * @throws  Invalid geohash.
     *
     * @example
     *     var geohash = Geohash.encode(52.205, 0.119, 7); // geohash: "u120fxw"
     */
    Geohash.prototype.encode = function (lat, lon, precision) {
        // infer precision?
        if (typeof precision === "undefined") {
            // refine geohash until it matches precision of supplied lat/lon
            for (var p = 1; p <= 12; p++) {
                var hash = this.encode(lat, lon, p);
                var posn = this.decode(hash);
                if (posn.lat === lat && posn.lon === lon) return hash;
            }
            precision = 12; // set to maximum
        }

        lat = Number(lat);
        lon = Number(lon);
        precision = Number(precision);

        if (isNaN(lat) || isNaN(lon) || isNaN(precision)) throw new Error("Invalid geohash");

        var idx = 0; // index into base32 map
        var bit = 0; // each char holds 5 bits
        var evenBit = true;
        var geohash = "";

        var latMin = -90, latMax = 90;
        var lonMin = -180, lonMax = 180;

        while (geohash.length < precision) {
            if (evenBit) {
                // bisect E-W longitude
                var lonMid = (lonMin + lonMax) / 2;
                if (lon > lonMid) {
                    idx = idx * 2 + 1;
                    lonMin = lonMid;
                } else {
                    idx = idx * 2;
                    lonMax = lonMid;
                }
            } else {
                // bisect N-S latitude
                var latMid = (latMin + latMax) / 2;
                if (lat > latMid) {
                    idx = idx * 2 + 1;
                    latMin = latMid;
                } else {
                    idx = idx * 2;
                    latMax = latMid;
                }
            }
            evenBit = !evenBit;

            if (++bit === 5) {
                // 5 bits gives us a character: append it and start over
                geohash += this.base32.charAt(idx);
                bit = 0;
                idx = 0;
            }
        }

        return geohash;
    };

    /**
     * Decode geohash to latitude/longitude (location is approximate centre of geohash cell,
     *     to reasonable precision).
     *
     * @param   {string} geohash - Geohash string to be converted to latitude/longitude.
     * @returns {{lat:number, lon:number}} (Center of) geohashed location.
     * @throws  Invalid geohash.
     *
     * @example
     *     var latlon = Geohash.decode("u120fxw"); // latlon: { lat: 52.205, lon: 0.1188 }
     */
    Geohash.prototype.decode = function (geohash) {

        var bounds = this.bounds(geohash); // <-- the hard work
        // now just determine the centre of the cell...

        var latMin = bounds.sw.lat, lonMin = bounds.sw.lon;
        var latMax = bounds.ne.lat, lonMax = bounds.ne.lon;

        // cell centre
        var lat = (latMin + latMax) / 2;
        var lon = (lonMin + lonMax) / 2;

        // round to close to centre without excessive precision: ⌊2-log10(Δ°)⌋ decimal places
        lat = lat.toFixed(Math.floor(2 - Math.log(latMax - latMin) / Math.LN10));
        lon = lon.toFixed(Math.floor(2 - Math.log(lonMax - lonMin) / Math.LN10));

        return { lat: Number(lat), lon: Number(lon) };
    };

    /**
     * Returns SW/NE latitude/longitude bounds of specified geohash.
     *
     * @param   {string} geohash - Cell that bounds are required of.
     * @returns {{sw: {lat: number, lon: number}, ne: {lat: number, lon: number}}}
     * @throws  Invalid geohash.
     */
    Geohash.prototype.bounds = function (geohash) {
        if (geohash.length === 0) throw new Error("Invalid geohash");

        geohash = geohash.toLowerCase();

        var evenBit = true;
        var latMin = -90, latMax = 90;
        var lonMin = -180, lonMax = 180;

        for (var i = 0; i < geohash.length; i++) {
            var chr = geohash.charAt(i);
            var idx = this.base32.indexOf(chr);
            if (idx === -1) throw new Error("Invalid geohash");

            for (var n = 4; n >= 0; n--) {
                var bitN = idx >> n & 1;
                if (evenBit) {
                    // longitude
                    var lonMid = (lonMin + lonMax) / 2;
                    if (bitN === 1) {
                        lonMin = lonMid;
                    } else {
                        lonMax = lonMid;
                    }
                } else {
                    // latitude
                    var latMid = (latMin + latMax) / 2;
                    if (bitN === 1) {
                        latMin = latMid;
                    } else {
                        latMax = latMid;
                    }
                }
                evenBit = !evenBit;
            }
        }

        var bounds = {
            sw: { lat: latMin, lon: lonMin },
            ne: { lat: latMax, lon: lonMax }
        };

        return bounds;
    };

    /**
     * Determines adjacent cell in given direction.
     *
     * @param   geohash - Cell to which adjacent cell is required.
     * @param   direction - Direction from geohash (N/S/E/W).
     * @returns {string} Geocode of adjacent cell.
     * @throws  Invalid geohash.
     */
    Geohash.prototype.adjacent = function (geohash, direction) {
        // based on github.com/davetroy/geohash-js

        geohash = geohash.toLowerCase();
        direction = direction.toLowerCase();

        if (geohash.length === 0) throw new Error("Invalid geohash");
        if ("nsew".indexOf(direction) === -1) throw new Error("Invalid direction");

        var neighbour = {
            n: ["p0r21436x8zb9dcf5h7kjnmqesgutwvy", "bc01fg45238967deuvhjyznpkmstqrwx"],
            s: ["14365h7k9dcfesgujnmqp0r2twvyx8zb", "238967debc01fg45kmstqrwxuvhjyznp"],
            e: ["bc01fg45238967deuvhjyznpkmstqrwx", "p0r21436x8zb9dcf5h7kjnmqesgutwvy"],
            w: ["238967debc01fg45kmstqrwxuvhjyznp", "14365h7k9dcfesgujnmqp0r2twvyx8zb"]
        };
        var border = {
            n: ["prxz", "bcfguvyz"],
            s: ["028b", "0145hjnp"],
            e: ["bcfguvyz", "prxz"],
            w: ["0145hjnp", "028b"]
        };

        var lastCh = geohash.slice(-1);    // last character of hash
        var parent = geohash.slice(0, -1); // hash without last character

        var type = geohash.length % 2;

        // check for edge-cases which don"t share common prefix
        if (border[direction][type].indexOf(lastCh) !== -1 && parent !== "") {
            parent = this.adjacent(parent, direction);
        }

        // append letter for direction to parent
        return parent + this.base32.charAt(neighbour[direction][type].indexOf(lastCh));
    };

    /**
     * Returns all 8 adjacent cells to specified geohash.
     *
     * @param   {string} geohash - Geohash neighbours are required of.
     * @returns {{n,ne,e,se,s,sw,w,nw: string}}
     * @throws  Invalid geohash.
     */
    Geohash.prototype.neighbours = function (geohash) {
        return {
            "n": this.adjacent(geohash, "n"),
            "ne": this.adjacent(this.adjacent(geohash, "n"), "e"),
            "e": this.adjacent(geohash, "e"),
            "se": this.adjacent(this.adjacent(geohash, "s"), "e"),
            "s": this.adjacent(geohash, "s"),
            "sw": this.adjacent(this.adjacent(geohash, "s"), "w"),
            "w": this.adjacent(geohash, "w"),
            "nw": this.adjacent(this.adjacent(geohash, "n"), "w")
        };
    };

    //  HPCC Extensions  ---
    Geohash.prototype.contained = function (w, n, e, s, precision) {
        if (isNaN(n) || n >= 90) n = 89;
        if (isNaN(e) || e > 180) e = 180;
        if (isNaN(s) || s <= -90) s = -89;
        if (isNaN(w) || w < -180) w = -180;
        precision = precision || 1;
        var geoHashNW = this.encode(n, w, precision);
        var geoHashNE = this.encode(n, e, precision);
        var geoHashSE = this.encode(s, e, precision);
        var currRowHash = geoHashNW;
        var col = 0, maxCol = -1;
        var geoHashes = [geoHashNW, geoHashSE];
        var currHash = this.adjacent(geoHashNW, "e");
        while (currHash !== geoHashSE) {
            geoHashes.push(currHash);
            ++col;
            if (currHash === geoHashNE || maxCol === col) {
                maxCol = col + 1;
                col = 0;
                currHash = this.adjacent(currRowHash, "s");
                currRowHash = currHash;
            } else {
                currHash = this.adjacent(currHash, "e");
            }
        }
        return geoHashes;
    };

    Geohash.prototype.calculateWidthDegrees = function (n) {
        var a;
        if (n % 2 === 0)
            a = -1;
        else
            a = -0.5;
        var result = 180 / Math.pow(2, 2.5 * n + a);
        return result;
    };

    Geohash.prototype.width = function (n) {
        var parity = n % 2;
        return 180 / (2 ^ (((5 * n + parity) / 2) - 1));
    };

    var Tile = function () {
        var size = [960, 500],
            scale = 256,
            translate = [size[0] / 2, size[1] / 2],
            zoomDelta = 0;

        function tile() {
            var z = Math.max(Math.log(scale) / Math.LN2 - 8, 0),
                z0 = Math.round(z + zoomDelta),
                k = Math.pow(2, z - z0 + 8),
                origin = [(translate[0] - scale / 2) / k, (translate[1] - scale / 2) / k],
                tiles = [],
                cols = d3.range(Math.max(0, Math.floor(-origin[0])), Math.max(0, Math.ceil(size[0] / k - origin[0]))),
                rows = d3.range(Math.max(0, Math.floor(-origin[1])), Math.max(0, Math.ceil(size[1] / k - origin[1])));

            rows.forEach(function (y) {
                cols.forEach(function (x) {
                    tiles.push([x, y, z0]);
                });
            });

            tiles.translate = origin;
            tiles.scale = k;

            return tiles;
        }

        tile.size = function (_) {
            if (!arguments.length) return size;
            size = _;
            return tile;
        };

        tile.scale = function (_) {
            if (!arguments.length) return scale;
            scale = _;
            return tile;
        };

        tile.translate = function (_) {
            if (!arguments.length) return translate;
            translate = _;
            return tile;
        };

        tile.zoomDelta = function (_) {
            if (!arguments.length) return zoomDelta;
            zoomDelta = +_;
            return tile;
        };

        return tile;
    };

    // A modified d3.geo.albersUsa to include Puerto Rico.
    var albersUsaPr = function () {
        var ε = 1e-6;

        var lower48 = d3.geo.albers();

        // EPSG:3338
        var alaska = d3.geo.conicEqualArea()
            .rotate([154, 0])
            .center([-2, 58.5])
            .parallels([55, 65]);

        // ESRI:102007
        var hawaii = d3.geo.conicEqualArea()
            .rotate([157, 0])
            .center([-3, 19.9])
            .parallels([8, 18]);

        // XXX? You should check that this is a standard PR projection!
        var puertoRico = d3.geo.conicEqualArea()
            .rotate([66, 0])
            .center([0, 18])
            .parallels([8, 18]);

        var point,
            pointStream = { point: function (x, y) { point = [x, y]; } },
            lower48Point,
            alaskaPoint,
            hawaiiPoint,
            puertoRicoPoint;

        function albersUsa(coordinates) {
            var x = coordinates[0], y = coordinates[1];
            point = null;
            (lower48Point(x, y), point) ||
            (alaskaPoint(x, y), point) ||
            (hawaiiPoint(x, y), point) ||
            (puertoRicoPoint(x, y), point); // jshint ignore:line
            return point;
        }

        albersUsa.invert = function (coordinates) {
            var k = lower48.scale(),
                t = lower48.translate(),
                x = (coordinates[0] - t[0]) / k,
                y = (coordinates[1] - t[1]) / k;
            return (y >= 0.120 && y < 0.234 && x >= -0.425 && x < -0.214 ? alaska
                : y >= 0.166 && y < 0.234 && x >= -0.214 && x < -0.115 ? hawaii
                : y >= 0.204 && y < 0.234 && x >= 0.320 && x < 0.380 ? puertoRico
                : lower48).invert(coordinates);
        };

        // A naïve multi-projection stream.
        // The projections must have mutually exclusive clip regions on the sphere,
        // as this will avoid emitting interleaving lines and polygons.
        albersUsa.stream = function (stream) {
            var lower48Stream = lower48.stream(stream),
                alaskaStream = alaska.stream(stream),
                hawaiiStream = hawaii.stream(stream),
                puertoRicoStream = puertoRico.stream(stream);
            return {
                point: function (x, y) {
                    lower48Stream.point(x, y);
                    alaskaStream.point(x, y);
                    hawaiiStream.point(x, y);
                    puertoRicoStream.point(x, y);
                },
                sphere: function () {
                    lower48Stream.sphere();
                    alaskaStream.sphere();
                    hawaiiStream.sphere();
                    puertoRicoStream.sphere();
                },
                lineStart: function () {
                    lower48Stream.lineStart();
                    alaskaStream.lineStart();
                    hawaiiStream.lineStart();
                    puertoRicoStream.lineStart();
                },
                lineEnd: function () {
                    lower48Stream.lineEnd();
                    alaskaStream.lineEnd();
                    hawaiiStream.lineEnd();
                    puertoRicoStream.lineEnd();
                },
                polygonStart: function () {
                    lower48Stream.polygonStart();
                    alaskaStream.polygonStart();
                    hawaiiStream.polygonStart();
                    puertoRicoStream.polygonStart();
                },
                polygonEnd: function () {
                    lower48Stream.polygonEnd();
                    alaskaStream.polygonEnd();
                    hawaiiStream.polygonEnd();
                    puertoRicoStream.polygonEnd();
                }
            };
        };

        albersUsa.precision = function (_) {
            if (!arguments.length) return lower48.precision();
            lower48.precision(_);
            alaska.precision(_);
            hawaii.precision(_);
            puertoRico.precision(_);
            return albersUsa;
        };

        albersUsa.scale = function (_) {
            if (!arguments.length) return lower48.scale();
            lower48.scale(_);
            alaska.scale(_ * 0.35);
            hawaii.scale(_);
            puertoRico.scale(_);
            return albersUsa.translate(lower48.translate());
        };

        albersUsa.translate = function (_) {
            if (!arguments.length) return lower48.translate();
            var k = lower48.scale(), x = +_[0], y = +_[1];

            lower48Point = lower48
                .translate(_)
                .clipExtent([[x - 0.455 * k, y - 0.238 * k], [x + 0.455 * k, y + 0.238 * k]])
                .stream(pointStream).point;

            alaskaPoint = alaska
                .translate([x - 0.307 * k, y + 0.201 * k])
                .clipExtent([[x - 0.425 * k + ε, y + 0.120 * k + ε], [x - 0.214 * k - ε, y + 0.234 * k - ε]])
                .stream(pointStream).point;

            hawaiiPoint = hawaii
                .translate([x - 0.205 * k, y + 0.212 * k])
                .clipExtent([[x - 0.214 * k + ε, y + 0.166 * k + ε], [x - 0.115 * k - ε, y + 0.234 * k - ε]])
                .stream(pointStream).point;

            puertoRicoPoint = puertoRico
                .translate([x + 0.350 * k, y + 0.224 * k])
                .clipExtent([[x + 0.320 * k, y + 0.204 * k], [x + 0.380 * k, y + 0.234 * k]])
                .stream(pointStream).point;

            return albersUsa;
        };

        return albersUsa.scale(1070);
    };

    if (!d3.geo.albersUsaPr) {
        d3.geo.albersUsaPr = albersUsaPr;
    }

    return {
        Geohash: Geohash,
        Tile: Tile,
        albersUsaPr: albersUsaPr
    };
}));

if (typeof define === "function" && define.amd) {
  define('css',[], function () { 
    return {
      load: function ($1, $2, load) { load() }
    } 
  })
};


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('map/Layered.js',["d3", "topojson", "../common/SVGWidget", "./Utility", "css!./Layered"], factory);
    } else {
        root.map_Layered = factory(root.d3, root.topojson, root.common_SVGWidget, root.map_Utility);
    }
}(this, function (d3, topojson, SVGWidget, Utility) {
    var zoomFactor = 1 / 4;
    var projectionFactor = (1 << 12) / 2 / Math.PI;

    function Layered() {
        SVGWidget.call(this);

        this._drawStartPos = "origin";
        this.projection("mercator");

        var context = this;
        this._zoom = d3.behavior.zoom()
            .scaleExtent([0.25 * zoomFactor, 131072 * zoomFactor])
            .on("zoomstart", function (ev) {
                context._zoomstart_translate = context._zoom.translate();
                context._zoomstart_scale = context._zoom.scale();
            })
            .on("zoom", function () {
                if (d3.event && d3.event.sourceEvent && d3.event.sourceEvent.ctrlKey && d3.event.sourceEvent.type === "mousemove") {
                    context.render();
                    return;
                }
                context.zoomed();

                var x = context.width() / 2;
                var y = context.height() / 2;
                var mapCenterLongLat = context.invert(x, y);
                context.centerLong(mapCenterLongLat[0]);
                context.centerLat(mapCenterLongLat[1]);
                context.zoom(context._zoom.scale() / zoomFactor);

                context._prevCenterLong = context.centerLong();
                context._prevCenterLat = context.centerLat();
                context._prevZoom = context.zoom();
            })
            .on("zoomend", function () {
            })
        ;
    }
    Layered.prototype = Object.create(SVGWidget.prototype);
    Layered.prototype.constructor = Layered;
    Layered.prototype._class += " map_Layered";

    Layered.prototype.publish("projection", null, "set", "Map projection type", ["albersUsa", "albersUsaPr", "azimuthalEqualArea", "azimuthalEquidistant", "conicEqualArea", "conicConformal", "conicEquidistant", "equirectangular", "gnomonic", "mercator", "orthographic", "stereographic", "transverseMercator"]);
    Layered.prototype.publish("centerLat", 0, "number", "Center Latitude", null, { tags: ["Basic"] });
    Layered.prototype.publish("centerLong", 0, "number", "Center Longtitude", null, { tags: ["Basic"] });
    Layered.prototype.publish("zoom", 1, "number", "Zoom Level", null, { tags: ["Basic"] });
    Layered.prototype.publish("autoScaleMode", "all", "set", "Auto Scale", ["none", "all"], { tags: ["Basic"] });
    Layered.prototype.publish("layers", [], "widgetArray", "Layers", null, { render: false });

    Layered.prototype.data = function (_) {
        var retVal = SVGWidget.prototype.data.apply(this, arguments);
        if (arguments.length) {
            this._autoScaleOnNextRender = true;
        }
        return retVal;
    };

    Layered.prototype.projection_orig = Layered.prototype.projection;
    Layered.prototype.projection = function (_) {
        var retVal = Layered.prototype.projection_orig.apply(this, arguments);
        if (arguments.length) {
            this._d3GeoProjection = d3.geo[_]()
                .scale(projectionFactor)
                .translate([0, 0])
            ;
            switch (_) {
                case "orthographic":
                    this._d3GeoProjection
                        .clipAngle(90)
                        .rotate([0, 0])
                    ;
            }
            this._d3GeoPath = d3.geo.path()
                .projection(this._d3GeoProjection)
            ;
            this._autoScaleOnNextRender = true;
        }
        return retVal;
    };

    Layered.prototype.size = function (_) {
        var retVal = SVGWidget.prototype.size.apply(this, arguments);
        if (arguments.length) {
            delete this._prevCenterLat;
            delete this._prevCenterLong;
        }
        return retVal;
    };

    Layered.prototype.enter = function (domNode, element) {
        SVGWidget.prototype.enter.apply(this, arguments);

        this._zoomGrab = element.append("rect")
            .attr("class", "background")
        ;

        this._layersTarget = element.append("g")
            .attr("class", "layersTarget")
        ;

        element.call(this._zoom);
    };

    Layered.prototype.update = function (domNode, element) {
        SVGWidget.prototype.update.apply(this, arguments);
        if (this._prevCenterLat !== this.centerLat() || this._prevCenterLong !== this.centerLong() || this._prevZoom !== this.zoom()) {
            var projection = d3.geo[this.projection()]()
                .scale(this.zoom() * zoomFactor * projectionFactor)
                .translate([this.width() / 2, this.height() / 2])
            ;
            var center = projection([this.centerLong(), this.centerLat()]) || [this.width() / 2, this.height() / 2];

            this._zoom 
                .scale(this.zoom() * zoomFactor)
                .translate([this.width() - center[0], this.height() - center[1]])
            ;
            this._prevCenterLat = this.centerLat();
            this._prevCenterLong = this.centerLong();
            this._prevZoom = this.zoom();
        }

        this._zoomGrab
            .attr("width", this.width())
            .attr("height", this.height())
        ;

        var layers = this._layersTarget.selectAll(".layerContainer").data(this.layers().filter(function (d) { return d.visible(); }), function (d) { return d.id(); });
        var context = this;
        layers.enter().append("g")
            .attr("id", function (d) { return d.id(); })
            .attr("class", "layerContainer")
            .each(function (d) {
                d._svgElement = d3.select(this);
                d._domElement = context._parentOverlay.append("div");
                d.layerEnter(context, d._svgElement, d._domElement);
            })
        ;
        layers
            .each(function (d) {
                d.layerUpdate(context);
            })
        ;
        layers.exit()
            .each(function (d) {
                d.layerExit(context);
                d._domElement.remove();
            })
            .remove()
        ;
        layers.order();
        this.zoomed();
    };

    Layered.prototype.exit = function (domNode, element) {
        SVGWidget.prototype.exit.apply(this, arguments);
    };

    Layered.prototype.zoomed = function () {
        var layers = this._layersTarget.selectAll(".layerContainer");
        var context = this;
        layers
            .each(function (d) {
                d.layerZoomed(context);
            })
        ;
    };

    Layered.prototype.preRender = function (callback) {
        return Promise.all(this.layers().filter(function (layer) {
            return layer.visible();
        }).map(function (layer) {
            return layer.layerPreRender();
        }));
    };

    Layered.prototype.render = function (callback) {
        var context = this;
        this.preRender().then(function () {
            SVGWidget.prototype.render.call(context, function (w) {
                if (context._layersTarget && ((context._renderCount && context._autoScaleOnNextRender) || context._prevAutoScaleMode !== context.autoScaleMode())) {
                    context._prevAutoScaleMode = context.autoScaleMode();
                    context._autoScaleOnNextRender = false;
                    setTimeout(function () {
                        context.autoScale();
                        context.autoScale();  //TODO Fix math in autoScale 
                        if (callback) {
                            callback(w);
                        }
                    }, 0);
                } else {
                    if (callback) {
                        callback(w);
                    }
                }
            });
        });
        return this;
    };

    Layered.prototype.project = function (lat, long) {
        if (lat >= 90)
            lat = 89;
        else if (lat <= -90)
            lat = -89;
        var pos = this._d3GeoProjection([long, lat]);
        if (pos) {
            pos[0] *= this._zoom.scale();
            pos[1] *= this._zoom.scale();
            pos[0] += this._zoom.translate()[0];
            pos[1] += this._zoom.translate()[1];
        }
        return pos;
    };

    Layered.prototype.invert = function (x, y) {
        x -= this._zoom.translate()[0];
        y -= this._zoom.translate()[1];
        x /= this._zoom.scale();
        y /= this._zoom.scale();
        return this._d3GeoProjection.invert([x, y]);
    };

    Layered.prototype.getBounds = function () {
        var bbox = this._layersTarget.node().getBBox();
        return {
            x: bbox.x,
            y: bbox.y,
            width: bbox.width,
            height: bbox.height
        };
    };

    Layered.prototype.autoScale = function () {
        switch (this.autoScaleMode()) {
            case "none":
                return;
            case "all":
                this.shrinkToFit(this.getBounds());
                break;
        }
    };

    Layered.prototype.shrinkToFit = function (rect) {
        if (rect.width && rect.height) {
            var width = this.width();
            var height = this.height();
            var translate = this._zoom.translate();
            var scale = this._zoom.scale();

            rect.x += rect.width / 2;
            rect.y += rect.height / 2;
            translate[0] -= (rect.x - width / 2);
            translate[1] -= (rect.y - height / 2);

            var newScale = scale * Math.min(width / rect.width, height / rect.height);
            this._zoom
                .translate(translate)
                .scale(newScale)
                .event(this._layersTarget)
            ;
        } else {
            console.log("Layered.prototype.shrinkToFit - invalid rect:  " + rect);
        }
    };

    return Layered;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('map/Layer.js',["./Layered", "../api/ITooltip"], factory);
    } else {
        root.map_Layer = factory(root.map_Layered, root.api_ITooltip);
    }
}(this, function (Layered, ITooltip) {
    function Layer(id) {
        Layered.call(this);
        ITooltip.call(this);
    }
    Layer.prototype = Object.create(Layered.prototype);
    Layer.prototype.constructor = Layer;
    Layer.prototype._class += " map_Layer";
    Layer.prototype.implements(ITooltip.prototype);

    Layer.prototype.layerEnter = function (base, svgElement, domElement) {
        this._parentOverlay = base._parentOverlay;
    };

    Layer.prototype.enter = function (domNode, element) {
        Layered.prototype.enter.apply(this, arguments);
        this._svgElement = this._layersTarget.append("g");
        this._domElement = this._parentOverlay.append("div");
        this.layerEnter(this, this._svgElement, this._domElement);
    };

    Layer.prototype.layerUpdate = function (base) {
    };

    Layer.prototype.update = function (domNode, element) {
        Layered.prototype.update.apply(this, arguments);
        this.layerUpdate(this);
    };

    Layer.prototype.layerExit = function (base) {
    };

    Layer.prototype.exit = function (domNode, element) {
        this.layerExit(this);
        this._svgElement.remove();
        this._domElement.remove();
        Layered.prototype.exit.apply(this, arguments);
    };

    Layer.prototype.layerPreRender = function (callback) {
        return Promise.resolve();
    };

    Layer.prototype.render = function (callback) {
        var context = this;
        var args = arguments;
        this.layerPreRender().then(function () {
            Layered.prototype.render.apply(context, args);
        });
        return this;
    };

    Layer.prototype.layerZoomed = function (base) {
    };

    Layer.prototype.zoomed = function () {
        Layered.prototype.zoomed.apply(this, arguments);
        this.layerZoomed(this);
    };

    return Layer;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('map/Choropleth',["d3", "topojson", "./Layer", "../common/Palette", "../common/Utility", "css!./Choropleth"], factory);
    } else {
        root.map_Choropleth = factory(root.d3, root.topojson, root.map_Layer, root.common_Palette, root.common_Utility);
    }
}(this, function (d3, topojson, Layer, Palette, Utility) {
    function Choropleth() {
        Layer.call(this);
        Utility.SimpleSelectionMixin.call(this);

        this._dataMap = {};
        this._path = d3.select(null);
    }
    Choropleth.prototype = Object.create(Layer.prototype);
    Choropleth.prototype.constructor = Choropleth;
    Choropleth.prototype._class += " map_Choropleth";
    Choropleth.prototype.mixin(Utility.SimpleSelectionMixin);

    Choropleth.prototype._palette = Palette.rainbow("default");

    Choropleth.prototype.publish("paletteID", "YlOrRd", "set", "Palette ID", Choropleth.prototype._palette.switch(), { tags: ["Basic", "Shared"] });
    Choropleth.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette", null, { tags: ["Intermediate", "Shared"] });

    Choropleth.prototype.publish("opacity", 1.0, "number", "Opacity", null, { tags: ["Advanced"] });

    Choropleth.prototype.publish("meshVisible", true, "boolean", "Mesh Visibility");
    Choropleth.prototype.publish("meshColor", null, "html-color", "Stroke Color", null, { optional: true });
    Choropleth.prototype.publish("meshStrokeWidth", 0.25, "number", "Stroke Width");
    Choropleth.prototype.publish("internalOnly", false, "boolean", "Internal mesh only");
    Choropleth.prototype.publish("autoScaleMode", "mesh", "set", "Auto Scale", ["none", "mesh", "data"], { tags: ["Basic"], override: true });

    Choropleth.prototype.data = function (_) {
        var retVal = Layer.prototype.data.apply(this, arguments);
        if (arguments.length) {
            this._dataMap = {};
            this._dataMinWeight = null;
            this._dataMaxWeight = null;

            var context = this;
            this.data().forEach(function (item) {
                context._dataMap[item[0]] = item;
                if (!context._dataMinWeight || item[1] < context._dataMinWeight) {
                    context._dataMinWeight = item[1];
                }
                if (!context._dataMaxWeight || item[1] > context._dataMaxWeight) {
                    context._dataMaxWeight = item[1];
                }
            });
        }
        return retVal;
    };

    Choropleth.prototype.getDataBounds = function () {
        var bbox = this._choroplethData.node().getBBox();
        var retVal = {
            x: bbox.x,
            y: bbox.y,
            width: bbox.width,
            height: bbox.height
        };
        var scale = this._zoom.scale();
        retVal.x *= scale;
        retVal.y *= scale;
        retVal.width *= scale;
        retVal.height *= scale;
        var translate = this._zoom.translate();
        retVal.x += translate[0];
        retVal.y += translate[1];
        return retVal;
    };

    Choropleth.prototype.autoScale = function () {
        switch (this.autoScaleMode()) {
            case "none":
                return;
            case "mesh":
                this.shrinkToFit(this.getBounds());
                break;
            case "data":
                this.shrinkToFit(this.getDataBounds());
                break;
        }
    };

    Choropleth.prototype.layerEnter = function (base, svgElement, domElement) {
        Layer.prototype.layerEnter.apply(this, arguments);

        this._choroplethTransform = svgElement;
        this._choroplethData = this._choroplethTransform.append("g");
        this._choropleth = this._choroplethTransform.append("path")
            .attr("class", "mesh")
        ;
    };

    Choropleth.prototype.layerUpdate = function (base, forcePath) {
        Layer.prototype.layerUpdate.apply(this, arguments);

        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }

        if (!this.visible() || !this.meshVisible()) {
            this._choropleth.attr("d", "");
            delete this._prevProjection;
            return;
        }

        if (forcePath || this._prevProjection !== base.projection() || this._prevInternalOnly !== this.internalOnly()) {
            this._choropleth
                .attr("d", base._d3GeoPath(topojson.mesh(this._choroTopology, this._choroTopologyObjects, this.internalOnly() ? function (a, b) { return a !== b; } : function (a, b) { return true; })))
            ;
            this._prevProjection = base.projection();
            this._prevInternalOnly = this.internalOnly();
        }
        this._choroplethTransform
            .style("opacity", this.opacity())
            .style("stroke", this.meshColor())
        ;
    };

    Choropleth.prototype.layerExit = function (base) {
        delete this._prevProjection;
        delete this._prevInternalOnly;
    };

    Choropleth.prototype.layerZoomed = function (base) {
        Layer.prototype.layerZoomed.apply(this, arguments);

        this._choroplethTransform
            .attr("transform", "translate(" + base._zoom.translate() + ")scale(" + base._zoom.scale() + ")")
            .style("stroke-width", this.meshStrokeWidth() / base._zoom.scale() + "px")
        ;
    };

    //  Events  ---
    Choropleth.prototype.click = function (row, column, selected) {
        console.log("Click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
    };

    Choropleth.prototype.dblclick = function (row, column, selected) {
        console.log("Double click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
    };

    return Choropleth;
}));

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('map/ChoroplethCountries.js',["d3", "topojson", "./Choropleth", "require"], factory);
    } else {
        root.map_ChoroplethCountries = factory(root.d3, root.topojson, root.map_Choropleth, root.require);
    }
} (this, function (d3, topojson, Choropleth, require) {
    var countries = null;
    var features = null;
    var rFeatures = null;
    function ChoroplethCountries() {
        Choropleth.call(this);
    }
    ChoroplethCountries.prototype = Object.create(Choropleth.prototype);
    ChoroplethCountries.prototype.constructor = ChoroplethCountries;
    ChoroplethCountries.prototype._class += " map_ChoroplethCountries";

    ChoroplethCountries.prototype.layerEnter = function (base, svgElement, domElement) {
        Choropleth.prototype.layerEnter.apply(this, arguments);
        this._choroTopology = countries.topology;
        this._choroTopologyObjectsCountries = countries.topology.objects.countries;
        this._choroTopologyObjectsLand = countries.topology.objects.land;
        this._choroTopologyObjects = this._choroTopologyObjectsCountries;

        this._selection.widgetElement(this._choroplethData);
        this.choroPaths = d3.select(null);
        var context = this;
        this
            .tooltipHTML(function (d) {
                return context.tooltipFormat({ label: d[0], value: d[1] });
            })
            ;
    };

    ChoroplethCountries.prototype.layerUpdate = function (base) {
        Choropleth.prototype.layerUpdate.apply(this, arguments);

        this.choroPaths = this._choroplethData.selectAll(".data").data(this.visible() ? this.data() : [], function (d) { return d[0]; });
        var context = this;
        this.choroPaths.enter().append("path")
            .attr("class", "data")
            .call(this._selection.enter.bind(this._selection))
            .on("click", function (d) {
                if (context._dataMap[d[0]]) {
                    context.click(context.rowToObj(context._dataMap[d[0]]), "weight", context._selection.selected(this));
                }
            })
            .on("dblclick", function (d) {
                if (context._dataMap[d[0]]) {
                    context.dblclick(context.rowToObj(context._dataMap[d[0]]), "weight", context._selection.selected(this));
                }
            })
            .on("mouseout.tooltip", this.tooltip.hide)
            .on("mousemove.tooltip", this.tooltip.show)
            ;
        this.choroPaths
            .attr("d", function (d) {
                var retVal = base._d3GeoPath(rFeatures[d[0]]);
                if (!retVal) {
                    console.log("Unknown Country:  " + d);
                }
                return retVal;
            })
            .style("fill", function (d) {
                var retVal = context._palette(d[1], context._dataMinWeight, context._dataMaxWeight);
                return retVal;
            })
            ;
        this.choroPaths.exit().remove();
    };

    ChoroplethCountries.prototype.layerPreRender = function () {
        if (!this._topoJsonPromise) {
            this._topoJsonPromise = new Promise(function (resolve, reject) {
                if (countries) {
                    resolve();
                }
                require(["json!src/map/TopoJSON/countries.json"], function (_countries) {
                    countries = _countries;
                    features = topojson.feature(countries.topology, countries.topology.objects.countries).features;
                    rFeatures = {};
                    for (var key in features) {
                        if (features[key].id && countries.countryNames[features[key].id]) {
                            rFeatures[countries.countryNames[features[key].id].name] = features[key];
                        }
                    }
                    resolve();
                });
            });
        }
        return this._topoJsonPromise;
    };

    return ChoroplethCountries;
}));

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('map/ChoroplethContinents.js',["d3", "topojson", "./ChoroplethCountries"], factory);
    } else {
        root.map_ChoroplethContinents = factory(root.d3, root.topojson, root.map_ChoroplethCountries);
    }
}(this, function (d3, topojson, ChoroplethCountries) {
    function ChoroplethContinents() {
        ChoroplethCountries.call(this);
    }
    ChoroplethContinents.prototype = Object.create(ChoroplethCountries.prototype);
    ChoroplethContinents.prototype.constructor = ChoroplethContinents;
    ChoroplethContinents.prototype._class += " map_ChoroplethContinents";

    ChoroplethContinents.prototype.layerEnter = function (base, svgElement, domElement) {
        ChoroplethCountries.prototype.layerEnter.apply(this, arguments);
        this._choroTopologyObjects = this._choroTopologyObjectsLand;
    };

    return ChoroplethContinents;
}));

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('map/ChoroplethCounties.js',["d3", "topojson", "./Choropleth", "require"], factory);
    } else {
        root.map_ChoroplethCounties = factory(root.d3, root.topojson, root.map_Choropleth, root.require);
    }
} (this, function (d3, topojson, Choropleth, require) {
    var usCounties = null;
    var features = null;
    var rFeatures = null;
    var fipsFormatter = d3.format("05d");
    function ChoroplethCounties() {
        Choropleth.call(this);

        this.projection("albersUsaPr");
    }
    ChoroplethCounties.prototype = Object.create(Choropleth.prototype);
    ChoroplethCounties.prototype.constructor = ChoroplethCounties;
    ChoroplethCounties.prototype._class += " map_ChoroplethCounties";

    ChoroplethCounties.prototype.publish("onClickFormatFIPS", false, "boolean", "format FIPS code as a String on Click");

    ChoroplethCounties.prototype.layerEnter = function (base, svgElement, domElement) {
        Choropleth.prototype.layerEnter.apply(this, arguments);
        this._choroTopology = usCounties.topology;
        this._choroTopologyObjects = usCounties.topology.objects.counties;

        this._selection.widgetElement(this._choroplethData);
        this.choroPaths = d3.select(null);
        var context = this;
        this
            .tooltipHTML(function (d) {
                return context.tooltipFormat({ label: usCounties.countyNames[d[0]], value: context._dataMap[d[0]] ? context._dataMap[d[0]][1] : "N/A" });
            })
            ;
    };

    ChoroplethCounties.prototype.layerUpdate = function (base) {
        Choropleth.prototype.layerUpdate.apply(this, arguments);
        this.choroPaths = this._choroplethData.selectAll(".data").data(this.visible() ? this.data() : [], function (d) { return d[0]; });
        var context = this;

        function eventRow(d) {
            return context.onClickFormatFIPS() ? context._dataMap[d[0]].map(function (cell, idx) {
                return context.onClickFormatFIPS() && idx === 0 ? fipsFormatter(cell) : cell;
            }) : context._dataMap[d[0]];
        }

        this.choroPaths.enter().append("path")
            .attr("class", "data")
            .call(this._selection.enter.bind(this._selection))
            .on("click", function (d) {
                if (context._dataMap[d[0]]) {
                    context.click(context.rowToObj(eventRow(d)), "weight", context._selection.selected(this));
                }
            })
            .on("dblclick", function (d) {
                if (context._dataMap[d[0]]) {
                    context.dblclick(context.rowToObj(eventRow(d)), "weight", context._selection.selected(this));
                }
            })
            .on("mouseout.tooltip", this.tooltip.hide)
            .on("mousemove.tooltip", this.tooltip.show)
            ;
        this.choroPaths
            .attr("d", function (d) {
                var retVal = base._d3GeoPath(rFeatures[d[0]]);
                if (!retVal) {
                    console.log("Unknown US County:  " + d);
                }
                return retVal;
            })
            .style("fill", function (d) {
                var retVal = context._palette(d[1], context._dataMinWeight, context._dataMaxWeight);
                return retVal;
            })
            ;
        this.choroPaths.exit().remove();
    };

    ChoroplethCounties.prototype.layerPreRender = function () {
        if (!this._topoJsonPromise) {
            this._topoJsonPromise = new Promise(function (resolve, reject) {
                if (usCounties) {
                    resolve();
                }
                require(["json!src/map/TopoJSON/us-counties.json"], function (_usCounties) {
                    usCounties = _usCounties;
                    features = topojson.feature(usCounties.topology, usCounties.topology.objects.counties).features;
                    rFeatures = {};
                    for (var key in features) {
                        if (features[key].id) {
                            rFeatures[features[key].id] = features[key];
                        }
                    }
                    resolve();
                });
            });
        }
        return this._topoJsonPromise;
    };

    return ChoroplethCounties;
}));

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('map/ChoroplethStates',["d3", "topojson", "./Choropleth", "require"], factory);
    } else {
        root.map_ChoroplethStates = factory(root.d3, root.topojson, root.map_Choropleth, root.require);
    }
} (this, function (d3, topojson, Choropleth, require) {
    var usStates = null;
    var features = null;
    var rFeatures = null;

    function ChoroplethStates() {
        Choropleth.call(this);

        this.projection("albersUsaPr");
    }
    ChoroplethStates.prototype = Object.create(Choropleth.prototype);
    ChoroplethStates.prototype.constructor = ChoroplethStates;
    ChoroplethStates.prototype._class += " map_ChoroplethStates";

    ChoroplethStates.prototype.layerEnter = function (base, svgElement, domElement) {
        Choropleth.prototype.layerEnter.apply(this, arguments);
        this._choroTopology = usStates.topology;
        this._choroTopologyObjects = usStates.topology.objects.states;

        this._selection.widgetElement(this._choroplethData);
        this.choroPaths = d3.select(null);
        var context = this;
        this
            .tooltipHTML(function (d) {
                var code = rFeatures[d[0]].id;
                return context.tooltipFormat({ label: usStates.stateNames[code].name, value: d[1] });
            })
            ;
    };

    ChoroplethStates.prototype.layerUpdate = function (base) {
        Choropleth.prototype.layerUpdate.apply(this, arguments);

        this.choroPaths = this._choroplethData.selectAll(".data").data(this.visible() ? this.data() : [], function (d) { return d[0]; });
        var context = this;
        this.choroPaths.enter().append("path")
            .attr("class", "data")
            .call(this._selection.enter.bind(this._selection))
            .on("click", function (d) {
                context.click(context.rowToObj(d), "weight", context._selection.selected(this));
            })
            .on("dblclick", function (d) {
                context.dblclick(context.rowToObj(d), "weight", context._selection.selected(this));
            })
            .on("mouseout.tooltip", this.tooltip.hide)
            .on("mousemove.tooltip", this.tooltip.show)
            ;
        this.choroPaths
            .attr("d", function (d) {
                var retVal = base._d3GeoPath(rFeatures[d[0]]);
                if (!retVal) {
                    console.log("Unknown US State:  " + d);
                }
                return retVal;
            })
            .style("fill", function (d) {
                var retVal = context._palette(d[1], context._dataMinWeight, context._dataMaxWeight);
                return retVal;
            })
            ;
        this.choroPaths.exit().remove();
    };

    ChoroplethStates.prototype.layerPreRender = function () {
        if (!this._topoJsonPromise) {
            this._topoJsonPromise = new Promise(function (resolve, reject) {
                if (usStates) {
                    resolve();
                }
                require(["json!src/map/TopoJSON/us-states.json"], function (_usStates) {
                    usStates = _usStates;
                    features = topojson.feature(usStates.topology, usStates.topology.objects.states).features;
                    rFeatures = {};
                    for (var key in features) {
                        if (features[key].id) {
                            rFeatures[usStates.stateNames[features[key].id].code] = features[key];
                        }
                    }
                    resolve();
                });
            });
        }
        return this._topoJsonPromise;
    };

    return ChoroplethStates;
}));

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('map/ChoroplethStatesHeat.js',["../layout/Layered"], factory);
    } else {
        root.map_ChoroplethStatesHeat = factory(root.layout_Layered);
    }
}(this, function (Layered) {
    function ChoroplethStatesHeat(target) {
        Layered.call(this);
    }
    ChoroplethStatesHeat.prototype = Object.create(Layered.prototype);
    ChoroplethStatesHeat.prototype.constructor = ChoroplethStatesHeat;
    ChoroplethStatesHeat.prototype._class += " map_ChoroplethStatesHeat";

    return ChoroplethStatesHeat;
}));



(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('map/GeoHash.js',["d3", "topojson", "./Layer", "./Utility", "../common/Palette", "../common/Utility", "css!./GeoHash"], factory);
    } else {
        root.map_GeoHash = factory(root.d3, root.topojson, root.map_Layer, root.map_Utility, root.common_Palette, root.common_Utility);
    }
}(this, function (d3, topojson, Layer, Utility, Palette, CommonUtility) {
    function GeoHash() {
        Layer.call(this);
    }
    GeoHash.prototype = Object.create(Layer.prototype);
    GeoHash.prototype.constructor = GeoHash;
    GeoHash.prototype._class += " map_GeoHash";

    GeoHash.prototype._palette = Palette.rainbow("default");

    GeoHash.prototype.publish("paletteID", "YlOrRd", "set", "Palette ID", GeoHash.prototype._palette.switch(), { tags: ["Basic", "Shared"] });
    GeoHash.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette", null, { tags: ["Intermediate", "Shared"] });

    GeoHash.prototype.publish("opacity", 1.0, "number", "Opacity", null, { tags: ["Advanced"] });

    GeoHash.prototype.publish("meshVisible", true, "boolean", "Mesh Visibility");
    GeoHash.prototype.publish("meshColor", null, "html-color", "Stroke Color", null, { optional: true });
    GeoHash.prototype.publish("meshStrokeWidth", 0.25, "number", "Stroke Width");

    GeoHash.prototype.data = function (_) {
        var retVal = Layer.prototype.data.apply(this, arguments);
        if (arguments.length) {
            this._dataMinWeight = null;
            this._dataMaxWeight = null;

            this.data().forEach(function (item) {
                if (!this._dataMinWeight || item[1] < this._dataMinWeight) {
                    this._dataMinWeight = item[1];
                }
                if (!this._dataMaxWeight || item[1] > this._dataMaxWeight) {
                    this._dataMaxWeight = item[1];
                }
            }, this);
        }
        return retVal;
    };

    GeoHash.prototype.layerEnter = function (base, svgElement, domElement) {
        Layer.prototype.layerEnter.apply(this, arguments);

        this.geohash = new Utility.Geohash();
        this._geoHashTransform = svgElement.append("g");
        this._selection = new CommonUtility.SimpleSelection(this._geoHashTransform);
        this.geoHashPaths = d3.select(null);
    };

    GeoHash.prototype.layerUpdate = function (base) {
        Layer.prototype.layerUpdate.apply(this, arguments);

        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }

        this._geoHashTransform.style("opacity", this.opacity());

        this.geoHashPaths = this._geoHashTransform.selectAll(".data").data(this.visible() ? this.data() : [], function (d) { return d[0]; });
        var context = this;
        this.geoHashPaths.enter().append("path")
            .attr("class", "data")
            .call(this._selection.enter.bind(this._selection))
            .on("click", function (d) {
                context.click(context.rowToObj(d), "weight", context._selection.selected(this));
            })
            .on("dblclick", function (d) {
                context.dblclick(context.rowToObj(d), "weight", context._selection.selected(this));
            })
        ;
        this.geoHashPaths
            .attr("d", function (d) {
                var pos = context.geohash.bounds(d[0]);
                var route = {
                    type: "LineString",
                    coordinates: [
                        [pos.sw.lon, pos.ne.lat],
                        [pos.ne.lon, pos.ne.lat],
                        [pos.ne.lon, pos.sw.lat],
                        [pos.sw.lon, pos.sw.lat]
                    ]
                };
                return base._d3GeoPath(route);
            })
            .style("fill", function (d) {
                var retVal = context._palette(d[1], context._dataMinWeight, context._dataMaxWeight);
                return retVal;
            })
        ;
        this.geoHashPaths.exit().remove();
    };

    GeoHash.prototype.layerZoomed = function (base) {
        Layer.prototype.layerZoomed.apply(this, arguments);
        this._geoHashTransform
            .attr("transform", "translate(" + base._zoom.translate() + ")scale(" + base._zoom.scale() + ")")
            .attr("stroke-width", 1.5 / base._zoom.scale() + "px")
        ;
    };

    //  Events  ---
    GeoHash.prototype.click = function (row, column, selected) {
        console.log("Click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
    };

    GeoHash.prototype.dblclick = function (row, column, selected) {
        console.log("Double click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
    };

    return GeoHash;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('map/GMap',["d3", "../common/HTMLWidget", "../layout/AbsoluteSurface", "css!./GMap"], factory);
    } else {
        root.map_GMap = factory(root.d3, root.common_HTMLWidget, root.layout_AbsoluteSurface);
    }
}(this, function (d3, HTMLWidget, AbsoluteSurface) {

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

    UserShapeSelectionBag.prototype.load = function(_) {
        this._deserializeShapes(_);
    };

    UserShapeSelectionBag.prototype._saveShape = function(_) {
        var retVal = {};

        var createShapes = {
            "circle": function(_) {
                retVal.type = "circle";
                retVal.pos = {
                    lat: _.center.lat(),
                    lng: _.center.lng()
                };
                retVal.radius = _.radius;
            },
            "rectangle": function(_) {
                retVal.type = "rectangle";
                retVal.bounds = {
                    ne: _.bounds.getNorthEast(),
                    sw: _.bounds.getSouthWest()
                };
            },
            "polygon": function(_) {
                retVal.type = _.__hpcc_type;

                var vertices = _.getPath();

                retVal.vertices = [];

                for (var i = 0; i < vertices.length; i++) {
                    retVal.vertices.push(vertices.getAt(i));
                }
            },
            "polyline": function(_) {
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

    UserShapeSelectionBag.prototype._deserializeShapes = function(_) {

        var shapes = JSON.parse(_);

        var defOptions = {
            strokeWeight: 0,
            fillOpacity: 0.45,
            fillColor: "#1f77b4",
            editable: true,
            clickable: true
        };

        var createShapes = {
            "circle": function(_, map) {
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
            "rectangle": function(_, map) {
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
            "polygon": function(_, map) {
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
            "polyline": function(_, map) {
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

    function GMap() {
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
            this._googleGeocoder.geocode({ 'address': this.centerAddress() }, function (results, status) {
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
                function(){
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
                if (window.google && window.google.maps) {
                    resolve();
                }
                var protocol = window.location.protocol === "https:" ? "https:" : "http:";  //  Could be "file:"
                var hpcc_gmap_apikey = window.__hpcc_gmap_apikey || "AIzaSyDwGn2i1i_pMZvnqYJN1BksD_tjYaCOWKg";
                require(["async!" + protocol + "//maps.google.com/maps/api/js?key=" + hpcc_gmap_apikey + "&libraries=drawing,geometry"], function () {
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

    GMap.prototype.zoomTo = function (selection) {
        var foundCount = 0;
        var latlngbounds = new google.maps.LatLngBounds();
        selection.forEach(function (item) {
            var gLatLong = new google.maps.LatLng(item[0], item[1]);
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
        return this.zoomTo(this.data());
    };

    GMap.prototype.drawingOptions = function(_) {
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

    GMap.prototype.onDrawingComplete = function(event) {
        if (event.type !== google.maps.drawing.OverlayType.MARKER) {
            this._drawingManager.setDrawingMode(null);
            var newShape = event.overlay;
            newShape.__hpcc_type = event.type;
            this._userShapes.add(newShape);
            var context = this;
            var ctrl = false;
            window.addEventListener('keydown', function(e) {
                if (e.keyIdentifier === "Control" || e.ctrlKey === true) {
                    ctrl = true;
                }
            });
            window.addEventListener('keyup', function(e) {
                if (e.ctrlKey === false) {
                    ctrl = false;
                }
            });
            google.maps.event.addListener(newShape, 'click', function (ev) {
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

    return GMap;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('map/GMapGraph.js',["./GMap", "../graph/Graph", "../graph/Edge", "../common/Shape"], factory);
    } else {
        root.map_GMapGraph = factory(root.map_GMap, root.graph_Graph, root.graph_Edge, root.common_Shape);
    }
}(this, function (GMap, Graph, Edge, Shape) {
    function GMapGraph() {
        GMap.call(this);
    }
    GMapGraph.prototype = Object.create(GMap.prototype);
    GMapGraph.prototype.constructor = GMapGraph;
    GMapGraph.prototype._class += " map_GMapGraph";

    GMapGraph.prototype.enter = function () {
        GMap.prototype.enter.apply(this, arguments);
        var graph = new Graph()
            .layout("None")
        ;

        var origRender = graph.render;
        var context = this;
        graph.render = function () {
            var vertices = [];
            var edges = [];
            var prevAddr = null;
            context.data().forEach(function (row) {
                var pos2 = context._viewportSurface.project(row[0], row[1]);
                var newAddr = new Shape()
                    .shape("circle")
                    .radius(3)
                    .data(row)
                    .pos(pos2)
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
            origRender.apply(this, arguments);
            this.graphData.nodeValues().forEach(function (vertex) {
                var pos = context._viewportSurface.project(vertex.data()[0], vertex.data()[1]);
                pos.x -= context.width() / 2;
                pos.y -= context.height() / 2;
                vertex.move(pos);
            });
            this.graphData.edgeValues().forEach(function (edge) {
                edge.points([]);
            });
        };

        this._viewportSurface.widget(graph);
    };

    return GMapGraph;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('map/GMapHeat.js',["./GMap", "../other/HeatMap"], factory);
    } else {
        root.map_GMapHeat = factory(root.map_GMap, root.other_HeatMap);
    }
}(this, function (GMap, HeatMap) {
    function GMapHeat() {
        GMap.call(this);
    }
    GMapHeat.prototype = Object.create(GMap.prototype);
    GMapHeat.prototype.constructor = GMapHeat;
    GMapHeat.prototype._class += " map_GMapHeat";

    GMapHeat.prototype.enter = function () {
        GMap.prototype.enter.apply(this, arguments);
        var heat = new HeatMap();

        var origRender = heat.render;
        var context = this;
        heat.render = function () {
            this.data(context.data().map(function (row) {
                var pos = context._viewportSurface.project(row[0], row[1]);
                return [pos.x, pos.y, row[4]];
            }));
            origRender.apply(this, arguments);
        };

        this._viewportSurface.widget(heat);
    };

    return GMapHeat;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('map/GMapLayered',["d3", "./GMap", "../common/SVGWidget"], factory);
    } else {
        root.map_GMapLayered = factory(root.d3, root.map_GMap, root.common_SVGWidget);
    }
}(this, function (d3, GMap, SVGWidget) {
    var zoomFactor = 1 / (1 << 4);
    var projectionFactor = 1 << 12;
    function Layered() {
        SVGWidget.call(this);
        this._drawStartPos = "origin";
    }
    Layered.prototype = Object.create(SVGWidget.prototype);
    Layered.prototype.constructor = Layered;
    Layered.prototype._class += " map_Layered map_GMapLayered";

    Layered.prototype.enter = function (domNode, element) {
        SVGWidget.prototype.enter.apply(this, arguments);
        this._zoom = d3.behavior.zoom()
            .translate([0, 0])
            .scale(1)
        ;
        this._d3GeoProjection = d3.geo.mercator()
            .scale(projectionFactor / 2 / Math.PI)
            .translate([0, 0])
        ;
        this._d3GeoPath = d3.geo.path()
            .projection(this._d3GeoProjection)
        ;
    };

    Layered.prototype.update = function (domNode, element) {
        SVGWidget.prototype.update.apply(this, arguments);
        this._hasZoomed = true;
        if (!this._hasRendered) {
            this.fullRender();
        } else {
            this.zoomed();
        }
    };

    Layered.prototype.preRender = function (callback) {
        return Promise.all(this.gmap.layers().filter(function (layer) {
            return layer.visible();
        }).map(function (layer) {
            return layer.layerPreRender();
        }));
    };

    Layered.prototype.fullRender = function () {
        if (!this._hasZoomed) return;
        this._hasRendered = true;

        this.size(this.gmap.size());
        var layers = this._element.selectAll(".layerContainer").data(this.gmap.layers().filter(function (layer) { return layer.visible(); }), function (d) { return d.id(); });
        var context = this;
        layers.enter().append("g")
            .attr("class", "layerContainer")
            .each(function (d) {
                var svgElement = d3.select(this);
                var domElement = context._parentOverlay.append("div");
                d.layerEnter(context, svgElement, domElement);
            })
        ;
        layers
            .each(function (d) {
                d.layerUpdate(context);
            })
        ;
        layers.exit()
            .each(function (d) {
                d.layerExit(context);
            })
            .remove()
        ;
        this.zoomed();
    };

    Layered.prototype.zoomed = function () {
        var projection = this.gmap._overlay.getProjection();
        if (projection) {
            var center = new google.maps.LatLng(0, 0);
            var pos = projection.fromLatLngToDivPixel(center);
            var widgetX = parseFloat(this.surface.widgetX());
            var widgetY = parseFloat(this.surface.widgetY());
            var translate = [(pos.x - widgetX), (pos.y - widgetY)];

            var zoom = this.gmap._googleMap.getZoom();
            this._zoom
                .scale(zoomFactor * (1 << zoom))
                .translate(translate)
            ;

            var layers = this._element.selectAll(".layerContainer");
            var context = this;
            layers
                .each(function (d) {
                    d.layerZoomed(context);
                })
            ;
        }
    };

    Layered.prototype.projection = function () {
        return "mercator";
    };

    Layered.prototype.project = function (lat, long) {
        var retVal = this.surface.project(lat, long);
        return [retVal.x, retVal.y];
    };

    function GMapLayered() {
        GMap.call(this);

        this._layers = [];
    }
    GMapLayered.prototype = Object.create(GMap.prototype);
    GMapLayered.prototype.constructor = GMapLayered;
    GMapLayered.prototype._class += " map_GMapLayered";

    GMapLayered.prototype.updateCircles = function () { };
    GMapLayered.prototype.updatePins = function () { };

    GMapLayered.prototype.layers = function (_) {
        if (!arguments.length) return this._layers;
        this._layers = _;
        return this;
    };

    GMapLayered.prototype.enter = function () {
        GMap.prototype.enter.apply(this, arguments);

        this.layered = new Layered();
        this.layered.gmap = this;
        this.layered.surface = this._viewportSurface;

        this.layered.surface.widget(this.layered).render();
    };

    GMapLayered.prototype.render = function (callback) {
        var context = this;
        var retVal = GMap.prototype.render.call(this, function (w) {
            context.layered.preRender().then(function () {
                context.layered.fullRender();
                if (callback) {
                    callback(w);
                }
            });        });
        return retVal;
    };

    return GMapLayered;
}));



(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('map/Pins.js',["d3", "./Layer", "./Utility", "../common/Palette", "../common/Utility", "css!./Pins"], factory);
    } else {
        root.map_Pins = factory(root.d3, root.map_Layer, root.map_Utility, root.common_Palette, root.common_Utility);
    }
}(this, function (d3, Layer, MapUtility, Palette, Utility) {
    function Pins() {
        Layer.call(this);
        Utility.SimpleSelectionMixin.call(this);
        this._geohash = new MapUtility.Geohash();
    }
    Pins.prototype = Object.create(Layer.prototype);
    Pins.prototype.constructor = Pins;
    Pins.prototype._class += " map_Pins";
    Pins.prototype.mixin(Utility.SimpleSelectionMixin);

    Pins.prototype.publish("geohashColumn", null, "set", "Geohash column", function () { return this.columns(); }, { optional: true });
    Pins.prototype.publish("tooltipColumn", null, "set", "Tooltip column", function () { return this.columns(); }, { optional: true });
    Pins.prototype.publish("opacity", 1.0, "number", "Opacity", null, { tags: ["Advanced"] });
    Pins.prototype.publish("fillColor", "#00FFDD", "html-color", "Pin Color", null, { optional: true });
    
    Pins.prototype.publish("strokeWidth", 0.5, "number", "Pin Border Thickness (pixels)", null, { tags: ["Basic"] });
    Pins.prototype.publish("strokeColor", null, "html-color", "Pin Border Color", null, { optional: true });
    
    Pins.prototype.publish("fontSize", 18, "number", "Font Size",null,{tags:["Basic","Shared"]});
    Pins.prototype.publish("fontFamily", "Verdana", "string", "Font Name",null,{tags:["Basic","Shared","Shared"]});
    Pins.prototype.publish("fontColor", "#000000", "html-color", "Font Color",null,{tags:["Basic","Shared"]});
    
    Pins.prototype.publish("pinType", "pin", "set", "Pin Type", ["pin","circle","rectangle","rectangle-pin"], { tags: ["Basic"] });
    Pins.prototype.publish("arrowWidth", 8, "number", "Pin arrow width (pixels)", null, { tags: ["Basic"], disable: function(w) { return ["pin","rectangle-pin"].indexOf(w.pinType()) === -1; } });
    Pins.prototype.publish("arrowHeight", 12, "number", "Pin arrow height (pixels)", null, { tags: ["Basic"], disable: function(w) { return ["pin","rectangle-pin"].indexOf(w.pinType()) === -1; } });
    
    Pins.prototype.publish("pinWidth", 20, "number", "Width of pin (pixels)", null, { tags: ["Basic"], disable: function(w) { return ["rectangle","rectangle-pin"].indexOf(w.pinType()) === -1; } });
    Pins.prototype.publish("pinHeight", 20, "number", "Height of pin (pixels) (not including arrow)", null, { tags: ["Basic"], disable: function(w) { return ["rectangle","rectangle-pin"].indexOf(w.pinType()) === -1; } });
    Pins.prototype.publish("cornerRadius", 10, "number", "Radius of rectangular pin corners (pixels)", null, { tags: ["Basic"], disable: function(w) { return ["rectangle","rectangle-pin"].indexOf(w.pinType()) === -1; } });
    
    Pins.prototype.publish("pinRadius", 12, "number", "Radius of circle (pixels)", null, { tags: ["Basic"], disable: function(w) { return w.pinType() !== "circle"; } });
    
    Pins.prototype.publish("textBaseline", "central", "set", "Pin text vertical alignment", ["auto","use-script","no-change","reset-size","ideographic","alphabetic","hanging","mathematical","central","middle","text-after-edge","text-before-edge","inherit"], { tags: ["Basic"] });
    Pins.prototype.publish("omitNullLatLong", false, "boolean", "Remove lat=0,lng=0 from pinsData", null, { tags: ["Basic"] });

    Pins.prototype.pinsData = function () {
        var geohashField = this._db.fieldByLabel(this.geohashColumn());
        var tooltipField = this._db.fieldByLabel(this.tooltipColumn());
        var context = this;
        return this.data().filter(function(row){
            if(context.omitNullLatLong() && row[0] === 0 && row[1] === 0){
                return false;
            }
            return true;
        }).map(function (row) {
            var retVal = {
                lat: row[0],
                long: row[1],
                ext: row[2] instanceof Object ? row[2] : {},
                origRow: row
            };
            if (geohashField) {
                try {
                    var pos = this._geohash.bounds(row[geohashField.idx]);
                    retVal.lat = (pos.ne.lat + pos.sw.lat) / 2;
                    retVal.long = (pos.ne.lon + pos.sw.lon) / 2;
                } catch (e) {
                }
            }
            if (tooltipField) {
                retVal.ext.tooltip = row[tooltipField.idx];
            }
            return retVal;
        }, this);
    };

    Pins.prototype.layerEnter = function (base, svgElement, domElement) {
        Layer.prototype.layerEnter.apply(this, arguments);

        this._pinsTransform = svgElement;
        this._selection.widgetElement(this._pinsTransform);
        this.pinsPaths = d3.select(null);
    };

    Pins.prototype.layerUpdate = function (base) {
        Layer.prototype.layerUpdate.apply(this, arguments);

        this._pinsTransform
            .style("opacity", this.opacity())
        ;

        this.pinsPaths = this._pinsTransform.selectAll(".pin").data(this.visible() ? this.pinsData() : []);
        var context = this;
        var gPinEnter = this.pinsPaths.enter().append("g")
            .attr("class", "pin")
            .call(this._selection.enter.bind(this._selection))
            .on("click", function (d) {
                context.click(context.rowToObj(d.origRow), "geohash", context._selection.selected(this));
            })
            .on("dblclick", function (d) {
                context.dblclick(context.rowToObj(d[2].origRow), "geohash", context._selection.selected(this));
            })
            .on('mouseover', function (d) {
                if (!context.isIE) {
                    this.parentNode.appendChild(this);
                }
            })
        ;
        gPinEnter
            .append("path")
            .attr("class", "data")
            .append("title")
        ;
        gPinEnter
            .append("text")
            .attr("text-anchor","middle")
        ;
        this.pinsPaths.selectAll("text")
            .style("stroke", this.fontColor())
            .style("fill", this.fontColor())
            .style("font-size", this.fontSize())
            .style("font-family", this.fontFamily())
            .style("dominant-baseline",this.textBaseline())
            .attr("dx",0)
            .attr("dy",this.pinTextDY())
            .text(function(d){
                return d.ext && d.ext.text ? d.ext.text : "";
            });
        var svgPath = this.svgPinPath();
        this.pinsPaths.selectAll("path.data")
            .attr("d", svgPath)
            .attr("stroke-width", this.strokeWidth() + "px")
            .style("display", function (d) {
                var pos = base.project(d.lat, d.long);
                if (!pos) {
                    return "none";
                }
                return null;
            })
            .style("stroke", function (d) {
                return d.ext && d.ext.strokeColor ? d.ext.strokeColor : context.strokeColor();
            })
            .style("fill", function (d) {
                return d.ext && d.ext.fillColor ? d.ext.fillColor : context.fillColor();
            })
        ;
        this.pinsPaths.select("title")
            .text(function (d) {
                return d.ext && d.ext.tooltip ? d.ext.tooltip : "";
            })
        ;
        this.pinsPaths.exit().remove();
    };

    Pins.prototype.layerZoomed = function (base) {
        Layer.prototype.layerZoomed.apply(this, arguments);
        this.pinsPaths
            .attr("transform", function (d) {
                var pos = base.project(d.lat, d.long);
                if (!pos) {
                    pos = [0, 0];
                }
                return "translate(" + pos[0] + ", " + pos[1] + ")scale(" + 1 + ")";
            })
        ;
    };

    Pins.prototype.pinTextDY = function(){
        switch(this.pinType()){
            case "pin":
            case "rectangle-pin": 
                return -this.arrowHeight();
            case "circle":
            case "rectangle": 
                return 0;
        }
    };
    Pins.prototype.svgPinPath = function(){
        switch(this.pinType()){
            case "pin":
                return this.circlePinPath();
            case "circle":
                return this.circlePath();
            case "rectangle": 
                return this.rectanglePath();
            case "rectangle-pin": 
                return this.rectanglePinPath();
        }
    };

    Pins.prototype.rectanglePinPath = function() {
        var width = this.pinWidth();
        var height = this.pinHeight();
        var radius = this.cornerRadius();
        var arrow_h = this.arrowHeight();
        var arrow_w = this.arrowWidth();
        var x = 0 - width/2;
        var y = 0 - height + radius;
        var arrow_b = (width - radius*2 - arrow_w)/2;
        return "M" + x + "," + y +
           "a" + -radius + "," + -radius + " 0 0 1 " + radius + "," + -radius +
           "h" + (width + -radius*2) +
           "a" + radius + "," + radius + " 0 0 1 " + radius + "," + radius +
           "v" + (height + -radius*2) +
           "a" + radius + "," + radius + " 0 0 1 " + -radius + "," + radius +
           "h" + -arrow_b +
           "l" + -arrow_w/2 + "," + arrow_h +
           "l" + -arrow_w/2 + "," + -arrow_h +
           "h" + -arrow_b +
           "a" + -radius + "," + -radius + " 0 0 1 " + -radius + "," + -radius +
           "z";
    };
    Pins.prototype.rectanglePath = function() {
        var width = this.pinWidth();
        var height = this.pinHeight();
        var radius = this.cornerRadius();
        var x = -width/2;
        var y = -height/2;
        y += radius;
        return "M" + x + "," + y +
           "a" + -radius + "," + -radius + " 0 0 1 " + radius + "," + -radius +
           "h" + (width + -radius*2) +
           "a" + radius + "," + radius + " 0 0 1 " + radius + "," + radius +
           "v" + (height + -radius*2) +
           "a" + radius + "," + radius + " 0 0 1 " + -radius + "," + radius +
           "h" + (-width + radius*2) +
           "a" + -radius + "," + -radius + " 0 0 1 " + -radius + "," + -radius +
           "z";
    };
    Pins.prototype.circlePinPath = function() {
        var arrow_h = this.arrowHeight();
        var arrow_w = this.arrowWidth();
        var x = 0 - arrow_w/2;
        var y = 0 - arrow_h;
        var bezier_x = arrow_w/2;
        var bezier_y = arrow_h;
        var c_dx1 = -bezier_x;
        var c_dy1 = -bezier_y;
        var c_dx2 = arrow_w + bezier_x;
        var c_dy2 = c_dy1;
        var c_dx = arrow_w;
        var c_dy = 0;
        return "M" + x + "," + y +
           "c" + c_dx1 + " " + c_dy1 + ", " + c_dx2 + " " + c_dy2 + ", " + c_dx + " " + c_dy +
           "l" + -arrow_w/2 + "," + arrow_h +
           "l" + -arrow_w/2 + "," + -arrow_h +
           "z";
    };
    Pins.prototype.circlePath = function() {
        var radius = this.pinRadius();
        var x = radius/2;
        var y = 0;
        var a_dx = radius/2;
        var a_dy = radius/2;
        return "M" + x + "," + y +
           "a " + a_dx + " " + a_dy + " 0 1 0 0 0.01 0" +
           "z";
    };

    //  Events  ---
    Pins.prototype.click = function (row, column, selected) {
        console.log("Click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
    };

    Pins.prototype.dblclick = function (row, column, selected) {
        console.log("Double click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
    };

    return Pins;
}));

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('map/GMapPin.js',["d3", "./GMapLayered", "./Pins"], factory);
    } else {
        root.map_GMapPin = factory(root.d3, root.map_GMapLayered, root.map_Pins);
    }
}(this, function (d3, GMapLayered, Pins) {
    function GMapPin(target) {
        GMapLayered.call(this);

        var context = this;
        this._pins = new Pins()
            .columns(["lat", "long", "ext"])
            .on("click", function (row, col, sel) {
                context.click(context.rowToObj(row.ext.origRow), "", sel);
            })
            .on("dblclick", function (row, col, sel) {
                context.dblclick(context.rowToObj(row.ext.origRow), "", sel);
            })
        ;
    }
    GMapPin.prototype = Object.create(GMapLayered.prototype);
    GMapPin.prototype.constructor = GMapPin;
    GMapPin.prototype._class += " map_GMapPin";

    GMapPin.prototype.publishProxy("pinColor", "_pins", "fillColor");
    GMapPin.prototype.publishProxy("pinType", "_pins", "pinType");
    GMapPin.prototype.publishProxy("pinWidth", "_pins", "pinWidth");
    GMapPin.prototype.publishProxy("pinHeight", "_pins", "pinHeight");
    GMapPin.prototype.publishProxy("cornerRadius", "_pins", "cornerRadius");
    GMapPin.prototype.publishProxy("pinRadius", "_pins", "pinRadius");
    GMapPin.prototype.publishProxy("arrowWidth", "_pins", "arrowWidth");
    GMapPin.prototype.publishProxy("arrowHeight", "_pins", "arrowHeight");
    GMapPin.prototype.publishProxy("textBaseline", "_pins", "textBaseline");
    GMapPin.prototype.publishProxy("strokeWidth", "_pins", "strokeWidth");
    GMapPin.prototype.publishProxy("omitNullLatLong", "_pins", "omitNullLatLong");

    GMapPin.prototype.publish("latitudeColumn", null, "set", "Latitude", function () { return this.columns(); }, { optional: true });
    GMapPin.prototype.publish("longtitudeColumn", null, "set", "Longtitude", function () { return this.columns(); }, { optional: true });
    GMapPin.prototype.publish("colorColumn", null, "set", "Color", function () { return this.columns(); }, { optional: true });
    GMapPin.prototype.publish("tooltipColumn", null, "set", "Tooltip", function () { return this.columns(); }, { optional: true });

    GMapPin.prototype.pinsData = function () {
        var columns = this.columns();
        this._view = this._db.rollupView([this.latitudeColumn(), this.longtitudeColumn()]);
        return this._view.entries().map(function (row) {
            var firstRow = row.values[0].values[0];
            return [row.key, row.values[0].key, {
                fillColor: firstRow[columns.indexOf(this.colorColumn())],
                tooltip: firstRow[columns.indexOf(this.tooltipColumn())],
                origRow: firstRow
            }];
        }, this);
    };

    GMapPin.prototype.enter = function (domNode, element) {
        GMapLayered.prototype.enter.apply(this, arguments);
        this
            .layers([
                this._pins
            ])
        ;
    };

    GMapPin.prototype.update = function (domNode, element) {
        GMapLayered.prototype.update.apply(this, arguments);
        this._pins.data(this.pinsData());
    };

    GMapPin.prototype.exit = function (domNode, element) {
        GMapLayered.prototype.exit.apply(this, arguments);
    };

    GMapPin.prototype.click = function (row, column, selected) {
        console.log("Click:  " + JSON.stringify(row) + ", " + column + "," + selected);
    };

    GMapPin.prototype.dblclick = function (row, column, selected) {
        console.log("Double click:  " + JSON.stringify(row) + ", " + column + "," + selected);
    };

    return GMapPin;
}));



(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('map/Lines.js',["d3", "./Layer", "css!./Lines"], factory);
    } else {
        root.map_Graph = factory(root.d3, root.map_Layer);
    }
}(this, function (d3, Layer) {
    function Lines() {
        Layer.call(this);
    }
    Lines.prototype = Object.create(Layer.prototype);
    Lines.prototype.constructor = Lines;
    Lines.prototype._class += " map_Lines";

    Lines.prototype.publish("opacity", 1.0, "number", "Opacity", null, { tags: ["Advanced"] });

    Lines.prototype.data = function (_) {
        var retVal = Layer.prototype.data.apply(this, arguments);
        if (arguments.length) {
            this.dataEdges = [];
            _.forEach(function (row) {
                this.dataEdges.push({
                    type: "LineString",
                    coordinates: [[row[1], row[0]], [row[3], row[2]]]
                });
            }, this);
        }
        return retVal;
    };

    Lines.prototype.layerEnter = function (base, svgElement, domElement) {
        Layer.prototype.layerEnter.apply(this, arguments);

        svgElement.append("defs").append("marker")
            .attr("class", "marker")
            .attr("id", this._id + "_arrowHead")
            .attr("viewBox", "0 0 10 10")
            .attr("refX", 10)
            .attr("refY", 5)
            .attr("markerWidth", 16)
            .attr("markerHeight", 16)
            .attr("markerUnits", "strokeWidth")
            .attr("orient", "auto")
            .append("polyline")
                .attr("points", "0,0 10,5 0,10 1,5")
        ;
        this._edgesTransform = svgElement.append("g");
        this.edgesPaths = d3.select(null);
    };

    Lines.prototype.layerUpdate = function (base) {
        Layer.prototype.layerUpdate.apply(this, arguments);

        this._edgesTransform
            .style("opacity", this.opacity())
        ;

        this.edgesPaths = this._edgesTransform.selectAll(".dataEdge").data(this.visible() ? this.dataEdges : []);
        this.edgesPaths.enter().append("path")
            .attr("class", "dataEdge")
            .attr("marker-end", "url(#" + this._id + "_arrowHead)")
        ;
        this.edgesPaths
            .attr("d", base._d3GeoPath)
        ;
        this.edgesPaths.exit().remove();
    };

    Lines.prototype.layerZoomed = function (base) {
        Layer.prototype.layerZoomed.apply(this, arguments);
        this._edgesTransform
            .attr("transform", "translate(" + base._zoom.translate() + ")scale(" + base._zoom.scale() + ")")
            .style("stroke-width", 0.5 / base._zoom.scale() + "px")
        ;
    };

    return Lines;
}));

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('map/GMapPinLine.js',["d3", "./GMapLayered", "./Lines", "./Pins"], factory);
    } else {
        root.map_GMapPinLine = factory(root.d3, root.map_GMapLayered, root.map_Lines, root.map_Pins);
    }
}(this, function (d3, GMapLayered, Lines, Pins) {
    function GMapPinLine(target) {
        GMapLayered.call(this);

        var context = this;
        this._lines = new Lines();
        this._pins = new Pins()
            .columns(["lat", "long", "ext"])
            .on("click", function (row, col, sel) {
                context.click(context.rowToObj(row.ext.origRow), "", sel);
            })
            .on("dblclick", function (row, col, sel) {
                context.click(context.rowToObj(row.ext.origRow), "", sel);
            })
        ;
    }
    GMapPinLine.prototype = Object.create(GMapLayered.prototype);
    GMapPinLine.prototype.constructor = GMapPinLine;
    GMapPinLine.prototype._class += " map_GMapPinLine";

    GMapPinLine.prototype.publish("fromPinColor", "green", "color", "From Pin Color");
    GMapPinLine.prototype.publish("fromLatitudeColumn", null, "set", "From Latitude", function () { return this.columns(); }, { optional: true });
    GMapPinLine.prototype.publish("fromLongtitudeColumn", null, "set", "From Longtitude", function () { return this.columns(); }, { optional: true });
    GMapPinLine.prototype.publish("fromColorColumn", null, "set", "From Color", function () { return this.columns(); }, { optional: true });
    GMapPinLine.prototype.publish("fromTooltipColumn", null, "set", "From Tooltip", function () { return this.columns(); }, { optional: true });

    GMapPinLine.prototype.publish("toPinColor", "red", "color", "To Pin Color");
    GMapPinLine.prototype.publish("toLatitudeColumn", null, "set", "To Latitude", function () { return this.columns(); }, { optional: true });
    GMapPinLine.prototype.publish("toLongtitudeColumn", null, "set", "To Longtitude", function () { return this.columns(); }, { optional: true });
    GMapPinLine.prototype.publish("toColorColumn", null, "set", "To Color", function () { return this.columns(); }, { optional: true });
    GMapPinLine.prototype.publish("toTooltipColumn", null, "set", "To Tooltip", function () { return this.columns(); }, { optional: true });

    GMapPinLine.prototype.pinsData = function () {
        var columns = this.columns();
        this._fromView = this._db.rollupView([this.fromLatitudeColumn(), this.fromLongtitudeColumn()]);
        this._toView = this._db.rollupView([this.toLatitudeColumn(), this.toLongtitudeColumn()]);
        var fromRetVal = this._fromView.entries().map(function (row) {
            var firstRow = row.values[0].values[0];
            return [row.key, row.values[0].key, {
                fillColor: firstRow[columns.indexOf(this.fromColorColumn())] || this.fromPinColor(),
                tooltip: firstRow[columns.indexOf(this.fromTooltipColumn())],
                origRow: firstRow
            }];
        }, this);
        var toRetVal = this._toView.entries().map(function (row) {
            var firstRow = row.values[0].values[0];
            return [row.key, row.values[0].key, {
                fillColor: firstRow[columns.indexOf(this.toColorColumn())] || this.toPinColor(),
                tooltip: firstRow[columns.indexOf(this.toTooltipColumn())],
                origRow: firstRow
            }];
        }, this);
        return fromRetVal.concat(toRetVal);
    };

    GMapPinLine.prototype.linesData = function () {
        this._linesView = this._db.rollupView([this.fromLatitudeColumn(), this.fromLongtitudeColumn(), this.toLatitudeColumn(), this.toLongtitudeColumn()]);
        return this._linesView.data();
    };

    GMapPinLine.prototype.enter = function (domNode, element) {
        GMapLayered.prototype.enter.apply(this, arguments);
        this
            .layers([
                this._lines,
                this._pins
            ])
        ;
    };

    GMapPinLine.prototype.update = function (domNode, element) {
        GMapLayered.prototype.update.apply(this, arguments);
        this._pins.data(this.pinsData());
        this._lines.data(this.linesData());
    };

    GMapPinLine.prototype.exit = function (domNode, element) {
        GMapLayered.prototype.exit.apply(this, arguments);
    };

    GMapPinLine.prototype.click = function (row, column, selected) {
        console.log("Click:  " + JSON.stringify(row) + ", " + column + "," + selected);
    };

    GMapPinLine.prototype.dblclick = function (row, column, selected) {
        console.log("Double click:  " + JSON.stringify(row) + ", " + column + "," + selected);
    };

    return GMapPinLine;
}));



(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('map/Graph.js',["d3", "topojson", "./Pins", "../graph/Graph", "../graph/Edge", "../common/Shape", "css!./Graph"], factory);
    } else {
        root.map_Graph = factory(root.d3, root.topojson, root.map_Pins, root.graph_Graph, root.graph_Edge, root.common_Shape);
    }
}(this, function (d3, topojson, Pins, GraphGraph, Edge, Shape) {
    function Graph() {
        Pins.call(this);
    }
    Graph.prototype = Object.create(Pins.prototype);
    Graph.prototype.constructor = Graph;
    Graph.prototype._class += " map_Graph";

    Graph.prototype.data = function (_) {
        var retVal = Pins.prototype.data.apply(this, arguments);
        if (arguments.length) {
            this.dataEdges = [];
            var prevPin = null;
            _.forEach(function (row) {
                if (prevPin) {
                    this.dataEdges.push({
                        type: "LineString",
                        coordinates: [[prevPin[1], prevPin[0]],[row[1], row[0]]]
                    });
                }
                prevPin = row;
            }, this);
        }
        return retVal;
    };

    Graph.prototype.layerEnter = function (base, svgElement, domElement) {
        Pins.prototype.layerEnter.apply(this, arguments);

        svgElement.append("defs").append("marker")
            .attr("class", "marker")
            .attr("id", this._id + "_arrowHead")
            .attr("viewBox", "0 0 10 10")
            .attr("refX", 10)
            .attr("refY", 5)
            .attr("markerWidth", 16)
            .attr("markerHeight", 16)
            .attr("markerUnits", "strokeWidth")
            .attr("orient", "auto")
            .append("polyline")
                .attr("points", "0,0 10,5 0,10 1,5")
        ;
        this._edgesTransform = svgElement.append("g");
        this.edgesPaths = d3.select(null);
    };

    Graph.prototype.layerUpdate = function (base) {
        Pins.prototype.layerUpdate.apply(this, arguments);

        this._edgesTransform
            .style("opacity", this.opacity())
        ;

        this.edgesPaths = this._edgesTransform.selectAll(".dataEdge").data(this.visible() ? this.dataEdges : []);
        this.edgesPaths.enter().append("path")
            .attr("class", "dataEdge")
            .attr("marker-end", "url(#" + this._id + "_arrowHead)")
        ;
        this.edgesPaths
            .attr("d", base._d3GeoPath)
        ;
        this.edgesPaths.exit().remove();
    };

    Graph.prototype.layerZoomed = function (base) {
        Pins.prototype.layerZoomed.apply(this, arguments);
        this._edgesTransform
            .attr("transform", "translate(" + base._zoom.translate() + ")scale(" + base._zoom.scale() + ")")
            .style("stroke-width", 0.5 / base._zoom.scale() + "px")
        ;
    };

    return Graph;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('map/Graticule.js',["d3", "topojson", "./Layer", "../common/Palette", "css!./Graticule"], factory);
    } else {
        root.map_Graticule = factory(root.d3, root.topojson, root.map_Layer, root.common_Palette);
    }
}(this, function (d3, topojson, Layer, Palette) {
    function Graticule() {
        Layer.call(this);

        this._dataMap = {};
        this._path = d3.select(null);
    }
    Graticule.prototype = Object.create(Layer.prototype);
    Graticule.prototype.constructor = Graticule;
    Graticule.prototype._class += " map_Graticule";

    Graticule.prototype.publish("opacity", 1.0, "number", "Opacity", null, { tags: ["Advanced"] });

    Graticule.prototype.publish("meshColor", null, "html-color", "Stroke Color", null, { optional: true });
    Graticule.prototype.publish("meshStrokeWidth", 0.25, "number", "Stroke Width");

    Graticule.prototype.layerEnter = function (base, svgElement, domElement) {
        Layer.prototype.layerEnter.apply(this, arguments);

        this._graticule = d3.geo.graticule();
        this._graticulePath = svgElement.append("path")
            .datum(this._graticule)
            .attr("class", "graticule")
        ;
        this._graticuleOutlinePath = svgElement.append("path")
            .datum(this._graticule.outline)
            .attr("class", "graticuleOutline")
        ;
    };

    Graticule.prototype.layerUpdate = function (base) {
        if (!this.visible()) {
            this._graticulePath.attr("d", "");
            this._graticuleOutlinePath.attr("d", "");
            delete this._prevProjection;
            return;
        }

        if (this._prevProjection !== base.projection()) {
            this._graticulePath
                .attr("d", base._d3GeoPath)
            ;
            this._graticuleOutlinePath
                .attr("d", base._d3GeoPath)
            ;
            this._prevProjection = base.projection();
        }
        this._graticulePath
            .style("stroke", this.meshColor())
        ;
        this._graticuleOutlinePath
            .style("stroke", this.meshColor())
        ;
    };

    Graticule.prototype.layerExit = function (base) {
        delete this._prevProjection;
    };

    Graticule.prototype.layerZoomed = function (base) {
        this._graticulePath
            .style("opacity", this.opacity())
            .attr("transform", "translate(" + base._zoom.translate() + ")scale(" + base._zoom.scale() + ")")
            .style("stroke-width", this.meshStrokeWidth() / base._zoom.scale() + "px")
        ;
        this._graticuleOutlinePath
            .style("opacity", this.opacity())
            .attr("transform", "translate(" + base._zoom.translate() + ")scale(" + base._zoom.scale() + ")")
            .style("stroke-width", this.meshStrokeWidth() / base._zoom.scale() + "px")
        ;
    };

    return Graticule;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('map/Heat.js',["d3", "topojson", "./Layer", "../other/HeatMap", "../common/Palette", "css!./Heat"], factory);
    } else {
        root.map_Heat = factory(root.d3, root.topojson, root.map_Layer, root.other_HeatMap, root.common_Palette);
    }
}(this, function (d3, topojson, Layer, HeatMap, Palette) {
    function Heat() {
        Layer.call(this);
    }
    Heat.prototype = Object.create(Layer.prototype);
    Heat.prototype.constructor = Heat;
    Heat.prototype._class += " map_Heat";

    Heat.prototype.publish("opacity", 1.0, "number", "Opacity", null, { tags: ["Advanced"] });

    Heat.prototype.publish("meshColor", null, "html-color", "Stroke Color", null, { optional: true });
    Heat.prototype.publish("meshStrokeWidth", 0.25, "number", "Stroke Width");

    Heat.prototype.layerEnter = function (base, svgElement, domElement) {
        Layer.prototype.layerEnter.apply(this, arguments);
        this._parentOverlay.style("pointer-events", "none");
        this._heatTransform = domElement
            .style("pointer-events", "none")
            .append("div")
                .attr("class", this.classID())
                .style("width", base.width() + "px")
                .style("height", base.height() + "px")
        ;
        this.heat = new HeatMap()
            .target(this._heatTransform.node())
        ;
    };

    Heat.prototype.layerUpdate = function (base) {
        Layer.prototype.layerUpdate.apply(this, arguments);

        this._heatTransform
            .style("opacity", this.opacity())
            .style("width", base.width() + "px")
            .style("height", base.height() + "px")
        ;
        this.heat.resize(base.size());

        this.heat
            .columns(this.columns())
            .data(this.data().map(function (row) {
                var pos = base.project(row[0], row[1]);
                return [pos[0], pos[1], row[4]];
            }))
            .render()
        ;
    };

    Heat.prototype.layerExit = function (base) {
        delete this._prevProjection;
        this.heat.target(null);
        delete this.heat;
    };

    Heat.prototype.layerZoomed = function (base) {
        Layer.prototype.layerZoomed.apply(this, arguments);
        this.heat
            .columns(this.columns())
            .data(this.visible() ? this.data().map(function (row) {
                var pos = base.project(row[0], row[1]);
                return [pos[0], pos[1], row[4]];
            }) : [])
            .render()
        ;
    };

    return Heat;
}));

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('map/IChoropleth.js',["../common/Palette"], factory);
    } else {
        root.map_IChoropleth = factory(root.common_Palette, root.usStates, root.usCounties);
    }
}(this, function (Palette, usStates, usCounties) {
    function IChoropleth() {
    }
    IChoropleth.prototype._palette = Palette.rainbow("default");
    
    //  Events  ---
    IChoropleth.prototype.click = function (row, column, selected) {
        console.log("Click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
    };


    return IChoropleth;
}));



(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('map/OpenStreet.js',["d3", "topojson", "./Layer", "./Utility", "css!./OpenStreet"], factory);
    } else {
        root.map_OpenStreet = factory(root.d3, root.topojson, root.map_Layer, root.map_Utility);
    }
}(this, function (d3, topojson, Layer, Utility) {
    function OpenStreet() {
        Layer.call(this);
    }
    OpenStreet.prototype = Object.create(Layer.prototype);
    OpenStreet.prototype.constructor = OpenStreet;
    OpenStreet.prototype._class += " map_OpenStreet";

    OpenStreet.prototype._copyrightText = "© OpenStreetMap contributors";

    OpenStreet.prototype.publish("tileProvider", "OpenStreetMap", "set", "Tile Provider", ["OpenStreetMap", "OpenStreetMap Hot", "MapQuest", "MapQuest Sat", "Stamen Watercolor", "OpenCycleMap"], { tags: ["Basic", "Shared"] });

    OpenStreet.prototype.layerEnter = function (base, svgElement, domElement) {
        Layer.prototype.layerEnter.apply(this, arguments);

        this._tile = Utility.Tile();
        this._openStreetTransform = svgElement.append("g");
        this._openStreet = this._openStreetTransform.append("g");
        this._copyright = svgElement.append("text")
            .attr("x", -100)
            .attr("y", -100)
            .style("opacity", 0.5)
            .text(this._copyrightText)
        ;
        this._copyrightBBox = this._copyright.node().getBBox();
    };

    OpenStreet.prototype.layerUpdate = function (base) {
        if (!this.visible()) {
            this._copyright.text("");
        } else {
            this._copyright
                .attr("x", base.width() - this._copyrightBBox.width - this._copyrightBBox.height / 2)
                .attr("y", base.height() - this._copyrightBBox.height / 2)
                .text(this._copyrightText)
            ;
        }
    };

    OpenStreet.prototype.layerZoomed = function (base) {
        var tiles = [];
        if (this.visible()) {
            var maxSize = base.project(-85, 180);
            if (!maxSize || maxSize[0] <= 0 || maxSize[1] <= 0) {
                maxSize = [base.width(), base.height()];
            }
            this._tile
                .size([Math.min(base.width(), maxSize[0]), Math.min(base.height(), maxSize[1])])
                .scale(base._zoom.scale() * (1 << 12))
                .translate(base._zoom.translate())
            ;
            tiles = this._tile();
            this._openStreetTransform
                .attr("transform", "scale(" + tiles.scale + ")translate(" + tiles.translate + ")")
            ;
        }
        if (this._prevTileProvider !== this.tileProvider()) {
            this._openStreet.selectAll("image").remove();
            this._prevTileProvider = this.tileProvider();
        }
        var context = this;
        var protocol = window.location.protocol === "https:" ? "https:" : "http:";
        var image = this._openStreet.selectAll("image").data(tiles, function (d) { return d[2] + "/" + d[0] + "/" + d[1]; });
        image.enter().append("image")
            .attr("xlink:href", function (d) {
                switch (context.tileProvider()) {
                    case "OpenStreetMap Hot":
                        return protocol + "//" + ["a", "b", "c"][Math.random() * 3 | 0] + ".tile.openstreetmap.fr/hot/" + d[2] + "/" + d[0] + "/" + d[1] + ".png";
                    case "MapQuest":
                        return protocol + "//otile" + ["1", "2", "3", "4"][Math.random() * 4 | 0] + ".mqcdn.com/tiles/1.0.0/osm/" + d[2] + "/" + d[0] + "/" + d[1] + ".png";
                    case "MapQuest Sat":
                        return protocol + "//otile" + ["1", "2", "3", "4"][Math.random() * 4 | 0] + ".mqcdn.com/tiles/1.0.0/sat/" + d[2] + "/" + d[0] + "/" + d[1] + ".png";
                    case "Stamen Watercolor":
                        return protocol + "//" + ["a", "b", "c"][Math.random() * 3 | 0] + ".tile.stamen.com/watercolor/" + d[2] + "/" + d[0] + "/" + d[1] + ".png";
                    case "OpenCycleMap":
                        return protocol + "//" + ["a", "b"][Math.random() * 2 | 0] + ".tile.opencyclemap.org/cycle/" + d[2] + "/" + d[0] + "/" + d[1] + ".png";
                    default:
                        return protocol + "//" + ["a", "b", "c"][Math.random() * 3 | 0] + ".tile.openstreetmap.org/" + d[2] + "/" + d[0] + "/" + d[1] + ".png";
                }
            })
            .attr("width", 1)
            .attr("height", 1)
            .attr("x", function (d) { return d[0]; })
            .attr("y", function (d) { return d[1]; })
            .style("opacity", 0.0)
            .transition().duration(500)
            .style("opacity", 1)
        ;
        image.exit()
            .remove()
        ;
    };

    return OpenStreet;
}));

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('map/TestHeatMap.js',["../layout/Layered", "../layout/AbsoluteSurface", "./ChoroplethStates", "../other/HeatMap"], factory);
    } else {
        root.map_TestHeatMap = factory(root.layout_Layered, root.layout_AbsoluteSurface, root.map_ChoroplethStates, root.other_HeatMap);
    }
}(this, function (Layered, AbsoluteSurface, ChoroplethStates, HeatMap) {
    function TestHeatMap(target) {
        Layered.call(this);
    }
    TestHeatMap.prototype = Object.create(Layered.prototype);
    TestHeatMap.prototype.constructor = TestHeatMap;
    TestHeatMap.prototype._class += " map_TestHeatMap";

    return TestHeatMap;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('map/TopoJSONChoropleth.js',["d3", "topojson", "./Choropleth", "require"], factory);
    } else {
        root.map_TopoJSONChoropleth = factory(root.d3, root.topojson, root.map_Choropleth, root.require);
    }
}(this, function (d3, topojson, Choropleth, require) {
    function TopoJSONChoropleth() {
        Choropleth.call(this);

        this.projection("mercator");
    }
    TopoJSONChoropleth.prototype = Object.create(Choropleth.prototype);
    TopoJSONChoropleth.prototype.constructor = TopoJSONChoropleth;
    TopoJSONChoropleth.prototype._class += " map_TopoJSONChoropleth";

    TopoJSONChoropleth.prototype.publish("region", "GB", "set", "Region Data", ["AT", "BE", "BG", "CHLI", "CY", "CZ", "DE", "DK", "EE", "ES", "FI", "FR", "GB", "GE", "GR", "HR", "HU", "IE", "IS", "IT", "KS", "LT", "LU", "LV", "MD", "MK", "MT", "ND", "NL", "NO", "PL", "PT", "RO", "RS", "SE", "SI", "SK", "UA"]);

    TopoJSONChoropleth.prototype.layerEnter = function (base, svgElement, domElement) {
        Choropleth.prototype.layerEnter.apply(this, arguments);

        this._selection.widgetElement(this._choroplethData);
        this.choroPaths = d3.select(null);

        var context = this;
        this
            .tooltipHTML(function (d) {
                var columns = context.columns();
                var series = columns && columns.length ? columns[0] : "Location";
                var origData = d && d.length ? d[d.length - 1] : [""];
                return context.tooltipFormat({ label: origData[0], series: series, value: d[1] });
            })
        ;
    };

    TopoJSONChoropleth.prototype.layerUpdate = function (base) {
        Choropleth.prototype.layerUpdate.apply(this, arguments);
        var data = [];
        var context = this;
        this.data().forEach(function (row) {
            if (isNaN(row[0])) {
                for (var key in context._choroTopologyIndex) {
                    for (var key2 in context._choroTopologyIndex[key]) {
                        if (key2 === row[0]) {
                            context._choroTopologyIndex[key][key2].forEach(function (idx) {
                                data.push([idx].concat(row.filter(function (d, i) { return i > 0; })).concat([row]));
                            });
                        }
                    }
                }
            } else {
                data.push(row.concat([row]));
            }
        });
        this.choroPaths = this._choroplethData.selectAll(".data").data(this.visible() ? data : [], function (d) { return d[0]; });
        this.choroPaths.enter().append("path")
            .attr("class", "data")
            .call(this._selection.enter.bind(this._selection))
            .on("click", function (d) {
                if (context._dataMap[d[0]]) {
                    context.click(context.rowToObj(context._dataMap[d[0]]), "weight", context._selection.selected(context));
                }
            })
            .on("dblclick", function (d) {
                if (context._dataMap[d[0]]) {
                    context.dblclick(context.rowToObj(context._dataMap[d[0]]), "weight", context._selection.selected(context));
                }
            })
            .on("mouseout.tooltip", this.tooltip.hide)
            .on("mousemove.tooltip", this.tooltip.show)
        ;
        this.choroPaths
            .attr("d", function (d) {
                var retVal = base._d3GeoPath(context._choroTopologyFeatures[d[0]]);
                if (!retVal) {
                    console.log("Unknown Country:  " + d);
                }
                return retVal;
            })
            .style("fill", function (d) {
                var retVal = context._palette(d[1], context._dataMinWeight, context._dataMaxWeight);
                return retVal;
            })
        ;
        this.choroPaths.exit().remove();
    };

    TopoJSONChoropleth.prototype.layerPreRender = function () {
        if (this._prevRegion !== this.region()) {
            this._prevRegion = this.region();
            delete this._topoJsonPromise;
        }

        if (!this._topoJsonPromise) {
            var context = this;
            this._topoJsonPromise = new Promise(function (resolve, reject) {
                    require(["json!src/map/TopoJSON/" + context.region() + ".json"], function (region) {
                        context._choroTopology = region;
                        context._choroTopologyObjects = region.objects.PolbndA;
                        context._choroTopologyFeatures = topojson.feature(context._choroTopology, context._choroTopologyObjects).features;

                        require(["json!src/map/TopoJSON/" + context.region() + "_idx.json"], indexLoad, function (err) {
                            indexLoad({});
                        });

                        function indexLoad(index) {
                            context._choroTopologyIndex = index;
                            resolve();
                        }
                    });
            });
        }
        return this._topoJsonPromise;
    };

    return TopoJSONChoropleth;
}));
