import { external, globals } from "@hpcc-js/bundle";
import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import sourcemaps from 'rollup-plugin-sourcemaps';
import nodeResolve from '@rollup/plugin-node-resolve';
import postcss from "rollup-plugin-postcss";

const pkg = require("./package.json");

const plugins = [
    alias({
        entries: [
            { find: "@hpcc-js/common", replacement: "@hpcc-js/common/lib-es6/index.js" }
        ]
    }),
    nodeResolve({
        preferBuiltins: true
    }),
    commonjs({}),
    sourcemaps(),
    postcss({
        extensions: [".css"],
        minimize: true
    })
]

export default [{
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
    plugins: plugins
}, {
    input: "lib-es6/index",
    output: [{
        file: "dist/index.full.js",
        format: "umd",
        sourcemap: true,
        globals: globals,
        name: pkg.name
    }],
    treeshake: {
        moduleSideEffects: (id, external) => {
            if (id.indexOf(".css") >= 0) return true;
            return false;
        }
    },
    plugins: plugins
}];