/* eslint-disable no-undef */
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
    resolve: {
        alias: {
            // crypto: "",
            // "react": "preact/compat",
            // "react-dom/test-utils": "preact/test-utils",
            // "react-dom": "preact/compat",
            // "react/jsx-runtime": "preact/jsx-runtime",

            // eslint-disable-next-line no-undef
            "@hpcc-js/wc-core": path.resolve(__dirname, "./components/core/src/index.ts"),
            "@hpcc-js/wc-editor": path.resolve(__dirname, "./components/editor/src/index.ts"),
            "@hpcc-js/wc-gauge": path.resolve(__dirname, "./components/gauge/src/index.ts"),
            "@hpcc-js/wc-layout": path.resolve(__dirname, "./components/layout/src/index.ts"),
            "@hpcc-js/wc-legacy": path.resolve(__dirname, "./components/legacy/src/index.ts"),
            "@hpcc-js/wc-observable": path.resolve(__dirname, "./components/observable/src/index.ts"),
            "@hpcc-js/wc-pie": path.resolve(__dirname, "./components/pie/src/index.ts"),
            "@hpcc-js/wc-preview": path.resolve(__dirname, "./components/preview/src/index.ts"),
            "@hpcc-js/wc-sankey": path.resolve(__dirname, "./components/sankey/src/index.ts"),
            "@hpcc-js/wc-treemap": path.resolve(__dirname, "./components/treemap/src/index.ts"),
            "@hpcc-js/util": path.resolve(__dirname, "./packages/util/src/index.ts"),
            "@hpcc-js/common": path.resolve(__dirname, "./packages/common/src/index.ts"),
            "@hpcc-js/api": path.resolve(__dirname, "./packages/api/src/index.ts"),
            "@hpcc-js/chart": path.resolve(__dirname, "./packages/chart/src/index.ts"),
            "@hpcc-js/dgrid2": path.resolve(__dirname, "./packages/dgrid2/dist/index.ts"),
            "@hpcc-js/observable-shim": path.resolve(__dirname, "./packages/observable-shim/src/index.ts"),
            "@hpcc-js/observable-md": path.resolve(__dirname, "./packages/observable-md/src/index.ts"),
            "react-dom/test-utils": "preact/test-utils",
            "react-dom": "preact/compat",
            "react": "preact/compat",
            //  entries: [
            //     //     { find: "react", replacement: "preact/compat" },
            //     //     { find: "react-dom/test-utils", replacement: "preact/test-utils" },
            //     //     { find: "react-dom", replacement: "preact/compat" },
            //     //     { find: "react/jsx-runtime", replacement: "preact/jsx-runtime" }
            // ]
        }
    },
    plugins: [
        // preact({
        //     babel: {
        //         plugins: ["@babel/plugin-proposal-decorators", { version: "legacy" }],
        //     }
        // })
    ]
});
