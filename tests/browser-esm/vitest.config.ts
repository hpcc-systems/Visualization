import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        globals: false,
        testTimeout: 15000,
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
    },
});
