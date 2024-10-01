import { describe, it, expect } from "vitest";
import { generate } from "@hpcc-js/dataflow";

describe("generate", () => {
    it("basic", () => {
        expect([...generate(Math.random, 22)]).to.be.lengthOf(22);
    });

});
