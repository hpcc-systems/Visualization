"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        root.test_mapFactory = factory();
    }
}(this, function () {
    var mapFactory = {
        ChoroplethCounties: {
            simple: function (callback) {
                require(["test/DataFactory", "src/map/ChoroplethCounties"], function (DataFactory, ChoroplethCounties) {
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
                require(["test/DataFactory", "src/map/ChoroplethCountries", "src/map/countries"], function (DataFactory, ChoroplethCountries, countries) {
                    var nameCodeMap = {};
                    for (var key in countries.countryNames) {
                        var item = countries.countryNames[key];
                        nameCodeMap[item.name] = key;
                    }
                    var rawData = DataFactory.Countries.simple.rawData;
                    var countryData = rawData.map(function (item) {
                        return { "country": nameCodeMap[item.name], "weight": item.weight, "label": item.name };
                    });
                    callback(new ChoroplethCountries()
                        .columns(DataFactory.Countries.simple.columns)
                        .data(countryData)
                    );
                });
            }
        },
        ChoroplethStates: {
            simple: function (callback) {
                require(["test/DataFactory", "src/map/ChoroplethStates"], function (DataFactory, ChoroplethStates) {
                    callback(new ChoroplethStates()
                        .columns(DataFactory.States.simple.columns)
                        .data(DataFactory.States.simple.data)
                    );
                });
            },
            heat: function (callback) {
                require(["test/DataFactory", "src/layout/Layered", "src/layout/AbsoluteSurface", "src/other/HeatMap"], function (DataFactory, Layered, AbsoluteSurface, HeatMap) {
                    mapFactory.ChoroplethStates.simple(function (map) {
                        var heat = new HeatMap();
                        var heatData = DataFactory.States.heatmap.heatData;

                        var origRender = heat.render;
                        heat.render = function () {
                            this.data(heatData.map(function (row) {
                                var pos = map.project(row[0], row[1]);
                                return [pos[0], pos[1], row[2]];
                            }));
                            origRender.apply(this, arguments);
                        };
                        callback(new Layered()
                            .addLayer(new AbsoluteSurface().widget(map))
                            .addLayer(new AbsoluteSurface().widget(heat))
                        );
                    });
                });
            }
        },
        GMap: {
            simple: function (callback) {
                require(["test/DataFactory", "src/map/GMap"], function (DataFactory, GMap) {
                    callback(new GMap()
                        .columns(DataFactory.GMap.simple.columns)
                        .data(DataFactory.GMap.simple.data)
                    );
                }, function(e){
                    callback(null); // pass null on error
                });
            },
            graph: function (callback) {
                require(["test/DataFactory", "src/map/GMapGraph"], function (DataFactory, GMapGraph) {
                    callback(new GMapGraph()
                        .columns(DataFactory.GMap.graph.columns)
                        .data(DataFactory.GMap.graph.data)
                    );
                });
            },
            heat: function (callback) {
                require(["test/DataFactory", "src/map/GMapHeat"], function (DataFactory, GMapHeat) {
                    callback(new GMapHeat()
                        .columns(DataFactory.GMap.heat.columns)
                        .data(DataFactory.GMap.heat.data)
                    );
                });
            }
        }
    };

    return mapFactory;
}));
