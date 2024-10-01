import { describe, it, expect } from "vitest";
import { first } from "@hpcc-js/dataflow";

describe("first", () => {
    it("generator", () => {
        expect([...first(2)([])]).to.deep.equal([]);
        expect([...first(2)(["a", "b", "c"])]).to.deep.equal(["a", "b"]);
    });

    it("scalarActivity", () => {
        expect([...first([], 22)]).to.deep.equal([]);
        expect([...first(["a", "b", "c"], 2)]).to.deep.equal(["a", "b"]);
        expect([...first(["a", "b", "c"], 22)]).to.deep.equal(["a", "b", "c"]);
    });
});
