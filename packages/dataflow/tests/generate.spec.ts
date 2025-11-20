import { describe, it, expect } from "vitest";
import { generate } from "../src/index.ts";

describe("generate", () => {
    it("should generate specified number of items", () => {
        expect([...generate(Math.random, 22)]).to.be.lengthOf(22);
    });

});
