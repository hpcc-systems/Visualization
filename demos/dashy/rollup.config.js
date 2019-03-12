import nodeResolve from 'rollup-plugin-node-resolve';

export default {
    input: "lib-es6/index",
    output: {
        file: `dist/rollupLib.js`,
        format: "umd",
        name: "vizLib",
        strict: false
    },
    plugins: [
        nodeResolve()
    ]
};
