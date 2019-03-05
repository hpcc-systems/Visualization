import { Area, Line, Bubble } from "@hpcc-js/chart";
import { TabPanel } from "@hpcc-js/phosphor";

const columns = ["Subject", "Result"];
const data = [
    ["English", 45],
    ["Irish", 28],
    ["Math", 98],
    ["Geography", 48],
    ["Science", 82]
];

const area = new Area()
    .columns(columns)
    .data(data);
const line = new Line()
    .columns(columns)
    .data(data);
const bubble = new Bubble()
    .columns(columns)
    .data(data);

new TabPanel()
    .addWidget(area, "First Tab")
    .addWidget(bubble, "Second Tab")
    .addWidget(line, "Third Tab")
    .target("target")
    .render()
    ;