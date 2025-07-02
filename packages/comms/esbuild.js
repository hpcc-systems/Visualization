import { nodeTpl, nodeBoth } from "@hpcc-js/esbuild-plugins";

//  config  ---
await Promise.all([
    nodeBoth("src/index.node.ts", "dist/node/index", { packages: "bundle" }),
    nodeTpl("utils/index.ts", "lib-esm/index")
]);
