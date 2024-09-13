import { expect } from "chai";
import { entries } from "@hpcc-js/dataflow";

describe("entries", () => {
    it("generator", () => {
        expect([...entries()([])]).to.deep.equal([]);
        expect([...entries()(["a", "b", "c"])]).to.deep.equal([[0, "a"], [1, "b"], [2, "c"]]);
    });

    it("scalarActivity", () => {
        expect([...entries([])]).to.deep.equal([]);
        expect([...entries(["a", "b", "c"])]).to.deep.equal([[0, "a"], [1, "b"], [2, "c"]]);
    });
});
