import * as dgrid2 from "../src/index.ts";
import { Table } from "../src/index.ts";
import { Class, HTMLWidget, SVGWidget } from "@hpcc-js/common";
import { describe, it, expect } from "vitest";
import { classDef, renderMedium } from "../../common/tests/index.ts";

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
    },
    WordCloud: {
        columns: ["Word", "Weight"],
        words: ["Myriel", "Napoleon", "Mlle.Baptistine", "Mme.Magloire", "CountessdeLo", "Geborand", "Champtercier", "Cravatte", "Count", "OldMan", "Labarre", "Valjean", "Marguerite", "Mme.deR", "Isabeau", "Gervais", "Tholomyes", "Listolier", "Fameuil", "Blacheville", "Favourite", "Dahlia", "Zephine", "Fantine", "Mme.Thenardier", "Thenardier", "Cosette", "Javert", "Fauchelevent", "Bamatabois", "Perpetue", "Simplice", "Scaufflaire", "Woman1", "Judge", "Champmathieu", "Brevet", "Chenildieu", "Cochepaille", "Pontmercy", "Boulatruelle", "Eponine", "Anzelma", "Woman2", "MotherInnocent", "Gribier", "Jondrette", "Mme.Burgon", "Gavroche", "Gillenormand", "Magnon", "Mlle.Gillenormand", "Mme.Pontmercy", "Mlle.Vaubois", "Lt.Gillenormand", "Marius", "BaronessT", "Mabeuf", "Enjolras", "Combeferre", "Prouvaire", "Feuilly", "Courfeyrac", "Bahorel", "Bossuet", "Joly", "Grantaire", "MotherPlutarch", "Gueulemer", "Babet", "Claquesous", "Montparnasse", "Toussaint", "Child1", "Child2", "Brujon", "Mme.Hucheloup"]
    }
};
describe("@hpcc-js/dgrid2", () => {
    for (const key in dgrid2) {
        const item = (dgrid2 as any)[key];
        if (item) {
            if (!urlSearch || urlSearch === item?.prototype?.constructor?.name) {
                describe(`${item.prototype?.constructor?.name}`, () => {
                    it("Simple", () => {
                        expect(true).to.be.true;
                    });
                    if (item.prototype instanceof Class) {
                        classDef("dgrid2", item);
                    }
                    if (item.prototype instanceof HTMLWidget || item.prototype instanceof SVGWidget) {
                        switch (item.prototype.constructor) {
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
