import { HexBin, Scatter, XYAxis } from "@hpcc-js/chart";
import { randomNormal as d3RandomNormal } from "d3-random";
import { range as d3Range } from "d3-array";

const randomX = d3RandomNormal(200, 80);
const randomY = d3RandomNormal(2000, 20);
const points = d3Range(800).map(function () { return [randomX(), randomY()]; });

const chart4 = new XYAxis()
    .layers([
        new HexBin().columns(["x", "y"]),
        new Scatter()
    ])
    .target("target")
    .columns(["x", "y"])
    .data(points)
    .xAxisType("linear")
    .yAxisType("linear")
    .render()
    ;
