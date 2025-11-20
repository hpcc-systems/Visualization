import { describe, it, expect } from "vitest";
import { first } from "../src/index.ts";

describe("first", () => {
    it("should return first N items when used as curried activity", () => {
        expect([...first(2)([])]).to.deep.equal([]);
        expect([...first(2)(["a", "b", "c"])]).to.deep.equal(["a", "b"]);
    });

    it("should return first N items when executed immediately", () => {
        expect([...first([], 22)]).to.deep.equal([]);
        expect([...first(["a", "b", "c"], 2)]).to.deep.equal(["a", "b"]);
        expect([...first(["a", "b", "c"], 22)]).to.deep.equal(["a", "b", "c"]);
    });
});
