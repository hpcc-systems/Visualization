import * as c3chart from "@hpcc-js/c3chart";
import { Area, Bar, Column, Combo, Common, Common1D, Common2D, CommonND, Donut, Gauge, Pie, Line, Scatter, Step } from "@hpcc-js/c3chart";
import { Class, HTMLWidget, SVGWidget } from "@hpcc-js/common";
import { data } from "@hpcc-js/sample-data";
import { expect } from "chai";
import { classDef, render } from "./coreTests";

const urlSearch: string = window.location.href.split("?")[1];

describe.skip("@hpcc-js/c3chart", () => {
    for (const key in c3chart) {
        const item = (c3chart as any)[key];
        if (item) {
            if (!urlSearch || urlSearch === item.prototype.constructor.name) {
                describe(`${item.prototype.constructor.name}`, () => {
                    if (item.prototype instanceof Class) {
                        classDef("c3chart", item);
                    }
                    if (item.prototype instanceof HTMLWidget || item.prototype instanceof SVGWidget) {
                        switch (item.prototype.constructor) {
                            case Common:
                            case Common1D:
                            case Common2D:
                            case CommonND:
                                break;
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
                                    .columns(data.ND.subjects.columns)
                                    .data(data.ND.subjects.data)
                                );
                                break;
                            case Combo:
                                render(new Combo()
                                    .columns(data.ND.subjects.columns)
                                    .data(data.ND.subjects.data)
                                    .types(["bar", "line", "area"])
                                );
                                break;
                            case Donut:
                                render(new Donut()
                                    .columns(data.TwoD.subjects.columns)
                                    .data(data.TwoD.subjects.data)
                                );
                                break;
                            case Gauge:
                                render(new Gauge()
                                    .columns(data.OneD.subjects.columns)
                                    .data(data.OneD.subjects.data)
                                );
                                break;
                            case Pie:
                                render(new Pie()
                                    .columns(data.TwoD.subjects.columns)
                                    .data(data.TwoD.subjects.data)
                                );
                                break;
                            case Line:
                                render(new Line()
                                    .columns(data.ND.subjects.columns)
                                    .data(data.ND.subjects.data)
                                );
                                break;
                            case Scatter:
                                render(new Scatter()
                                    .columns(data.ND.subjects.columns)
                                    .data(data.ND.subjects.data)
                                );
                                break;
                            case Step:
                                render(new Step()
                                    .columns(data.ND.subjects.columns)
                                    .data(data.ND.subjects.data)
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
