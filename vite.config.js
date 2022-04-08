/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
import { defineConfig } from "vite";
const hpccJsResolve = require("./utils/hpccJsResolve");

export default defineConfig({
    plugins: [
        hpccJsResolve({
            "react": require.resolve("preact/compat"),
            "react-dom/test-utils": require.resolve("preact/test-utils"),
            "react-dom": require.resolve("preact/compat"),
            "react/jsx-runtime": require.resolve("preact/jsx-runtime"),
        }),
    ]
});
