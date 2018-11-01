import nodeResolve from 'rollup-plugin-node-resolve';

export default {
    input: "src/index.js",
    output: {
        file: "dist/index.js",
        format: "umd",
        name: "quickstart",
        globals: {
            "@hpcc-js/dgrid-shim": "@hpcc-js/dgrid-shim"
        }
    },
    external: [
        "@hpcc-js/dgrid-shim"
    ],
    plugins: [
        nodeResolve()
    ]
};
