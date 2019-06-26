import { Bar, Column, Line, Pie, Step } from "@hpcc-js/chart";
import { Class, EntityCard, HTMLWidget, Icon, SVGWidget } from "@hpcc-js/common";
import * as layout from "@hpcc-js/layout";
// tslint:disable-next-line: no-duplicate-imports
import { AbsoluteSurface, Accordion, Border, Border2, Carousel, Cell, ChartPanel, FlexGrid, Grid, HorizontalList, Layered, Legend, Modal, Popup, Surface, Tabbed, Toolbar, VerticalList } from "@hpcc-js/layout";
import { expect } from "chai";
import { classDef, data, render } from "../../test-data/src/index";

const urlSearch: string = window.location.href.split("?")[1];

describe("@hpcc-js/layout", function () {
    this.timeout(10000);

    for (const key in layout) {
        const item = (layout as any)[key];
        if (item) {
            if (!urlSearch || urlSearch === item.prototype.constructor.name) {
                describe(`${item.prototype.constructor.name}`, () => {
                    if (item.prototype instanceof Class) {
                        classDef("layout", item);
                    }
                    if (item.prototype instanceof HTMLWidget || item.prototype instanceof SVGWidget) {
                        switch (item.prototype.constructor) {
                            case AbsoluteSurface:
                                const col = new Bar()
                                    .columns(data.ND.subjects.columns)
                                    .data(data.ND.subjects.data)
                                    ;
                                render(new AbsoluteSurface()
                                    .widget(col)
                                    .widgetY(data.AbsoluteSurface.simple.widgetY)
                                    .widgetWidth(data.AbsoluteSurface.simple.widgetWidth)
                                    .widgetHeight(data.AbsoluteSurface.simple.widgetHeight)
                                    .widgetX(data.AbsoluteSurface.simple.widgetX)
                                );
                                break;
                            case Accordion:
                                render(
                                    new Accordion()
                                        .pushListItem(new Accordion()
                                            .pushListItem(new Line()
                                                .columns(data.ND.subjects.columns)
                                                .data(data.ND.subjects.data)
                                            )
                                        )
                                        .pushListItem(new Accordion()
                                            .pushListItem(new Line()
                                                .columns(data.ND.subjects.columns)
                                                .data(data.ND.subjects.data)
                                            )
                                        )
                                        .pushListItem(new Accordion()
                                            .pushListItem(new Line()
                                                .columns(data.ND.subjects.columns)
                                                .data(data.ND.subjects.data)
                                            )
                                            .pushListItem(
                                                new Surface()
                                                    .size({ height: 200, width: 200 })
                                                    .title("Hello and Welcome!")
                                                    .widget(new Line()
                                                        .columns(data.ND.subjects.columns)
                                                        .data(data.ND.subjects.data)
                                                    )
                                            )
                                        )
                                );
                                break;
                            case Border:
                                render(new Border()
                                    .setContent("top", new Pie()
                                        .columns(data.ND.subjects.columns)
                                        .data(data.ND.subjects.data)
                                    )
                                    .setContent("right", new Line()
                                        .columns(data.ND.subjects.columns)
                                        .data(data.ND.subjects.data)
                                    )
                                    .setContent("bottom", new Column()
                                        .columns(data.ND.subjects.columns)
                                        .data(data.ND.subjects.data)
                                    )
                                    .setContent("left", new Step()
                                        .columns(data.ND.subjects.columns)
                                        .data(data.ND.subjects.data)
                                    )
                                    .setContent("center", new Pie()
                                        .columns(data.ND.subjects.columns)
                                        .data(data.ND.subjects.data)
                                    ));
                                break;
                            case Border2:
                                render(new Border2()
                                    .top(new Pie()
                                        .columns(data.ND.subjects.columns)
                                        .data(data.ND.subjects.data)
                                    ).right(new Line()
                                        .columns(data.ND.subjects.columns)
                                        .data(data.ND.subjects.data)
                                    ).bottom(new Column()
                                        .columns(data.ND.subjects.columns)
                                        .data(data.ND.subjects.data)
                                    ).left(new Step()
                                        .columns(data.ND.subjects.columns)
                                        .data(data.ND.subjects.data)
                                    ).center(new Pie()
                                        .columns(data.ND.subjects.columns)
                                        .data(data.ND.subjects.data)
                                    ));
                                break;
                            case Carousel:
                                render(new Carousel()
                                    .widgets([
                                        new Pie().columns(data.ND.subjects.columns).data(data.ND.subjects.data),
                                        new Line().columns(data.ND.subjects.columns).data(data.ND.subjects.data),
                                        new Column().columns(data.ND.subjects.columns).data(data.ND.subjects.data),
                                        new Step().columns(data.ND.subjects.columns).data(data.ND.subjects.data)
                                    ]));
                                break;
                            case Cell:
                                render(new Cell()
                                    .title("Hello and Welcome!")
                                    .widget(new Line()
                                        .columns(data.ND.subjects.columns)
                                        .data(data.ND.subjects.data)
                                    )
                                    .buttonAnnotations(data.Surface.simple.buttonAnnotations)
                                );
                                break;
                            case Grid:
                                render(new Grid()
                                    .setContent(0, 0, new Pie()
                                        .columns(data.TwoD.subjects.columns)
                                        .data(data.TwoD.subjects.data), "", 2, 2
                                    )
                                    .setContent(0, 2, new Pie()
                                        .columns(data.TwoD.subjects.columns)
                                        .data(data.TwoD.subjects.data)
                                        .paletteID("Dark2"), "", 2, 2
                                    )
                                    .setContent(2, 0, new Pie()
                                        .columns(data.TwoD.subjects.columns)
                                        .data(data.TwoD.subjects.data)
                                        .paletteID("Paired"), "", 2, 2
                                    )
                                    .setContent(2, 2, new Pie()
                                        .columns(data.TwoD.subjects.columns)
                                        .data(data.TwoD.subjects.data)
                                        .paletteID("Pastel2"), "", 2, 2
                                    )
                                    .setContent(0, 4, new Line()
                                        .columns(data.ND.subjects.columns)
                                        .data(data.ND.subjects.data)
                                        , "Title AAA", 4, 4
                                    )
                                    .setContent(4, 0, new Bar()
                                        .columns(data.ND.subjects.columns)
                                        .data(data.ND.subjects.data)
                                        , "Title BBB", 4, 8
                                    )
                                );

                                //  Hover indicators  ---
                                const pie1 = new Pie()
                                    .columns(data.TwoD.subjects.columns)
                                    .data(data.TwoD.subjects.data)
                                    ;
                                const pie2 = new Pie()
                                    .columns(data.TwoD.subjects.columns)
                                    .data(data.TwoD.subjects.data)
                                    ;
                                const step1 = new Step()
                                    .columns(data.ND.subjects.columns)
                                    .data(data.ND.subjects.data)
                                    ;
                                const step2 = new Step()
                                    .columns(data.ND.subjects.columns)
                                    .data(data.ND.subjects.data)
                                    ;
                                const grid = new Grid()
                                    .setContent(0, 0, pie1, "Updates Step1")
                                    .setContent(0, 1, pie2, "Updates Step1 & Step2")
                                    .setContent(1, 0, step1, "Step1")
                                    .setContent(1, 1, step2, "Step2")
                                    ;
                                grid.content()[0].indicateTheseIds([grid.content()[2].id()]);
                                grid.content()[1].indicateTheseIds([grid.content()[2].id(), grid.content()[3].id()]);
                                render(grid);
                                break;
                            case Layered:
                                render(new Layered()
                                    .addLayer(new AbsoluteSurface().widgetX(0).widgetY(0).widgetWidth("100").widgetHeight("100").widget(new Pie()
                                        .columns(data.TwoD.subjects.columns)
                                        .data(data.TwoD.subjects.data)
                                    )
                                    )
                                    .addLayer(new AbsoluteSurface().widgetX(40).widgetY(40).widgetWidth("50").widgetHeight("50").opacity(0.66).widget(new Line()
                                        .columns(data.ND.subjects.columns)
                                        .data(data.ND.subjects.data)
                                    )
                                    )
                                    .addLayer(new AbsoluteSurface().widgetX(30).widgetY(10).widgetWidth("40").widgetHeight("60").widget(new Column()
                                        .columns(data.ND.subjects.columns)
                                        .data(data.ND.subjects.data)
                                    )
                                    ));
                                break;
                            case Modal:
                                render(new Modal()
                                    .widget(new Pie()
                                        .columns(data.TwoD.subjects.columns)
                                        .data(data.TwoD.subjects.data)
                                    )
                                );
                                break;
                            case Popup:
                                render(new Popup()
                                    .widget(new Surface()
                                        .widget(new Icon()
                                            .faChar("\uF007")
                                        )
                                    )
                                );
                                break;
                            case Tabbed:
                                render(new Tabbed()
                                    .addTab(new Pie()
                                        .columns(data.TwoD.subjects.columns)
                                        .data(data.TwoD.subjects.data)
                                        , "Pie Chart", true)
                                    .addTab(
                                        new Line()
                                            .columns(data.ND.subjects.columns)
                                            .data(data.TwoD.subjects.data)
                                        , "Line Chart")
                                    .addTab(
                                        new Column()
                                            .columns(data.ND.subjects.columns)
                                            .data(data.ND.subjects.data)
                                        , "Column Chart"
                                    )
                                    .addTab(new Tabbed()
                                        .addTab(new Step()
                                            .columns(data.ND.subjects.columns)
                                            .data(data.ND.subjects.data)
                                            , "Step Chart"
                                        )
                                        .addTab(new Pie()
                                            .columns(data.TwoD.subjects.columns)
                                            .data(data.TwoD.subjects.data)
                                            , "Pie Chart", true), "Nested Example"
                                    )
                                );
                                break;
                            case Surface:
                            case Toolbar:
                                break;
                            case ChartPanel:
                                render(new ChartPanel()
                                    .widget(new Column())
                                    .title("Hello and Welcome!")
                                    .columns(data.ND.subjects.columns)
                                    .data(data.ND.subjects.data)
                                );
                                break;
                            case Legend:
                                break;
                            case HorizontalList:
                                const hlData: Array<[string, number, number]> = [
                                    ["A", 34, 21],
                                    ["B", 55, 34],
                                    ["C", 54, 90],
                                    ["D", 80, 153],
                                    ["E", 86, 92],
                                    ["F", 144, 233]
                                ];
                                render(new HorizontalList()
                                    .itemMinWidth(85)
                                    .itemMinHeight(68)
                                    .widgets(hlData.map(function (row) {
                                        return new EntityCard()
                                            .icon("")
                                            .title(row[0])
                                            .description("sum: " + (row[1] + row[2]))
                                            .iconColor("#000")
                                            .backgroundShape("rect")
                                            .backgroundColorFill("#c8d6e5")
                                            .backgroundColorStroke("#576574")
                                            ;
                                    }))
                                );
                                break;
                            case VerticalList:
                                const vlData: Array<[string, number, number]> = [
                                    ["A", 34, 21],
                                    ["B", 55, 34],
                                    ["C", 54, 90],
                                    ["D", 80, 153],
                                    ["E", 86, 92],
                                    ["F", 144, 233]
                                ];
                                render(new VerticalList()
                                    .itemMinWidth(85)
                                    .itemMinHeight(68)
                                    .widgets(vlData.map(function (row) {
                                        return new EntityCard()
                                            .icon("")
                                            .title(row[0])
                                            .description("sum: " + (row[1] + row[2]))
                                            .iconColor("#000")
                                            .backgroundShape("rect")
                                            .backgroundColorFill("#c8d6e5")
                                            .backgroundColorStroke("#576574")
                                            ;
                                    }))
                                );
                                break;
                            case FlexGrid:
                                break;
                            default:
                                it("Missing tests", () => {
                                    expect(false).to.be.true;
                                });
                        }
                    }
                });
            }
        }
    }
});
