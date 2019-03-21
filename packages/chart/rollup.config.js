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
            "d3-zoom": "@hpcc-js/common"
        }),
        nodeResolve({
            preferBuiltins: true
        }),
        commonjs({
        }),
        postcss({
            extensions: [".css"]
        })
    ]
};
