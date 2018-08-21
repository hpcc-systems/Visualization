import { HexBin } from "@hpcc-js/chart";

new HexBin()
    .columns(["x", "y"])
    .data(Array(200).fill(0).map(n => [
        Math.random(), Math.random()
    ]))
    .target("target")
    .xAxisType("linear")
    .paletteID("Spectral")
    .binSize(40)
    .render()
    ;
