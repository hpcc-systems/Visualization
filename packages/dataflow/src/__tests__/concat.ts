import { expect } from "chai";
import { concat } from "../index";

describe("concat", () => {
    it("generator", () => {
        expect([...concat([])([])]).to.deep.equal([]);
        expect([...concat([1, 2, 3])([])]).to.deep.equal([1, 2, 3]);
        expect([...concat<number>([])([1, 2, 3])]).to.deep.equal([1, 2, 3]);
        expect([...concat([4, 5, 6])([1, 2, 3])]).to.deep.equal([1, 2, 3, 4, 5, 6]);
    });

    it("fn", () => {
        expect([...concat([], [])]).to.deep.equal([]);
        expect([...concat([], [1, 2, 3])]).to.deep.equal([1, 2, 3]);
        expect([...concat([1, 2, 3], [])]).to.deep.equal([1, 2, 3]);
        expect([...concat([1, 2, 3], [4, 5, 6])]).to.deep.equal([1, 2, 3, 4, 5, 6]);
    });
});
