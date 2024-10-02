import { describe, it, expect } from "vitest";
import { median, scalar } from "@hpcc-js/dataflow";

describe("median", () => {

    it("scalarActivity", () => {
        const calcMedian = scalar(median());
        expect(calcMedian([-6, -2, 1, 2, 5])).to.equal(1);
        expect(calcMedian([5, -6, 1, 2, -2])).to.equal(1);
        expect(calcMedian([-6, -2, 1, 2, 5, 6])).to.equal(1.5);
        expect(calcMedian([5, -6, 1, 2, -2, 6])).to.equal(1.5);
        expect(calcMedian([9])).to.deep.equal(9);
    });
});
