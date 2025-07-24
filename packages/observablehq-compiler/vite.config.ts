import { createHpccViteConfig, browserConfig, nodeConfig } from "@hpcc-js/esbuild-plugins";
import pkg from "./package.json" with { type: "json" };

const myBrowserConfig = { ...browserConfig };
myBrowserConfig.optimizeDeps = {
    include: ["acorn", "acorn-walk", "@observablehq/parser"]
};

const myNodeConfig = { ...nodeConfig };
myNodeConfig.optimizeDeps = {
    include: ["acorn", "acorn-walk", "@observablehq/parser"]
};

export default createHpccViteConfig(pkg, {
    configOverrides: {
        test: {
            projects: [myBrowserConfig, myNodeConfig]
        }
    }
});
