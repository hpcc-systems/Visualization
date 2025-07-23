import { createHpccViteConfig } from "@hpcc-js/esbuild-plugins";
import { defineConfig, configDefaults } from "vitest/config";
import pkg from "./package.json" with { type: "json" };

const baseConfig = createHpccViteConfig(pkg);

// Local test configurations for this package only
const localNodeConfig = defineConfig({
    test: {
        name: "node",
        include: ["./tests/**/*.spec.{ts,js}", "./src/**/*.spec.{ts,js}"],
        exclude: [
            ...configDefaults.exclude,
            "**/*.browser.spec.{ts,js}",
            "**/node_modules/**",
        ],
        environment: "node",
    }
});

const localBrowserConfig = defineConfig({
    test: {
        name: "browser",
        include: ["./tests/**/*.browser.spec.{ts,js}", "./src/**/*.browser.spec.{ts,js}"],
        exclude: [
            ...configDefaults.exclude,
            "**/*.node.spec.{ts,js}",
            "**/node_modules/**",
        ],
        browser: {
            enabled: true,
            provider: "playwright",
            instances: [{
                name: "chromium",
                browser: "chromium",
                headless: true,
            }],
            screenshotFailures: false,
        },
    }
});

export default defineConfig({
    ...baseConfig,
    test: {
        projects: [
            localNodeConfig,
            localBrowserConfig
        ]
    }
} as any);