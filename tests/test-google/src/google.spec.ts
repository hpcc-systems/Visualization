import { Class, HTMLWidget, SVGWidget } from "@hpcc-js/common";
import * as chart from "@hpcc-js/google";
import { Area, Bar, Column, Combo, Common, Common2D, CommonND, Line, MaterialBar, MaterialGantt, Pie, Scatter, Timeline, TreeMap } from "@hpcc-js/google";
import { data } from "@hpcc-js/sample-data";
import { expect } from "chai";
import { classDef, render } from "./coreTests";

const urlSearch: string = window.location.href.split("?")[1];
describe("@hpcc-js/common", () => {
    for (const key in chart) {
        const item = (chart as any)[key];
        if (item) {
            if (!urlSearch || urlSearch === item.prototype.constructor.name) {
                describe(`${item.prototype.constructor.name}`, () => {
                    if (item.prototype instanceof Class) {
                        classDef("google", item);
                    }
                    if (item.prototype instanceof HTMLWidget || item.prototype instanceof SVGWidget) {
                        switch (item.prototype.constructor) {
                            case Area:
                                render(new Area()
                                    .columns(data.ND.subjects.columns)
                                    .data(data.ND.subjects.data)
                                );
                                break;
                            case Bar:
                                render(new Bar()
                                    .columns(data.ND.subjects.columns)
                                    .data(data.ND.subjects.data)
                                );
                                break;
                            case Column:
                                render(new Column()
                                    .columns(data.ND.fivecolumn.columns)
                                    .data(data.ND.fivecolumn.data)
                                );
                                break;
                            case Combo:
                                render(new Combo()
                                    .columns(data.ND.subjects.columns)
                                    .data(data.ND.subjects.data)
                                    .types(["bar", "line", "area"])
                                );
                                break;
                            case Line:
                                render(new Line()
                                    .columns(data.ND.fivecolumn.columns)
                                    .data(data.ND.fivecolumn.data)
                                );
                                break;
                            case MaterialBar:
                                render(new MaterialBar()
                                    .columns(data.ND.subjects.columns)
                                    .data(data.ND.subjects.data)
                                );
                                break;
                            case MaterialGantt:
                                render(new MaterialGantt()
                                    .columns(data.ganttDateRanges.default.columns)
                                    .data(data.ganttDateRanges.default.data)
                                );
                                break;
                            case Pie:
                                render(new Pie()
                                    .columns(data.TwoD.subjects.columns)
                                    .data(data.TwoD.subjects.data)
                                );
                                break;
                            case Scatter:
                                render(new Scatter()
                                    .columns(data.ND.subjects.columns)
                                    .data(data.ND.subjects.data)
                                );
                                break;
                            case Timeline:
                                render(new Timeline()
                                    .columns(data.Timeline.default.columns)
                                    .data(data.Timeline.default.data)
                                );
                                break;
                            case TreeMap:
                                render(new TreeMap()
                                    .columns(data.TreeMap.default.columns)
                                    .data(data.TreeMap.default.data));
                                break;
                            case Common:
                            case Common2D:
                            case CommonND:
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
