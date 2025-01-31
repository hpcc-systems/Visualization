import { Leaflet } from "@hpcc-js/map";

import "@hpcc-js/common/dist/index.css";
import "@hpcc-js/map/dist/index.css";

const path = new Leaflet.Path()
    .columns(["latitude", "longitude", "color", "icon"])
    .data([
        [51.897969, -8.475438, "green", "fa-plus"],
        [35.652930, 139.687128],
        [37.665074, -122.384375, "navy"],
        [32.690680, -117.178540],
        [39.709455, -104.969859],
        [41.244123, -95.961610, "navy"],
        [32.688980, -117.192040],
        [45.786490, -108.526600],
        [45.796180, -108.535652],
        [45.774320, -108.494370],
        [45.777062, -108.549835, "red", "fa-minus"]
    ])
    .latitudeColumn("latitude")
    .longitudeColumn("longitude")
    ;


const pins = new Leaflet.Pins()
    .columns(path.columns())
    .data(path.data())
    .latitudeColumn("latitude")
    .longitudeColumn("longitude")
    .faCharColumn("icon")
    .fillColorColumn("color")
    ;

pins
    .layers([
        path,
        pins
    ])
    .target("target")
    .render()
    ;
