import { Class, HTMLWidget, SVGWidget } from "@hpcc-js/common";
import { describe, it, expect } from "vitest";
import { classDef, flightPath, geo, render } from "../../common/tests/index.ts";
import { load_dgrid_shim } from "../../dgrid/tests/index.ts";

const urlSearch: string = "";

describe("@hpcc-js/map", async () => {
    await load_dgrid_shim();

    it("Shim Loaded", () => {
        expect(globalThis["@hpcc-js/dgrid-shim"]).to.exist;
    });

    const map = await import("@hpcc-js/map");
    const { topoJsonFolder, CanvasPinLayer, CanvasPins, Choropleth, ChoroplethContinents, ChoroplethCounties, ChoroplethCountries, ChoroplethStates, GeoHash, GMap, GMapCounties, GMapGraph, GMapLayered, GMapPin, GMapPinLine, Graph, Graticule, Layered, Leaflet, Lines, OpenStreet, Pins, GMapHeat, Heat, TopoJSONChoropleth, Layer, ChoroplethStatesHeat } = map;
    topoJsonFolder("https://cdn.jsdelivr.net/npm/@hpcc-js/map/TopoJSON");

    for (const key in map) {
        const item = (map as any)[key];
        if (item) {
            if (!urlSearch || urlSearch === item.prototype.constructor.name) {
                describe(`${item.prototype?.constructor?.name}`, () => {
                    it("Simple", () => {
                        expect(true).to.be.true;
                    });
                    if (item.prototype instanceof Class) {
                        classDef("map", item);
                    }
                    if (item.prototype instanceof HTMLWidget || item.prototype instanceof SVGWidget) {
                        switch (item.prototype.constructor) {
                            case ChoroplethContinents:
                                render(new ChoroplethContinents());
                                break;
                            case ChoroplethCountries:
                                render(new ChoroplethCountries()
                                    .columns(geo.Countries.simple.columns)
                                    .data(geo.Countries.simple.rawData)
                                );
                                break;
                            case ChoroplethStates:
                                render(new ChoroplethStates()
                                    .columns(geo.States.simple.columns)
                                    .data(geo.States.simple.data));
                                break;
                            case ChoroplethCounties:
                                render(new ChoroplethCounties()
                                    .columns(geo.Counties.simple.columns)
                                    .data(geo.Counties.simple.rawData)
                                );
                                break;
                            case GeoHash:
                                render(new GeoHash()
                                    .columns(["geohash", "weight"])
                                    .data(geo.GeoHash.map(function (row) { return [row.term, row.count]; }))
                                );
                                break;
                            case GMap:
                                render(new GMap()
                                    .columns(geo.GMap.simple.columns)
                                    .data(geo.GMap.simple.data)
                                );
                                break;
                            case GMapCounties:
                                render(new GMapCounties()
                                    .columns(geo.Counties.simple.columns)
                                    .data(geo.Counties.simple.rawData));
                                break;
                            case GMapGraph:
                                render(new GMapGraph()
                                    .columns(geo.GMap.graph.columns)
                                    .data(geo.GMap.graph.data)
                                );
                                break;
                            case GMapPin:
                                render(new GMapPin()
                                    .columns(flightPath.columns)
                                    .data(flightPath.data)
                                    .latitudeColumn("dest_lat")
                                    .longitudeColumn("dest_long")
                                );
                                break;
                            case GMapPinLine:
                                const gmapLayered = new GMapLayered()
                                    .layers([
                                        new Graticule(),
                                        new ChoroplethContinents(),
                                        new ChoroplethStates()
                                            .columns(geo.States.simple.columns)
                                            .data(geo.States.simple.data),
                                        new Lines()
                                            .opacity(0.75)
                                            .columns(["fromLatitude", "fromLongitude", "toLatitude", "toLongitude"])
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
                                            [45.777062, -108.549835, 51.897969, -8.475438]]),
                                        new Pins()
                                            .opacity(0.75)
                                            .columns(geo.GMap.simple.columns)
                                            .data(geo.GMap.simple.data)
                                    ]);
                                render(gmapLayered);
                                break;
                            case Graticule:
                                render(new Graticule());
                                break;
                            case OpenStreet:
                                // render(new OpenStreet());
                                break;
                            case Layered:
                                const layered = new Layered()
                                    .layers([
                                        new Graticule(),
                                        new ChoroplethContinents(),
                                        new ChoroplethStates()
                                            .columns(geo.States.simple.columns)
                                            .data(geo.States.simple.data),
                                        new Lines()
                                            .opacity(0.75)
                                            .columns(["fromLatitude", "fromLongitude", "toLatitude", "toLongitude"])
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
                                            [45.777062, -108.549835, 51.897969, -8.475438]]),
                                        new Pins()
                                            .opacity(0.75)
                                            .columns(geo.GMap.simple.columns)
                                            .data(geo.GMap.simple.data)
                                    ]);
                                render(layered);
                                break;

                            case Leaflet.ClusterPins:
                                render(new Leaflet.ClusterPins()
                                    .columns(flightPath.columns)
                                    .data(flightPath.data)
                                    .latitudeColumn("dest_lat")
                                    .longitudeColumn("dest_long")
                                );
                                break;

                            case Layer:
                            case GMapLayered:
                            case Choropleth:
                            case ChoroplethStatesHeat:
                            case CanvasPinLayer:
                            case CanvasPins:
                            case Graph:
                            case GMapHeat:
                            case Heat:
                            case Lines:
                            case Pins:
                            case TopoJSONChoropleth:
                                break;

                            default:
                                it("Has render test", () => {
                                    expect(false).to.be.true;
                                });
                        }
                    }
                });
            }
        }
    }
});
