import { external, globals } from "@hpcc-js/bundle";
import alias from 'rollup-plugin-alias';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import postcss from "rollup-plugin-postcss";

const pkg = require("./package.json");

const plugins = [
    alias({
    }),
    nodeResolve({
        preferBuiltins: true
    }),
    commonjs({
    }),
    postcss({
        extensions: [".css"]
    })
];

export default [{
    input: "lib-es6/index",
    external: external,
    output: [{
        file: pkg.browser,
        format: "umd",
        sourcemap: true,
        globals: globals,
        name: pkg.name
    }, {
        file: pkg.module + ".js",
        format: "es",
        sourcemap: true,
        globals: globals
    }],
    plugins: plugins
}, {
    input: "lib-es6/index.node",
    external: external,
    output: [{
        file: pkg.main,
        format: "cjs",
        sourcemap: true,
        globals: globals,
        name: pkg.name
    }],
    plugins: plugins
}];
