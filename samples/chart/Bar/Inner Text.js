import { Bar } from "@hpcc-js/chart";

new Bar()
    .target("target")
    .columns(["A", "B", "C"])
    .data([
        ["lorem ipsum", 2, -3],
        ["dolor sit amet", 5, -6],
        ["consectetur adipisicing elit", 8, 9],
    ])
    .showValue(true)
    .showInnerText(true)
    .render();