import { Contour } from "@hpcc-js/chart";

new Contour()
    .target("target")
    .columns(["X", "Y"])
    .data([
        [13, 144],
        [21, 89],
        [34, 55],
        [55, 34],
        [89, 21],
        [144, 13]
    ])
    .paletteID("Plasma")
    .contourBandwidth(30)
    .contourStrokeColor("#333")
    .xAxisFocus(true)
    .render()
    ;
