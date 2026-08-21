import { Column } from "@hpcc-js/chart";

new Column()
    .target("target")
    .columns(["Category", "Series-1", "Series-2"])
    .data([
        ["A", 34, 21],
        ["B", 55, 34],
        ["C", 54, 90],
        ["D", 80, 153],
        ["E", 86, 92],
        ["F", 144, 233]
    ])
    .paletteID("Accent")
    .tooltipValueFormat(",.0f")
    .showValue(true)
    .yAxisStacked(true)
    .orientation("vertical")
    .render()
    ;
