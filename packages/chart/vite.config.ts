import { createHpccViteConfig } from "@hpcc-js/vite-plugins";
import { resolve } from "node:path";
import pkg from "./package.json" with { type: "json" };

export default createHpccViteConfig(pkg, {
    alias: {
        "d3-svg-annotation": resolve(import.meta.dirname, "../../node_modules/d3-svg-annotation/indexRollup.js")
    }
});
