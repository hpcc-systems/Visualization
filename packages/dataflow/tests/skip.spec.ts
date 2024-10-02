import { describe, it, expect } from "vitest";
import { skip } from "@hpcc-js/dataflow";

describe("skip", () => {
    it("generator", () => {
        expect([...skip(2)([])]).to.deep.equal([]);
        expect([...skip(2)(["a", "b", "c"])]).to.deep.equal(["c"]);
    });

    it("scalarActivity", () => {
        expect([...skip([], 22)]).to.deep.equal([]);
        expect([...skip(["a", "b", "c"], 2)]).to.deep.equal(["c"]);
        expect([...skip(["a", "b", "c"], 22)]).to.deep.equal([]);
    });
});
