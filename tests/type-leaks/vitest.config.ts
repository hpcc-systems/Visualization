import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        name: "type-leaks",
        environment: "node",
        include: ["**/*.spec.ts"],
        testTimeout: 30000
    }
});
