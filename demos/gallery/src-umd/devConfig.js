var npmPackages = {
    "ajv": "ajv/dist/ajv.bundle",
    "colorbrewer": "colorbrewer/colorbrewer",
    "codemirror": "codemirror/",
    "d3-array": "d3-array/dist/d3-array",
    "d3-axis": "d3-axis/build/d3-axis",
    "d3v4-bullet": "d3v4-bullet/build/d3-bullet",
    "d3-brush": "d3-brush/dist/d3-brush",
    "d3-cloud": "d3-cloud/build/d3.layout.cloud",
    "d3-collection": "d3-collection/dist/d3-collection",
    "d3-color": "d3-color/dist/d3-color",
    "d3-contour": "d3-contour/build/d3-contour",
    "d3-dispatch": "d3-dispatch/dist/d3-dispatch",
    "d3-drag": "d3-drag/dist/d3-drag",
    "d3-dsv": "d3-dsv/dist/d3-dsv",
    "d3-ease": "d3-ease/dist/d3-ease",
    "d3-interpolate": "d3-interpolate/dist/d3-interpolate",
    "d3-force": "d3-force/build/d3-force",
    "d3-format": "d3-format/dist/d3-format",
    "d3-geo": "d3-geo/build/d3-geo",
    "d3-hexbin": "d3-hexbin/build/d3-hexbin",
    "d3-hierarchy": "d3-hierarchy/build/d3-hierarchy",
    "d3-hsv": "d3-hsv/build/d3-hsv",
    "d3-path": "d3-path/dist/d3-path",
    "d3-quadtree": "d3-quadtree/build/d3-quadtree",
    "d3-random": "d3-random/build/d3-random",
    "d3-request": "d3-request/build/d3-request",
    "d3-scale": "d3-scale/build/d3-scale",
    "d3-shape": "d3-shape/build/d3-shape",
    "d3-sankey": "d3-sankey/build/d3-sankey",
    "d3-selection": "d3-selection/dist/d3-selection",
    "d3-svg-annotation": "d3-svg-annotation/indexRollup",
    "d3-svg-legend": "d3-svg-legend/indexRollup",
    "d3-time": "d3-time/build/d3-time",
    "d3-timer": "d3-timer/build/d3-timer",
    "d3-time-format": "d3-time-format/dist/d3-time-format",
    "d3-tile": "d3-tile/build/d3-tile",
    "d3-transition": "d3-transition/dist/d3-transition",
    "d3-zoom": "d3-zoom/dist/d3-zoom",
    "dagre": "dagre/dist/dagre",
    "es6-promise/auto": "es6-promise/dist/es6-promise.auto",
    "font-awesome": "font-awesome",
    "google-maps": "google-maps/lib/Google",
    "grid-list": "grid-list/src/gridList",
    "javascript-autocomplete": "javascript-autocomplete/auto-complete",
    "leaflet": "leaflet/dist/leaflet-src",
    "leaflet.css": "leaflet/dist/leaflet.css",
    "leaflet.markercluster": "leaflet.markercluster/dist/leaflet.markercluster-src",
    "leaflet.markercluster.css": "leaflet.markercluster/dist/MarkerCluster.css",
    "leaflet.markercluster.default.css": "leaflet.markercluster/dist/MarkerCluster.Default.css",
    "leaflet.gridlayer.googlemutant": "leaflet.gridlayer.googlemutant/Leaflet.GoogleMutant",
    "react": "react/dist/react.min",
    "react-dom": "react-dom/dist/react-dom.min",
    "reflect-metadata": "reflect-metadata/Reflect",
    "simpleheat": "simpleheat/simpleheat",
    "tooltip.js": "tooltip.js/dist/umd/tooltip",
    "topojson": "topojson/dist/topojson",
    "tslib": "tslib/tslib",
    "whatwg-fetch": "whatwg-fetch/fetch"
};
if (window.location.protocol === "file:" || window.location.hostname === "localhost") {
    config.systemjs.packages = {};
    for (var key in config.systemjs.map) {
        if (key.indexOf("@hpcc-js") === 0) {
            var pkgParts = key.split("/");
            var isShim = key.indexOf("-shim") >= 0;
            delete config.systemjs.map[key];
            config.systemjs.packages[key] = {
                main: isShim ? "dist/index.js" : "lib-umd/index.js",
                format: "amd",
                defaultExtension: "js"
            };
            config.systemjs.map[key] = "../../packages/" + pkgParts[1];
        }
    }
    for (var key in npmPackages) {
        config.systemjs.map[key] = "../../node_modules/" + npmPackages[key] + (key.indexOf(".css") < 0 ? ".js" : "");
    }
}
