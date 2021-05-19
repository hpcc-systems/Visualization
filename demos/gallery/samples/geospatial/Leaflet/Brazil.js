import { Leaflet, topoJsonFolder } from "@hpcc-js/map";

topoJsonFolder("https://cdn.jsdelivr.net/npm/@hpcc-js/map@2.0.0/TopoJSON");

new Leaflet.Region()
    .target("target")
    .region("BR")
    .columns(["Region", "Weight"])
    .data([["BA", 100], ["MS", 200]])
    .on("click", (row, col, sel) => {
        console.log("CLICKITY CLICK");
    })
    .render()
    ;
