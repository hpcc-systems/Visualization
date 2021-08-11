import { external, globals } from "@hpcc-js/bundle";
import alias from "@rollup/plugin-alias";
import commonjs from "@rollup/plugin-commonjs";
import sourcemaps from "rollup-plugin-sourcemaps";
import nodeResolve from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require("./package.json");

function utilExternal(id) {
    if (id.indexOf("@hpcc-js/wasm") === 0) return false;
    return external(id);
}

export default [{
    input: "lib-es6/index",
    external: utilExternal,
    output: [{
        file: pkg.browser,
        format: "umd",
        sourcemap: true,
        globals,
        name: pkg.name
    }, {
        file: pkg.module + ".js",
        format: "es",
        sourcemap: true,
        globals,
        name: pkg.name
    }],
    plugins: [
        alias({}),
        nodeResolve({
            preferBuiltins: false
        }),
        commonjs({}),
        sourcemaps(),
        postcss({
            extensions: [".css"],
            minimize: true
        })
    ]
}, {
    input: "lib-es6/index",
    external: utilExternal,
    output: [{
        file: pkg.main,
        format: "cjs",
        sourcemap: true,
        globals,
        name: pkg.name
    }],
    plugins: [
        alias({
            entries: [
                { find: "@hpcc-js/wasm", replacement: "@hpcc-js/wasm/dist/index.node" }
            ]
        }),
        nodeResolve({
            preferBuiltins: false
        }),
        commonjs({}),
        sourcemaps(),
        postcss({
            extensions: [".css"],
            minimize: true
        })
    ]
}];