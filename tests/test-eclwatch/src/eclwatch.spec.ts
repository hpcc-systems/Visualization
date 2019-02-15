import { Class, HTMLWidget, SVGWidget } from "@hpcc-js/common";
import * as eclwatch from "@hpcc-js/eclwatch";
// tslint:disable-next-line: no-duplicate-imports
import { WUGraph, WUResult, WUStatus, WUTimeline } from "@hpcc-js/eclwatch";
import { classDef /*, render /*, renderMedium /*, renderShort, renderWide*/ } from "@hpcc-js/test-data";
import { expect } from "chai";

const ESP_URL = "http://52.210.14.156:8010/";
const WUID = "W20170510-114044";

describe("@hpcc-js/eclwatch", function () {
    this.timeout(5000);
    for (const key in eclwatch) {
        const item = (eclwatch as any)[key];
        if (item && item.prototype && item.prototype.constructor) {
            describe(`${item.prototype.constructor.name}`, () => {
                if (item.prototype instanceof Class) {
                    classDef("eclwatch", item);
                }
                if (item.prototype instanceof HTMLWidget || item.prototype instanceof SVGWidget) {
                    switch (item.prototype.constructor) {
                        case WUGraph:
                            new WUGraph()
                                .baseUrl(ESP_URL)
                                .wuid(WUID)
                                .graphID("graph1")
                                ;
                            break;
                        case WUResult:
                            new WUResult()
                                .baseUrl(ESP_URL)
                                .wuid(WUID)
                                .resultName("Result 1")
                                ;
                            break;
                        case WUStatus:
                            new WUStatus()
                                .baseUrl(ESP_URL)
                                .wuid(WUID)
                                ;
                            break;
                        case WUTimeline:
                            new WUTimeline()
                                .baseUrl(ESP_URL)
                                .wuid(WUID)
                                ;
                            break;
                        default:
                            it("Has render test", () => {
                                expect(false).to.be.true;
                            });
                    }
                } else {
                    console.log(`Not Widget ${item.prototype.constructor.name}`);
                }
            });
        }
    }
});
