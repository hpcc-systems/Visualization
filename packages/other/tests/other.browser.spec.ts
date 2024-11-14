import * as other from "@hpcc-js/other";
import { Audio, AutoCompleteText, CalendarHeatMap, HeatMap, HPCCBadge, Html, IconList, Legend, MorphText, NestedTable, Opportunity, Paginator, PropertyEditor, RadioCheckbox, Select, Table, ThemeEditor } from "@hpcc-js/other";
import { Class, HTMLWidget, SVGWidget } from "@hpcc-js/common";
import { Line } from "@hpcc-js/chart";
import { Border } from "@hpcc-js/layout";
import { describe, it, expect } from "vitest";
import { classDef, data, render } from "../../common/tests/index.ts";

const urlSearch: string = window.location.href.split("?")[1];

describe("@hpcc-js/other", () => {
    for (const key in other) {
        const item = (other as any)[key];
        if (item) {
            if (!urlSearch || urlSearch === item.prototype.constructor.name) {
                describe(`${item.prototype?.constructor?.name}`, () => {
                    it("Simple", () => {
                        expect(true).to.be.true;
                    });
                    if (item.prototype instanceof Class) {
                        classDef("other", item);
                    }
                    if (item.prototype instanceof HTMLWidget || item.prototype instanceof SVGWidget) {
                        switch (item.prototype.constructor) {
                            case HeatMap:
                                render(new HeatMap()
                                    .columns(data.HeatMap.simple.columns)
                                    .data(data.HeatMap.simple.data)
                                );
                                break;
                            case Table:
                                const table = new Table()
                                    .columns(["Subject", "Year 1", "Year 2", "Year 3", "Year 4"])
                                    .data([
                                        ["Width 2 undefined", , 83, , 72],
                                        ["English II", 17, 43, 83, 93],
                                        ["English III", 6, 43, 64, 93],
                                        ["Width Blank", 7, "", 52, 83],
                                        ["Geography II", 16, 73, 52, 83],
                                        ["Width 2 undefined", , 83, , 72],
                                        ["Science", 66, 60, 85, 6],
                                        ["Science II", 46, 20, 53, 7],
                                        ["With 2 NULL", null, 20, null, 7],
                                        ["Math", 98, 30, 23, 13],
                                        ["Math II", 76, 30, 34, 6],
                                        ["Math III", 80, 30, 27, 8]
                                    ])
                                    ;
                                render(table);
                                break;
                            case Html:
                                render(new Html()
                                    .html('<div style="border:1px solid red;padding:10px;margin:20px;font-size:24px;">Text in a div!</div>')
                                );
                                break;
                            case Audio:
                            case CalendarHeatMap:
                            case IconList:
                            case AutoCompleteText:
                            case ThemeEditor:
                            case RadioCheckbox:
                            case PropertyEditor:
                            case Paginator:
                            case Opportunity:
                            case NestedTable:
                            case MorphText:
                            case HPCCBadge:
                                /*
                                render(new AutoCompleteText()
                                    .columns(["Col Label", "Col Value"])
                                    .data([
                                        ["Math", 0],
                                        ["Science", 1],
                                        ["Geography", 3],
                                        ["Irish", 5],
                                        ["English", 7],
                                        ["Spanish", 2],
                                        ["Physics", 4],
                                        ["Astrology", 6]
                                    ])
                                    .label("Label:  ")
                                    .valueColumn("Col Value")
                                    .textColumn("Col Label")
                                );
                                */
                                break;
                            case Select:
                                render(new Select()
                                    .columns(["Col Label", "Col Value"])
                                    .data([
                                        ["Math", 0],
                                        ["Science", 1],
                                        ["Geography", 3],
                                        ["Irish", 5],
                                        ["English", 7],
                                        ["Spanish", 2],
                                        ["Physics", 4],
                                        ["Astrology", 6]
                                    ])
                                    .label("Label:  ")
                                    .valueColumn("Col Value")
                                    .textColumn("Col Label")
                                );
                                break;
                            case Legend:
                                const line = new Line()
                                    .columns(data.ND.ampolar.columns)
                                    .data(data.ND.ampolar.data)
                                    ;
                                const legend = new Legend()
                                    .targetWidget(line)
                                    ;
                                render(new Border()
                                    .setContent("center", line)
                                    .setContent("right", legend)
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
