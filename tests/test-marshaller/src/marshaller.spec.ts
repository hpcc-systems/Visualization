import { Class, HTMLWidget, SVGWidget } from "@hpcc-js/common";
import * as marshaller from "@hpcc-js/marshaller";
import { } from "@hpcc-js/test-data";
import { expect } from "chai";
import { classDef } from "./coreTests";

const urlSearch: string = window.location.href.split("?")[1];

describe.skip("@hpcc-js/marshaller", () => {
    for (const key in marshaller) {
        const item = (marshaller as any)[key];
        if (item && item.prototype instanceof Class) {
            if (!urlSearch || urlSearch === item.prototype.constructor.name) {
                describe(`${item.prototype.constructor.name}`, () => {
                    if (item.prototype instanceof Class) {
                        classDef("marshaller", item);
                    }
                    if (item.prototype instanceof HTMLWidget || item.prototype instanceof SVGWidget) {
                        switch (item.prototype.constructor) {
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
