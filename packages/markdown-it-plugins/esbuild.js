import { nodeTpl, browserTpl } from "@hpcc-js/esbuild-plugins";
import pkg from "./package.json" with { type: "json" };

//  config  ---
await Promise.all([
    nodeTpl("src/index.ts", "dist/index.node"),
    nodeTpl("src/loader.ts", "dist/loader.node", { supported: { "dynamic-import": true } }),
    nodeTpl("src/ecl-lang/index.ts", "dist/ecl-lang"),
    browserTpl("src/index.ts", "dist/index", {
        keepNames: true,
        external: [
            ...Object.keys(pkg.dependencies),
        ]
    })
]);
