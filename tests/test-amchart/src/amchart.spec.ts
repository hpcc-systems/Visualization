import { Area, Bar, Column, Combo, CommonFunnel, CommonRadar, CommonSerial, CommonXY, Funnel, Gantt, Gauge, Line, Pie, Polar, Pyramid, Scatter } from "@hpcc-js/amchart";
import * as amchart from "@hpcc-js/amchart";
import { Class, HTMLWidget, SVGWidget } from "@hpcc-js/common";
import { data } from "@hpcc-js/test-data";
import { expect } from "chai";
import { classDef, render } from "./coreTests";

const urlSearch: string = window.location.href.split("?")[1];

describe.skip("@hpcc-js/amchart", () => {
    for (const key in amchart) {
        const item = (amchart as any)[key];
        if (item) {
            if (!urlSearch || urlSearch === item.prototype.constructor.name) {
                describe(`${item.prototype.constructor.name}`, () => {
                    if (item.prototype instanceof Class) {
                        classDef("amchart", item);
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
                                const col = new Column()
                                    .columns(data.ND.subjects.columns)
                                    .data(data.ND.subjects.data)
                                    ;
                                col.backwardsCompatible(false);
                                col.yAxis(0)
                                    .axisType("linear")
                                    .axisType("ordinal");
                                col.xAxis(0);
                                render(col); break;
                            case Combo:
                                render(new Combo()
                                    .columns(data.ND.subjects.columns)
                                    .data(data.ND.subjects.data)
                                    .types(["column", "column", "line"])
                                    // .yAxisType("linear")
                                    // .xAxisType("ordinal")
                                );
                                break;
                            case Funnel:
                                render(new Funnel()
                                    .columns(data.ND.subjects.columns)
                                    .data(data.ND.subjects.data)
                                );
                                break;
                            case Gantt:
                                render(new Gantt()
                                    .columns(data.ganttDateRanges.default.columns)
                                    .data(data.ganttDateRanges.default.data)
                                    .guides([{
                                        value: new Date("2014-06-13"),
                                        lineThickness: 4,
                                        lineColor: "#cc0000",
                                        label: "Guide #1",
                                        inside: true
                                    },
                                    {
                                        value: new Date("2014-07-13"),
                                        toValue: new Date("2014-08-13"),
                                        lineAlpha: 0.2,
                                        lineColor: "#00cc00",
                                        lineThickness: 3,
                                        fillAlpha: 0.1,
                                        fillColor: "#00cc00",
                                        label: "Guide #1",
                                        inside: false
                                    }])
                                );
                                break;
                            case Gauge:
                                render(new Gauge()
                                    .low(data.OneD.amgauge.low)
                                    .high(data.OneD.amgauge.high)
                                    .data(data.OneD.amgauge.data)
                                );
                                break;
                            case Line:
                                render(new Line()
                                    .columns(data.ND.subjects.columns)
                                    .data(data.ND.subjects.data)
                                );
                                break;
                            case Pie:
                                render(new Line()
                                    .columns(data.ND.subjects.columns)
                                    .data(data.ND.subjects.data)
                                );
                                break;
                            case Polar:
                                render(new Polar()
                                    .columns(data.ND.ampolar.columns)
                                    .data(data.ND.ampolar.data)
                                );
                                break;
                            case Pyramid:
                                render(new Pyramid()
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
                            case CommonFunnel:
                            case CommonRadar:
                            case CommonSerial:
                            case CommonXY:
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
