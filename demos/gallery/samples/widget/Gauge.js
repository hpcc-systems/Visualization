import { Gauge } from "@hpcc-js/chart";

var gauge = new Gauge()
    .target("target")
    .title("My Gauge")
    .titleDescription("@hpcc-js/chart")
    .value(.66)
    .valueDescription("Main")
    .showTick(true)
    .tickValue(.33)
    .tickValueDescription("Average")
    .render()
    ;

setInterval(function () {
    gauge
        .value(Math.random())
        .tickValue(Math.random())
        .lazyRender()
        ;
}, 3000);
