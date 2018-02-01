import alias from 'rollup-plugin-alias';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import postcss from "rollup-plugin-postcss";
import uglify from 'rollup-plugin-uglify';
const definition = require("./package.json");
const name = definition.name.split("/").pop();
const external = Object.keys(definition.dependencies || {}).filter(dep => dep.indexOf("@hpcc-js") === 0 && dep.indexOf("-shim") < 0);
const globals = {};
const external2 = Object.keys(globals);
external.forEach(dep => { globals[dep] = dep });

export default {
    input: "lib-es6/index",
    // external: ["@hpcc-js/dgrid-shim"],
    output: {
        file: `dist/vizLib.js`,
        globals: {
            //"@hpcc-js/dgrid-shim": "@hpcc-js/dgrid-shim"
        },
        format: "es", sourcemap: true,
        name: "vizLib"
    },
    plugins: [
        nodeResolve({
            preferBuiltins: true,
            jsnext: true
        }),
        commonjs({
            namedExports: {
                "../../packages/dgrid-shim/dist/dgrid-shim.js": ["Deferred", "domConstruct", "QueryResults", "Memory", "PagingGrid", "Grid"]
                // "../../node_modules/dagre/index.js": ["graphlib", "layout"]
            }
        }),
        alias({
        }),
        postcss({
            extensions: [".css"]
        })/*,
        uglify()
        */
    ]
};
