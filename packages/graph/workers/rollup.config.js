import alias from "@rollup/plugin-alias";
import commonjs from "@rollup/plugin-commonjs";
import sourcemaps from "rollup-plugin-sourcemaps";
import nodeResolve from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss";

const plugins = [
    alias({
        entries: [
            { find: "dagre", replacement: "dagre/dist/dagre.js" },
        ],
    }),
    nodeResolve({
        preferBuiltins: true
    }),
    commonjs({
    }),
    sourcemaps(),
    postcss({
        extensions: [".css"],
        minimize: true
    })
];

export default [{
    input: "workers/lib-es6/forceDirected.js",
    output: [{
        file: "workers/dist/forceDirected.js",
        format: "iife",
        sourcemap: true,
        name: "forceDirected"
    }],
    plugins
}, {
    input: "workers/lib-es6/dagre.js",
    output: [{
        file: "workers/dist/dagre.js",
        format: "iife",
        sourcemap: true,
        name: "dagre"
    }],
    plugins
}, {
    input: "workers/lib-es6/graphviz.js",
    output: [{
        file: "workers/dist/graphviz.js",
        format: "iife",
        sourcemap: true,
        name: "graphviz"
    }],
    plugins
}];