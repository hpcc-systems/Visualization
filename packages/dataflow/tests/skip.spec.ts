import { describe, it, expect } from "vitest";
import { skip } from "../src/index.ts";

describe("skip", () => {
    it("should skip first N items when used as curried activity", () => {
        expect([...skip(2)([])]).to.deep.equal([]);
        expect([...skip(2)(["a", "b", "c"])]).to.deep.equal(["c"]);
    });

    it("should skip first N items when executed immediately", () => {
        expect([...skip([], 22)]).to.deep.equal([]);
        expect([...skip(["a", "b", "c"], 2)]).to.deep.equal(["c"]);
        expect([...skip(["a", "b", "c"], 22)]).to.deep.equal([]);
    });
});
