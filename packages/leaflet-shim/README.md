# @hpcc-js/leaflet-shim
This package is part of the mono repository "@hpcc-js" (aka Visualization Framework), for more information including quick start, demos and tutorials, please visit the main page on GitHub:  [hpcc-systems/Visualization](https://github.com/hpcc-systems/Visualization).

## Details
The **leaflet-shim** package "wraps" a subset of the [https://github.com/Leaflet/Leaflet](https://github.com/Leaflet/Leaflet) functionality in a WebPack bundle to simplify its inclusion in modern JavaScript libraries / Web Applications.

## Consuming with WebPack
Should "just work"

## Consuming with iife
Simply include the package in your html file as normal (it has a global ID of "@hpcc-js/deck-shim"):
```html
<head>
    ...
    <script src="node_modules/@hpcc-js/leaflet-shim/dist/index.min.js"></script>
    <script>
        var dgridShim = window["@hpcc-js/leaflet-shim"];
    </script>
</head>
<body>
    ...
    <script>
        ...
    </script>
    ...
</body>
```

## Consuming with Rollup.js
Should "just work"
