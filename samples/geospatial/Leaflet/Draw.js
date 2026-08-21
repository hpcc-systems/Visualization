import { Leaflet } from "@hpcc-js/map";

const drawLayer = new Leaflet.DrawLayer()
    .target("target")
    .render()
    .on("changed", (what, items) => {
        console.log(`${what}:  ${items.length}`);
        console.log(drawLayer.save());
    })
    ;
