import { ReactAxisLabelGantt } from "@hpcc-js/timeline";

const data = [...Array(200)].map((n, i) => {
    const label = [...Array(3)].map(()=>""+i).join("");
    return [
        label,
        Math.sqrt(i),
        Math.pow(i, 2),
        i
    ];
});

const WIDGET = new ReactAxisLabelGantt()
    .target("target")
    .gutter(5)
    .bucketHeight(15)
    .labelWidth(120)
    .labelFontFamily("Verdana")
    .labelFontSize(14)
    .data(data)
    .render()
    ;

WIDGET.click = (row, col, sel) => {
    console.log("row, col, sel === ", row, col, sel);
};