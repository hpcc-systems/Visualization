import { browserTpl } from "@hpcc-js/esbuild-plugins";
import pkg from "./package.json" with { type: "json" };

//  config  ---
await Promise.all([
    browserTpl("src/index.ts", "dist/index", {
        keepNames: true,
        alias: {
            "d3-array": "@hpcc-js/common",
            "d3-brush": "@hpcc-js/common",
            "d3-collection": "@hpcc-js/common",
            "d3-color": "@hpcc-js/common",
            "d3-dispatch": "@hpcc-js/common",
            "d3-drag": "@hpcc-js/common",
            "d3-dsv": "@hpcc-js/common",
            "d3-ease": "@hpcc-js/common",
            "d3-format": "@hpcc-js/common",
            "d3-interpolate": "@hpcc-js/common",
            "d3-scale": "@hpcc-js/common",
            "d3-selection": "@hpcc-js/common",
            "d3-time-format": "@hpcc-js/common",
            "d3-transition": "@hpcc-js/common",
            "d3-zoom": "@hpcc-js/common"
        },
        loader: {
            ".png": "dataurl",
            ".svg": "dataurl",
        },
        external: [
            ...Object.keys(pkg.dependencies),
        ]
    })
]);
