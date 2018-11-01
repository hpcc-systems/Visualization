import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import postcss from "rollup-plugin-postcss";

export default {
    input: 'lib-es6/index.spec.js',
    external: function (id) {
        switch (id) {
            case "chai":
            case "es6-promise/auto":
                return true;
        }
        return false;
    },
    output: {
        file: "dist/bundle.rollup.test.js",
        format: "umd",
        globals: {
            "chai": "chai"
        },
        //strict: true
    },
    plugins: [
        nodeResolve(),
        commonjs({
            namedExports: {
                "../../packages/dgrid-shim/dist/index.js": ["Deferred", "domConstruct", "QueryResults", "Memory", "PagingGrid", "Grid"],
                //"@hpcc-js/dgrid-shim": ["Deferred", "domConstruct", "QueryResults", "Memory", "PagingGrid", "Grid"]
            }
        }),
        postcss({
            extensions: [".css"]
        })
    ]
};
