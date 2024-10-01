import { describe, it, expect } from "vitest";
import { variance, scalar } from "@hpcc-js/dataflow";

describe("variance", () => {
    it("scalarActivity", () => {
        const calcVariance = scalar(variance());
        expect(calcVariance([5, 1, 2, 3, 4])).to.equal(2.5);
    });

    it("empty array", () => {
        const varianceActivity = scalar(variance());
        expect(varianceActivity([])).to.be.undefined;
    });
});
