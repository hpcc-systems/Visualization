"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["@hpcc-js/map"], factory);
    } else {
        root.test_mapFactory = factory();
    }
}(this, function (map) {
    map.topoJsonFolder("../node_modules/@hpcc-js/map/TopoJSON");
    var geoHashData = [{ "count": 34677, "term": "tnk" }, { "count": 21076, "term": "svz" }, { "count": 17655, "term": "s00" }, { "count": 7082, "term": "w30" }, { "count": 6662, "term": "sv8" }, { "count": 5964, "term": "syq" }, { "count": 5594, "term": "xn7" }, { "count": 5123, "term": "tq8" }, { "count": 4472, "term": "tq6" }, { "count": 4015, "term": "xn0" }, { "count": 3753, "term": "syp" }, { "count": 3463, "term": "tnb" }, { "count": 3432, "term": "tjm" }, { "count": 3398, "term": "tw4" }, { "count": 3074, "term": "syr" }, { "count": 2914, "term": "w1p" }, { "count": 2459, "term": "t02" }, { "count": 2082, "term": "tc9" }, { "count": 2032, "term": "wyd" }, { "count": 2008, "term": "w4r" }, { "count": 2002, "term": "wh6" }, { "count": 1817, "term": "tmy" }, { "count": 1801, "term": "tw1" }, { "count": 1772, "term": "twj" }, { "count": 1770, "term": "wvu" }, { "count": 1716, "term": "ttc" }, { "count": 1682, "term": "xn1" }, { "count": 1667, "term": "tjw" }, { "count": 1664, "term": "tj6" }, { "count": 1659, "term": "tmr" }, { "count": 1651, "term": "tjd" }, { "count": 1637, "term": "tmw" }, { "count": 1595, "term": "tp8" }, { "count": 1594, "term": "tnh" }, { "count": 1529, "term": "sv9" }, { "count": 1493, "term": "xn6" }, { "count": 1463, "term": "tne" }, { "count": 1462, "term": "szx" }, { "count": 1410, "term": "wyp" }, { "count": 1402, "term": "wyn" }, { "count": 1389, "term": "xn3" }, { "count": 1309, "term": "tn4" }, { "count": 1300, "term": "wsq" }, { "count": 1287, "term": "d29" }, { "count": 1280, "term": "tn0" }, { "count": 1275, "term": "ttb" }, { "count": 1271, "term": "ucf" }, { "count": 1266, "term": "tm2" }, { "count": 1259, "term": "twh" }, { "count": 1252, "term": "w4x" }, { "count": 1233, "term": "tnm" }, { "count": 1198, "term": "u15" }, { "count": 1194, "term": "svy" }, { "count": 1180, "term": "tn5" }, { "count": 1176, "term": "tn8" }, { "count": 1173, "term": "tmt" }, { "count": 1169, "term": "sfx" }, { "count": 1155, "term": "u0n" }, { "count": 1145, "term": "tc8" }, { "count": 1138, "term": "ttf" }, { "count": 1138, "term": "6gy" }, { "count": 1137, "term": "tp9" }, { "count": 1113, "term": "tw5" }, { "count": 1111, "term": "tuu" }, { "count": 1104, "term": "dr4" }, { "count": 1072, "term": "u0v" }, { "count": 1048, "term": "u09" }, { "count": 1040, "term": "gcp" }, { "count": 1038, "term": "sy1" }, { "count": 1023, "term": "sfr" }, { "count": 1018, "term": "tnd" }, { "count": 1007, "term": "svc" }, { "count": 993, "term": "ttv" }, { "count": 954, "term": "tn1" }, { "count": 941, "term": "u1h" }, { "count": 934, "term": "u0m" }, { "count": 933, "term": "u0w" }, { "count": 924, "term": "tug" }, { "count": 913, "term": "u0q" }, { "count": 909, "term": "u1j" }, { "count": 904, "term": "dr7" }, { "count": 874, "term": "u2m" }, { "count": 810, "term": "dqc" }, { "count": 717, "term": "tn7" }, { "count": 695, "term": "d2f" }, { "count": 694, "term": "u0u" }, { "count": 692, "term": "tjf" }, { "count": 686, "term": "xnd" }, { "count": 671, "term": "u0y" }, { "count": 667, "term": "drt" }, { "count": 665, "term": "u1w" }, { "count": 552, "term": "wc2" }, { "count": 526, "term": "u30" }, { "count": 523, "term": "tnt" }, { "count": 508, "term": "xne" }, { "count": 499, "term": "xps" }, { "count": 495, "term": "tjb" }, { "count": 489, "term": "dp3" }, { "count": 484, "term": "dr5" }, { "count": 357, "term": "u28" }];
    var createMap = function (gmapFlag, topoArr, opts, callback) {
        opts = opts || {
            openStreet: true,
            continents: true,
            countries: true,
            states: true,
            counties: true,
            geoHash: true,
            graph_pins: true,
            graticule: true,
            heat: true
        };
        legacyRequire(["test/DataFactory", gmapFlag ? "src/map/GMapLayered" : "src/map/Layered", "src/map/OpenStreet",
            "src/map/ChoroplethContinents", "src/map/ChoroplethCountries", "src/map/ChoroplethStates", "src/map/TopoJSONChoropleth", "src/map/ChoroplethCounties",
            "src/map/Graticule", "src/map/GeoHash", "src/map/Graph", "src/map/Heat"], function (DataFactory, Base, OpenStreet, ChoroplethContinents, ChoroplethCountries, ChoroplethStates, TopoJSONChoropleth, ChoroplethCounties, Graticule, GeoHash, Pins, Heat) {
                function Sample() {
                    Base.call(this);

                    var rawData = DataFactory.Counties.simple.rawData;
                    var countyData = rawData.map(function (item) {
                        return [item.county, item.weight];
                    });

                    this._openStreetLayer = new OpenStreet()
                        .tileProvider("OpenStreetMap")
                        ;
                    this._continentsLayer = new ChoroplethContinents()
                        .meshStrokeWidth(0.5)
                        ;
                    this._statesLayer = new ChoroplethStates()
                        .meshStrokeWidth(0.5)
                        ;
                    this._topoIdx = {};
                    this._topoLayer = topoArr.map(function (region) {
                        var retVal = new TopoJSONChoropleth()
                            .region(region)
                            .meshStrokeWidth(0.5)
                            ;
                        this._topoIdx[region] = retVal;
                        return retVal;
                    }, this);
                    this._statesLayer = new ChoroplethStates()
                        .meshStrokeWidth(0.5)
                        ;
                    this._countriesLayer = new ChoroplethCountries()
                        .opacity(0.25)
                        .meshVisible(true)
                        .meshStrokeWidth(0.75)
                        .columns(DataFactory.Countries.simple.columns)
                        .data(DataFactory.Countries.simple.rawData)
                        ;
                    this._countiesLayer = new ChoroplethCounties()
                        .meshVisible(false)
                        .opacity(0.5)
                        .columns(DataFactory.Counties.simple.columns)
                        .data(countyData)
                        ;
                    this._geoHashLayer = new GeoHash()
                        .paletteID("PuOr")
                        .opacity(0.75)
                        .columns(["geohash", "weight"])
                        .data(geoHashData.map(function (row) { return [row.term, row.count]; }))
                        ;
                    this._heatLayer = new Heat()
                        .columns(DataFactory.GMap.heat.columns)
                        .data(DataFactory.GMap.heat.data)
                        ;
                    this._graph_pinsLayer = new Pins()
                        .opacity(0.75)
                        .columns(DataFactory.GMap.simple.columns)
                        .data(DataFactory.GMap.simple.data)
                        ;
                    this._graticuleLayer = new Graticule()
                        .opacity(0.5)
                        .meshStrokeWidth(0.75)
                        ;
                    var layers = [
                        this._openStreetLayer,
                        this._continentsLayer,
                        this._statesLayer,
                        this._countriesLayer,
                        this._countiesLayer,
                        this._geoHashLayer,
                        this._countiesLayer,
                        this._heatLayer,
                        this._graph_pinsLayer,
                        this._graticuleLayer
                    ].concat(this._topoLayer);
                    this.layers(layers)
                }
                Sample.prototype = Object.create(Base.prototype);
                Sample.prototype.constructor = Sample;
                Sample.prototype._class += " test_Sample";

                Sample.prototype.publish("openStreet", !gmapFlag && opts.openStreet, "boolean", "Open Street Map");
                Sample.prototype.publish("continents", opts.continents, "boolean", "Continents");
                Sample.prototype.publish("countries", opts.countries, "boolean", "Countries");
                Sample.prototype.publish("states", opts.states, "boolean", "US States");
                Sample.prototype.publish("counties", opts.counties, "boolean", "US Counties");
                Sample.prototype.publish("geoHash", opts.geoHash, "boolean", "Graticule");
                Sample.prototype.publish("graph_pins", opts.graph_pins, "boolean", "Pins");
                Sample.prototype.publish("graticule", opts.graticule, "boolean", "Graticule");
                Sample.prototype.publish("heat", opts.heat, "boolean", "Heat");

                Sample.prototype.update = function (domNode, element) {
                    this._openStreetLayer.visible(this.openStreet());
                    this._continentsLayer.visible(this.continents());
                    this._countriesLayer.visible(this.countries());
                    this._statesLayer.visible(this.states());
                    this._countiesLayer.visible(this.counties());
                    this._geoHashLayer.visible(this.geoHash());
                    this._heatLayer.visible(this.heat());
                    this._graph_pinsLayer.visible(this.graph_pins());
                    this._graticuleLayer.visible(this.graticule());
                    Base.prototype.update.apply(this, arguments);
                };
                callback(new Sample());
            });
    }

    var mapFactory = {
        Graticule: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/map/Graticule"], function (DataFactory, Graticule) {
                    callback(new Graticule()
                    );
                });
            }
        },
        ChoroplethCounties: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/map/ChoroplethCounties"], function (DataFactory, ChoroplethCounties) {
                    var rawData = DataFactory.Counties.simple.rawData;
                    var countyData = rawData.map(function (item) {
                        return [item.county, item.weight];
                    });
                    callback(new ChoroplethCounties()
                        .columns(DataFactory.Counties.simple.columns)
                        .data(countyData)
                    );
                });
            }
        },
        ChoroplethCountries: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/map/ChoroplethCountries"], function (DataFactory, ChoroplethCountries) {
                    callback(new ChoroplethCountries()
                        .columns(DataFactory.Countries.simple.columns)
                        .data(DataFactory.Countries.simple.rawData)
                    );
                });
            }
        },
        ChoroplethContinents: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/map/ChoroplethContinents"], function (DataFactory, ChoroplethContinents) {
                    callback(new ChoroplethContinents());
                });
            }
        },
        ChoroplethStates: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/map/ChoroplethStates"], function (DataFactory, ChoroplethStates) {
                    callback(new ChoroplethStates()
                        .columns(DataFactory.States.simple.columns)
                        .data(DataFactory.States.simple.data)
                    );
                });
            },
            autoSizeData: function (callback) {
                legacyRequire(["src/map/ChoroplethStates"], function (ChoroplethStates) {
                    callback(new ChoroplethStates()
                        .columns(["State", "Weight"])
                        .data([["AL", 4779736], ["FL", 710231]])
                        .autoScaleMode("data")
                    );
                });
            },
            pins: function (callback) {
                legacyRequire(["test/DataFactory", "src/map/Layered", "src/map/ChoroplethStates", "src/map/Pins"], function (DataFactory, Layered, ChoroplethStates, Pins) {
                    var choro = new ChoroplethStates()
                        .columns(["State", "Weight"])
                        .data([["AL", 4779736], ["FL", 710231]])
                        ;
                    var pins = new Pins()
                        .columns(DataFactory.GMap.simple.columns)
                        .data(DataFactory.GMap.simple.data)
                        ;
                    callback(new Layered()
                        .layers([choro, pins])
                    );
                });
            },
            heat: function (callback) {
                legacyRequire(["test/DataFactory", "src/map/Layered", "src/map/ChoroplethStates", "src/map/Heat"], function (DataFactory, Layered, ChoroplethStates, Heat) {
                    mapFactory.ChoroplethStates.simple(function (map) {
                        var choro = new ChoroplethStates()
                            .columns(["State", "Weight"])
                            .data([["AL", 4779736], ["FL", 710231]])
                            ;
                        var heat = new Heat()
                            .columns(DataFactory.GMap.heat.columns)
                            .data(DataFactory.GMap.heat.data)
                            ;
                        callback(new Layered()
                            .layers([choro, heat])
                        );
                    });
                });
            }
        },
        TopoJSONChoropleth: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/map/TopoJSONChoropleth"], function (DataFactory, TopoJSONChoropleth) {
                    callback(new TopoJSONChoropleth()
                        //.columns(DataFactory.States.simple.columns)
                        //.data(DataFactory.States.simple.data)
                    );
                });
            }
        },
        BritishIsles: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/map/TopoJSONChoropleth"], function (DataFactory, TopoJSONChoropleth) {
                    var eu = ["AT", "BE", "BG", "CHLI", "CY", "CZ", "DE", "DK", "EE", "ES", "FI", "FR", "GB", "GE", "GR", "HR", "HU", "IE", "IS", "IT", "KS", "LT", "LU", "LV", "MD", "MK", "MT", "ND", "NL", "NO", "PL", "PT", "RO", "RS", "SE", "SI", "SK", "UA"];
                    createMap(false, ["GB", "ND", "IE"], {
                        graticule: true
                    }, function (map) {
                        map._topoIdx["IE"]
                            .columns(["County", "Population"])
                            .data([[15, 50], ["Dublin", 75], ["Cork", 100]])
                            ;
                        map._topoIdx["GB"]
                            .columns(["County", "Population"])
                            .data([["London", 75], ["Greater Manchester", 100]])
                            ;
                        callback(map);
                    });
                });
            }
        },
        GMap: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/map/GMap"], function (DataFactory, GMap) {
                    callback(new GMap()
                        .columns(DataFactory.GMap.simple.columns)
                        .data(DataFactory.GMap.simple.data)
                    );
                });
            },
            streetView: function (callback) {
                legacyRequire(["test/DataFactory", "src/map/GMap"], function (DataFactory, GMap) {
                    callback(new GMap()
                        .columns(DataFactory.GMap.simple.columns)
                        .data(DataFactory.GMap.simple.data)
                        .centerAddress('6601 Park of Commerce Blvd, Boca Raton, FL')
                        .streetViewControl(true)
                        .streetView(true)
                    );
                });
            },
            splitStreetView: function (callback) {
                legacyRequire(["src/map/GMap", "src/layout/Grid"], function (GMap, Grid) {
                    var _map = new GMap()
                        .centerAddress('Boca Raton, FL')
                        ;
                    var _streetViewMap = new GMap()
                        .centerAddress('6601 Park of Commerce Blvd, Boca Raton, FL')
                        .streetViewControl(true)
                        .streetView(true)
                        ;
                    callback(new Grid()
                        .setContent(0, 0, _map)
                        .setContent(0, 1, _streetViewMap)
                    );
                });
            },
            counties: function (callback) {
                legacyRequire(["test/DataFactory", "src/map/GMapCounties"], function (DataFactory, GMapCounties) {
                    var rawData = DataFactory.Counties.simple.rawData;
                    var countyData = rawData.map(function (item) {
                        return [item.county, item.weight];
                    });
                    callback(new GMapCounties()
                        .columns(DataFactory.Counties.simple.columns)
                        .data(countyData)
                    );
                });
            },
            pins: function (callback) {
                legacyRequire(["test/DataFactory", "src/map/GMapPin"], function (DataFactory, GMapPin) {
                    callback(new GMapPin()
                        .latitudeColumn("dest_lat")
                        .longtitudeColumn("dest_long")
                        .tooltipColumn("dest_airport")
                        .columns(DataFactory.Sample.FlightPath.columns)
                        .data(DataFactory.Sample.FlightPath.data.map(function (n) {
                            var dest_airport_idx = DataFactory.Sample.FlightPath.columns.indexOf('dest_airport');
                            var dest_iata_idx = DataFactory.Sample.FlightPath.columns.indexOf('dest_iata');
                            var dest_airport = n[dest_airport_idx];
                            var dest_iata = n[dest_iata_idx];
                            n[dest_airport_idx] = '<b style="font-size: 20px">' + dest_iata + '</b><br/><i>' + dest_airport + '</i>';
                            return n;
                        }))
                    );
                });
            },
            pin: function (callback) {
                require(["test/DataFactory", "src/map/GMapPin"], function (DataFactory, GMapPin) {
                    callback(new GMapPin()
                        .autoScale(true)
                        .latitudeColumn("dest_lat")
                        .longtitudeColumn("dest_long")
                        .tooltipColumn("dest_iata")
                        .columns(DataFactory.Sample.FlightPath.columns)
                        .data(DataFactory.Sample.FlightPath.data.filter(function (row, idx) {
                            return idx === 0;
                        }))
                    );
                });
            },
            pinLines: function (callback) {
                legacyRequire(["test/DataFactory", "src/map/GMapPinLine"], function (DataFactory, GMapPinLine) {
                    callback(new GMapPinLine()
                        .fromLatitudeColumn("orgin_lat")
                        .fromLongtitudeColumn("orgin_long")
                        .toLatitudeColumn("dest_lat")
                        .toLongtitudeColumn("dest_long")
                        .columns(DataFactory.Sample.FlightPath.columns)
                        .data(DataFactory.Sample.FlightPath.data)
                    );
                });
            },
            colored: function (callback) {
                legacyRequire(["test/DataFactory", "src/map/GMap"], function (DataFactory, GMap) {
                    callback(new GMap()
                        .zoom(10)
                        .centerLat(39.782613703514876)
                        .centerLong(-86.15475628906252)
                        .columns([])
                        .data([])
                        .googleMapStyles([{ "elementType": "geometry", "stylers": [{ "hue": "#ff4400" }, { "saturation": -68 }, { "lightness": -4 }, { "gamma": 0.72 }] }, { "featureType": "road", "elementType": "labels.icon" }, { "featureType": "landscape.man_made", "elementType": "geometry", "stylers": [{ "hue": "#0077ff" }, { "gamma": 3.1 }] }, { "featureType": "water", "stylers": [{ "hue": "#00ccff" }, { "gamma": 0.44 }, { "saturation": -33 }] }, { "featureType": "poi.park", "stylers": [{ "hue": "#44ff00" }, { "saturation": -23 }] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "hue": "#007fff" }, { "gamma": 0.77 }, { "saturation": 65 }, { "lightness": 99 }] }, { "featureType": "water", "elementType": "labels.text.stroke", "stylers": [{ "gamma": 0.11 }, { "weight": 5.6 }, { "saturation": 99 }, { "hue": "#0091ff" }, { "lightness": -86 }] }, { "featureType": "transit.line", "elementType": "geometry", "stylers": [{ "lightness": -48 }, { "hue": "#ff5e00" }, { "gamma": 1.2 }, { "saturation": -23 }] }, { "featureType": "transit", "elementType": "labels.text.stroke", "stylers": [{ "saturation": -64 }, { "hue": "#ff9100" }, { "lightness": 16 }, { "gamma": 0.47 }, { "weight": 2.7 }] }])
                    );
                });
            },
            graph: function (callback) {
                legacyRequire(["test/DataFactory", "src/map/GMapGraph"], function (DataFactory, GMapGraph) {
                    callback(new GMapGraph()
                        .columns(DataFactory.GMap.graph.columns)
                        .data(DataFactory.GMap.graph.data)
                    );
                });
            },
            heat: function (callback) {
                legacyRequire(["test/DataFactory", "src/map/GMapHeat"], function (DataFactory, GMapHeat) {
                    callback(new GMapHeat()
                        .columns(DataFactory.GMap.heat.columns)
                        .data(DataFactory.GMap.heat.data)
                    );
                });
            },
            layered: function (callback) {
                createMap(true, [], null, callback);
            },
            drawing: function (callback) {
                legacyRequire(["test/DataFactory", "src/map/GMap"], function (DataFactory, GMap) {
                    var map = new GMap();
                    map.drawingTools(true);
                    callback(map);
                });
            }
        },
        Layered: {
            simple: function (callback) {
                createMap(false, [], null, callback);
            },
            simple_cluster: function (callback) {
                legacyRequire(["test/DataFactory", "src/map/Layered", "src/map/CanvasPinLayer", "src/map/OpenStreet"], function (DataFactory, Layered, CanvasPinLayer, OpenStreet) {
                    var layered = new Layered();
                    layered.layers([
                        new OpenStreet().tileProvider("OpenStreetMap"),
                        new CanvasPinLayer()
                            .columns(DataFactory.GMap.simple.columns)
                            .data(DataFactory.GMap.simple.data)
                    ]);
                    callback(layered);
                });
            },
            cluster: function (callback) {
                legacyRequire(["test/DataFactory", "src/map/Layered", "src/map/CanvasPinLayer", "src/map/OpenStreet"], function (DataFactory, Layered, CanvasPinLayer, OpenStreet) {
                    var layered = new Layered();
                    layered
                        .centerLat(40)
                        .centerLong(-100)
                        .autoScaleMode("none")
                        .layers([
                            new OpenStreet()
                                .tileProvider("OpenStreetMap"),
                            new CanvasPinLayer()
                                .columns(["lat", "long", "weight"])
                                .clusterMode("grid")
                                .weightColumn("weight")
                                .useWeightedRadius(true)
                                .data(Array(300).fill('').map(function (n) {
                                    const lat = 40 + Math.pow(Math.random(), 3);
                                    const long = -100 + Math.pow(Math.random(), 3);
                                    const weight = Math.floor(100 * Math.random());
                                    return [lat, long, weight];
                                }))
                        ]);
                    callback(layered);
                });
            }
        },
        OpenStreet: {
            simple: function (callback) {
                legacyRequire(["src/map/OpenStreet"], function (OpenStreet) {
                    callback(new OpenStreet());
                });
            }
        },
        GeoHash: {
            simple: function (callback) {
                legacyRequire(["src/map/GeoHash"], function (GeoHash) {
                    callback(new GeoHash()
                        .columns(["geohash", "weight"])
                        .data(geoHashData.map(function (row) { return [row.term, row.count]; }))
                    );
                });
            }
        },
        Pins: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/map/Pins"], function (DataFactory, Pins) {
                    callback(new Pins()
                        .columns(DataFactory.GMap.simple.columns)
                        .data(DataFactory.GMap.simple.data)
                    );
                });
            }
        },
        Lines: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/map/Lines"], function (DataFactory, Lines) {
                    callback(new Lines()
                        .columns(["latitude", "longtitude", "pin", "circle"])
                        .data([[51.897969, -8.475438, 35.652930, 139.687128],
                        [35.652930, 139.687128, 37.665074, -122.384375],
                        [37.665074, -122.384375, 32.690680, -117.178540],
                        [32.690680, -117.178540, 39.709455, -104.969859],
                        [39.709455, -104.969859, 41.244123, -95.961610],
                        [41.244123, -95.961610, 32.688980, -117.192040],
                        [32.688980, -117.192040, 45.786490, -108.526600],
                        [45.786490, -108.526600, 45.796180, -108.535652],
                        [45.796180, -108.535652, 45.774320, -108.494370],
                        [45.774320, -108.494370, 45.777062, -108.549835],
                        [45.777062, -108.549835, 51.897969, -8.475438]])
                    );
                });
            }
        },
        Graph: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/map/Graph"], function (DataFactory, Graph) {
                    callback(new Graph()
                        .columns(DataFactory.GMap.simple.columns)
                        .data(DataFactory.GMap.simple.data)
                    );
                });
            }
        },
        Heat: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/map/Heat"], function (DataFactory, Heat) {
                    callback(new Heat()
                        .columns(DataFactory.GMap.heat.columns)
                        .data(DataFactory.GMap.heat.data)
                    );
                });
            }
        }
    };

    return mapFactory;
}));
