import { RadialBar } from "@hpcc-js/chart";

const radialBar = new RadialBar()
    .target("target")
    .columns(["Subject", "Result"])
    .data([
        ["Geography", 75],
        ["English", 45],
        ["Math", 98],
        ["Science", 66]
    ])
    .valueDomainHigh(100)
    .render()
    ;
