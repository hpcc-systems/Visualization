import { configDefaults, defineWorkspace } from "vitest/config";

export default defineWorkspace([
    {
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
            ],
            environment: "node",
            setupFiles: []
        }
    }, {
        test: {
            name: "browser",
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
                headless: true,
                name: "chromium",
                providerOptions: {
                    launch: {
                        args: ["--disable-web-security"],
                    }
                },
                screenshotFailures: false
            },
            setupFiles: [],
        }
    }
]);
