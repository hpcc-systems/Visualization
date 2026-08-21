import { Area, Column, Step, XYAxis } from "@hpcc-js/chart";

new XYAxis()
    .layers([
        new Column().columns(["Year 1"]),
        new Area().columns(["Year 2"]),
        new Step().columns(["Year 3"])
    ])
    .target("target")
    .columns(["Subject", "Year 1", "Year 2", "Year 3"])
    .data([
        ["Geography", 75, 68, 65],
        ["English", 45, 55, -52],
        ["Math", 98, 92, 90],
        ["Science", 66, 60, 72]
    ])
    .render()
    ;
