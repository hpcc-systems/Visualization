const rollup = require('rollup');
const resolve = require('rollup-plugin-node-resolve');
const postcss = require('rollup-plugin-postcss');
const commonjs = require("rollup-plugin-commonjs");
const alias = require('rollup-plugin-alias');
const uglify = require('rollup-plugin-uglify');
const sourcemaps = require('rollup-plugin-sourcemaps');

export default {
    entry: 'src/index.js',
    format: 'umd',
    moduleName: "hpcc-js-phosphor-shim",
    dest: 'dist/phosphor-shim.js',
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
                "@phosphor/widgets": ["Widget", "DockPanel"]
            }
        }),
        sourcemaps()
    ]
};
