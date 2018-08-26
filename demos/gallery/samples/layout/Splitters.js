import { Contour, HexBin, Scatter, XYAxis } from "@hpcc-js/chart";
import { DockPanel } from "@hpcc-js/phosphor";
import { randomNormal as d3RandomNormal } from "d3-random";
import { range as d3Range } from "d3-array";

const randomX = d3RandomNormal(200, 80);
const randomY = d3RandomNormal(2000, 20);
const points = d3Range(800).map(function () { return [randomX(), randomY()]; });

const chart1 = new Scatter()
    .columns(["x", "y"])
    .data(points)
    .xAxisType("linear")
    .yAxisType("linear")
    ;
const chart2 = new HexBin()
    .columns(["x", "y"])
    .data(points)
    .xAxisType("linear")
    .yAxisType("linear")
    ;
const chart3 = new Contour()
    .columns(["x", "y"])
    .data(points)
    .xAxisType("linear")
    .yAxisType("linear")
    .contourBandwidth(8)
    ;
const chart4 = new XYAxis()
    .columns(["x", "y"])
    .data(points)
    .xAxisType("linear")
    .yAxisType("linear")
    .layers([
        new Contour().contourBandwidth(8),
        new Scatter()
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