import { ChoroplethStates, Graticule, Pins, Layered, topoJsonFolder } from "@hpcc-js/map";

topoJsonFolder("https://unpkg.com/@hpcc-js/map@2.0.0/TopoJSON");

const graticule = new Graticule();

const usStates = new ChoroplethStates()
    .columns(["State ID", "Weight"])
    .data([["AL", 4779736], ["AK", 710231], ["AZ", 6392017], ["AR", 2915918], ["CA", 37253956], ["CO", 5029196], ["CT", 3574097], ["DC", 601723], ["FL", 18801310], ["GA", 9687653], ["HI", 1360301], ["ID", 1567582], ["IL", 12830632], ["IN", 6483802], ["IA", 3046355], ["ME", 1328361], ["MD", 5773552], ["MA", 6547629], ["MI", 9883640], ["MN", 5303925], ["MS", 2967297], ["MO", 5988927], ["MT", 989415], ["NE", 1826341], ["NV", 2700551], ["NH", 1316470], ["NJ", 8791894], ["NM", 2059179], ["NY", 19378102], ["NC", 9535483], ["ND", 672591], ["OH", 11536504], ["OK", 3751351], ["OR", 3831074], ["PA", 12702379], ["RI", 1052567], ["SC", 4625364], ["SD", 814180], ["TN", 6346105], ["TX", 25145561], ["UT", 2763885], ["VT", 625741], ["VA", 8001024], ["WA", 6724540], ["WV", 1852994], ["WI", 5686986], ["WY", 563626]])
    ;

const pins = new Pins()
    .columns(["latitude", "longtitude", "pin", "circle"])
    .data([
        [37.665074, -122.384375],
        [32.690680, -117.178540],
        [39.709455, -104.969859],
        [41.244123, -95.961610],
        [32.688980, -117.192040, null, { radius: 100, fillColor: "green", strokeColor: "green" }],
        [45.786490, -108.526600],
        [45.796180, -108.535652],
        [45.774320, -108.494370],
        [45.777062, -108.549835, { fillColor: "red" }]
    ])
    .latColumn("latitude")
    .longColumn("longtitude")
    ;

new Layered()
    .target("target")
    .layers([
        graticule,
        usStates,
        pins
    ])
    .projection("AlbersUsa")
    .render()
    .resize()
    .render()
    ;
