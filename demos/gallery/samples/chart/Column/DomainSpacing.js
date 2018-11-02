import { Column } from "@hpcc-js/chart";

new Column()
    .target("target")
    .paddingInner(0.1)
    .paddingOuter(0.62)
    .columns(["Subject", "Year 1", "Year 2", "Year 3"])
    .data([
        ["Geography", 75, 68, 65],
        ["English", 45, 55, -52],
        ["Math", 98, 92, 90],
        ["Science", 66, 60, 72]
    ])
    .render()
    ;
