const alias = require('rollup-plugin-alias');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require("rollup-plugin-commonjs");
const sourcemaps = require('rollup-plugin-sourcemaps');

export default {
    entry: 'lib-es6/index.js',
    format: 'umd',
    moduleName: "hpcc-js-preact-shim",
    dest: 'dist/preact-shim.js',
    plugins: [
        alias({
        }),
        nodeResolve({
            module: true,
            main: true
        }),
        commonjs({
            namedExports: {
                "..\\..\\node_modules\\preact\\dist\\preact.js": ["Component", "cloneElement", "h", "options", "render"]
            }
        }),
        sourcemaps()
    ]
};