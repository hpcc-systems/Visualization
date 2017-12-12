import alias from 'rollup-plugin-alias';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import postcss from "rollup-plugin-postcss";

const pkg = require("./package.json");
const name = pkg.name.split("/").pop();
const node_libs = ["child_process", "fs", "os", "path", "semver", "request", "safe-buffer", "tmp", "xmldom"];

function external(id) {
    return id.indexOf("@hpcc-js") === 0 && id.indexOf("-shim") < 0 || node_libs.indexOf(id) >= 0;
}

function globals(id) {
    if (id.indexOf("@hpcc-js") === 0) {
        return id;
    }
    return undefined;
}

const plugins = [
    nodeResolve({
        preferBuiltins: true
    }),
    commonjs({
    }),
    alias({
    }),
    postcss({
        extensions: [".css"]
    })
];

export default [{
    input: "lib-es6/index",
    external: external,
    output: [{
        file: pkg.browser,
        format: "umd",
        sourcemap: true,
        globals: globals,
        name: pkg.name
    }, {
        file: pkg.module,
        format: "es",
        sourcemap: true,
        globals: globals
    }],
    plugins: plugins
}, {
    input: "lib-es6/index.node",
    external: external,
    output: [{
        file: pkg.main,
        format: "cjs",
        sourcemap: true,
        globals: globals,
        name: pkg.name
    }],
    plugins: plugins
}];
