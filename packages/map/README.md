# @hpcc-js/map
This package is part of the mono repository "@hpcc-js" (aka Visualization Framework), for more information including [Quick Start](https://github.com/hpcc-systems/Visualization/wiki/Quick-Start), [Gallery](https://raw.githack.com/hpcc-systems/Visualization/trunk/demos/gallery/gallery.html) and [Tutorials](https://github.com/hpcc-systems/Visualization/wiki/Tutorials), please visit the main page on GitHub:  [hpcc-systems/Visualization](https://github.com/hpcc-systems/Visualization).

## Exported Widgets
* [GMapPin](https://rawgit.com/hpcc-systems/Visualization/trunk/demos/gallery/playground.html?./samples/geospatial/Google%20Maps/Pins.js)
* [GMapPinLines](https://rawgit.com/hpcc-systems/Visualization/trunk/demos/gallery/playground.html?./samples/geospatial/Google%20Maps/Pin%20Lines.js)
* [Graticule](https://rawgit.com/hpcc-systems/Visualization/trunk/demos/gallery/playground.html?./samples/geospatial/Google%20Maps/Layered.js)
* [Layered](https://rawgit.com/hpcc-systems/Visualization/trunk/demos/gallery/playground.html?./samples/geospatial/Choropleth/Layered.js) / [GMapLayered](https://rawgit.com/hpcc-systems/Visualization/trunk/demos/gallery/playground.html?./samples/geospatial/Google%20Maps/Layered.js)
* [ChoroplethCounties](https://rawgit.com/hpcc-systems/Visualization/trunk/demos/gallery/playground.html?./samples/geospatial/Choropleth/USA/Counties.js)
* [ChoroplethCountries](https://rawgit.com/hpcc-systems/Visualization/trunk/demos/gallery/playground.html?./samples/geospatial/Choropleth/Europe/British%20Isles.js)
* [ChoroplethStates](https://rawgit.com/hpcc-systems/Visualization/trunk/demos/gallery/playground.html?./samples/geospatial/Choropleth/USA/States.js)
* GeoHash

## Stand-alone HTML Example
```html
<html>
    <head>
        <title>Simple GMap with pins and lines</title>
        <script src="https://unpkg.com/@hpcc-js/util"></script>
        <script src="https://unpkg.com/@hpcc-js/common"></script>
        <script src="https://unpkg.com/@hpcc-js/api"></script>
        <script src="https://unpkg.com/@hpcc-js/layout"></script>
        <script src="https://unpkg.com/@hpcc-js/map"></script>
    </head>
    <body>
        <div id="placeholder" style="width:400px;height:400px;"></div>
        <script>
            var widget = new window["@hpcc-js/map"].GMapPinLine()
                .target("placeholder")
                .columns(["name","lat1", "long1", "lat2", "long2"])
                .data([
                    ["Destination A",40.777,-73.872,33.64,-84.426],
                    ["Destination B",40.777,-73.872,39.997,-82.891],
                    ["Destination C",40.777,-73.872,32.895,-97.037],
                    ["Destination D",40.777,-73.872,26.072,-80.152],
                    ["Destination E",40.777,-73.872,34.895,-82.218]
                ])
                .fromLatitudeColumn("lat1")
                .fromlongitudeColumn("long1")
                .toLatitudeColumn("lat2")
                .tolongitudeColumn("long2")
                .autoScale(true)
                .render(w => {
                    setTimeout(function () {
                        w.render();
                    }, 500);
                })
                ;
            widget.click = function(pinData){
                console.log("Clicked pin data:",pinData);
            }
        </script>
    </body>
</html>
```

<ClientOnly>
  <hpcc-vitepress style="width:100%;height:600px">
    <div id="target" style="height:600px">
    </div>
    <script type="module">
        import { Leaflet } from "@hpcc-js/map";

        new Leaflet.ClusterPins()
            .target("target")
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
            .mapType("MapBox")
            .latitudeColumn("latitude")
            .longitudeColumn("longitude")
            .faCharColumn("icon")
            .fillColorColumn("color")
            .render()
            ;
    </script>
  </hpcc-vitepress>
</ClientOnly>