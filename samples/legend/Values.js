import { Column } from "@hpcc-js/chart";
import { ChartPanel } from "@hpcc-js/layout";

new ChartPanel()
    .widget(new Column())
    .target("target")
    .columns(["Subject", "Year 1", "Year 2", "Year 3"])
    .data([
        ["Geography", 75, 68, 65],
        ["English", 45, 55, -52],
        ["Math", 98, 92, 90],
        ["Science", 66, 60, 72]
    ])
    .title("Exam Results 2008->10")
    .legendVisible(true)
    .legend_showSeriesTotal(true)
    .legend_showLegendTotal(true)
    .render()
    ;
