import * as phosphor from "@hpcc-js/phosphor";
import { DockPanel, SplitPanel, TabPanel } from "@hpcc-js/phosphor";
import { Class, HTMLWidget, SVGWidget } from "@hpcc-js/common";
import { describe, it, expect } from "vitest";
import { classDef, renderMedium } from "../../common/tests/index.ts";

const urlSearch: string = "";

describe("@hpcc-js/phosphor", () => {
    for (const key in phosphor) {
        const item = (phosphor as any)[key];
        if (item) {
            if (!urlSearch || urlSearch === item.prototype.constructor.name) {
                describe(`${item.prototype?.constructor?.name}`, () => {
                    it("Simple", () => {
                        expect(true).to.be.true;
                    });
                    if (item.prototype instanceof Class) {
                        classDef("phosphor", item);
                    }
                    if (item.prototype instanceof HTMLWidget || item.prototype instanceof SVGWidget) {
                        switch (item.prototype.constructor) {
                            case DockPanel:
                            case SplitPanel:
                            case TabPanel:
                                renderMedium(new item.prototype.constructor());
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
