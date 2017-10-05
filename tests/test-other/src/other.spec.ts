import { Line } from "@hpcc-js/chart";
import { CanvasWidget, Class, HTMLWidget, SVGWidget } from "@hpcc-js/common";
import { Border } from "@hpcc-js/layout";
import * as other from "@hpcc-js/other";
import { AutoCompleteText, HeatMap, Html, Legend, Select, Table, WordCloud } from "@hpcc-js/other";
import { data } from "@hpcc-js/sample-data";
import { expect } from "chai";
import { classDef, render } from "./coreTests";

const urlSearch: string = window.location.href.split("?")[1];

describe("@hpcc-js/other", () => {
    for (const key in other) {
        const item = (other as any)[key];
        if (item && item.prototype) {
            if (!urlSearch || urlSearch === item.prototype.constructor.name) {
                describe(`${item.prototype.constructor.name}`, () => {
                    if (item.prototype instanceof Class) {
                        classDef("other", item);
                    }
                    if (item.prototype instanceof HTMLWidget || item.prototype instanceof SVGWidget || item.prototype instanceof CanvasWidget) {
                        switch (item.prototype.constructor) {
                            case HeatMap:
                                render(new HeatMap()
                                    .columns(data.HeatMap.simple.columns)
                                    .data(data.HeatMap.simple.data)
                                );
                                break;
                            case WordCloud:
                                /*
                                const words = data.WordCloud.simple.words.map(function (d) {
                                    return [d, 1 + Math.random() * 100];
                                });
                                render(new WordCloud()
                                    .columns(data.WordCloud.simple.columns)
                                    .data(words)
                                );
                                */
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
                            case AutoCompleteText:
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
                                it.skip("Missing Test", () => {
                                    expect(false).to.be.true;
                                });
                        }
                    }
                });
            }
        }
    }
});
