import nodeResolve from 'rollup-plugin-node-resolve';

export default {
    input: "src/index.js",
    output: {
        file: "dist/index.js",
        format: "umd",
        strict: false   // @hpcc-js/dgrid will fail at runtime if "use strict" is enabled for the bundle (this is due to bundled copy of "dgrid").
    },
    plugins: [
        nodeResolve()
    ]
};
