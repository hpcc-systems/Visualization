import { Class, HTMLWidget, SVGWidget } from "@hpcc-js/common";
import { } from "@hpcc-js/sample-data";
import * as layout from "@hpcc-js/timeline";
import { MiniGantt } from "@hpcc-js/timeline";
import { expect } from "chai";
import { classDef, render } from "./coreTests";

const urlSearch: string = window.location.href.split("?")[1];

describe("@hpcc-js/layout", () => {
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
                                    .data([
                                        ["Start", "2016-07-01T12:12:15Z"],
                                        ["item", "2016-12-01T12:12:15Z", "2017-01-01T12:12:15Z"],
                                        ["Finish", "2017-07-01T12:12:15Z"]
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
