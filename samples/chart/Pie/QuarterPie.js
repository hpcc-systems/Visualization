import { QuarterPie } from "@hpcc-js/chart";

new QuarterPie()
    .target("target")
    .columns(["Subject", "Result"])
    .data([
        ["English", 45],
        ["Irish", 28],
        ["Math", 98],
        ["Geography", 48],
        ["Science", 82]
    ])
    .showSeriesPercentage(true)
    .render()
    ;
