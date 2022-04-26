/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
import { defineConfig } from "vite";
const path = require("path");

export default defineConfig({
    cacheDir: path.join(__dirname, ".vitepress/cache"),
    resolve: {
        alias: [
            { find: /^@hpcc-js\/wc-(.*)/, replacement: path.join(__dirname, "./components/$1/src/index.ts") },
            { find: /^@hpcc-js\/(.*)/, replacement: path.join(__dirname, "./packages/$1/src/index.ts") },
        ]
    },
    clearScreen: false,
    plugins: [],
    optimizeDeps: {
        esbuildOptions: {
        }
    }
});

