import { configDefaults, defineConfig, defineWorkspace } from "vitest/config";

export const nodeConfig = defineConfig({
    test: {
        name: "node",
        exclude: [
            ...configDefaults.exclude,
            "**/*.browser.spec.{ts,js}",
            "**/node_modules/**",
            "**/.nx/**",
            "**/apps/**",
            "**/components/**",
            "**/demos/**",
            "**/src/**",
            "./tests/**",
        ],
        environment: "node",
        setupFiles: []
    }
});

export const browserConfig = defineConfig({
    test: {
        exclude: [
            ...configDefaults.exclude,
            "@hpcc-js/dgrid-shim",
            "**/*.node.spec.{ts,js}",
            "**/node_modules/**",
            "**/.nx/**",
            "**/apps/**",
            "**/components/**",
            "**/demos/**",
            "**/src/**",
        ],
        browser: {
            enabled: true,
            provider: "playwright",
            instances: [{
                name: "chromium",
                browser: "chromium",
                headless: true,
                launch: {
                    args: ["--disable-web-security"],
                }
            }],
            screenshotFailures: false,
        },
        setupFiles: [],
    }
});

export default defineWorkspace([
    nodeConfig,
    browserConfig
]);