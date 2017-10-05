import alias from 'rollup-plugin-alias';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import postcss from "rollup-plugin-postcss";
const definition = require("./package.json");
const name = definition.name.split("/").pop();

export default {
    input: "lib-es6/index",
    external: function (id) {
        return id.indexOf("@hpcc-js") === 0 && id.indexOf("-shim") < 0;
    },
    output: {
        file: `build/index.es6.js`,
        format: "es",
        sourcemap: true,
        globals: function (id) {
            if (id.indexOf("@hpcc-js") === 0) {
                return id;
            }
            return undefined;
        },
        name: definition.name
    },
    plugins: [
        nodeResolve({
            preferBuiltins: true
        }),
        commonjs({
            namedExports: {
                "../../node_modules/dagre/index.js": ["graphlib", "layout"]
            }
        }),
        alias({
        }),
        postcss({
            extensions: [".css"]
        })
    ]
};
