import { terser } from "rollup-plugin-terser";
import { plugins, treeshake } from "./components/rollup.config.js";

import * as pkg from "./package.json";

export default [
    {
        input: "dist/esm/index.js",
        output: [
            {
                file: pkg.jsdelivr,
                format: "umd",
                sourcemap: true,
                plugins: [terser()],
                name: pkg.name
            }
        ],
        treeshake,
        plugins
    },
];
