import alias from 'rollup-plugin-alias';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import postcss from "rollup-plugin-postcss";
import replace from 'rollup-plugin-replace';

const pkg = require("./package.json");
const name = pkg.name.split("/").pop();

function external(id) {
    return id.indexOf("@hpcc-js") === 0 && id.indexOf("-shim") < 0;
}

function globals(id) {
    if (id.indexOf("@hpcc-js") === 0) {
        return id;
    }
    return undefined;
}

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
        replace({
            "(typeof require !== 'undefined' && require('crypto')) ||": "/*---@hpcc-js (typeof require !== 'undefined' && require('crypto')) || @hpcc-js---*/",
            delimiters: ['', '']
        }),
        nodeResolve({
            preferBuiltins: true
        }),
        commonjs({
            namedExports: {
                "@phosphor/algorithm": ["each"],
                "@phosphor/widgets": ["BoxPanel", "CommandRegistry", "CommandPalette", "ContextMenu", "DockLayout", "DockPanel", "Message", "Menu", "MenuBar", "SplitPanel", "TabBar", "TabPanel", "Widget"]
            }
        }),
        alias({
        }),
        postcss({
            extensions: [".css"]
        })
    ]
};
