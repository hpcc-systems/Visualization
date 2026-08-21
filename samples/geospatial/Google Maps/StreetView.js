import { GMap } from "@hpcc-js/map";

const fenway = {lat: 42.345573, lng: -71.098326};

new GMap()
    .target('target')
    .mapTypeControl(false)
    .resize()
    .render((w)=>{
        setTimeout(function () {
            w.streetViewAt(fenway, 50);
            w.render();
        }, 1000);
    })
    .display()
    ;

