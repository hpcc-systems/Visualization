import { Contour } from "@hpcc-js/chart";

new Contour()
    .target("target")
    .columns(["A", "B"])
    .data([
        [10, 10],
        [20, 20],
        [20, 30],
        [30, 20],
        [40, 30],
        [30, 40],
        [10, 20],
        [20, 10]
    ])
    .contourBandwidth(80)
    .contourStrokeWidth(0)
    .render()
    ;
