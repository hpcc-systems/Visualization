import sourcemaps from "rollup-plugin-sourcemaps";
import nodeResolve from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import { globals } from "@hpcc-js/bundle";

import pkg from "./package.json";

const plugins = [
    nodeResolve(),
    sourcemaps(),
    postcss({
        extensions: [".css"],
        minimize: true
    })
];

export default [{
    input: "lib-es6/index",
    output: [{
        file: pkg.main,
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