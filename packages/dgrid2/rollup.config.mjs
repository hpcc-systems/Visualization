/* eslint-disable @typescript-eslint/no-var-requires */

import { external, globals } from "@hpcc-js/bundle";
import alias from "@rollup/plugin-alias";
import commonjs from "@rollup/plugin-commonjs";
import sourcemaps from "rollup-plugin-sourcemaps";
import nodeResolve from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import replace from "@rollup/plugin-replace";

import pkg from "./package.json" with { type: "json" };

export default {
    input: "lib-es6/index",
    external,
    output: [{
        file: pkg.main,
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
        alias({
            entries: [
                { find: "react", replacement: "preact/compat" },
                { find: "react/jsx-runtime", replacement: "preact/jsx-runtime" },
                { find: "react-dom", replacement: "preact/compat" },
                { find: "react-dom/test-utils", replacement: "preact/test-utils" },
            ]
        }),
        nodeResolve({
            preferBuiltins: true
        }),
        replace({
            preventAssignment: true,
            "process.env.NODE_ENV": JSON.stringify("production")
        }),
        commonjs({}),
        sourcemaps(),
        postcss({
            extensions: [".css"],
            minimize: true
        })
    ]
};
