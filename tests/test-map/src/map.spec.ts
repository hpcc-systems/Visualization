import { Class, HTMLWidget, SVGWidget } from "@hpcc-js/common";
import * as map from "@hpcc-js/map";
// tslint:disable-next-line:no-duplicate-imports
import {
    CanvasPinLayer, ChoroplethContinents, ChoroplethCounties, ChoroplethCountries, ChoroplethStates, GeoHash, GMap, GMapCounties, GMapGraph, GMapLayered, GMapPin, GMapPinLine, Graph, Graticule,
    Layered, Leaflet, Lines, OpenStreet,
    Pins
} from "@hpcc-js/map";
import { isBrowser } from "@hpcc-js/util";
import { expect } from "chai";
import { classDef, flightPath, geo, render } from "../../test-data/src/index";

const urlSearch: string = window.location.href.split("?")[1];

describe("@hpcc-js/map", function () {
    this.timeout(10000);
    if (isBrowser)
        for (const key in map) {
            const item = (map as any)[key];
            if (item && item.prototype && item.prototype.constructor) {
                if (!urlSearch || urlSearch === item.prototype.constructor.name) {
                    describe(`${item.prototype.constructor.name}`, () => {
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
                                    render(new OpenStreet());
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
                                case CanvasPinLayer:
                                case Graph:
                                    break;
                                case Leaflet.ClusterPins:
                                    render(new Leaflet.ClusterPins()
                                        .columns(flightPath.columns)
                                        .data(flightPath.data)
                                        .latitudeColumn("dest_lat")
                                        .longitudeColumn("dest_long")
                                    );
                                    break;
                                default:
                                    it.skip("Has test", () => {
                                        expect(false).to.be.true;
                                    });
                            }
                        }
                    });
                }
            }
        }
});
