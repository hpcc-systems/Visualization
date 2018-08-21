import { HexBin } from "@hpcc-js/chart";

new HexBin()
    .target("target")
    .columns(["x", "y"])
    .data([
        [13, 144],
        [21, 89],
        [34, 55],
        [55, 34],
        [89, 21],
        [144, 13]
    ])
    .paletteID("Plasma")
    .render()
    ;
