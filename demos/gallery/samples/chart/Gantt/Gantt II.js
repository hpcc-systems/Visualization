import { Gantt } from "@hpcc-js/chart";

new Gantt()
    .target("target")
    .columns(["Water State Changes", "Values"])
    .data([
        ["Solid", [0, 273]],
        ["Liquid", [273, 373]],
        ["Gas", [373, 650]]
    ])
    .tooltipValueFormat(",.0f")
    .orientation("horizontal")
    .yAxisType("linear")
    .yAxisStacked(false)
    .yAxisTitle("Kelvin")
    .render()
    ;
