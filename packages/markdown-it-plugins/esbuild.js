import { nodeTpl, browserTpl } from "@hpcc-js/esbuild-plugins";

//  config  ---
await Promise.all([
    nodeTpl("src/index.ts", "dist/index.node"),
    nodeTpl("src/ecl-lang/index.ts", "dist/ecl-lang"),
    browserTpl("src/index.ts", "dist/index")
]);
