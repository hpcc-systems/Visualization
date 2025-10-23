import { external, globals, packageVersionPlugin } from "@hpcc-js/bundle";

import alias from "@rollup/plugin-alias";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import shebang from "rollup-plugin-add-shebang";
import sourcemaps from "rollup-plugin-sourcemaps";

// eslint-disable-next-line @typescript-eslint/no-var-requires
import pkg from "./package.json" with { type: "json" };

export default [{
    input: "lib-es6/cli",
    external: ["fs"],
    output: [{
        file: pkg.bin,
        format: "cjs",
        sourcemap: true
    }],
    plugins: [
        packageVersionPlugin(),
        shebang({
            include: "dist/cli.js"
        }),
        nodeResolve(),
        json(),
        sourcemaps()
    ]
}, {
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
        packageVersionPlugin(),
        alias({}),
        nodeResolve({
            preferBuiltins: true
        }),
        commonjs({}),
        json(),
        sourcemaps(),
        postcss({
            extensions: [".css"],
            minimize: true
        })
    ]
}];