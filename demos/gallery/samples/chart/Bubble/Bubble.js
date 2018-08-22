import { Bubble } from "@hpcc-js/chart";

new Bubble()
    .target("target")
    .columns(["Category", "Value"])
    .data([
        ["A", 34],
        ["B", 55],
        ["C", 54],
        ["D", 80],
        ["E", 86],
        ["F", 144]
    ])
    .render()
    ;
