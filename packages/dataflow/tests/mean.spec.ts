import { describe, it, expect } from "vitest";
import { mean, scalar } from "@hpcc-js/dataflow";

describe("mean", () => {
    it("scalarActivity", () => {
        const a1 = scalar(mean());
        expect(a1([5, -6, 1, 2, -2])).to.equal(0);
        expect(a1([9])).to.deep.equal(9);
    });
});

