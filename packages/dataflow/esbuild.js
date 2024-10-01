import { browserTpl, neutralTpl, nodeTpl } from "@hpcc-js/esbuild-plugins";

//  config  ---
await neutralTpl("src/index.ts", "dist/index");
