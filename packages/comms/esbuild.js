import { browserTpl, nodeTpl } from "@hpcc-js/esbuild-plugins";

//  config  ---
await Promise.all([
    nodeTpl("src/index.node.ts", "dist/index.node"),
    browserTpl("src/index.ts", "dist/index")
]);
