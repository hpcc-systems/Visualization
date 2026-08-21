import { Radar } from "@hpcc-js/chart";
import { ChartPanel } from "@hpcc-js/layout";

const cp = new ChartPanel()
    .widget(new Radar())
    .target("target")
    .columns(["Subject", "Year 1", "Year 2", "Year 3"])
    .data([
        ["Geography", 75, 68, 65],
        ["English", 45, 55, -52],
        ["Math", 98, 92, 90],
        ["Science", 66, 60, 72]
    ])
    .title("Random 26 Series")
    .legendVisible(true)
    .legendPosition("right")
    .legend_symbolType("square")
    .legend_labelAlign("start")
    .legend_shapeRadius(5)
    .legend_itemPadding(5)
    .legend_showSeriesTotal(true)
    .legend_showLegendTotal(true)
    .render()
    ;
