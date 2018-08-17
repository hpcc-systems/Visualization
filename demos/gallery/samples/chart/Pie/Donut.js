import { Pie } from "@hpcc-js/chart";

new Pie()
    .target("target")
    .columns(["C1", "V1"])
    .data([
        ["C1_0", 35],
        ["C1_8", 39],
        ["C1_6", 45],
        ["C1_4", 49],
        ["C1_9", 51],
        ["C1_1", 53],
        ["C1_3", 56],
        ["C1_5", 58],
        ["C1_7", 64],
        ["C1_2", 70]
    ])
    .innerRadius(38)
    .outerText(false)
    .paletteID("category10")
    .useClonedPalette(true)
    .render()
    ;