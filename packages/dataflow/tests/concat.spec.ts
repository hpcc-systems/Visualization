import { describe, it, expect } from "vitest";
import { concat } from "../src/index.ts";

describe("concat", () => {
    it("should concatenate arrays when used as curried activity", () => {
        expect([...concat([])([])]).to.deep.equal([]);
        expect([...concat([1, 2, 3])([])]).to.deep.equal([1, 2, 3]);
        expect([...concat<number>([])([1, 2, 3])]).to.deep.equal([1, 2, 3]);
        expect([...concat([4, 5, 6])([1, 2, 3])]).to.deep.equal([1, 2, 3, 4, 5, 6]);
    });

    it("should concatenate arrays when executed immediately", () => {
        expect([...concat([], [])]).to.deep.equal([]);
        expect([...concat([], [1, 2, 3])]).to.deep.equal([1, 2, 3]);
        expect([...concat([1, 2, 3], [])]).to.deep.equal([1, 2, 3]);
        expect([...concat([1, 2, 3], [4, 5, 6])]).to.deep.equal([1, 2, 3, 4, 5, 6]);
    });
});
