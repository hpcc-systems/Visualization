import { Pie } from "@hpcc-js/chart";

new Pie()
    .target("target")
    .columns(["C1", "V1"])
    .data([
        ["C1_6", 44],
        ["C1_1", 44],
        ["C1_5", 47],
        ["C1_4", 47],
        ["C1_3", 51],
        ["C1_0", 56],
        ["C1_8", 58],
        ["C1_2", 59],
        ["C1_7", 61],
        ["C1_9", 62]
    ])
    .innerRadius(90)
    .outerText(true)
    .paletteID("category10")
    .useClonedPalette(true)
    .render()
    ;