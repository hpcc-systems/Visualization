const resolve = require('rollup-plugin-node-resolve');
const postcss = require('rollup-plugin-postcss');
const commonjs = require("rollup-plugin-commonjs");
const sourcemaps = require('rollup-plugin-sourcemaps');

export default {
    entry: 'lib-es6/index.js',
    format: 'umd',
    moduleName: "hpcc-js-codemirror-shim",
    dest: 'dist/codemirror-shim.js',
    plugins: [
        resolve({
            jsnext: true,
            main: true
        }),
        postcss({
            plugins: [],
            extensions: ['.css']  // default value
        }),
        commonjs({
            namedExports: {
            }
        }),
        sourcemaps()
    ]
};
