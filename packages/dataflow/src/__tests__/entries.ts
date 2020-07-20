import { expect } from "chai";
import { entries } from "../index";

describe("entries", () => {
    it("generator", () => {
        expect([...entries()([])]).to.deep.equal([]);
        expect([...entries()(["a", "b", "c"])]).to.deep.equal([[0, "a"], [1, "b"], [2, "c"]]);
    });

    it("fn", () => {
        expect([...entries([])]).to.deep.equal([]);
        expect([...entries(["a", "b", "c"])]).to.deep.equal([[0, "a"], [1, "b"], [2, "c"]]);
    });
});
