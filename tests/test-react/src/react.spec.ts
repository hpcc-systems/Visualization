import { Class, HTMLWidget, SVGWidget } from "@hpcc-js/common";
import { Orb } from "@hpcc-js/react";
import * as react from "@hpcc-js/react";
import { data } from "@hpcc-js/test-data";
import { expect } from "chai";
import { classDef, render } from "./coreTests";

const urlSearch: string = window.location.href.split("?")[1];

describe("@hpcc-js/react", () => {
    for (const key in react) {
        const item = (react as any)[key];
        if (item && item.prototype && item.prototype.constructor) {
            if (!urlSearch || urlSearch === item.prototype.constructor.name) {
                describe(`${item.prototype.constructor.name}`, () => {
                    if (item.prototype instanceof Class) {
                        classDef("react", item);
                    }
                    if (item.prototype instanceof HTMLWidget || item.prototype instanceof SVGWidget) {
                        switch (item.prototype.constructor) {
                            case Orb:
                                render(new Orb()
                                    .columns(data.Pivot.subjects.columns)
                                    .data(data.Pivot.subjects.data)
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
