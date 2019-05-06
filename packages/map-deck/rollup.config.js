import { external, globals } from "@hpcc-js/bundle";
import alias from 'rollup-plugin-alias';
import commonjs from 'rollup-plugin-commonjs';
import sourcemaps from 'rollup-plugin-sourcemaps';
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
        }),
        nodeResolve({
            preferBuiltins: true
        }),
        commonjs({
            namedExports: {
                "../deck-shim": ["mapboxgl", "Deck", "ArcLayer", "ScatterplotLayer"]
            }
        }),
        sourcemaps(),
        postcss({
            extensions: [".css"],
            minimize: true
        })
    ]
};
