import { Bar } from "@hpcc-js/chart";

new Bar()
    .target("target")
    .columns(["A", "B", "C"])
    .data([
        ["lorem ipsum", 2, -3, ""],
        ["dolor sit amet", 5, -6, ""],
        ["consectetur adipisicing elit", 8, 9, ""],
    ])
    .showValue(true)
    .showInnerText(true)
    .overrideMethod("innerText", (origRow, lparam) => {
        // lparam === origRow[3]
        return origRow[0].toUpperCase();
    })
    .xAxisFontSize(28)
    .xAxisFontFamily("FontAwesome")
    .overrideMethod("xAxisOrdinalMapping", (origRow, lparam) => {
        // lparam === origRow[3]
        return lparam;
    })
    .render();