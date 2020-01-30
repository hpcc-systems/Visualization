import { external, globals } from "@hpcc-js/bundle";
import alias from 'rollup-plugin-alias';
import commonjs from 'rollup-plugin-commonjs';
import sourcemaps from 'rollup-plugin-sourcemaps';
import nodeResolve from 'rollup-plugin-node-resolve';
import postcss from "rollup-plugin-postcss";

const pkg = require("./package.json");

export default {
    input: "lib-es6/index",
    external: external,
    output: [{
        file: pkg.main,
        format: "umd",
        sourcemap: true,
        globals: globals,
        name: pkg.name,
        strict: false
    }, {
        file: pkg.module + ".js",
        format: "es",
        sourcemap: true,
        globals: globals,
        name: pkg.name,
        strict: false
    }],
    plugins: [
        alias({
            entries: [
                { find: "d3-array", replacement: "@hpcc-js/common" },
                { find: "d3-brush", replacement: "@hpcc-js/common" },
                { find: "d3-collection", replacement: "@hpcc-js/common" },
                { find: "d3-color", replacement: "@hpcc-js/common" },
                { find: "d3-dispatch", replacement: "@hpcc-js/common" },
                { find: "d3-drag", replacement: "@hpcc-js/common" },
                { find: "d3-dsv", replacement: "@hpcc-js/common" },
                { find: "d3-ease", replacement: "@hpcc-js/common" },
                { find: "d3-format", replacement: "@hpcc-js/common" },
                { find: "d3-interpolate", replacement: "@hpcc-js/common" },
                { find: "d3-scale", replacement: "@hpcc-js/common" },
                { find: "d3-selection", replacement: "@hpcc-js/common" },
                { find: "d3-time-format", replacement: "@hpcc-js/common" },
                { find: "d3-transition", replacement: "@hpcc-js/common" },
                { find: "d3-zoom", replacement: "@hpcc-js/common" }
            ]
        }),
        nodeResolve({
            preferBuiltins: true
        }),
        commonjs({
            namedExports: {
            }
        }),
        sourcemaps(),
        postcss({
            extensions: [".css"],
            minimize: true
        })
    ]
};
