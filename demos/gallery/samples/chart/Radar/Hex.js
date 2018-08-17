import { Radar } from "@hpcc-js/chart";

new Radar()
    .target("target")
    .columns(["Stat", "Value"])
    .data([
        ["STR", 75],
        ["INT", 36],
        ["VIT", 98],
        ["DEX", 66],
        ["SPD", 54],
        ["CHA", 45]
    ])
    .render()
    ;
