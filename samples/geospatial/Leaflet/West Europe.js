import { Leaflet, topoJsonFolder } from "@hpcc-js/map";

topoJsonFolder("https://cdn.jsdelivr.net/npm/@hpcc-js/map@2.0.0/TopoJSON");

const topoGB = new Leaflet.Region()
    .region("GB")
    ;

const topoND = new Leaflet.Region()
    .region("ND")
    ;

const topoIE = new Leaflet.Region()
    .region("IE")
    ;

const topoPT = new Leaflet.Region()
    .region("PT")
    ;

const topoES = new Leaflet.Region()
    .region("ES")
    ;

const topoFR = new Leaflet.Region()
    .region("FR")
    ;

new Leaflet.Leaflet()
    .target("target")
    .layers([
        topoGB,
        topoND,
        topoIE,
        topoPT,
        topoES,
        topoFR
    ])
    .render()
    ;
