import { Class, HTMLWidget, SVGWidget } from "@hpcc-js/common";
import { } from "@hpcc-js/sample-data";
import * as layout from "@hpcc-js/timeline";
import { MiniGantt } from "@hpcc-js/timeline";
import { expect } from "chai";
import { classDef, render } from "./coreTests";

const urlSearch: string = window.location.href.split("?")[1];

describe("@hpcc-js/timeline", () => {
    for (const key in layout) {
        const item = (layout as any)[key];
        if (item) {
            if (!urlSearch || urlSearch === item.prototype.constructor.name) {
                describe(`${item.prototype.constructor.name}`, () => {
                    if (item.prototype instanceof Class) {
                        classDef("timeline", item);
                    }
                    if (item.prototype instanceof HTMLWidget || item.prototype instanceof SVGWidget) {
                        switch (item.prototype.constructor) {
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
