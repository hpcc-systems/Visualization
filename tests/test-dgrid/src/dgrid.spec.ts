import { Class, HTMLWidget, SVGWidget } from "@hpcc-js/common";
import * as dgrid from "@hpcc-js/dgrid";
import { DatasourceTable, Table } from "@hpcc-js/dgrid";
import { expect } from "chai";
import { classDef, renderMedium /*, renderShort, renderWide*/ } from "./coreTests";

const urlSearch: string = window.location.href.split("?")[1];
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
    }
};
describe("@hpcc-js/dgrid", () => {
    for (const key in dgrid) {
        const item = (dgrid as any)[key];
        if (item) {
            if (!urlSearch || urlSearch === item.prototype.constructor.name) {
                describe(`${item.prototype.constructor.name}`, () => {
                    if (item.prototype instanceof Class) {
                        classDef("dgrid", item);
                    }
                    if (item.prototype instanceof HTMLWidget || item.prototype instanceof SVGWidget) {
                        switch (item.prototype.constructor) {
                            case DatasourceTable:
                                break;
                            case Table:
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
    }
});
