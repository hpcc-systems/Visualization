import alias from "@rollup/plugin-alias";
import sourcemaps from "rollup-plugin-sourcemaps";
import nodeResolve from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import { globals } from "@hpcc-js/bundle";

import pkg from "./package.json" with { type: "json" };

const plugins = [
    alias({
        entries: [
        ]
    }),
    nodeResolve({
        preferBuiltins: true,
    }),
    sourcemaps(),
    postcss({
        extensions: [".css"],
        extract: true,
        minimize: true
    })
];

export default [{
    input: "lib-es6/index",
    output: [{
        file: pkg.main,
        format: "umd",
        sourcemap: true,
        name: pkg.name,
        globals
    }, {
        file: pkg.module,
        format: "es",
        sourcemap: true,
        globals
    }],
    treeshake: {
        moduleSideEffects: (id, external) => {
            if (id.indexOf(".css") >= 0) return true;
            return false;
        }
    },
    plugins: plugins
}];
