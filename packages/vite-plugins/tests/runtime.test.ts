import { describe, expect, it } from "vitest";
import { __dojoModule, __dojoRun } from "../src/runtime/amd.ts";

describe("AMD runtime", () => {
    it("preserves source lines while evaluating module bodies", () => {
        const context = __dojoModule({ absMid: "test/source-lines" });
        const source = [
            "define([], function () {",
            "    throw new Error('source line check');",
            "});"
        ].join("\n");

        try {
            __dojoRun(context, source, "test/source-lines.js");
            expect.unreachable("Expected the module factory to throw");
        } catch (error) {
            expect((error as Error).stack).toContain("test/source-lines.js:2:");
        }
    });
});
