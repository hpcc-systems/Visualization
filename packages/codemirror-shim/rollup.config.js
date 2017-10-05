const resolve = require('rollup-plugin-node-resolve');
const postcss = require('rollup-plugin-postcss');
const commonjs = require("rollup-plugin-commonjs");
const sourcemaps = require('rollup-plugin-sourcemaps');
const definition = require("./package.json");
const name = definition.name.split("/").pop();

export default {
    input: "lib-es6/index",
    output: {
        file: `build/index.es6.js`,
        format: "es",
        name: `@hpcc-js/${name}`
    },
    sourcemap: true,
    plugins: [
        resolve({
            jsnext: true,
            main: true
        }),
        postcss({
            extensions: ['.css'],
            extract: true
        }),
        commonjs({
        }),
        sourcemaps()
    ]
};
