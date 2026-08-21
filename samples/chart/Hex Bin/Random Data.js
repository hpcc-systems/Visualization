import { range as d3Range } from "@hpcc-js/common";
import { HexBin } from "@hpcc-js/chart";
import { randomNormal as d3RandomNormal } from "d3-random";

const randomX = d3RandomNormal(200, 80);
const randomY = d3RandomNormal(200, 80);
const points = d3Range(2000).map(function () { return [randomX(), randomY()]; });

new HexBin()
    .target("target")
    .columns(["x", "y"])
    .data(points)
    .xAxisType("linear")
    .yAxisType("linear")
    .render()
    ;
