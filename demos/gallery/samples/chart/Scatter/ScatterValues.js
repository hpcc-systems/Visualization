import { Scatter } from "@hpcc-js/chart";

new Scatter()
    .columns(["Domain", "Value 1", "Value 2"])
    .data([
        ["A", 34, 21],
        ["B", 55, 34],
        ["C", 54, 90],
        ["D", 80, 153],
        ["E", 86, 92],
        ["F", 144, 233]
    ])
    .target("target")
    .paletteID("FlatUI_Chinese")
    .pointShape("rectangle")
    .pointSize(4)
    .showValue(true)
    .valueBaseline("ideographic")
    .render()
    ;
