import { GMap } from "@hpcc-js/map";

const map = new GMap()
    .target("target")
    .centerAddress("asdf")
    .useComputedHeading(true)
    .streetViewControl(true)
    .streetView(true)
    .showStreetViewMarker(false)
    .outdoorStreetViewOnly(true)
    .on("statusError", (response) => {
        console.log(response);
    })
    .render()
    ;
