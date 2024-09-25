import { defineConfig } from "vitest/config";

export default defineConfig(({ mode }) => {
    switch (mode) {
        case "node":
            return {
                test: {
                    include: [
                        "tests/*.spec.ts",
                        "tests/node/*.spec.ts"
                    ],
                    node: {
                        enabled: true,
                        provider: "node",
                    },
                    testTimeout: 20000
                }
            };
        case "browser":
            return {
                test: {
                    include: [
                        "tests/*.spec.ts",
                        "tests/browser/*.spec.ts"
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
                    testTimeout: 30000
                }
            };
        default:
    }
    return {
    };
});
