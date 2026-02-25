// import * as eclwatch from "@hpcc-js/eclwatch";
// import { ECLArchiveViewer, WUGraph, WUResult, WUStatus, WUTimeline } from "@hpcc-js/eclwatch";
import { Class, HTMLWidget, SVGWidget } from "@hpcc-js/common";
import * as eclwatchMod from "@hpcc-js/eclwatch";
import { describe, it, expect } from "vitest";
import { classDef } from "../../common/tests/index.ts";

const urlSearch: string = "";

const ESP_URL = "http://localhost:8010/";
const WUID = "W20241111-173942";

describe("@hpcc-js/eclwatch", async () => {
    for (const key in eclwatchMod) {
        const item = (eclwatchMod as any)[key];
        if (item) {
            if (!urlSearch || urlSearch === item.prototype.constructor.name) {
                describe(`${item.prototype?.constructor?.name}`, () => {
                    it("Simple", () => {
                        expect(true).to.be.true;
                    });
                    if (item.prototype instanceof Class) {
                        classDef("eclwatch", item);
                    }
                    if (item.prototype instanceof HTMLWidget || item.prototype instanceof SVGWidget) {
                        switch (item.prototype.constructor) {
                            case eclwatchMod.ECLArchiveViewer:
                                new eclwatchMod.ECLArchiveViewer()
                                    .baseUrl(ESP_URL)
                                    .wuid(WUID)
                                    ;
                                break;
                            case eclwatchMod.WUGraph:
                                new eclwatchMod.WUGraph()
                                    .baseUrl(ESP_URL)
                                    .wuid(WUID)
                                    .graphID("graph1")
                                    ;
                                break;
                            case eclwatchMod.WUResult:
                                new eclwatchMod.WUResult()
                                    .baseUrl(ESP_URL)
                                    .wuid(WUID)
                                    .resultName("Result 1")
                                    ;
                                break;
                            case eclwatchMod.WUStatus:
                                new eclwatchMod.WUStatus()
                                    .baseUrl(ESP_URL)
                                    .wuid(WUID)
                                    ;
                                break;
                            case eclwatchMod.WUTimeline:
                                new eclwatchMod.WUTimeline()
                                    .baseUrl(ESP_URL)
                                    .wuid(WUID)
                                    ;
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
