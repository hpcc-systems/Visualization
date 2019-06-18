import { Layered, TopoJSONChoropleth, topoJsonFolder } from "@hpcc-js/map";

topoJsonFolder("https://unpkg.com/@hpcc-js/map@2.0.0/TopoJSON");

const pt = new TopoJSONChoropleth()   //  Great Brittan 
    .region("PT")
    ;

const es = new TopoJSONChoropleth()   //  Northern Ireland
    .region("ES")
    ;

const fr = new TopoJSONChoropleth()   //  Republic of Ireland
    .region("FR")
    ;

new Layered()
    .layers([
        pt,
        es,
        fr,
    ])
    .target("target")
    .render()
    ;

const eu_countries = ["AT", "BE", "BG", "CHLI", "CY", "CZ", "DE", "DK", "EE", "ES", "FI", "FR", "GB", "GE", "GR", "HR", "HU", "IE", "IS", "IT", "KS", "LT", "LU", "LV", "MD", "MK", "MT", "ND", "NL", "NO", "PL", "PT", "RO", "RS", "SE", "SI", "SK", "UA"];
