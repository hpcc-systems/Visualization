import { Scatter } from "@hpcc-js/chart";

new Scatter()
    .target("target")
    .columns(["x", "y", "z"])
    .data(Array(200).fill(0).map(n => [
        Math.random(), Math.random(), Math.random()
    ]))
    .xAxisType("linear")
    .paletteID("hpcc20")
    .render()
    ;
