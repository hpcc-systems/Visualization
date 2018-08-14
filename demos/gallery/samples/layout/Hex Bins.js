import { randomNormal as d3RandomNormal } from "d3-random";
import { range as d3Range } from "d3-array";
import { HexBin } from "@hpcc-js/chart";
import { DockPanel } from "@hpcc-js/phosphor";

const randomX = d3RandomNormal(200, 80);
const randomY = d3RandomNormal(200, 80);
const points = d3Range(2000).map(function () { return [randomX(), randomY()]; });

const hexBin1 = new HexBin()
    .columns(["x", "y"])
    .data(points)
    .xAxisType("linear")
    .yAxisType("linear")
    ;
const hexBin2 = new HexBin()
    .columns(["x", "y"])
    .data(points)
    .xAxisType("linear")
    .yAxisType("linear")
    ;
const hexBin3 = new HexBin()
    .columns(["x", "y"])
    .data(points)
    .xAxisType("linear")
    .yAxisType("linear")
    ;
const hexBin4 = new HexBin()
    .columns(["x", "y"])
    .data(points)
    .xAxisType("linear")
    .yAxisType("linear")
    ;

new DockPanel()
    .addWidget(hexBin1, "<drag me>")
    .addWidget(hexBin3, "<drag me>", "split-bottom")
    .addWidget(hexBin2, "<drag me>", "split-right", hexBin1)
    .addWidget(hexBin4, "<drag me>", "split-right", hexBin3)
    .target("target")
    .hideSingleTabs(true)
    .render()
    ;