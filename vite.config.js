import path from "path";

// vite.config.js
export default {
    resolve: {
        alias: {
            // crypto: "",
            "@hpcc-js/wc-core": path.resolve(__dirname, "./components/core/src/index.ts"),
            "@hpcc-js/wc-editor": path.resolve(__dirname, "./components/editor/src/index.ts"),
            "@hpcc-js/wc-gauge": path.resolve(__dirname, "./components/gauge/src/index.ts"),
            "@hpcc-js/wc-layout": path.resolve(__dirname, "./components/layout/src/index.ts"),
            "@hpcc-js/wc-legacy": path.resolve(__dirname, "./components/legacy/src/index.ts"),
            "@hpcc-js/wc-observable": path.resolve(__dirname, "./components/observable/src/index.ts"),
            "@hpcc-js/wc-pie": path.resolve(__dirname, "./components/pie/src/index.ts"),
            "@hpcc-js/wc-preview": path.resolve(__dirname, "./components/preview/src/index.ts"),
            "@hpcc-js/wc-sankey": path.resolve(__dirname, "./components/sankey/src/index.ts"),
            "@hpcc-js/wc-treemap": path.resolve(__dirname, "./components/treemap/src/index.ts")
        },
    },
}