import { terser } from "rollup-plugin-terser";
import { plugins, treeshake } from "./components/rollup.config.js";

function rollup(input, file) {
    return {
        input,
        output: [
            {
                file,
                format: "es",
                sourcemap: true,
                plugins: [terser()]
            }
        ],
        treeshake,
        plugins
    };
}

export default () => {
    return [
        rollup("dist/esm/index.js", "dist/index.js"),
        rollup("components/core/dist/esm/index.js", "dist/wc-core.js"),
        rollup("components/editor/dist/esm/index.js", "dist/wc-editor.js"),
        rollup("components/layout/dist/esm/index.js", "dist/wc-layout.js"),
        rollup("components/preview/dist/esm/index.js", "dist/wc-preview.js"),
        rollup("packages/observable-md/dist/index.es6.js", "dist/observable-md.js"),
    ];
};