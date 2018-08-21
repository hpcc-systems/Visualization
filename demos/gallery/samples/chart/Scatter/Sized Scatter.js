import { Scatter } from "@hpcc-js/chart";

new Scatter()
    .columns(["x", "y", "z"])
    .data(Array(200).fill(0).map(n => [Math.random(), Math.random(), Math.random()]))
    .target("target")
    .xAxisType("linear")
    .paletteID("hpcc20")
    .render()
    ;
