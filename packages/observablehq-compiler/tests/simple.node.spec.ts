import { describe, it, expect } from "vitest";
import { compile, Writer } from "@hpcc-js/observablehq-compiler";
import { imports } from "./Introduction to Imports.ts";

describe("observablehq-compiler-node", function () {
    it("writer", async () => {
        const writer = new Writer();
        const define = await compile(imports as any);
        define.write(writer);
        expect(writer.toString()).to.be.a("string");
    });
});

