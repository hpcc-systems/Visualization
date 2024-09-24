import { compile, Writer } from "@hpcc-js/observablehq-compiler";
import { imports } from "./Introduction to Imports.ts";

describe("observablehq-compiler-node", function () {
    it("writer", async function () {
        const writer = new Writer();
        const define = await compile(imports as any);
        define.write(writer);
        console.info(writer.toString());
    });
});

