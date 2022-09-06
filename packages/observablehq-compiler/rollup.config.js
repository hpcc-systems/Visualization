import { external, globals } from "@hpcc-js/bundle";
import alias from "@rollup/plugin-alias";
import commonjs from "@rollup/plugin-commonjs";
import sourcemaps from "rollup-plugin-sourcemaps";
import nodeResolve from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import json from "@rollup/plugin-json";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require("./package.json");

const plugins = [
    json(),
    alias({
        entries: [
        ]
    }),
    nodeResolve({
        preferBuiltins: true
    }),
    commonjs({}),
    sourcemaps(),
    postcss({
        extensions: [".css"],
        extract: true,
        minimize: true
    })
];

export default [{
    input: "lib-es6/index",
    external: external,
    output: [{
        file: pkg.main,
        format: "cjs",
        sourcemap: true,
        globals: globals,
        name: pkg.name,
        plugins: []
    }, {
        file: pkg.module,
        format: "es",
        sourcemap: true,
        globals: globals
    }],
    treeshake: {
        moduleSideEffects: []
    },
    plugins
}, {
    input: "lib-es6/__tests__/index",
    external: external,
    output: [{
        file: "dist-test/index.mjs",
        format: "es",
        sourcemap: true,
        globals: globals,
        name: pkg.name
    }],
    plugins: [
        ...plugins,
    ]
}];