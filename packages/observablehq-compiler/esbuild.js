import { nodeBoth } from "@hpcc-js/esbuild-plugins";

//  config  ---
await Promise.all([
    nodeBoth("src/index.node.ts", "dist/node/index")
]);
