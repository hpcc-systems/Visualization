import { defineWorkspace, mergeConfig } from "vitest/config";
import { nodeConfig, browserConfig } from "../../vitest.workspace.ts";

const browserConfig2 = mergeConfig(browserConfig, {
    test: {
        include: [
            "**/dgrid.browser.spec.ts"
        ]
    }
});

export default defineWorkspace([
    browserConfig2,
]);