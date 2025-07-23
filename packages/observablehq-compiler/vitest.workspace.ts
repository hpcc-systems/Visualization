import { defineWorkspace } from "vitest/config";
import { browserConfig, nodeConfig } from "../../vitest.workspace.ts";

browserConfig.optimizeDeps = {
    include: ["acorn", "acorn-walk", "@observablehq/parser"]
};

nodeConfig.optimizeDeps = {
    include: ["acorn", "acorn-walk", "@observablehq/parser"]
};

export default defineWorkspace([
    browserConfig,
    nodeConfig
]);