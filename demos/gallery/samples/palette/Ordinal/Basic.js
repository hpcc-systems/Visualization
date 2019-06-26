import { Column } from "@hpcc-js/chart";
import { Palette } from "@hpcc-js/common";

Palette.ordinal("Pretty in Pink", ["#ffc2cd", "#ff93ac", "#ff6289", "#fc3468", "#ff084a"]);

new Column()
    .target("target")
    .columns(["Subject", "Year 1", "Year 2", "Year 3"])
    .data([
        ["Geography", 75, 68, 65],
        ["English", 45, 55, -52],
        ["Math", 98, 92, 90],
        ["Science", 66, 60, 72]
    ])
    .paletteID("Pretty in Pink")
    .render()
    ;
