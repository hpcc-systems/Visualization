import { Column } from "@hpcc-js/chart";

new Column()
    .target("target")
    .columns(["Category", "Series-1"])
    .data([
        ["A", 34],
        ["B", 55],
        ["C", 54],
    ])
    .tooltipValueFormat(",.0f")
    .showValue(true)
    .render()
    ;
