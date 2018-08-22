import { Gauge } from "@hpcc-js/chart";

new Gauge()
    .target("target")
    .title("Title")
    .titleDescription("Additional Info Goes Here")
    .value(.62)
    .valueDescription("value")
    .showTick(true)
    .tickValue(.38)
    .tickValueDescription("B")
    .maxDiameter(250)
    .render()
    ;