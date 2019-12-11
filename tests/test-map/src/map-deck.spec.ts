import { Class, HTMLWidget, SVGWidget } from "@hpcc-js/common";
import * as map from "@hpcc-js/map-deck";
// tslint:disable-next-line:no-duplicate-imports
import { CircleLines } from "@hpcc-js/map-deck";
import { isBrowser } from "@hpcc-js/util";
import { expect } from "chai";
import { classDef, render } from "../../test-data/src/index";

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
                            classDef("map-deck", item);
                        }
                        if (item.prototype instanceof HTMLWidget || item.prototype instanceof SVGWidget) {
                            switch (item.prototype.constructor) {
                                case CircleLines:
                                    render(new CircleLines()
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
                                        [45.777062, -108.549835, 51.897969, -8.475438]])
                                        .latitudeColumn("fromLatitude")
                                        .longitudeColumn("fromLongitude")
                                        .latitude2Column("toLatitude")
                                        .longitude2Column("toLongitude")
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
