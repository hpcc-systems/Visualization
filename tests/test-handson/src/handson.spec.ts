import { Class, HTMLWidget, SVGWidget } from "@hpcc-js/common";
import { Table } from "@hpcc-js/handson";
import * as handson from "@hpcc-js/handson";
import { data } from "@hpcc-js/sample-data";
import { expect } from "chai";
import { classDef, render } from "./coreTests";

const urlSearch: string = window.location.href.split("?")[1];

describe.skip("@hpcc-js/handson", () => {
    for (const key in handson) {
        const item = (handson as any)[key];
        if (item) {
            if (!urlSearch || urlSearch === item.prototype.constructor.name) {
                describe(`${item.prototype.constructor.name}`, () => {
                    if (item.prototype instanceof Class) {
                        classDef("handson", item);
                    }
                    if (item.prototype instanceof HTMLWidget || item.prototype instanceof SVGWidget) {
                        switch (item.prototype.constructor) {
                            case Table:
                                render(new Table()
                                    .columns(data.ND.subjects.columns)
                                    .data(data.ND.subjects.data)
                                );
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
