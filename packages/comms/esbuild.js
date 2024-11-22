import { nodeTpl } from "@hpcc-js/esbuild-plugins";

//  config  ---
await Promise.all([
    nodeTpl("src/index.node.ts", "dist/index.node"),
    nodeTpl("utils/index.ts", "lib-esm/index")
]);
