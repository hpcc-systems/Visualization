const alias = require('rollup-plugin-alias');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require("rollup-plugin-commonjs");
const css = require('rollup-plugin-css-only');

export default {
    entry: 'lib/index.js',
    format: 'es',
    moduleName: "hpcc-js-ddl",
    dest: 'dist-es6/index.js',
    external: ["url"],
    plugins: [
        alias({
            //            "ajv": "node_modules/ajv/dist/ajv.bundle.js"
        }),
        nodeResolve({
            module: true,
            main: true
        }),
        commonjs(),
    ]
};