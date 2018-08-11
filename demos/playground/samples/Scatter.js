import { randomNormal as d3RandomNormal } from "d3-random";
import { range as d3Range } from "d3-array";
import { Scatter } from "@hpcc-js/chart";

const randomX = d3RandomNormal(200, 80);
const randomY = d3RandomNormal(200, 80);
const points = d3Range(200).map(function () { return [randomX(), randomY()]; });

new Scatter()
    .target("target")
    .columns(["X", "Y"])
    .data(points)
    .xAxisType("linear")
    .yAxisType("linear")
    .render()
    ;
