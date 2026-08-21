import { Shape } from "@hpcc-js/common";

new Shape()
    .target("target")
    .shape("square")
    .height(100)
    .width(100)
    .cornerRadius(10)
    .colorFill("#2c3e50")
    .colorStroke("#34495e")
    .render()
    ;
