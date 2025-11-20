import { describe, it, expect } from "vitest";
import { entries } from "../src/index.ts";

describe("entries", () => {
    it("should create index-value pairs when used as curried activity", () => {
        expect([...entries()([])]).to.deep.equal([]);
        expect([...entries()(["a", "b", "c"])]).to.deep.equal([[0, "a"], [1, "b"], [2, "c"]]);
    });

    it("should create index-value pairs when executed immediately", () => {
        expect([...entries([])]).to.deep.equal([]);
        expect([...entries(["a", "b", "c"])]).to.deep.equal([[0, "a"], [1, "b"], [2, "c"]]);
    });
});
