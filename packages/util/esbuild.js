import { browserTpl, neutralTpl, nodeTpl } from "@hpcc-js/esbuild-plugins";

//  config  ---
await neutralTpl("src/index.ts", "dist/index");
await Promise.all([
    browserTpl("spec/index.browser.ts", "dist-test/index.browser", undefined, undefined, undefined, ["@hpcc-js/*"]),
    nodeTpl("spec/index.node.ts", "dist-test/index.node", undefined, undefined, undefined, ["@hpcc-js/*"]),
]);

