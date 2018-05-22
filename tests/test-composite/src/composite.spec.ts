import { Class, HTMLWidget, SVGWidget } from "@hpcc-js/common";
import { Dermatology, MegaChart, MultiChart, MultiChartPanel } from "@hpcc-js/composite";
import * as composite from "@hpcc-js/composite";
import { data } from "@hpcc-js/test-data";
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
                            case MultiChart:
                                render(new MultiChart()
                                    .columns(data.Pivot.subjects.columns)
                                    .data(data.Pivot.subjects.data)
                                    .chartType("COLUMN")
                                );
                            case Dermatology:
                            case MegaChart:
                            case MultiChartPanel:
                                break;
                            default:
                                it("Missing test", () => {
                                    expect(false).to.be.true;
                                });
                        }
                    }
                });
            }
        }
    }
});
