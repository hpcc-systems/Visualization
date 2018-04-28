import * as chart from "@hpcc-js/chart";
import { Area, Axis, Bar, Bubble, Bullet, Column, Contour, Gantt, Gauge, HexBin, Line, Pie, Scatter, Step, Summary, SummaryC, XYAxis } from "@hpcc-js/chart";
import { Class, HTMLWidget, SVGWidget } from "@hpcc-js/common";
import { expect } from "chai";
import { classDef, renderMedium, renderShort, renderSmall, renderWide } from "./coreTests";

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
describe("@hpcc-js/chart", () => {
    for (const key in chart) {
        const item = (chart as any)[key];
        if (item) {
            if (!urlSearch || urlSearch === item.prototype.constructor.name) {
                describe(`${item.prototype.constructor.name}`, () => {
                    if (item.prototype instanceof Class) {
                        classDef("chart", item);
                    }
                    if (item.prototype instanceof HTMLWidget || item.prototype instanceof SVGWidget) {
                        switch (item.prototype.constructor) {
                            case Area:
                            case Bar:
                            case Bubble:
                            case Column:
                            case Contour:
                            case HexBin:
                            case Line:
                            case Pie:
                            case Scatter:
                            case Step:
                            case Summary:
                            case SummaryC:
                                renderMedium(new item.prototype.constructor()
                                    .columns(simple.ND.columns)
                                    .data(simple.ND.data)
                                );
                                break;
                            case Axis:
                                renderShort(new Axis()
                                    .type("ordinal")
                                    .ordinals(["Year 1", "Year 2", "Year 3", "Year 4"])
                                );
                                renderShort(new Axis()
                                    .type("ordinal")
                                    .ordinals(["Year 1", "Year 2", "Year 3", "Year 4"])
                                );
                                renderShort(new Axis()
                                    .type("ordinal")
                                    .overlapMode("stagger")
                                    .ordinals(["Geography-Geography-Geography-Geography-Geography", "English-English-English-English-English-English", "Math-Math-Math-Math-Math-Math-Math-Math-Math-Math", "Science-Science-Science-Science-Science-Science"])
                                );
                                renderShort(new Axis()
                                    .type("linear")
                                    .low(0)
                                    .high(100)
                                );
                                renderShort(new Axis()
                                    .type("time")
                                    .low("2010-03-15")
                                    .high("2012-01-14")
                                );
                                break;
                            case Bullet:
                                renderWide(new Bullet()
                                    .columns(["title", "subtitle", "ranges", "measures", "markers"])
                                    .data([
                                        ["Revenue", "US$, in thousands", [150, 225, 300], [220, 270], [250, 25]],
                                        ["Profit  ", "%", [20, 25, 30], [21, 23], [26]],
                                        ["Order Size", "US$, average", [350, 500, 600], [100, 320], [550]],
                                        ["New Customers", "count", [1400, 2000, 2500], [1000, 1650], 2100],
                                        ["Satisfaction", "out of 5", [3.5, 4.25, 5], [3.2, 4.7], [4.4]]
                                    ])
                                    .titleColumn("title")
                                    .subtitleColumn("subtitle")
                                    .rangesColumn("ranges")
                                    .measuresColumn("measures")
                                    .markersColumn("markers")
                                );
                                break;

                            case Gantt:
                                renderWide(new Gantt()
                                    .yAxisTypeTimePattern("%Y-%m-%d")
                                    .columns(["Project", "Date Range"])
                                    .data([
                                        ["Docs", ["2012-09-09", "2012-10-09"]],
                                        ["Coding", ["2011-08-09", "2012-09-09"]],
                                        ["Specs", ["2010-07-09", "2011-08-09"]]
                                    ])
                                );

                                break;

                            case Gauge:
                                renderSmall(new Gauge()
                                    .title("My Gauge")
                                    .titleDescription("@hpcc-js/chart")
                                    .value(.66)
                                    .valueDescription("Main")
                                    .showTick(true)
                                    .tickValue(.33)
                                    .tickValueDescription("Average")
                                );
                                break;

                            case XYAxis:
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
