import { external, globals } from "@hpcc-js/bundle";
import alias from 'rollup-plugin-alias';
import commonjs from 'rollup-plugin-commonjs';
import sourcemaps from 'rollup-plugin-sourcemaps';
import nodeResolve from 'rollup-plugin-node-resolve';
import postcss from "rollup-plugin-postcss";
import json from "rollup-plugin-json";

const pkg = require("./package.json");

export default [{
    input: "lib-es6/cli",
    external: ["fs"],
    output: [{
        file: pkg.bin,
        format: "cjs",
        sourcemap: true
    }],
    plugins: [
        nodeResolve(),
        json(),
        sourcemaps()
    ]
}, {
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
        }),
        json(),
        sourcemaps(),
        postcss({
            extensions: [".css"],
            minimize: true
        })
    ]
}];
