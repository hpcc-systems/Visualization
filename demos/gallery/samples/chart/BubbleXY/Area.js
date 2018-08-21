import { BubbleXY } from "@hpcc-js/chart";

new BubbleXY()
    .target("target")
    .columns(["Category", "Value 1", "Value 2"])
    .data([
        ["A", 34, 21],
        ["B", 55, 34],
        ["C", 54, 90],
        ["D", 80, 153],
        ["E", 86, 92],
        ["F", 144, 233]
    ])
    .pointSizeColumn("Value 2")
    .interpolate("linear")
    .interpolateFill(true)
    .interpolateFillOpacity(0.2)
    .pointShape("circle")
    .minPointSize(10)
    .maxPointSize(30)
    .tooltipValueFormat(",.0f")
    .render()
    ;
