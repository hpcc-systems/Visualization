# @hpcc-js/dgrid-shim

This package is part of the mono repository "@hpcc-js" (aka Visualization Framework), for more information including quick start, demos and tutorials, please visit the main page on GitHub:  [hpcc-systems/Visualization](https://github.com/hpcc-systems/Visualization).

## Details
The **dgrid-shim** package "wraps" a subset of the [dojo grid](http://dgrid.io/) functionality in a WebPack bundle to simplify its inclusion in modern JavaScript libraries / Web Applications.

Currently it exposes the following items:
* Deferred
* domConstruct
* Memory
* QueryResults
* Grid = declare([OnDemandGrid, Keyboard, Selection, ColumnResizer, CompoundColumns, GridHelper]);
* PagingGrid = declare([_Grid, Pagination, Keyboard, Selection, ColumnResizer, CompoundColumns, GridHelper]);

## Consuming with WebPack
Should "just work"

## Consuming with iife
Simply include the package in your html file as normal (it has a global ID of "@hpcc-js/dgrid-shim"):
```html
<head>
    ...
    <script src="node_modules/@hpcc-js/dgrid-shim/dist/index.min.js"></script>
    <script>
        var dgridShim = window["@hpcc-js/dgrid-shim"];
    </script>
</head>
<body>
    ...
    <script>
        var myGrid = new dgridShim.PagingGrid();
        ...
    </script>
    ...
</body>
```

## Consuming with Rollup.js
Since Rollup.js has no native support for non es6 modules (the `rollup-plugin-commonjs` simply converts commonjs exports to es6 for example) and part of the es6 specifications dictates that modules should "use strict", which will cause issues with libraries that rely on non strict features.  
As dgrid-shim is dependent on DGrid and Dojo which uses non "strict" code, it is ultimately impossible to use Rollup.js to create bundles which include dgrid-shim (without forcing Rollup.JS to not include "use strict").  Here are two suggested **workarounds**:

### Exclude dgrid-shim from your bundle
1.  Mark dgri-shim as external in your rollup.config.js file:
```javascript
    external: [
        "@hpcc-js/dgrid-shim"
    ],
```
2. Add the official exported global ID to your rollup.config.js:
```javascript
    output: {
        ...
        globals: {
            "@hpcc-js/dgrid-shim": "@hpcc-js/dgrid-shim"
        }
    },
```
3. Manually include dgrid-shim as an iife source file in your html page:
```html
<head>
    ...
    <script src="node_modules/@hpcc-js/dgrid-shim/dist/index.min.js"></script>
</head>
```

### Include dgrid-shim in your bundle
1. Disable "use strict" injection into your bundle:
```javascript
    output: {
        ...
        strict: false
    }
```
2. Add named exports for the dgrid-shim "commonjs" module:
```javascript
    plugins: [
        ...,
        commonjs({
            namedExports: {
                "node_modules/@hpcc-js/dgrid-shim/dist/index.js": ["Deferred", "domConstruct", "QueryResults", "Memory", "PagingGrid", "Grid"],
            }
        }),
        ...
    ]
```
