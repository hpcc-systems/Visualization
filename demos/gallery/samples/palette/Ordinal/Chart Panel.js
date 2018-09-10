import { Palette } from "@hpcc-js/common";
import { Column } from "@hpcc-js/chart";
import { ChartPanel } from "@hpcc-js/layout";

Palette.ordinal("Jackie Brown", ["#BAA378", "#382E1C", "#C0A172", "#453823", "#BAA378", "#2C2416"]);

const cp = new ChartPanel()
    .widget(new Column().paletteID("Jackie Brown"))
    .columns(["Subject", "Year 1", "Year 2", "Year 3"])
    .data([
        ["Geography", 75, 68, 65],
        ["English", 45, 55, -52],
        ["Math", 98, 92, 90],
        ["Science", 66, 60, 72]
    ])
    .target("target")
    .title("Exam Results 2008->10")
    .legendVisible(true)
    .render()
    ;
