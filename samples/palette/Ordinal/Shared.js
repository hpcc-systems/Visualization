import { Palette } from "@hpcc-js/common";
import { Pie, Bubble, Column, Bar } from "@hpcc-js/chart";
import { DockPanel } from "@hpcc-js/phosphor";

Palette.ordinal("Jackie Brown", ["#BAA378", "#382E1C", "#C0A172", "#453823", "#BAA378", "#2C2416"]);
Palette.ordinal("Pretty in Pink", ["#ffc2cd", "#ff93ac", "#ff6289", "#fc3468", "#ff084a"]);

const chart1 = new Column()
    .paletteID("Jackie Brown")
    .columns(["Subject", "Year 1", "Year 2", "Year 3"])
    .data([
        ["Geography", 75, 68, 65],
        ["English", 45, 55, -52],
        ["Math", 98, 92, 90],
        ["Science", 66, 60, 72]
    ])
    ;
const chart2 = new Bar()
    .paletteID("Pretty in Pink")
    .columns(["Subject", "Year 1", "Year 2", "Year 3"])
    .data([
        ["Geography", 75, 68, 65],
        ["English", 45, 55, -52],
        ["Math", 98, 92, 90],
        ["Science", 66, 60, 72]
    ])
    ;
const chart3 = new Pie()
    .paletteID("Jackie Brown")
    .columns(["Subject", "Year 1"])
    .data([
        ["Geography", 75],
        ["English", 45],
        ["Math", 98],
        ["Science", 66]
    ])
    ;
const chart4 = new Bubble()
    .paletteID("Pretty in Pink")
    .columns(["Subject", "Year 2"])
    .data([
        ["Geography", 68],
        ["English", 55],
        ["Math", 92],
        ["Science", 60]
    ])
    ;

new DockPanel()
    .addWidget(chart1, "<drag me>")
    .addWidget(chart3, "<drag me>", "split-bottom")
    .addWidget(chart2, "<drag me>", "split-right", chart1)
    .addWidget(chart4, "<drag me>", "split-right", chart3)
    .target("target")
    .hideSingleTabs(true)
    .render()
    ;