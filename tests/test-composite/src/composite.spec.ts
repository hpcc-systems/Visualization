import { Class, HTMLWidget, SVGWidget, Text } from "@hpcc-js/common";
import { Dermatology, MegaChart } from "@hpcc-js/composite";
import * as composite from "@hpcc-js/composite";
import { data } from "@hpcc-js/sample-data";
import { expect } from "chai";
import { classDef, render } from "./coreTests";

const urlSearch: string = window.location.href.split("?")[1];

describe("@hpcc-js/composite", () => {
    for (const key in composite) {
        const item = (composite as any)[key];
        if (item) {
            if (!urlSearch || urlSearch === item.prototype.constructor.name) {
                describe(`${item.prototype.constructor.name}`, () => {
                    if (item.prototype instanceof Class) {
                        classDef("composite", item);
                    }
                    if (item.prototype instanceof HTMLWidget || item.prototype instanceof SVGWidget) {
                        switch (item.prototype.constructor) {
                            case Dermatology:
                                render(new Dermatology()
                                    .widget(new Text().text("Hello and WElcome"))
                                );
                                break;
                            case MegaChart:
                                render(new MegaChart()
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
