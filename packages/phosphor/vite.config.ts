import { createHpccViteConfig } from "@hpcc-js/esbuild-plugins";
import { defineConfig } from "vitest/config";
import { nodeConfig, browserConfig } from "../../vitest.workspace.ts";
import pkg from "./package.json" with { type: "json" };

const baseConfig = createHpccViteConfig(pkg);

export default defineConfig({
    ...baseConfig,
    test: {
        projects: [
            nodeConfig,
            browserConfig
        ]
    }
} as any);
