import { Bar, Line, Pie, Radar } from "@hpcc-js/chart"
import { DockPanel } from "@hpcc-js/phosphor"

var examResults = {
    columns: ["Subject", "Year 1", "Year 2", "Year 3"],
    data: [
        ["Geography", 75, 68, 65],
        ["English", 45, 55, 52],
        ["Math", 98, 92, 90],
        ["Science", 66, 60, 72]
    ]
};

//  Bar Chart  ---
const bar = new Bar()
    .columns(examResults.columns)
    .data(examResults.data)
    ;

//  Pie Chart  ---
const pie = new Pie()
    .columns(examResults.columns)
    .data(examResults.data)
    .paletteID("Paired")
    ;

//  Line  ---
const line = new Line()
    .columns(examResults.columns)
    .data(examResults.data)
    ;

//  Hex Bin  ---
const radar = new Radar()
    .columns(examResults.columns)
    .data(examResults.data)
    ;

//  Dock Panel ---
var app = new DockPanel()
    .target("placeholder")
    .addWidget(bar, "Bar")
    .addWidget(line, "Line", "split-right", bar)
    .addWidget(pie, "Pie", "split-bottom", bar)
    .addWidget(radar, "Radar", "tab-after", line)
    .render()
    ;

export function doResize() {
    if (app) {
        app
            .resize()
            .render()
            ;
    }
}

