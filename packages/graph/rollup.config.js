import alias from 'rollup-plugin-alias';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import postcss from "rollup-plugin-postcss";

const pkg = require("./package.json");
const name = pkg.name.split("/").pop();

function external(id) {
    return id.indexOf("@hpcc-js") === 0;
}

function globals(id) {
    if (id.indexOf("@hpcc-js") === 0) {
        return id;
    }
    return undefined;
}

export default {
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
        alias({
            "d3-drag": "@hpcc-js/common",
            "d3-selection": "@hpcc-js/common"
        }),
        nodeResolve({
            preferBuiltins: true
        }),
        commonjs({
            namedExports: {
            }
        }),
        postcss({
            extensions: [".css"]
        })
    ]
};
