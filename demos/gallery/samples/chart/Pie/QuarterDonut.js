import { QuarterPie } from "@hpcc-js/chart";

new QuarterPie()
    .target("target")
    .columns(["C1", "V1"])
    .data([
        ["A", 144],
        ["B", 89],
        ["C", 55],
        ["D", 34],
        ["E", 21],
        ["F", 13]
    ])
    .innerRadius(38)
    .paletteID("FlatUI_Chinese")
    .showSeriesPercentage(true)
    .render()
    ;