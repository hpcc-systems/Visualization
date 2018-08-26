import { ChoroplethCountries, topoJsonFolder } from "@hpcc-js/map";

topoJsonFolder("https://unpkg.com/@hpcc-js/map@2.0.0/TopoJSON");

new ChoroplethCountries()
    .target("target")
    .columns(["Country", "Weight"])
    .data([["United States", 29.946185501741], ["China", 229.946185501741], ["Ireland", 400]])
    .render()
    ;
