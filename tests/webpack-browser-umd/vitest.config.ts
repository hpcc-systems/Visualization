import { defineConfig } from "vitest/config";
import { playwright } from "@vitest/browser-playwright";

export default defineConfig({
    publicDir: "public",
    test: {
        globals: false,
        testTimeout: 30000,
        browser: {
            enabled: true,
            provider: playwright(),
            instances: [{
                name: "chromium",
                browser: "chromium",
                headless: true,
            }],
            screenshotFailures: false,
        },
    },
});
