import { Leaflet } from "@hpcc-js/map";

new Leaflet.ClusterIcons()
    .target("target")
    .columns(["latitude", "longtitude", "tooltip"])
    .data([
        [51.897969, -8.475438, "Some Point"],
        [35.652930, 139.687128],
        [37.665074, -122.384375, "Some Other Point"],
        [32.690680, -117.178540],
        [39.709455, -104.969859],
        [41.244123, -95.961610, "YAP"],
        [32.688980, -117.192040],
        [45.786490, -108.526600],
        [45.796180, -108.535652],
        [45.774320, -108.494370],
        [45.777062, -108.549835]
    ])
    .latitudeColumn("latitude")
    .longtitudeColumn("longtitude")
    .iconUrl("https://user-images.githubusercontent.com/938632/50856884-e36b7c00-1359-11e9-96de-4524c2e49ae0.png")
    .iconWidth(48)
    .iconHeight(55)
    .iconAnchorX(24)
    .iconAnchorY(55)
    .tooltipColumn("tooltip")
    .render()
    ;

