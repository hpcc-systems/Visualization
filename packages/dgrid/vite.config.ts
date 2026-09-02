import { createHpccViteConfig, browserConfig } from "@hpcc-js/vite-plugins";
import pkg from "./package.json" with { type: "json" };

const myBrowserConfig = { ...browserConfig };
myBrowserConfig.test!.include = ["./tests/*.spec.ts"];

export default createHpccViteConfig(pkg, {
    configOverrides: {
        test: {
            projects: [myBrowserConfig]
        }
    }
});