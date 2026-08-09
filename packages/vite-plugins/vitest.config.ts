import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        include: ["tests/**/*.test.ts"],
        // Building every case with Vite is slow, and the cases share process globals.
        testTimeout: 30000,
        hookTimeout: 30000,
        fileParallelism: false
    }
});
