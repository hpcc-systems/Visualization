import { HalfPie } from "@hpcc-js/chart";

new HalfPie()
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
    .innerRadius(62)
    .paletteID("FlatUI_Indian")
    .showSeriesPercentage(true)
    .render()
    ;