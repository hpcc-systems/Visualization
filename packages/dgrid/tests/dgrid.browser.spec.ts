import { Class, HTMLWidget, SVGWidget } from "@hpcc-js/common";
import { describe, it, expect } from "vitest";
import { classDef, renderMedium } from "../../common/tests/index.ts";

const simple = {
    ND: {
        columns: ["Subject", "Year 1", "Year 2", "Year 3", "Year 4"],
        data: [
            ["English", 5, 43, 41, 92],
            ["English II", 17, 43, 83, 93],
            ["English III", 6, 43, 64, 93],
            ["Geography", 7, 45, 52, 83],
            ["Geography II", 16, 73, 52, 83],
            ["Geography III", 26, 83, 11, 72],
            ["Science", 66, 60, 85, 6],
            ["Science II", 46, 20, 53, 7],
            ["Science III", 46, 20, 38, 7],
            ["Math", 98, 30, 23, 13],
            ["Math II", 76, 30, 34, 6],
            ["Math III", 80, 30, 27, 8]
        ]
    },
};

describe("@hpcc-js/dgrid", async () => {

    const script = document.createElement('script');
    script.src = import.meta.resolve("../../dgrid-shim/dist/index.js");
    script.type = 'text/javascript';
    document.head.appendChild(script);

    await new Promise<void>((resolve) => {
        script.onload = () => {
            resolve();
        }
    });

    it("Shim Loaded", () => {
        expect(globalThis["@hpcc-js/dgrid-shim"]).to.exist;
    });

    const dgridMod = await import("@hpcc-js/dgrid");

    it("dgridMod Loaded", () => {
        expect(dgridMod).to.exist;
    });

    for (const key in dgridMod) {
        const item = dgridMod[key];
        if (item?.prototype?.constructor?.name) {
            describe(`${item.prototype?.constructor?.name}`, () => {
                it("Simple", () => {
                    expect(true).to.be.true;
                });

                if (item.prototype instanceof Class) {
                    it("Class Derived", () => {
                        expect(item.prototype instanceof Class).to.be.true;
                    });
                }



                if (item.prototype instanceof Class) {
                    classDef("dgrid", item);
                }

                if (item.prototype instanceof HTMLWidget || item.prototype instanceof SVGWidget) {
                    it(item.prototype.constructor.name, () => {
                        expect(true).to.be.true;
                    });
                    if (item instanceof dgridMod.Table) {
                        renderMedium(new dgridMod.Table()
                            .columns(simple.ND.columns)
                            .data(simple.ND.data)
                        );
                    }
                    switch (item.prototype.constructor) {
                        case dgridMod.Common:
                        case dgridMod.DatasourceTable:
                            break;
                        case dgridMod.Table:
                            it("renderMedium", () => {
                                expect(true).to.be.true;
                            });
                            renderMedium(new item.prototype.constructor()
                                .columns(simple.ND.columns)
                                .data(simple.ND.data)
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
});
