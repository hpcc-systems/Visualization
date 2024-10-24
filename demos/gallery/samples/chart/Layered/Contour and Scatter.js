import { range as d3Range } from "@hpcc-js/common";
import { Contour, Scatter, XYAxis } from "@hpcc-js/chart";
import { randomNormal as d3RandomNormal } from "d3-random";

const randomX = d3RandomNormal(200, 80);
const randomY = d3RandomNormal(2000, 20);
const points = d3Range(800).map(function () { return [randomX(), randomY()]; });

const chart4 = new XYAxis()
    .layers([
        new Contour().contourBandwidth(8),
        new Scatter()
    ])
    .target("target")
    .columns(["x", "y"])
    .data(points)
    .xAxisType("linear")
    .yAxisType("linear")
    .render()
    ;
