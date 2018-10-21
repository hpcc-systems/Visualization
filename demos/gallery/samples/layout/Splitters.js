import { Area, Line, Bubble, Pie } from "@hpcc-js/chart";
import { DockPanel } from "@hpcc-js/phosphor";

const twoD = {
    columns: ["Subject", "Result"],
    data: [
        ["English", 45],
        ["Irish", 28],
        ["Math", 98],
        ["Geography", 48],
        ["Science", 82]
    ]
};

const area = new Area()
    .columns(twoD.columns)
    .data(twoD.data);
const line = new Line()
    .columns(twoD.columns)
    .data(twoD.data);
const bubble = new Bubble()
    .columns(twoD.columns)
    .data(twoD.data)
    .paletteID("Dark2");
const pie = new Pie()
    .columns(twoD.columns)
    .data(twoD.data)
    .paletteID("Dark2");

new DockPanel()
    .addWidget(area, "<drag me>")
    .addWidget(line, "<drag me>", "split-bottom")
    .addWidget(bubble, "<drag me>", "split-right", area)
    .addWidget(pie, "<drag me>", "split-right", bubble)
    .target("target")
    .hideSingleTabs(true)
    .render()
    ;
