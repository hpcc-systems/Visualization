import { Class, EntityCard, HTMLWidget, Icon, SVGWidget } from "@hpcc-js/common";
import { describe, it, expect } from "vitest";
import { classDef, data, render } from "../../common/tests/index.ts";
import { load_dgrid_shim } from "../../dgrid/tests/index.ts";

const urlSearch: string = window.location.href.split("?")[1];

describe("@hpcc-js/timeline", async () => {
    await load_dgrid_shim();

    it("Shim Loaded", () => {
        expect(globalThis["@hpcc-js/dgrid-shim"]).to.exist;
    });

    const timeline = await import("@hpcc-js/timeline");
    const { MiniGantt, ReactAxisGantt, ReactAxisGanttSeries, ReactGantt, ReactTimeline, ReactTimelineSeries } = timeline;

    for (const key in timeline) {
        const item = (timeline as any)[key];
        if (item) {
            if (!urlSearch || urlSearch === item.prototype.constructor.name) {
                describe(`${item.prototype?.constructor?.name}`, () => {
                    it("Simple", () => {
                        expect(true).to.be.true;
                    });
                    if (item.prototype instanceof Class) {
                        classDef("timeline", item);
                    }
                    if (item.prototype instanceof HTMLWidget || item.prototype instanceof SVGWidget) {
                        switch (item.prototype.constructor) {
                            case ReactGantt:
                            case ReactAxisGantt:
                                render(new item.prototype.constructor()
                                    .data([
                                        ["item-1", 0, 1],
                                        ["item-2", 99, 999]
                                    ])
                                );
                                break;
                            case ReactAxisGanttSeries:
                                render(new ReactAxisGanttSeries()
                                    .columns(["Label", "start", "end", "category"])
                                    .seriesColumn("category")
                                    .data([
                                        ["item-1", 7, 45, "A"],
                                        ["item-2", 11, 16, "B"],
                                        ["item-3", 16, 25, "C"],
                                        ["item-3a", 9, 17, "D"],
                                        ["item-3b", 22, 72, "A"],
                                        ["item-3c", 23, 29, "C"],
                                        ["item-3d", 24, 67, "D"],
                                        ["item-3e", 20, 25, "B"],
                                        ["item-4", 1, 20, "D"],
                                        ["item-6", 10, 50, "B"],
                                        ["item-7", 3, 40, "A"]
                                    ])
                                );
                                break;
                            case ReactTimelineSeries:
                                render(new ReactTimelineSeries()
                                    .timePattern("%Y-%m-%dT%H:%M:%S.%LZ")
                                    .columns(["Label", "start", "end", "category"])
                                    .seriesColumn("category")
                                    .data([
                                        ["item-1", "2016-07-01T09:10:00.0Z", "2016-07-01T09:45:00.0Z", "A"],
                                        ["item-2", "2016-07-01T11:00:00.0Z", "2016-07-01T12:00:00.0Z", "B"],
                                        ["item-3", "2016-07-01T09:20:00.0Z", "2016-07-01T12:20:00.0Z", "C"],
                                        ["item-3a", "2016-07-01T09:21:00.0Z", "2016-07-01T12:11:00.0Z", "D"],
                                        ["item-3b", "2016-07-01T09:22:00.0Z", "2016-07-01T12:12:00.0Z", "E"],
                                        ["item-3c", "2016-07-01T09:23:00.0Z", "2016-07-01T12:13:00.0Z", "A"],
                                        ["item-3d", "2016-07-01T09:24:00.0Z", "2016-07-01T12:14:00.0Z", "B"],
                                        ["item-3e", "2016-07-01T09:25:00.0Z", "2016-07-01T12:15:00.0Z", "A"],
                                        ["item-4", "2016-07-01T09:15:00.0Z", "2016-07-01T12:20:00.0Z", "C"],
                                        ["item-6", "2016-07-01T10:00:00.0Z", "2016-07-01T10:50:00.0Z", "A"],
                                        ["item-7", "2016-07-01T10:30:01.0Z", "2016-07-01T10:40:00.0Z", "B"]
                                    ])
                                );
                                break;
                            case ReactTimeline:
                                render(new ReactTimeline()
                                    .timePattern("%Y-%m-%dT%H:%M:%S.%LZ")
                                    .data([
                                        ["item-1", "2016-07-01T09:10:00.0Z", "2016-07-01T09:45:00.0Z"],
                                        ["item-2", "2016-07-01T11:00:00.0Z", "2016-07-01T12:00:00.0Z"],
                                        ["item-3", "2016-07-01T09:20:00.0Z", "2016-07-01T12:20:00.0Z"],
                                        ["item-3a", "2016-07-01T09:21:00.0Z", "2016-07-01T12:11:00.0Z"],
                                        ["item-3b", "2016-07-01T09:22:00.0Z", "2016-07-01T12:12:00.0Z"],
                                        ["item-3c", "2016-07-01T09:23:00.0Z", "2016-07-01T12:13:00.0Z"],
                                        ["item-3d", "2016-07-01T09:24:00.0Z", "2016-07-01T12:14:00.0Z"],
                                        ["item-3e", "2016-07-01T09:25:00.0Z", "2016-07-01T12:15:00.0Z"],
                                        ["item-4", "2016-07-01T09:15:00.0Z", "2016-07-01T12:20:00.0Z"],
                                        ["item-6", "2016-07-01T10:00:00.0Z", "2016-07-01T10:50:00.0Z"],
                                        ["item-7", "2016-07-01T10:30:01.0Z", "2016-07-01T10:40:00.0Z"]
                                    ])
                                );
                                break;
                            case MiniGantt:
                                render(new MiniGantt()
                                    .timePattern("%Y-%m-%dT%H:%M:%S.%LZ")
                                    .tickFormat("%H:%M")
                                    .data([
                                        ["Start", "2016-07-01T09:12:15.0Z"],
                                        ["item-1", "2016-07-01T09:10:00.0Z", "2016-07-01T09:45:00.0Z"],
                                        ["item-2", "2016-07-01T11:00:00.0Z", "2016-07-01T12:00:00.0Z"],
                                        ["item-3", "2016-07-01T09:20:00.0Z", "2016-07-01T12:20:00.0Z"],
                                        ["item-3a", "2016-07-01T09:21:00.0Z", "2016-07-01T12:11:00.0Z"],
                                        ["item-3b", "2016-07-01T09:22:00.0Z", "2016-07-01T12:12:00.0Z"],
                                        ["item-3c", "2016-07-01T09:23:00.0Z", "2016-07-01T12:13:00.0Z"],
                                        ["item-3d", "2016-07-01T09:24:00.0Z", "2016-07-01T12:14:00.0Z"],
                                        ["item-3e", "2016-07-01T09:25:00.0Z", "2016-07-01T12:15:00.0Z"],
                                        ["item-4", "2016-07-01T09:15:00.0Z", "2016-07-01T12:20:00.0Z"],
                                        ["item-6", "2016-07-01T10:00:00.0Z", "2016-07-01T10:50:00.0Z"],
                                        ["item-7", "2016-07-01T10:30:01.0Z", "2016-07-01T10:40:00.0Z"],
                                        ["10 O'Clock", "2016-07-01T10:00:00.0Z"],
                                        ["Finish", "2016-07-01T12:30:45.0Z"]
                                    ])
                                );
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
