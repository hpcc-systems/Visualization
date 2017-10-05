const rollup = require('rollup');
const resolve = require('rollup-plugin-node-resolve');
const postcss = require('rollup-plugin-postcss');
const commonjs = require("rollup-plugin-commonjs");
const alias = require('rollup-plugin-alias');
const sourcemaps = require('rollup-plugin-sourcemaps');
const definition = require("./package.json");
const name = definition.name.split("/").pop();

export default {
    input: "lib-es6/index",
    name: "hpcc-js-phosphor-shim",
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
        commonjs({
            namedExports: {
                "@phosphor/algorithm": ["each"],
                "@phosphor/widgets": ["BoxPanel", "CommandRegistry", "CommandPalette", "ContextMenu", "DockLayout", "DockPanel", "Message", "Menu", "MenuBar", "SplitPanel", "TabBar", "Widget"]
            },
            ignore: ['crypto']
        }),
        postcss({
            extensions: ['.css']
        }),
        sourcemaps()
    ]
};
