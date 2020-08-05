import { GMap } from "@hpcc-js/map";

new GMap()
    .target('target')
    .mapTypeControl(false)
    .centerAddress('7 Jersey St, Boston, Massachusetts')
    .useComputedHeading(true)
    // .zoom(4)
    .resize()
    .streetViewControl(true)
    .streetView(true)
    .render()
    .display()
    ;

