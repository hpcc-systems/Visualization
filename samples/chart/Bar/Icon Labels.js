import { Bar } from "@hpcc-js/chart";

new Bar()
    .target("target")
    .columns(["Category", "Series-1"])
    .data([
        ["", 34],
        ["", 9],
        ["", 3],
        ["", 12],
        ["", 9],
        ["", 15]
    ])
    .yAxisFontSize(14)
    .yAxisFontFamily("monospace")
    .xAxisFontSize(28)
    .xAxisFontFamily("FontAwesome")
    .yAxisType("linear")
    .xAxisType("ordinal")
    .xAxisTitle("Category")
    .render();