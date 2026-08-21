import { Leaflet, topoJsonFolder } from "@hpcc-js/map";

topoJsonFolder("https://cdn.jsdelivr.net/npm/@hpcc-js/map@2.0.0/TopoJSON");

const topoGB = new Leaflet.Region()
    .region("GB")
    .columns(["Region", "Weight"])
    .data([["Greater London", 100], ["Greater Manchester", 200]])
    ;

const topoND = new Leaflet.Region()
    .region("ND")
    .columns(["Region", "Weight"])
    .data([["Omagh", 50]])
    ;

new Leaflet.Leaflet()
    .target("target")
    .layers([
        topoGB,
        topoND
    ])
    .render()
    ;
