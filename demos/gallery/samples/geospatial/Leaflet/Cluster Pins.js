import { ClusterPins } from "@hpcc-js/map";

new ClusterPins()
    .target("target")
    .columns(["latitude", "longtitude", "color", "icon"])
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
    .longtitudeColumn("longtitude")
    .faCharColumn("icon")
    .fillColorColumn("color")
    .render(w => {
        setTimeout(function () {
            w.render();
        }, 500);
    })
    ;

