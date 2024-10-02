import { describe, it, expect } from "vitest";
import { deviation, scalar } from "@hpcc-js/dataflow";

describe("deviation", () => {
    it("scalarActivity", () => {
        const calcDeviation = scalar(deviation());
        expect(calcDeviation([5, 1, 2, 3, 4])).to.equal(Math.sqrt(2.5));
    });

    it("empty array", () => {
        const deviationActivity = scalar(deviation());
        expect(deviationActivity([])).to.be.undefined;
    });
});
