import { Leaflet } from "@hpcc-js/map";

new Leaflet.HeatLayer()
    .target("target")
    .columns(["latitude", "longtitude"])
    .data([
        [51.897969, -8.475438],
        [35.652930, 139.687128],
        [37.665074, -122.384375],
        [32.690680, -117.178540],
        [39.709455, -104.969859],
        [41.244123, -95.961610],
        [32.688980, -117.192040],
        [45.786490, -108.526600],
        [45.796180, -108.535652],
        [45.774320, -108.494370],
        [45.777062, -108.549835]
    ])
    .latitudeColumn("latitude")
    .longtitudeColumn("longtitude")
    .render()
    ;
