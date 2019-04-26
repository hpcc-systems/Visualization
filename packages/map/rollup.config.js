import { external, globals } from "@hpcc-js/bundle";
import alias from 'rollup-plugin-alias';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import postcss from "rollup-plugin-postcss";

const pkg = require("./package.json");

export default {
    input: "lib-es6/index",
    external: external,
    output: [{
        file: pkg.main,
        format: "umd",
        sourcemap: true,
        globals: globals,
        name: pkg.name
    }, {
        file: pkg.module + ".js",
        format: "es",
        sourcemap: true,
        globals: globals,
        name: pkg.name
    }],
    plugins: [
        alias({
            "d3-array": "@hpcc-js/common",
            "d3-brush": "@hpcc-js/common",
            "d3-collection": "@hpcc-js/common",
            "d3-color": "@hpcc-js/common",
            "d3-dispatch": "@hpcc-js/common",
            "d3-drag": "@hpcc-js/common",
            "d3-dsv": "@hpcc-js/common",
            "d3-ease": "@hpcc-js/common",
            "d3-format": "@hpcc-js/common",
            "d3-interpolate": "@hpcc-js/common",
            "d3-scale": "@hpcc-js/common",
            "d3-selection": "@hpcc-js/common",
            "d3-time-format": "@hpcc-js/common",
            "d3-transition": "@hpcc-js/common",
            "d3-zoom": "@hpcc-js/common",
            "leaflet.css": "../../node_modules/leaflet/dist/leaflet.css",
            "leaflet.markercluster.default.css": "../../node_modules/leaflet.markercluster/dist/MarkerCluster.Default.css",
            "leaflet.markercluster.css": "../../node_modules/leaflet.markercluster/dist/MarkerCluster.css"
        }),
        nodeResolve({
            preferBuiltins: true
        }),
        commonjs({
            namedExports: {
                "leaflet": ["Circle", "CRS", "DivIcon", "DomUtil", "FeatureGroup", "GeoJSON", "GridLayer", "Icon", "Layer", "LatLng", "latLng", "LatLngBounds", "latLngBounds", "Map", "Marker", "Point", "point", "Polygon", "svg", "TileLayer", "Transformation", "Util"],
                "leaflet.markercluster": ["MarkerClusterGroup"],
                "leaflet.gridlayer.googlemutant": ["GoogleMutant"]
            }
        }),
        postcss({
            extensions: [".css"],
            minimize: true
        })
    ]
};
