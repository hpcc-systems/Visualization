import { HexBin } from "@hpcc-js/chart";

new HexBin()
    .target("target")
    .columns(["x", "y"])
    .data(Array(200).fill(0).map(n => [
        Math.random(), Math.random()
    ]))
    .xAxisType("linear")
    .paletteID("Spectral")
    .binSize(40)
    .render()
    ;
