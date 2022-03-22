export const npmPackages = {
    "@hpcc-js/wasm": "@hpcc-js/wasm/dist/index",
    "ajv": "ajv/dist/ajv.bundle",
    "colorbrewer": "colorbrewer/index",
    "codemirror": "codemirror/",
    "d3-array": "d3-array/dist/d3-array",
    "d3-axis": "d3-axis/dist/d3-axis",
    "d3v4-bullet": "d3v4-bullet/build/d3-bullet",
    "d3-brush": "d3-brush/dist/d3-brush",
    "d3-cloud": "d3-cloud/build/d3.layout.cloud",
    "d3-collection": "d3-collection/dist/d3-collection",
    "d3-color": "d3-color/dist/d3-color",
    "d3-contour": "d3-contour/dist/d3-contour",
    "d3-dispatch": "d3-dispatch/dist/d3-dispatch",
    "d3-drag": "d3-drag/dist/d3-drag",
    "d3-dsv": "d3-dsv/dist/d3-dsv",
    "d3-ease": "d3-ease/dist/d3-ease",
    "d3-interpolate": "d3-interpolate/dist/d3-interpolate",
    "d3-fetch": "d3-fetch/dist/d3-fetch",
    "d3-force": "d3-force/dist/d3-force",
    "d3-format": "d3-format/dist/d3-format",
    "d3-geo": "d3-geo/dist/d3-geo",
    "d3-hexbin": "d3-hexbin/build/d3-hexbin",
    "d3-hierarchy": "d3-hierarchy/dist/d3-hierarchy",
    "d3-hsv": "d3-hsv/build/d3-hsv",
    "d3-path": "d3-path/dist/d3-path",
    "d3-quadtree": "d3-quadtree/dist/d3-quadtree",
    "d3-random": "d3-random/dist/d3-random",
    "d3-request": "d3-request/build/d3-request",
    "d3-require": "d3-require/dist/d3-require",
    "d3-scale": "d3-scale/build/d3-scale",
    "d3-shape": "d3-shape/dist/d3-shape",
    "d3-sankey": "d3-sankey/dist/d3-sankey",
    "d3-selection": "d3-selection/dist/d3-selection",
    "d3-svg-annotation": "d3-svg-annotation/indexRollup",
    "d3-svg-legend": "d3-svg-legend/indexRollup",
    "d3-time": "d3-time/dist/d3-time",
    "d3-timer": "d3-timer/dist/d3-timer",
    "d3-time-format": "d3-time-format/dist/d3-time-format",
    "d3-tile": "d3-tile/dist/d3-tile",
    "d3-transition": "d3-transition/dist/d3-transition",
    "d3-zoom": "d3-zoom/dist/d3-zoom",
    "dagre": "dagre/dist/dagre",
    "@deck.gl/core": "@deck.gl/core/dist",
    "@deck.gl/layers": "@deck.gl/layers/dist",
    "@observablehq/parser": "@observablehq/parser/dist/parser.min",
    "@observablehq/runtime": "@observablehq/runtime/dist/runtime.umd",
    "@observablehq/stdlib": "@observablehq/stdlib/dist/stdlib",
    "@observablehq/inspector/dist/inspector.css": "@observablehq/inspector/dist/inspector.css",
    "acorn": "acorn/dist/acorn",
    "acorn-walk": "acorn-walk/dist/walk",
    "es6-promise/auto": "es6-promise/dist/es6-promise.auto",
    "font-awesome": "font-awesome",
    "google-maps": "google-maps/lib/Google",
    "grid-list": "grid-list/src/gridList",
    "javascript-autocomplete": "javascript-autocomplete/auto-complete",
    "mapbox-gl": "mapbox-gl/dist/mapbox-gl",
    "mapbox-gl.css": "mapbox-gl/dist/mapbox-gl.css",
    "leaflet": "leaflet/dist/leaflet-src",
    "leaflet.css": "leaflet/dist/leaflet.css",
    "leaflet.markercluster": "leaflet.markercluster/dist/leaflet.markercluster-src",
    "leaflet.markercluster.css": "leaflet.markercluster/dist/MarkerCluster.css",
    "leaflet.markercluster.default.css": "leaflet.markercluster/dist/MarkerCluster.Default.css",
    "leaflet.gridlayer.googlemutant": "leaflet.gridlayer.googlemutant/Leaflet.GoogleMutant",
    "marked": "marked/marked.min",
    "preact/jsx-runtime": "preact/jsx-runtime/dist/jsxRuntime.umd",
    "preact/hooks": "preact/hooks/dist/hooks.umd",
    "preact": "preact/dist/preact.umd",
    "react": "react/umd/react.production.min",
    "React": "react/umd/react.production.min",
    "react-dom": "react-dom/umd/react-dom.production.min",
    "ReactDOM": "react-dom/umd/react-dom.production.min",
    "@fluentui/react": "@fluentui/react/dist/fluentui-react.umd",
    "reflect-metadata": "reflect-metadata/Reflect",
    "simpleheat": "simpleheat/simpleheat",
    "tooltip.js": "tooltip.js/dist/umd/tooltip",
    "topojson-client": "topojson-client/dist/topojson-client",
    "tslib": "tslib/tslib",
    "whatwg-fetch": "whatwg-fetch/fetch"
};
export const rawgitPackages = {
};
export const localPackages = {
    ...npmPackages,
    ...rawgitPackages
};

// Keep in sync with util/src/index.ts
export const hpccShims = ["loader", "codemirror-shim", "ddl-shim", "deck-shim", "dgrid-shim", "leaflet-shim", "phosphor-shim", "preact-shim"];
export const packages = [
    "comms", "util", "common", "layout", "phosphor", "api", "dgrid", "chart", "other", "form",
    "tree", "graph", "map", "map-deck", "observable-md",
    "react", "composite", "marshaller", "html", "timeline", "codemirror", "eclwatch"
];
export const requireShims = {
    // "leaflet.draw": {
    //    deps: ["leaflet"]
    // }
};
