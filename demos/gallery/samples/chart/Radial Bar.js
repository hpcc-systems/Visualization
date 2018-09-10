import { RadialBar } from "@hpcc-js/chart";

const data = [
    ["Geography", 75],
    ["English", 45],
    ["Math", 98],
    ["Science", 66]
];

const radialBar = new RadialBar()
    .target("target")
    .columns(["Subject", "Result"])
    .data(data)
    .valueDomainHigh(100)
    .render()
    ;

setInterval(function () {
    data.forEach(function (row) {
        row[1] = Math.random() * 100;
    });
    radialBar.render();
}, 3000);
