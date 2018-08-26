import { Column, Pie, Line, Step } from "@hpcc-js/chart";
import { Carousel } from "@hpcc-js/layout";

const columns = ["Subject", "Year 1", "Year 2", "Year 3"];
const data = [
    ["Geography", 75, 68, 65],
    ["English", 45, 55, -52],
    ["Math", 98, 92, 90],
    ["Science", 66, 60, 72]
];

const carousel = new Carousel()
    .widgets([
        new Pie().columns(columns).data(data),
        new Line().columns(columns).data(data),
        new Column().columns(columns).data(data),
        new Step().columns(columns).data(data)
    ])
    .target("target")
    .render()
    ;

var active = 0;
setInterval(function () {
    carousel.active(++active % 4).render();
}, 3000);
