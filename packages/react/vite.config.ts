import preact from "@preact/preset-vite";
import { createHpccViteConfig } from "@hpcc-js/esbuild-plugins";
import pkg from "./package.json" with { type: "json" };

export default createHpccViteConfig(pkg, { plugins: [preact()] });