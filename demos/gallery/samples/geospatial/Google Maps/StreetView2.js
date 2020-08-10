import { GMap } from "@hpcc-js/map";

new GMap()
    .target("target")
    .centerAddress("7 Jersey St, Boston, Massachusetts")
    .useComputedHeading(true)
    .streetViewControl(true)
    .streetView(true)
    .showStreetViewMarker(false)
    .render()
    ;
