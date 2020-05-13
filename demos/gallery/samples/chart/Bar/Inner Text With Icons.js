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
    .xAxisFontSize(28)
    .xAxisFontFamily("FontAwesome")
    .xAxisLabelMapping({
        "lorem ipsum": "",
        "dolor sit amet": "",
        "consectetur adipisicing elit": ""
    })
    .render();