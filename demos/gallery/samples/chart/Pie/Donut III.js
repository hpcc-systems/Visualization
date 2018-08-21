import { Pie } from "@hpcc-js/chart";

new Pie()
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
    .innerRadius(90)
    .outerText(true)
    .paletteID("category10")
    .render()
    ;